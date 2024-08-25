---
title: 29-horogram
date: 2024/08/22
updated: 2024/08/25
---

# ホログラムの制作

- [下準備](#下準備)
- [ストライプパターンを作成](#ストライプパターンを作成)
  - [出力結果](#出力結果)
- [ストライプパターンにアニメーションを適用](#ストライプパターンにアニメーションを適用)
  - [出力結果](#出力結果-1)
- [フレネル効果について](#フレネル効果について)
  - [3D グラフィックにおけるフレネル効果の重要性](#3d-グラフィックにおけるフレネル効果の重要性)
- [フレネル効果の実装](#フレネル効果の実装)

> [!NOTE]
>
> こちらの内容は
> Three.js v0.166.1 を使用しています。

## 下準備

以下のファイルから始めます。

<details>
<summary>package.json(クリックして展開)</summary>

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
    "lil-gui": "^0.19.2",
    "three": "^0.166.1"
  }
}
```

</details>

<details>
<summary>.jsファイル(クリックして展開)</summary>

```js
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import fragmentShader from "./shaders/holographic/fragment.glsl";
import vertexShader from "./shaders/holographic/vertex.glsl";

// セットアップ
const gui = new GUI();
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const gltfLoader = new GLTFLoader();
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
camera.position.set(7, 7, 7);
scene.add(camera);

// オービットコントロール
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// レンダラー
const rendererParameters = {};
rendererParameters.clearColor = "#1d1f2a";

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setClearColor(rendererParameters.clearColor);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

gui.addColor(rendererParameters, "clearColor").onChange(() => {
  renderer.setClearColor(rendererParameters.clearColor);
});

// マテリアル
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});

// オブジェクト
// Torus knot
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.6, 0.25, 128, 32),
  material
);
torusKnot.position.x = 3;
scene.add(torusKnot);

// Sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(), material);
sphere.position.x = -3;
scene.add(sphere);

// Suzanne
let suzanne = null;
gltfLoader.load("./suzanne.glb", (gltf) => {
  suzanne = gltf.scene;
  suzanne.traverse((child) => {
    if (child.isMesh) child.material = material;
  });
  scene.add(suzanne);
});

// アニメーション
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  if (suzanne) {
    suzanne.rotation.x = -elapsedTime * 0.1;
    suzanne.rotation.y = elapsedTime * 0.2;
  }

  sphere.rotation.x = -elapsedTime * 0.1;
  sphere.rotation.y = elapsedTime * 0.2;

  torusKnot.rotation.x = -elapsedTime * 0.1;
  torusKnot.rotation.y = elapsedTime * 0.2;

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

## ストライプパターンを作成

[シェーダーパターンで学習した内容](https://github.com/daiki-beppu/til/blob/main/til/frontend/3d-graphics/threejs/24-shader-patterns.md#%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3-7)とよく似ているが
今回は **UV 座標**ではなく`modelPosition`を割り当てる

```glsl
// vertex.glsl に記述
varying vec3 vPosition;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  // varying でフラグメントシェーダーに送信
  vPosition = modelPosition.xyz;
}
```

```glsl
// fragment.glsl に記述
varying vec3 vPosition;

void main() {
  // y軸方向のストライプパターンを生成
  float stripes = mod((
    vPosition.y * 20.0, // * 20.0 でストライプの数を調整
    1.0 // 値が 1.0 になったとき 0 に戻る
    );

  // ストライプのエッジを鋭くする
  stripes = pow(stripes, 3.0); // pow()でべき乗計算を行い非線形値に変換してコントラストを強調
  // 3.0 の値を変更することでエッジの鋭さを調整

  // ストライプパターンをアルファ値として使用
  gl_FragColor = vec4(vec3(1.0), stripes);

  // Three.js オプション
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}

```

アルファ値を変更しているので .js ファイルのマテリアルに
`transparent: true`の追加を忘れずに！

> [!NOTE]
>
> 📝 **Memo**
>
> **なぜ UV 座標ではなく `modelPosition`？**
> UV 座標は 2D 平面上の相対的な位置を表す。 3D オブジェクトの表面に対してのみ適用される。
> 今回はオブジェクト全体に対して適用させたいので 3D 空間における絶対位置である `modelPosition`を使用する
> これにより物体の形状や向きに関係なくシームレスなパターンを作成できる
>
> **スウィズリング** > `vPosition` は `vec3` だが `modelPosition` は `vec4` なので
> `modelPosition.xyz` のようにどの値を取得するか指定する必要がある
> これをスウィズリングと呼ぶ
> また`modelPosition.zxy`のように順序を変更したり、`modelPositon.xxyのように`同じ値を繰り返し指定することもできる

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/89e5e8949ac8c1b557154d475b09ff58.png)](https://gyazo.com/89e5e8949ac8c1b557154d475b09ff58)

## ストライプパターンにアニメーションを適用

マテリアルに`uniforms` プロパティを追加して
`uTime`, `uAnimationSpeed`を`new THREE.Uniform(value)`で追加

`uTimeは経過時間`を、`uAnimationSpeedはアニメーションの速度`を制御します。

```js
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uAnimationSpeed: new THREE.Uniform(0.03),
  },
  transparent: true,
});
```

tick 関数内で `uTime.value`を `elapsedTime` で更新

```js
// アニメーション
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  material.uniforms.uTime.value = elapsedTime;

  // ...
};

tick();
```

フラグメントシェーダーで `uTime`, `uAnimationSpeed`を取得
`vPositoin.y` から 減算することでホログラムのようなアニメーション(パターンが下から上に動く)を適用

```glsl
uniform float uTime;
uniform float uAnimationSpeed;

varying vec3 vPosition;

void main() {
  // ストライプ
  float stripes = mod(
    (vPosition.y - uTime * uAnimationSpeed) // アニメーションの適用
    * 20.0, 1.0
    );
  stripes = pow(stripes, 3.0);
  gl_FragColor = vec4(vec3(1.0), stripes);

  // Three.js オプション
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
```

### 出力結果

[<a href="https://gyazo.com/299e3fb55025ecf84b138c9509849ad4"><video width="1000" autoplay muted loop playsinline controls><source src="https://i.gyazo.com/299e3fb55025ecf84b138c9509849ad4.mp4" type="video/mp4"/></video></a>](https://i.gyazo.com/299e3fb55025ecf84b138c9509849ad4.gif)

## フレネル効果について

フレネル効果 (Fresnel effect) は、光の反射と屈折が視線の角度によって変化する現象のこと

フレネル効果の特徴

- 表面に対して垂直に近い角度から見ると物体は比較的透明に見える
- 表面に対して浅い角度から見ると物体はより反射して見える

例: 水の表面
真上(水面に対して垂直に近い角度)から見ると水中が見えるが、浅い角度(水面に対して水平に近い角度)から見ると水に反射して見える

### 3D グラフィックにおけるフレネル効果の重要性

- リアルな表現 : 物体をより自然に見せる
- 奥行きを強調 : オブジェクトの形状や位置関係をより強調する
- マテリアル表現の豊かさ : 金属やプラスチック、ガラスなど多彩な材質を表現できる

Three.js の場合 **PBR** を使用している
`MeshStandardMaterial`や`MeshPhysicalMaterial`にはフレネル効果を使用して表現されている

## フレネル効果の実装

フレネル効果の計算を行うために頂点シェーダーで **Normal(法線)** を`variyng` でフラグメントシェーダーに送信します

```glsl
// vertex.glsl に記述

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  // varying
  vPosition = modelPosition.xyz;
  vNormal = vNormal;
}
```
