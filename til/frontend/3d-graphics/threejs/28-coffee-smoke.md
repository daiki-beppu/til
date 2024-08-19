---
title: 28-coffee-smoke
date: 2024/08/13
updated: 2024/08/19
---

# コーヒーの煙の制作

- [下準備](#下準備)
  - [ベースメッシュの作成](#ベースメッシュの作成)
  - [GLSL ファイルの準備](#glsl-ファイルの準備)
  - [ShaderMaterial の作成](#shadermaterial-の作成)
  - [ここまでのコードの全体像](#ここまでのコードの全体像)
  - [出力結果](#出力結果)
- [Perlin テクスチャ](#perlin-テクスチャ)
  - [Perlin テクスチャのメリット](#perlin-テクスチャのメリット)
  - [テクスチャの選択における注意点](#テクスチャの選択における注意点)
- [Perlin テクスチャの適用](#perlin-テクスチャの適用)
  - [テクスチャのロード](#テクスチャのロード)
  - [テクスチャをユニフォームでフラグメントシェーダーに送信](#テクスチャをユニフォームでフラグメントシェーダーに送信)
  - [テクスチャの適用](#テクスチャの適用)

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

**出力結果**

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

**出力結果**

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
> Three.js には Unifrom クラスがあるため今回のような記述ができる
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

  #include <tonemapping_fragment> // toneMapping をサポートする
  #include <colorspace_fragment> // colorSpace をサポートする
}

```

> [!NOTE]
>
> 📝 **Memo**
>
> 前述した RGBA チャンネルですがこちらの Perlin テクスチャはグレースケールなので必要なチャンネルは 1 つで R のチャンネルを使用できるため
> `float smoke = texture(uPerlinTexture, vUv).r;`とすることができる
> `vec4` => `float`, 末尾に`.r`を追加

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/4c42042d01caf392a18e32003347a9d6.png)](https://gyazo.com/4c42042d01caf392a18e32003347a9d6)
