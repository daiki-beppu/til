---
title: 30-fireworks
date: 2024/09/01
updated: 2024/09/08
---

# ｢花火｣の制作

- [下準備](#下準備)
- [花火の実装](#花火の実装)
  - [パーティクルサイズの調整](#パーティクルサイズの調整)
  - [ユニフォームでパーティクルサイズを調整](#ユニフォームでパーティクルサイズを調整)
  - [レンダリングの高さに比例させる](#レンダリングの高さに比例させる)
  - [ピクセル比を適切に処理する](#ピクセル比を適切に処理する)
    - [ここまでのコードの全体像](#ここまでのコードの全体像)
  - [テクスチャの適用](#テクスチャの適用)

> [!NOTE]
>
> こちらの内容は Three.js v0.166.1 を使用しています。

## 下準備

以下の状態からはじめます

[![Image from Gyazo](https://i.gyazo.com/70c7b8250b40023c2fa34d348cee0d02.png)](https://gyazo.com/70c7b8250b40023c2fa34d348cee0d02)

<details>
<summary>. jsファイル(クリックして展開)</summary>

```js
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import fragmentShader from "./shaders/firework/fragment.glsl";
import vertexShader from "./shaders/firework/vertex.glsl";

// セットアップ
const gui = new GUI({ width: 340 });
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

// ウィンドウサイズ
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// カメラ
const camera = new THREE.PerspectiveCamera(
  25,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.set(1.5, 0, 6);
scene.add(camera);

// オービットコントロール
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const createFirework = (count, position) => {
  const vertices = 3;
  const positionsArray = new Float32Array(count * vertices);

  for (let i = 0; i < count; i++) {
    const positionIndex = i * 3;

    positionsArray[positionIndex] = Math.random() - 0.5;
    positionsArray[positionIndex + 1] = Math.random() - 0.5;
    positionsArray[positionIndex + 2] = Math.random() - 0.5;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positionsArray, vertices)
  );

  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });

  const firework = new THREE.Points(geometry, material);
  firework.position.copy(position);
  scene.add(firework);
};
createFirework(100, new THREE.Vector3());

// アニメーション
const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
```

</details>

<details>
<summary>. glslファイル(クリックして展開)</summary>

```glsl
// vertex.glsl

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  gl_PointSize = 20.0;
}
```

```glsl
// fragment.glsl

void main() {
  gl_FragColor = vec4(1.0, 0.3, 0.0, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
```

</details>

<details>
<summary>packeage.jsonファイル(クリックして展開)</summary>

```json
{
  "name": "threejs-journey-exercise",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "devDependencies": {
    "@biomejs/biome": "1.8.3",
    "vite": "^5.3.3",
    "vite-plugin-glsl": "^1.3.0",
    "vite-plugin-restart": "^0.4.1"
  },
  "dependencies": {
    "gsap": "^3.12.5",
    "lil-gui": "^0.19.2",
    "three": "^0.166.1"
  }
}
```

</details>

## 花火の実装

### パーティクルサイズの調整

パーティクルに遠近感を加えるために `gl_PointSize` に `1.0 / - viewPosition.z`を乗算します

これは Three.js のシェーダーチャンクで使われている方法です。
合わせてパーティクルが小さすぎるので初期値を変更して調整します

> [!NOTE]
>
> 📝 **Memo**
>
> なぜ乗算する値が `1.0 / - viewPosition.z`なのか？
>
> `viewPosition.z` はオブジェクトのカメラ空間の位置を意味し
> z 方向 は カメラの距離を示します
> カメラの前方がマイナス方向なので、`viewPosition.z` は通常負の値になります。
> マイナスを付けることでカメラから遠いほど大きな正の値になり、これによって距離が遠いほど `gl_PointSize` が小さくなります
>
> そして逆数を使用することで距離に対して反比例する値を生成します
> これによってカメラに近いパーティクルは大きく、遠いパーティクルほど小さく表示される

```glsl
// vertex.glsl に記述

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  gl_PointSize = 50.0; // 小さすぎるので 20.0 => 50.0 に変更
  gl_PointSize *= 1.0 / - viewPosition.z; // 遠近感を加える
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/15a22022cb9bc89e01e64498e510fc99.png)](https://gyazo.com/15a22022cb9bc89e01e64498e510fc99)

### ユニフォームでパーティクルサイズを調整

マテリアルに `uniforms`プロパティに `uSize` を追加

```js
  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uSize: new THREE.Uniform(size),
    },
  }
```

頂点シェーダーで `gl_PointSize` を `50.0 => uSize` に変更します。

```glsl
vertex.glsl に記述

uniform float uSize;

void main() {
  // ...

  gl_PointSize = uSize;
  gl_PointSize *= 1.0 / - viewPosition.z;
}
```

`createFirework 関数`のパラメータに`size`を追加して
`uSize` の値に `size` パラメータを設定する

こうすることで、引数からパーティクルサイズを調整することができる

```js
const createFirework = (count, position, size) => {
  // ...

  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uSize: new THREE.Uniform(size),
    },
  });

  // ...
};

createFirework(100, new THREE.Vector3(), 50);
```

### レンダリングの高さに比例させる

今のままでは、レンダリングの高さに合わせてサイズが変更されません。
これを修正します。

まずレンダリングの解像度をシェーダーに送信します。
マテリアルの`uniforms`プロパティに`uResolution`を追加
`sizes.width`と`sizes.height`を送信するので`Vector2`を使用する

```js
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uSize: new THREE.Uniform(size),
    uResolution: new THREE.Uniform(
      new THREE.Vector2(sizes.width, sizes.height)
    ),
  },
});
```

スコープの関係でコールバック関数の `resize`メソッドからマテリアルにアクセスできません。
なので `sizes`オブフェクトに `resolution`プロパティを追加して
値を`new THREE.Vector2(sizes.width, sizes.height)`に設定します

```js
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

sizes.resolution = new THREE.Vector2(sizes.width, sizes.height);
```

`new THREE.Vector2(sizes.width, sizes.height)`の代わりに`resolution`を使用してユニフォームに送信します。

```js
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uSize: new THREE.Uniform(size),
    uResolution: new THREE.Uniform(sizes.resolution),
  },
});
```

こうすることで、コールバック関数の `resize`メソッドにアクセスできる様になったので、値を更新することが出来ます。

```js
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  sizes.resolution.set(sizes.width, sizes.height);

  // ...
});
```

次に頂点シェーダーで`uResolution`ユニフォームを取得し
`gl_PointSize` に `uResolution.y` 乗算することで修正することができる

```glsl
// vertex.glsl に記述

