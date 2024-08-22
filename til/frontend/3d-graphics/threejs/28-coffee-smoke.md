---
title: 28-coffee-smoke
date: 2024/08/13
updated: 2024/08/22
---

# コーヒーの煙の制作

- [下準備](#下準備)
    - [出力結果](#出力結果)
  - [ベースメッシュの作成](#ベースメッシュの作成)
    - [出力結果](#出力結果-1)
  - [GLSL ファイルの準備](#glsl-ファイルの準備)
  - [ShaderMaterial の作成](#shadermaterial-の作成)
  - [ここまでのコードの全体像](#ここまでのコードの全体像)
  - [出力結果](#出力結果-2)
- [Perlin テクスチャ](#perlin-テクスチャ)
  - [Perlin テクスチャのメリット](#perlin-テクスチャのメリット)
  - [テクスチャの選択における注意点](#テクスチャの選択における注意点)
- [Perlin テクスチャの適用](#perlin-テクスチャの適用)
  - [テクスチャのロード](#テクスチャのロード)
  - [テクスチャをユニフォームでフラグメントシェーダーに送信](#テクスチャをユニフォームでフラグメントシェーダーに送信)
  - [テクスチャの適用](#テクスチャの適用)
    - [出力結果](#出力結果-3)
- [煙が上るようなアニメーションを適用](#煙が上るようなアニメーションを適用)
  - [テクスチャを引き伸ばしてリアルな煙を表現](#テクスチャを引き伸ばしてリアルな煙を表現)
    - [出力結果](#出力結果-4)
  - [アニメーションの適用](#アニメーションの適用)
    - [出力結果](#出力結果-5)
  - [smoothstep 関数で値を再マッピングする](#smoothstep-関数で値を再マッピングする)
    - [出力結果](#出力結果-6)
  - [断片が見えないように端を調整](#断片が見えないように端を調整)
    - [出力結果](#出力結果-7)
  - [ここまでのコードの全体像](#ここまでのコードの全体像-1)
- [頂点にアニメーションを適用する](#頂点にアニメーションを適用する)
  - [2D 上の回転を計算する関数で頂点を回転](#2d-上の回転を計算する関数で頂点を回転)
    - [出力結果](#出力結果-8)
  - [ランダムパターンとアニメーション](#ランダムパターンとアニメーション)
    - [出力結果](#出力結果-9)
  - [風をシミュレートする](#風をシミュレートする)
    - [出力結果](#出力結果-10)
- [シェーダーチャンクの分離](#シェーダーチャンクの分離)
  - [最終的なコードの全体像](#最終的なコードの全体像)

> [!NOTE]
>
> この記事は
> Three.js v0.166 を使用しています。

## 下準備

以下のコードから始めます。

<details>
<summary>. jsファイル(クリックして展開)</summary>

```js
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// セットアップ
const gui = new GUI();
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

// ローダー
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

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
camera.position.x = 8;
camera.position.y = 10;
camera.position.z = 12;
scene.add(camera);

// オービットコントロール
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3;
controls.enableDamping = true;

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// モデル
gltfLoader.load("./bakedModel.glb", (gltf) => {
  gltf.scene.getObjectByName("baked").material.map.anisotropy = 8;
  scene.add(gltf.scene);
});

// アニメーション
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
```

</details>

#### 出力結果

[![Image from Gyazo](https://i.gyazo.com/9423b58bd20300ea7bd069cf19b606e9.png)](https://gyazo.com/9423b58bd20300ea7bd069cf19b606e9)

### ベースメッシュの作成

煙となるメッシュを作成します

ジオメトリ: `PlaneGeometry`
マテリアル: `MeshBasicMaterial` (後で ShaderMaterial に変更)

を使用します

```js
const smokeConfig = {
  geometry: {
    width: 1,
    height: 1,
    widthSegments: 16,
    heightSegments: 64,
    translate: { x: 0, y: 0.5, z: 0 },
    scale: { x: 1.5, y: 6, z: 1.5 },
  },
  material: {
    color: "orange",
  },
};

const { width, height, widthSegments, heightSegments, translate, scale } =
  smokeConfig.geometry;

const smokeGeometry = new THREE.PlaneGeometry(
  width,
  height,
  widthSegments,
  heightSegments
);

smokeGeometry.translate(translate.x, translate.y, translate.z);
smokeGeometry.scale(scale.x, scale.y, scale.z);

const { color } = smokeConfig.material;
const smokeMaterial = new THREE.MeshBasicMaterial({
  color: color,
  wireframe: true,
});

const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial);
scene.add(smoke);
```

> [!NOTE]
>
> **📝 Memo**
>
> メッシュではなくジオメトリに変換を適用しているのは後の頂点の計算がより便利にするため。
>
> 今回は最初からいい感じの値を設定しているが、実際のプロジェクトでは画面に何かを表示してからそのパラメータを調整する。

#### 出力結果

[![Image from Gyazo](https://i.gyazo.com/f079ba08b87c265934a0535f368f22f1.png)](https://gyazo.com/f079ba08b87c265934a0535f368f22f1)

### GLSL ファイルの準備

`src/shaders/coffeeSmoke/`に以下のファイルを作成します

- vertex.glsl
- fragment.glsl

```glsl
// vertex.glsl に記述

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;
}
```

```glsl
// fragment.glsl に記述

void main() {
  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
}
```

### ShaderMaterial の作成

`MeshBasicMaterial`を`ShaderMaterial`に書き換え、以下のプロパティを設定

- vertexShader
- fragmentShader
- side: THREE.DoubleSide

```js
import fragmentShader from "./shaders/coffeeSmoke/fragment.glsl";
import vertexShader from "./shaders/coffeeSmoke/vertex.glsl";

const smokeMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: THREE.DoubleSide,
});
```

> [!IMPORTANT]
> vite はプラグインを使用することで glsl ファイルをインポートすることが出来ます。[詳細は前回に記述](https://github.com/daiki-beppu/til/blob/main/Three.js/23-shaders.md#%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E3%82%A4%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%88)

### ここまでのコードの全体像

<details>
<summary>. jsファイル(クリックして展開)</summary>

```js
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import fragmentShader from "./shaders/coffeeSmoke/fragment.glsl";
import vertexShader from "./shaders/coffeeSmoke/vertex.glsl";

// セットアップ
const gui = new GUI();
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

// ローダー
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

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
camera.position.x = 8;
camera.position.y = 10;
camera.position.z = 12;
scene.add(camera);

// オービットコントロール
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3;
controls.enableDamping = true;

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// モデル
gltfLoader.load("./bakedModel.glb", (gltf) => {
  gltf.scene.getObjectByName("baked").material.map.anisotropy = 8;
  scene.add(gltf.scene);
});

// 煙
const smokeConfig = {
  geometry: {
    width: 1,
    height: 1,
    widthSegments: 16,
    heightSegments: 64,
    translate: { x: 0, y: 0.5, z: 0 },
    scale: { x: 1.5, y: 6, z: 1.5 },
  },
  mesh: {
    position: { x: 0, y: 1.83, z: 0 },
  },
};

const { width, height, widthSegments, heightSegments, translate, scale } =
  smokeConfig.geometry;

const smokeGeometry = new THREE.PlaneGeometry(
  width,
  height,
  widthSegments,
  heightSegments
);

smokeGeometry.translate(translate.x, translate.y, translate.z);
smokeGeometry.scale(scale.x, scale.y, scale.z);

const smokeMaterial = new THREE.ShaderMaterial({
  wireframe: true,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});

const { position } = smokeConfig.mesh;
const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial);

smoke.position.set(position.x, position.y, position.z);

scene.add(smoke);

// アニメーション
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

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
void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;
}

```

```glsl
void main() {
  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
}

```

</details>

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/92cb4116277c668a2165599c5d3419de.png)](https://gyazo.com/92cb4116277c668a2165599c5d3419de)

## Perlin テクスチャ

これまで、使用してきた Perlin ノイズはパフォーマンスが悪いので今回は使用しません。

代わりに以下のテクスチャを使用します

[![Image from Gyazo](https://i.gyazo.com/0fa6f9c195ca390f8c8003ba0a759716.png)](https://gyazo.com/0fa6f9c195ca390f8c8003ba0a759716)

これは Perlin テクスチャといいます。
Perlin ノイズの代わりに使用することでパフォーマンスが改善されます。

### Perlin テクスチャのメリット

- 計算コストが低い: 事前に生成されたテクスチャを使用するため、リアルタイムでの計算が不要
- メモリ効率が良い: 1 つのテクスチャから複数のノイズパターンを生成可能
- GPU フレンドリー: テクスチャサンプリングは GPU に最適化されている

### テクスチャの選択における注意点

Perlin テクスチャを選択する際は以下のことに注意する必要がある。

- 十分なバリエーション: パターンが繰り返されすぎないようにする
- 適度な大きさ: 十分な精度を得られるサイズを選択。ただし高解像度は不要(ピクセルが補完されるため)
- シームレスな繰り返し: 画像を並べて配置しても境界線が見えない繰り返しパターンを使用

1 つの画像から複数のノイズを取得するには RGBA の 4 つの異なるチャンネルにそれぞれノイズを保存する方法が良いです。
ただ今回は、学習と簡素化のために、単純なグレースケールの画像を使用します。

> [!NOTE]
>
> Perlin テクスチャは [Perlin Noise Maker](http://kitfox.com/projects/perlinNoiseMaker/) という web サイトで作成できる
>
> 他にも
>
> - [Noise Texture Pack](https://opengameart.org/content/noise-texture-pack)
> - [Effct Texture Maker](https://mebiusbox.github.io/contents/EffectTextureMaker/)
>
> などがある。
>
> Figma を使う人は [Noise & Texture](https://www.figma.com/community/plugin/1138854718618193875/noise-texture)というプラグインもある

## Perlin テクスチャの適用

### テクスチャのロード

```js
const textureLoader = new THREE.TextureLoader();
const perlinTexture = textureLoader.load("./perlin.png"); // パスは任意のものを指定
```

### テクスチャをユニフォームでフラグメントシェーダーに送信

```js
const smokeMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uPerlinTexture: new THREE.Uniform(perlinTexture),
  },
  side: THREE.DoubleSide,
  wireframe: false,
});
```

> [!NOTE]
>
> 📝 **Memo**
>
> これまでユニフォームは value プロパティを待つオブジェクトで送信していたが
> Three.js には Uniform クラスがあるため今回のような記述ができる
> 今後はこちらの記述で勧めていきます。

### テクスチャの適用

`varying` を使用して `uv` を頂点シェーダーからフラグメントシェーダーに送信

```glsl
// vertex.glsl に記述

varying vec2 vUv;

void main() {

  // ...

  vUv = uv;
}
```

```glsl
// fragment.glsl に記述

uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main() {
 float smoke = texture(uPerlinTexture, vUv).r;
  gl_FragColor = vec4(1.0, 1.0, 1.0, smoke);

  // Three.js の トーンマッピングを適用する
  #include <tonemapping_fragment>

  // Three.js の カラースペースを適用する
  #include <colorspace_fragment>
}

```

> [!NOTE]
>
> 📝 **Memo**
>
> 前述した RGBA チャンネルですがこちらの Perlin テクスチャはグレースケールなので必要なチャンネルは 1 つで R のチャンネルを使用できるため
> `float smoke = texture(uPerlinTexture, vUv).r;`とすることができる
> 変更点: `vec4` => `float`, 末尾に`.r`を追加
>
> マテリアルの `transparent` の有効化を忘れずに！

#### 出力結果

[![Image from Gyazo](https://i.gyazo.com/4c42042d01caf392a18e32003347a9d6.png)](https://gyazo.com/4c42042d01caf392a18e32003347a9d6)

## 煙が上るようなアニメーションを適用

### テクスチャを引き伸ばしてリアルな煙を表現

テクスチャを引き伸ばすために UV 座標を変更する必要があります。

```glsl
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main() {
  // 新しい UV 座標を作成して、テクスチャの伸縮を調整
  vec2 smokeUv = vUv;

  // UV 座標の X 値を半分にすることで X 軸方向にテクスチャを 2 倍に引き伸ばす
  smokeUv.x *= 0.5;

  // UV 座標の Y 値に 0.3 を乗算することで Y 軸方向にテクスチャを約 3.33 倍に引き伸ばす
  smokeUv.y *= 0.3;

  float smoke = texture(
    uPerlinTexture, smokeUv).r;

  gl_FragColor = vec4(vec3(1.0), smoke);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}

```

> [!NOTE]
>
> 📝 **Memo**
>
> `varying` で受信した変数を直接変更することが出来ないので、新しい変数を作成する必要があります。

#### 出力結果

[![Image from Gyazo](https://i.gyazo.com/e7bbdb59da25aa09ae56e71ab28ca1bc.png)](https://gyazo.com/e7bbdb59da25aa09ae56e71ab28ca1bc)

### アニメーションの適用

マテリアルに`uTime`ユニフォームを追加して `Uniform` クラスのインスタンスを `0` に割り当て、アニメーションの速度を調節するユニフォーム`uAnimationSpeed`も同様に追加する

```js
const smokeMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uAnimationSpeed: new THREE.Uniform(0.03),
    uPerlinTexture: new THREE.Uniform(perlinTexture),
  },
  side: THREE.DoubleSide,
  transparent: true,
  wireframe: false,
});
```

`tick`関数内でマテリアルを更新する

```js
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  smokeMaterial.uniforms.uTime.value = elapsedTime;

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
```

フラグメントシェーダーに以下の記述をする

```glsl
// fragment.glsl に記述
uniform float uTime;
uniform float uAnimationSpeed;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main() {
  vec2 smokeUv = vUv;
  smokeUv.x *= 0.5;
  smokeUv.y *= 0.3;

   // アニメーションの適用、 減算することで上昇する
  smokeUv.y -= uTime * uAnimationSpeed;

  float smoke = texture(uPerlinTexture, smokeUv).r;

  gl_FragColor = vec4(vec3(1.0), smoke);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
```

少し時間が立つと長い線しか見えなくなるので
テクスチャを繰り返すことで修正する。

```js
const perlinTexture = textureLoader.load("./perlin.png");
perlinTexture.wrapS = THREE.RepeatWrapping;
perlinTexture.wrapT = THREE.RepeatWrapping;
```

#### 出力結果

すこしわかりにくいですがアニメーションが適用できています。

<a href="https://gyazo.com/f006594749d359efd2e7690b42b5b779"><img src="https://i.gyazo.com/f006594749d359efd2e7690b42b5b779.gif" alt="Image from Gyazo" width="1000"/></a>

### smoothstep 関数で値を再マッピングする

よりリアルな煙を表現するために値を再マッピングします。

現在の Perlin テクスチャは `0 (黒) から 1 (白)`で表現されています。
これだとテクスチャ内に大きな透明領域がありません。

これを修正するために `smoothstep 関数`を使用して
`0.4 から 1` の間になるように値を再マッピングします。

> [!NOTE]
>
> 📝 **Memo**
>
> `step 関数` と `Smoothstep 関数`の違いは
> `step 関数` は 指定の値で瞬時に変化するのに対して
> `smoothstep 関数は` 指定の範囲内で滑らかに変化します。
> [![Image from Gyazo](https://i.gyazo.com/a9604ddc00b9b56dfed5d8ab26023fde.png)](https://gyazo.com/a9604ddc00b9b56dfed5d8ab26023fde)

```glsl
// fragment.glsl に記述

uniform float uTime;
uniform float uAnimationSpeed;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main() {
  vec2 smokeUv = vUv;
  smokeUv.x *= 0.5;
  smokeUv.y *= 0.3;
  smokeUv.y -= uTime * uAnimationSpeed;

  float smoke = texture(uPerlinTexture, smokeUv).r;

  smoke = smoothstep(
    0.4,  // 下限値 0.0 から 1.0 の間で指定
    1.0,  // 上限値 0.0 から 1.0 の間で指定
    smoke // 変更する値を指定
  );

  gl_FragColor = vec4(vec3(1.0), smoke);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
```

#### 出力結果

<a href="https://gyazo.com/6d1db9e1b5af1f908769323ea471b31d"><img src="https://i.gyazo.com/6d1db9e1b5af1f908769323ea471b31d.gif" alt="Image from Gyazo" width="1000"/></a>

### 断片が見えないように端を調整

かなりリアルに近づいたのですがよく見ると
ジオメトリの断片が見えてしまい不自然です。

これを修正するために`smoothstep 関数`で断片を再マッピングします。

```glsl
uniform float uTime;
uniform float uAnimationSpeed;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main() {
  vec2 smokeUv = vUv;
  smokeUv.x *= 0.5;
  smokeUv.y *= 0.3;
  smokeUv.y -= uTime * uAnimationSpeed;

  float smoke = texture(uPerlinTexture, smokeUv).r;

  smoke = smoothstep(0.4, 1.0, smoke);

  smoke = 1.0; // 変化がわかりやすくするため、調整後削除
  smoke *= smoothstep(0.0, 0.1, vUv.x); // 左の端
  smoke *= smoothstep(1.0, 0.9, vUv.x); // 右の端
  smoke *= smoothstep(0.0, 0.1, vUv.y); // 上の端
  smoke *= smoothstep(1.0, 0.4, vUv.y); // 下の端

  gl_FragColor = vec4(vec3(1.0), smoke);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
```

#### 出力結果

<a href="https://gyazo.com/66df6e46d6264ee58b40753c2903bc5a"><img src="https://i.gyazo.com/66df6e46d6264ee58b40753c2903bc5a.gif" alt="Image from Gyazo" width="1000"/></a>

### ここまでのコードの全体像

<details>
<summary>. jsファイル(クリックして展開)</summary>

```js
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import fragmentShader from "./shaders/coffeeSmoke/fragment.glsl";
import vertexShader from "./shaders/coffeeSmoke/vertex.glsl";

// セットアップ
const gui = new GUI();
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

// ローダー
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

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
camera.position.x = 8;
camera.position.y = 10;
camera.position.z = 12;
scene.add(camera);

// オービットコントロール
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3;
controls.enableDamping = true;

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// モデル
gltfLoader.load("./bakedModel.glb", (gltf) => {
  gltf.scene.getObjectByName("baked").material.map.anisotropy = 8;
  scene.add(gltf.scene);
});

// 煙
const smokeConfig = {
  geometry: {
    width: 1,
    height: 1,
    widthSegments: 16,
    heightSegments: 64,
    translate: { x: 0, y: 0.5, z: 0 },
    scale: { x: 1.5, y: 6, z: 1.5 },
  },
  mesh: {
    position: { x: 0, y: 1.83, z: 0 },
  },
};

const { width, height, widthSegments, heightSegments, translate, scale } =
  smokeConfig.geometry;

const smokeGeometry = new THREE.PlaneGeometry(
  width,
  height,
  widthSegments,
  heightSegments
);

smokeGeometry.translate(translate.x, translate.y, translate.z);
smokeGeometry.scale(scale.x, scale.y, scale.z);

const perlinTexture = textureLoader.load("./perlin.png");
perlinTexture.wrapS = THREE.RepeatWrapping;
perlinTexture.wrapT = THREE.RepeatWrapping;

const smokeMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uAnimationSpeed: new THREE.Uniform(0.03),
    uPerlinTexture: new THREE.Uniform(perlinTexture),
  },
  side: THREE.DoubleSide,
  transparent: true,
  wireframe: false,
});

const { position } = smokeConfig.mesh;
const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial);

smoke.position.set(position.x, position.y, position.z);

scene.add(smoke);

// アニメーション
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  smokeMaterial.uniforms.uTime.value = elapsedTime;

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

varying vec2 vUv;

void main() {
  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  vUv = uv;
}
```

```glsl
// fragment.glsl
uniform float uTime;
uniform float uAnimationSpeed;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main() {
  vec2 smokeUv = vUv;
  smokeUv.x *= 0.5;
  smokeUv.y *= 0.3;
  smokeUv.y -= uTime * uAnimationSpeed;

  float smoke = texture(uPerlinTexture, smokeUv).r;

  smoke = smoothstep(0.4, 1.0, smoke);

  smoke *= smoothstep(0.0, 0.1, vUv.x);
  smoke *= smoothstep(1.0, 0.9, vUv.x);
  smoke *= smoothstep(0.0, 0.1, vUv.y);
  smoke *= smoothstep(1.0, 0.4, vUv.y);

  gl_FragColor = vec4(vec3(1.0), smoke);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
```

</details>

## 頂点にアニメーションを適用する

まず、煙のままだと変化がわかりにくいので
`gl_fragColor`を`赤 vec4(1.0, 0.0, 0.0, 1.0)`に設定する(色はわかりやすければ何色でもいい)

```glsl

// ....

void main() {

  // ...

  gl_FragColor = vec4(vec3(1.0), smoke);
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // 調整後削除するため上書きするだけで OK

  // ...

}
```

`wireFrame` を有効化する

```js
const smokeMaterial = new THREE.ShaderMaterial({
  // ...
  wireframe: true,
});
```

### 2D 上の回転を計算する関数で頂点を回転

まずは 2D 上の回転を計算する関数を追加します。
この関数は web で検索したり AI に質問すれば簡単に生成できる典型的な関数です。

```glsl
vec2 rotate2D(vec2 value, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  mat2 m = mat2(c, s, -s, c);
  return m * value;
}
```

試しに Claude 3.5 Sonnet に質問してみました

[![Image from Gyazo](https://i.gyazo.com/5d2805104d4302949a92fc9b4e6bd817.png)](https://gyazo.com/5d2805104d4302949a92fc9b4e6bd817)

若干変数名などは異なりますが同じように出力してくれました！

UV 座標のときと同様に `position 属性`を直接変更することは出来ないので
新しい変数を用意し`position 属性`を割り当てます

```glsl
// vertex.glsl に記述

varying vec2 vUv;

vec2 rotate2D(vec2 value, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  mat2 m = mat2(c, s, -s, c);
  return m * value;
}

void main() {
  vec3 newPosition = position;

  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  vUv = uv;
}
```

先ほど作成した`rotate2D 関数`を使用して頂点を回転させます。

```glsl
// vertex.glsl に記述

// ...

vec2 rotate2D(vec2 value, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  mat2 m = mat2(c, s, -s, c);
  return m * value;
}

void main() {
  vec3 newPosition = position;

  // ツイスト
  float angle = 2.0;
  newPosition.xz = rotate2D(newPosition.xz, angle);

  // ...
}
```

**回転前**
[![Image from Gyazo](https://i.gyazo.com/44089f8581a1d2a5ac08b56eacdd60fa.png)](https://gyazo.com/44089f8581a1d2a5ac08b56eacdd60fa)

**回転後**

[![Image from Gyazo](https://i.gyazo.com/5198051342d08d5efe581e78b810881b.png)](https://gyazo.com/5198051342d08d5efe581e78b810881b)

このままだとすべての頂点が同じように回転してしまっています。
高度に応じて回転量を変更するように修正します

```glsl
// vertex.glsl に記述

// ...

vec2 rotate2D(vec2 value, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  mat2 m = mat2(c, s, -s, c);
  return m * value;
}

void main() {
  vec3 newPosition = position;

  // ツイスト
   float angle = newPosition.y;
  newPosition.xz = rotate2D(newPosition.xz, angle);

  // ...
}
```

#### 出力結果

[![Image from Gyazo](https://i.gyazo.com/9ff2a308b4fc6ef8c2a798122e4088b9.png)](https://gyazo.com/9ff2a308b4fc6ef8c2a798122e4088b9)

これでも十分に素敵なものになりましたが、
規則的すぎるのとアニメーションが適用されていません。

次はこれらを修正していきます。

### ランダムパターンとアニメーション

ランダムパターンは
Perlin テクスチャを使用することでランダム値を取得する事ができます。
フラグメントシェーダーのときと同様に`uPerlinTexture`を使用します。

アニメーションも同様に`uTime`と`uAnimationSpeed`で適用します。

```glsl
// vertex.glsl に記述

uniform float uTime;
uniform float uAnimationSpeed;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

vec2 rotate2D(vec2 value, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  mat2 m = mat2(c, s, -s, c);
  return m * value;
}

void main() {
  vec3 newPosition = position;

  // ツイスト
  float twistPerlin = texture(
    uPerlinTexture, vec2(
      0.5, // テクスチャ座標の中心を取得
      uv.y * 0.2 - uTime * uAnimationSpeed
      )).r;

  float angle = twistPerlin * 10.0; // 10.0 は強度を上げている

  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  vUv = uv;
}
```

#### 出力結果

<a href="https://gyazo.com/67a055b7cd1a838d68c13f24f657bdb4"><img src="https://i.gyazo.com/67a055b7cd1a838d68c13f24f657bdb4.gif" alt="Image from Gyazo" width="1000"/></a>

### 風をシミュレートする

風のシミュレートもツイストと同様の方法で計算します。

まずは値をオフセットするための変数を用意します。

```glsl
// vertex.glsl

// ...

void main() {

  // ...

  // 風
  vec2 windOffset = vec2(
    0.0, // X 軸方向
    0.0 // Z 軸方向
    );
  newPosition.xz += windOffset;

  // ...
}
```

ツイストと同様の方法で Perlin テクスチャの色を取得します

```glsl
// vertex.glsl

// ...

void main() {

  // ...

  // 風
  vec2 windOffset = vec2(
    texture(uPerlinTexture, vec2(
      0.25, // ツイストとは違うパターン使用
      uTime // アニメーションの適用
    )).r,
    0.0
    );

  windOffset *= 10.0; // 強度を上げる
  newPosition.xz += windOffset;

  // ...
}
```

**出力結果**

<a href="https://gyazo.com/f5086ab4fd020b589d02be5d714618ed"><img src="https://i.gyazo.com/f5086ab4fd020b589d02be5d714618ed.gif" alt="Image from Gyazo" width="1000"/></a>

このままだとカップから煙が出ていません。
これを修正します。

```glsl
// vertex.glsl

// ...

void main() {

  // ...

  // 風
  vec2 windOffset = vec2(
    texture(uPerlinTexture, vec2(
      0.25, // ツイストとは違うパターン使用
      uTime // アニメーションの適用
    )).r,
    0.0
    );

  windOffset *= uv.y * 10.0;
  newPosition.xz += windOffset;

  // ...
}
```

**出力結果**

<a href="https://gyazo.com/a470763757ea6d977797ae14ab85a1a4"><img src="https://i.gyazo.com/a470763757ea6d977797ae14ab85a1a4.gif" alt="Image from Gyazo" width="1000"/></a>

> [!NOTE]
>
> 📝 **Memo**
>
> `uv.y * 10.0` とすることで 0 から 1 の値になる
> これによりカップに固定する事ができる

かなり良くなりましたがまだ、あまり現実的ではありません。
最初はゆっくりと増加し、上部に行くほど急速に増加するようにしたいです

これは `pow 関数`で実現することが出来ます

```glsl
// vertex.glsl

// ...

void main() {

  // ...

  // 風
  vec2 windOffset = vec2(
    texture(uPerlinTexture, vec2(
      0.25, // ツイストとは違うパターン使用
      uTime // アニメーションの適用
    )).r,
    0.0
    );

  windOffset *= pow(uv.y, 2.0) * 10.0;
  newPosition.xz += windOffset;

  // ...
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/b1efa04af7dbf1063822905909c4e711.gif)](https://gyazo.com/b1efa04af7dbf1063822905909c4e711)

Perlin テクスチャの値は 0 から 1 の間で取得するため
このままだと風は正の方向にしか動きません、
X 軸方向の値に `0.5` を減算することで修正します。

> [!NOTE]
>
> 📝 **Memo**
>
> 0.5 減算することで値が `-0.5 から 0.5` なり正と負の両方向の値を取得できる

```glsl
// vertex.glsl

// ...

void main() {

  // ...

  // 風
  vec2 windOffset = vec2(
    texture(uPerlinTexture, vec2(
      0.25, // ツイストとは違うパターン使用
      uTime // アニメーションの適用
    )).r -0.5,
    0.0
    );

  windOffset *= pow(uv.y, 2.0) * 10.0;
  newPosition.xz += windOffset;

  // ...
}
```

違うパターンを Z 軸方向にも適用しアニメーションのスピードを調節

```glsl
// vertex.glsl

// ...

void main() {

  // ...

  // 風
  vec2 windOffset = vec2(
    texture(uPerlinTexture, vec2(0.25, uTime * uAnimationSpeed)).r - 0.5,
    texture(uPerlinTexture, vec2(0.75, uTime * uAnimationSpeed)).r - 0.5
    );

  windOffset *= pow(uv.y, 2.0) * 10.0;
  newPosition.xz += windOffset;

  // ...
}
```

**出力結果**

<a href="https://gyazo.com/9250880e7cb7f700170f93800d535cfb"><img src="https://i.gyazo.com/9250880e7cb7f700170f93800d535cfb.gif" alt="Image from Gyazo" width="1000"/></a>

マテリアルをもとに戻して depthWrite を 無効にして深度バッファに描画しないようにする

```js
const smokeMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uAnimationSpeed: new THREE.Uniform(0.03),
    uPerlinTexture: new THREE.Uniform(perlinTexture),
  },
  side: THREE.DoubleSide,
  transparent: true,
  depthWrite: false, // 深度バッファの描画を無効化
  wireframe: false,
});
```

#### 出力結果

<a href="https://gyazo.com/fb9e5544bce4ce4b8398090c099196e5"><img src="https://i.gyazo.com/fb9e5544bce4ce4b8398090c099196e5.gif" alt="Image from Gyazo" width="1000"/></a>

## シェーダーチャンクの分離

`#include` を使用してファイルの分割を行います
今回は`rotate2D 関数`を分割してみます

`/src/shaders/` に `includes`フォルダを作成し`rotate2D.glsl`ファイルを作成
`rotate2D 関数`の記述を`rotate2D.glsl`ファイルに移動する

```glsl
// rotate2D.glsl に記述

vec2 rotate2D(vec2 value, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  mat2 m = mat2(c, s, -s, c);
  return m * value;
}
```

`#include ファイルパス`でチャンクを読み込み

```glsl
// vertex.glsl

uniform float uTime;
uniform float uAnimationSpeed;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

#include ../includes/rotate2D.glsl

void main() {
  // ...
}
```

### 最終的なコードの全体像

<details>
<summary>. jsファイル(クリックして展開)</summary>

```js
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import fragmentShader from "./shaders/coffeeSmoke/fragment.glsl";
import vertexShader from "./shaders/coffeeSmoke/vertex.glsl";

// セットアップ
const gui = new GUI();
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

// ローダー
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

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
camera.position.x = 8;
camera.position.y = 10;
camera.position.z = 12;
scene.add(camera);

// オービットコントロール
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3;
controls.enableDamping = true;

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// モデル
gltfLoader.load("./bakedModel.glb", (gltf) => {
  gltf.scene.getObjectByName("baked").material.map.anisotropy = 8;
  scene.add(gltf.scene);
});

// 煙
const smokeConfig = {
  geometry: {
    width: 1,
    height: 1,
    widthSegments: 16,
    heightSegments: 64,
    translate: { x: 0, y: 0.5, z: 0 },
    scale: { x: 1.5, y: 6, z: 1.5 },
  },
  mesh: {
    position: { x: 0, y: 1.83, z: 0 },
  },
};

const { width, height, widthSegments, heightSegments, translate, scale } =
  smokeConfig.geometry;

const smokeGeometry = new THREE.PlaneGeometry(
  width,
  height,
  widthSegments,
  heightSegments
);

smokeGeometry.translate(translate.x, translate.y, translate.z);
smokeGeometry.scale(scale.x, scale.y, scale.z);

const perlinTexture = textureLoader.load("./perlin.png");
perlinTexture.wrapS = THREE.RepeatWrapping;
perlinTexture.wrapT = THREE.RepeatWrapping;

const smokeMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uAnimationSpeed: new THREE.Uniform(0.03),
    uPerlinTexture: new THREE.Uniform(perlinTexture),
  },
  side: THREE.DoubleSide,
  transparent: true,
  depthWrite: false,
  wireframe: false,
});

const { position } = smokeConfig.mesh;
const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial);

smoke.position.set(position.x, position.y, position.z);

scene.add(smoke);

// アニメーション
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  smokeMaterial.uniforms.uTime.value = elapsedTime;

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
uniform float uTime;
uniform float uAnimationSpeed;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

#include ../includes/rotate2D.glsl

void main() {
  vec3 newPosition = position;

  // ツイスト
  float twistPerlin = texture(uPerlinTexture, vec2(0.5, uv.y * 0.2 - uTime * uAnimationSpeed)).r;
  float angle = twistPerlin * 10.0;
  newPosition.xz = rotate2D(newPosition.xz, angle);

  // 風
  vec2 windOffset = vec2(
    texture(uPerlinTexture, vec2(0.25, uTime * uAnimationSpeed)).r - 0.5,
    texture(uPerlinTexture, vec2(0.75, uTime * uAnimationSpeed)).r - 0.5);

  windOffset *= pow(uv.y, 2.0) * 10.0;

  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  vUv = uv;
}
```

```glsl
// fragment.glsl
uniform float uTime;
uniform float uAnimationSpeed;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main() {
  vec2 smokeUv = vUv;
  smokeUv.x *= 0.5;
  smokeUv.y *= 0.3;
  smokeUv.y -= uTime * uAnimationSpeed;

  float smoke = texture(uPerlinTexture, smokeUv).r;

  smoke = smoothstep(0.4, 1.0, smoke);

  smoke *= smoothstep(0.0, 0.1, vUv.x);
  smoke *= smoothstep(1.0, 0.9, vUv.x);
  smoke *= smoothstep(0.0, 0.1, vUv.y);
  smoke *= smoothstep(1.0, 0.4, vUv.y);

  gl_FragColor = vec4(vec3(1.0), smoke);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}

```

```glsl
// rotate2D.glsl
vec2 rotate2D(vec2 value, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  mat2 m = mat2(c, s, -s, c);
  return m * value;
}
```

</details>