uniform float uSize;
uniform vec2 uResolution;

void main() {

  // ...

  gl_PointSize = uSize * uResolution.y;
  gl_PointSize *= 1.0 / -viewPosition.z;
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/44ef584eb1bbfc13e91d93bc3d44940b.png)](https://gyazo.com/44ef584eb1bbfc13e91d93bc3d44940b)

ピクセルサイズが大きすぎたので `50 => 0.5`に修正します

```js
createFirework(100, new THREE.Vector3(), 0.5);
```

**出力結果**

<a href="https://gyazo.com/22e5c92866d1eaa9d4ddf0f672a87102"><img src="https://i.gyazo.com/22e5c92866d1eaa9d4ddf0f672a87102.gif" alt="Image from Gyazo" width="989"/></a>

これでレンダリングの高さに合わせてパーティクルサイズが変わるようになりました。
次は、ピクセル比を処理していきます。

### ピクセル比を適切に処理する

`sizes`オブジェクトに`pixelRatio`プロパティを追加し
値は`pixelRatio`と同様の数式`Math.min(window.devicePixelRatio, 2)`を使用します

```js
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};
```

次に、コールバック関数 `resize` メソッド内で更新します

```js
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);
  sizes.resolution.set(sizes.width, sizes.height);

  // ...
});
```

次に、レンダラーに先程の値を送信します

```js
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(sizes.pixelRatio);
```

最後に`sizes.resolution`の`sizes.widht`と`sizes.height`に`sizes.pixelRatio`を乗算しま
す

```js
sizes.resolution = new THREE.Vector2(
  sizes.width * sizes.pixelRatio,
  sizes.height * sizes.pixelRatio
);

window.addEventListener('resize', () => {
  // ...

  sizes.resolution.set(
    sizes.width * sizes.pixelRatio,
    sizes.height * sizes.pixelRatio,
  )
```

#### ここまでのコードの全体像

<details>
<summary>. jsファイル(クリックして展開)</summary>

```js
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import fragmentShader from "./shaders/firework/fragment.glsl";
import vertexShader from "./shaders/firework/vertex.glsl";

// セットアップ
const gui = new GUI({ width: 340 });
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

// ウィンドウサイズ
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

sizes.resolution = new THREE.Vector2(
  sizes.width * sizes.pixelRatio,
  sizes.height * sizes.pixelRatio
);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);
  sizes.resolution.set(
    sizes.width * sizes.pixelRatio,
    sizes.height * sizes.pixelRatio
  );

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(sizes.pixelRatio);
});

// カメラ
const camera = new THREE.PerspectiveCamera(
  25,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.set(1.5, 0, 6);
scene.add(camera);

// オービットコントロール
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(sizes.pixelRatio);

const createFirework = (count, position, size) => {
  const vertices = 3;
  const positionsArray = new Float32Array(count * vertices);

  for (let i = 0; i < count; i++) {
    const positionIndex = i * 3;

    positionsArray[positionIndex] = Math.random() - 0.5;
    positionsArray[positionIndex + 1] = Math.random() - 0.5;
    positionsArray[positionIndex + 2] = Math.random() - 0.5;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positionsArray, vertices)
  );

  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uSize: new THREE.Uniform(size),
      uResolution: new THREE.Uniform(sizes.resolution),
    },
  });

  const firework = new THREE.Points(geometry, material);
  firework.position.copy(position);
  scene.add(firework);
};

createFirework(100, new THREE.Vector3(), 0.5);

// アニメーション
const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
```

</details>

<details>
<summary>. glslファイル(クリックして展開)</summary>

```glsl
// vertex.glsl

uniform float uSize;
uniform vec2 uResolution;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  gl_PointSize = uSize * uResolution.y;
  gl_PointSize *= 1.0 / -viewPosition.z;
}
```

```glsl
// fragment.glsl

void main() {
  gl_FragColor = vec4(1.0, 0.3, 0.0, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
```

</details>

### テクスチャの適用

サイズの調整が完了したのでテクスチャを適用していきます
まずはテクスチャをロードします

```js
// 任意のパスを使用してください

const textures = [
  textureLoader.load('./particles/1.png'),
  textureLoader.load('./particles/2.png'),
  textureLoader.load('./particles/3.png'),
  textureLoader.load('./particles/4.png'),
  textureLoader.load('./particles/5.png'),
  textureLoader.load('./particles/6.png'),
  textureLoader.load('./particles/7.png'),
  textureLoader.load('./particles/8.png'),
]
```

`createFirework 関数`に `texture` パラメータを追加します

```js
const createFirework = (count, position, size, texture) => {
  // ...
}

createFirework(100, new THREE.Vector3(), 0.5, textures[7])
```

マテリアルの `uniforms` プロパティに `uTexture` を追加

```js
  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uSize: new THREE.Uniform(size),
      uResolution: new THREE.Uniform(sizes.resolution),
      uTexture: new THREE.Uniform(texture),
    },
  })
```

フラグメントシェーダーで `uTexture`を取得し`gl_PointCoord`を使用する
今回はグレースケールの画像を使用しているのでRGBA すべてのチャンネルは必要ないので
r チャンネルのみを取得して`textureAlpha`に保存します。

マテリアルの`transparent`を有効化を忘れないでください

```js
const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uSize: new THREE.Uniform(size),
      uResolution: new THREE.Uniform(sizes.resolution),
      uTexture: new THREE.Uniform(texture),
    },
    transparent: true,
  })
```

```glsl
uniform sampler2D uTexture;

void main() {
  float textureAlpha = texture(uTexture, gl_PointCoord).r;
  gl_FragColor = vec4(vec3(1.0), textureAlpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/547e087bbe958928c91cd85668671c02.png)](https://gyazo.com/547e087bbe958928c91cd85668671c02)

以下の記述を追加して最終調整を行います

- `texture.flipY = false` => 画像の上下反転
- `depthWrite: false` => 深度バッファの無効化
- `blending: THREE.AdditiveBlending` => ブレンディングモードの設定

```js
  texture.flipY = false
  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uSize: new THREE.Uniform(size),
      uResolution: new THREE.Uniform(sizes.resolution),
      uTexture: new THREE.Uniform(texture),
    },
    transparent: true,
    depthWrite: false, // より自然な透明度の表現
    blending: THREE.AdditiveBlending,  // 光の加算効果
  })
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/fd21e8ad6a591035921cd0fc277493e9.png)](https://gyazo.com/fd21e8ad6a591035921cd0fc277493e9)


