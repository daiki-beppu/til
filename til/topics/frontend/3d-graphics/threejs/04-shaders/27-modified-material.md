---
title: 27-modified-material
date: 2024/08/05
updated: 2024/08/13
---

# シェーダーでの組み込みマテリアルの操作

- [1. 下準備](#1-下準備)
- [2. マテリアルのシェーダーを変更](#2-マテリアルのシェーダーを変更)
  - [2.1. onBeforeCompile プロパティ](#21-onbeforecompile-プロパティ)
  - [2.2. 頂点シェーダーにコードを追加する](#22-頂点シェーダーにコードを追加する)
  - [2.3. 出力結果](#23-出力結果)
- [3. マテリアルのシェーダーを変更してモデルをねじる](#3-マテリアルのシェーダーを変更してモデルをねじる)
  - [3.1. 出力結果](#31-出力結果)
- [4. モデルにアニメーションを適用する](#4-モデルにアニメーションを適用する)
  - [4.1. ここまでのコードの全体像](#41-ここまでのコードの全体像)
  - [4.2. 出力結果](#42-出力結果)
- [5. 影の修正](#5-影の修正)
  - [5.1. 出力結果](#51-出力結果)
- [6. 法線の修正](#6-法線の修正)
  - [6.1. コードの全体像](#61-コードの全体像)
  - [6.2. 出力結果](#62-出力結果)

> [!NOTE]
>
> この記事は
> Three.js v0.166 を使用しています。

## 1. 下準備

以下のコードから始めていきます

<details>
<summary>. jsファイル(クリックして展開)</summary>

```js
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// セットアップ
const gui = new GUI();
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

// ローダー
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

// すべてのマテリアルを更新
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      child.material.envMapIntensity = 1;
      child.material.needsUpdate = true;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};

// 環境マップ
const environmentMap = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.jpg",
  "/textures/environmentMaps/0/nx.jpg",
  "/textures/environmentMaps/0/py.jpg",
  "/textures/environmentMaps/0/ny.jpg",
  "/textures/environmentMaps/0/pz.jpg",
  "/textures/environmentMaps/0/nz.jpg",
]);

scene.background = environmentMap;
scene.environment = environmentMap;

// マテリアル

// テクスチャ
const mapTexture = textureLoader.load("/models/LeePerrySmith/color.jpg");
mapTexture.colorSpace = THREE.SRGBColorSpace;
const normalTexture = textureLoader.load("/models/LeePerrySmith/normal.jpg");

// マテリアル
const material = new THREE.MeshStandardMaterial({
  map: mapTexture,
  normalMap: normalTexture,
});

// モデル
gltfLoader.load("/models/LeePerrySmith/LeePerrySmith.glb", (gltf) => {
  const mesh = gltf.scene.children[0];
  mesh.rotation.y = Math.PI * 0.5;
  mesh.material = material;
  scene.add(mesh);

  updateAllMaterials();
});

// ライト
const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(0.25, 2, -2.25);
scene.add(directionalLight);

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
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(4, 1, -4);
scene.add(camera);

// オービットコントロール
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// アニメーション
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  customUniforms.uTime.value = elapsedTime;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
```

</details>

## 2. マテリアルのシェーダーを変更

これまでは独自のシェーダーを`ShaderMaterilal`に適用してきました
今回は組み込みマテリアルのシェーダーを変更していきます。

独自シェーダーを組み込みマテリアルに統合する方法は 2 つあります

- シェーダーがコンパイルされる前にトリガーされる Three.js のフックを使い追加したいパラメータを使用する方法
- 新しいマテリアルを作成して Three.js で使用されているコードをに追加したいパラメータを使用する方法

1 つ目の方法で行っていきます。
理由は新しいマテリアルを作成して Three.js で使用されているコードをに追加したいパラメータを使用する方法は
Three.js のソースコードを正しく設定する方法を理解していなければ多大な時間を費やすことになるからです

### 2.1. onBeforeCompile プロパティ

マテリアルを変更するには、まず元のシェーダーにアクセスする必要がある。
これを行うために `onBeforeCompile`プロパティを使用する。

**コード例**

```js
material.onBeforeCompile = (shader) => {
  console.log(shader.vertexShader);
};
```

**コンソールの出力結果**

```glsl
#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif

```

これで`vertexShader`,`fragmentShader`,`uniforms`などのプロパティにアクセスできる

### 2.2. 頂点シェーダーにコードを追加する

Three.js は異なるマテリアル間で同じコードが繰り返されないように
独自のシステムを利用してシェーダーを部分を組み込んでいます。

**コード例**

```js
material.onBeforeCompile = (shader) => {
  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
    #include <begin_vertex>

    transformed.yz -= 3.0;
    `
  );
};
```

`#include` は Three.js の特定のシェーダーチャンク（コードの断片）を挿入します。これらのチャンクは Three.js のソースコード内で定義されており、再利用可能なシェーダーコードの部分を表します。
これらの部分を `replace` メソッドで置き換えることでシェーダーにコードを追加することができます。

### 2.3. 出力結果

[![Image from Gyazo](https://i.gyazo.com/7993bf66d2cbc89808fe3feb8ff1fc0e.png)](https://gyazo.com/7993bf66d2cbc89808fe3feb8ff1fc0e)

影が不自然ですがこちらは後ほど修正します。

## 3. マテリアルのシェーダーを変更してモデルをねじる

頂点にツイスト効果を付与します。
ツイスト効果を実現する数学的な方法はいくつかありますが、今回は行列を用いてツイスト効果を実現します。

まずは、全ての頂点に同じ角度で回転させます。

**コード例**

```js
material.onBeforeCompile = (shader) => {
  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
    #include <begin_vertex>
    float angle = 0.5;

    transformed.xz = angle;
    `
  );
};
```

続いて 2D 回転行列を作成するために 2 次元行列を返す関数を使用します。

2D 回転行列は、2 次元平面上の点を指定した角度だけ回転させるために使用されます。この行列を使用することで、モデルの各頂点を効率的に回転させ、ツイスト効果を生み出すことができます。

```js
material.onBeforeCompile = (shader) => {
  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
    #include <common>

    mat2 get2DRotateMatrix(float _angle) {
      return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
    }
    `
  );
};
```

このコードは、`get2DRotateMatrix` 関数を定義しています。この関数は与えられた角度に基づいて 2D 回転行列を生成します。シェーダー内の `#include <common>` セクションに追加することで、シェーダー全体でこの関数を使用できるようになります。

```js
material.onBeforeCompile = (shader) => {
  // ...

  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
    #include <begin_vertex>
    float angle = position.y * 0.9;
    mat2 rotateMatrix = get2DRotateMatrix(angle);

    transformed.xz = transformed.xz * rotateMatrix;
    `
  );
};
```

このコードはモデルに先ほどの`get2DRotateMatrix` 関数を使用して 2D 回転行列を適用しています

> [!NOTE]
>
> **📝 Memo チャンクコード**
>
> `#include <common>` はチャンクコードと呼ばれる再利用可能な小さなコードの断片の一部です。
> Three.js はこのチャンクコード組み合わせて完全なシェーダープログラムを構築しています。
>
> **📝 Memo 2D 回転行列の関数について**
>
> 使用している関数はこちらから引用しています
> より詳しく知りたい場合は、[The Book of Shader の Rotations](https://thebookofshaders.com/08/) を確認してください

### 3.1. 出力結果

[![Image from Gyazo](https://i.gyazo.com/5e0b4242993a34b9525642f6423c67e5.png)](https://gyazo.com/5e0b4242993a34b9525642f6423c67e5)

なかなかにすごい見た目ですが成功です。

## 4. モデルにアニメーションを適用する

[前回](https://github.com/daiki-beppu/til/blob/main/Three.js/26-animaded-galaxy.md)までと同様に `uTime` ユニフォームをシェーダーに送ります。

ですが`ShaderMaterial`のようにそのまま`uniform`にアクセスすることは出来ません。
これは、Three.js の構造によるものです。

なので、マテリアルの前にオブジェクトを作成して`uTime`を追加します

```js
const customUniforms = {
  uTime: { value: 0 },
};
```

そしてこのオブジェクトを関数内で使用します。

```js
material.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = customUniforms.uTime;
  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
    #include <common>

    mat2 get2DRotateMatrix(float _angle) {
      return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
    }
    `
  );

  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
    #include <begin_vertex>
    float angle = (position.y + uTime) * 0.9;
    mat2 rotateMatrix = get2DRotateMatrix(angle);

    transformed.xz = transformed.xz * rotateMatrix;
    `
  );
};
```

`customUniforms`がスコープの外で宣言されているため
`elapsedTime`で更新するだけでアニメーションを適用できます。

```js
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  customUniforms.uTime.value = elapsedTime;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
```

### 4.1. ここまでのコードの全体像

<details>
<summary>. jsファイル(クリックして展開)</summary>

```js
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// セットアップ
const gui = new GUI();
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

// ローダー
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

// すべてのマテリアルを更新
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      child.material.envMapIntensity = 1;
      child.material.needsUpdate = true;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};

// 環境マップ
const environmentMap = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.jpg",
  "/textures/environmentMaps/0/nx.jpg",
  "/textures/environmentMaps/0/py.jpg",
  "/textures/environmentMaps/0/ny.jpg",
  "/textures/environmentMaps/0/pz.jpg",
  "/textures/environmentMaps/0/nz.jpg",
]);

scene.background = environmentMap;
scene.environment = environmentMap;

// マテリアル

// テクスチャ
const mapTexture = textureLoader.load("/models/LeePerrySmith/color.jpg");
mapTexture.colorSpace = THREE.SRGBColorSpace;
const normalTexture = textureLoader.load("/models/LeePerrySmith/normal.jpg");

// マテリアル
const material = new THREE.MeshStandardMaterial({
  map: mapTexture,
  normalMap: normalTexture,
});

const customUniforms = {
  uTime: { value: 0 },
};

material.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = customUniforms.uTime;
  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
    #include <common>

    uniform float uTime;

    mat2 get2DRotateMatrix(float _angle) {
      return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
    }
    `
  );

  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
    #include <begin_vertex>
    float angle = (position.y + uTime) * 0.9;
    mat2 rotateMatrix = get2DRotateMatrix(angle);

    transformed.xz = transformed.xz * rotateMatrix;
    `
  );
};

// モデル
gltfLoader.load("/models/LeePerrySmith/LeePerrySmith.glb", (gltf) => {
  const mesh = gltf.scene.children[0];
  mesh.rotation.y = Math.PI * 0.5;
  mesh.material = material;
  scene.add(mesh);

  updateAllMaterials();
});

// ライト
const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(0.25, 2, -2.25);
scene.add(directionalLight);

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
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(4, 1, -4);
scene.add(camera);

// オービットコントロール
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// アニメーション
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  customUniforms.uTime.value = elapsedTime;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
```

</details>

### 4.2. 出力結果

<a href="https://gyazo.com/cf27e4e76c0ca600343c80926935d01f"><img src="https://i.gyazo.com/cf27e4e76c0ca600343c80926935d01f.gif" alt="Image from Gyazo" width="1000"/></a>

## 5. 影の修正

ここでは `castShadow`(投影される影) の修正を行います
まずは、影を表示するための平面を追加します。

```js
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(15, 15, 15),
  new THREE.MeshStandardMaterial()
);

plane.rotation.y = Math.PI;
plane.position.set(0, -5, 5);

scene.add(plane);
```

[![Image from Gyazo](https://i.gyazo.com/fff3c4ae5070c6aee35d6330608afec0.png)](https://gyazo.com/fff3c4ae5070c6aee35d6330608afec0)

ご覧の通り、影は全く変更されていません。
理由は Three.js で影のレンダリングは `depthMaterial` で行われてるためです。

これまでは `MeshStandardMaterial` を変更してきたのでこれまでの変更は反映されません。

この問題を解決するには`depthMaterial`を変更する必要があります。
まずはカスタムマテリアルを作成します

```js
const depthMaterial = new THREE.MeshDepthMaterial({
  depthPacking: THREE.RGBADepthPacking, // 深度情報を RGBA でエンコード
});
```

> [!NOTE]
>
> **📝 Memo**
>
> **depthPacking とは？**
>
> depthPacking は 3D 空間における奥行き(深度)情報を 2D テクスチャに格納する方法
> THREE.RGBADepthPacking の場合 深度情報を r, g, b, a に分割してエンコードする
> これによってより高い精度の深度情報を保持できる

モデルの`customDepthMaterial`プロパティをカスタムマテリアルに変更する
`customDepthMaterial` プロパティは、オブジェクトの深度マップ生成時に使用されるカスタムマテリアルを指定します。これにより、影の計算時にも頂点の変形が反映されるようになります。

```js
gltfLoader.load("/models/LeePerrySmith/LeePerrySmith.glb", (gltf) => {
  const mesh = gltf.scene.children[0];
  mesh.rotation.y = Math.PI * 0.5;
  mesh.material = material;
  mesh.customDepthMaterial = depthMaterial; // こちらを追加
  scene.add(mesh);

  updateAllMaterials();
});
```

`material` と同じ方法で `onBeforeCompile`メソッドを使用して `depthMatarial` にもカスタムシェーダーを適用する

```js
depthMaterial.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = customUniforms.uTime;
  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
    #include <common>

    uniform float uTime;

    mat2 get2DRotateMatrix(float _angle) {
      return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
    }
    `
  );

  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
    #include <begin_vertex>
    float angle = (position.y + uTime) * 0.9;
    mat2 rotateMatrix = get2DRotateMatrix(angle);

    transformed.xz = transformed.xz * rotateMatrix;
    `
  );
};
```

### 5.1. 出力結果

<a href="https://gyazo.com/ecd76d892f175aef1d302637e5802912"><img src="https://i.gyazo.com/ecd76d892f175aef1d302637e5802912.gif" alt="Image from Gyazo" width="1000"/></a>

## 6. 法線の修正

ここでは コアシャドウ(モデル自身の影)を修正します。
コアシャドウの修正を行うには法線を位置と同様に回転させる必要があります。

```js
shader.vertexShader = shader.vertexShader.replace(
  "#include <beginnormal_vertex>",
  `
    #include <beginnormal_vertex>

    float angle = (position.y + uTime) * 0.9;
    mat2 rotateMatrix = get2DRotateMatrix(angle);

    objectNormal.xz = objectNormal.xz * rotateMatrix;
      `
);
```

法線のシェーダーは`beginnormal_vertex`に記述されており
`beginnormal_vertex`の`objectNormal`変数を変更することで修正する

### 6.1. コードの全体像

<details>
<summary>. jsファイル(クリックして展開)</summary>

```js
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// セットアップ
const gui = new GUI();
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

// ローダー
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

// すべてのマテリアルを更新
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      child.material.envMapIntensity = 1;
      child.material.needsUpdate = true;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};

// 環境マップ
const environmentMap = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.jpg",
  "/textures/environmentMaps/0/nx.jpg",
  "/textures/environmentMaps/0/py.jpg",
  "/textures/environmentMaps/0/ny.jpg",
  "/textures/environmentMaps/0/pz.jpg",
  "/textures/environmentMaps/0/nz.jpg",
]);

scene.background = environmentMap;
scene.environment = environmentMap;

// マテリアル

// テクスチャ
const mapTexture = textureLoader.load("/models/LeePerrySmith/color.jpg");
mapTexture.colorSpace = THREE.SRGBColorSpace;
const normalTexture = textureLoader.load("/models/LeePerrySmith/normal.jpg");

// マテリアル
const material = new THREE.MeshStandardMaterial({
  map: mapTexture,
  normalMap: normalTexture,
});

const depthMaterial = new THREE.MeshDepthMaterial({
  depthPacking: THREE.RGBADepthPacking,
});

const customUniforms = {
  uTime: { value: 0 },
};

material.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = customUniforms.uTime;
  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
    #include <common>

    uniform float uTime;

    mat2 get2DRotateMatrix(float _angle) {
      return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
    }
    `
  );

  shader.vertexShader = shader.vertexShader.replace(
    "#include <beginnormal_vertex>",
    `
    #include <beginnormal_vertex>

    float angle = (position.y + uTime) * 0.9;
    mat2 rotateMatrix = get2DRotateMatrix(angle);

    objectNormal.xz = objectNormal.xz * rotateMatrix;
      `
  );

  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
    #include <begin_vertex>

    transformed.xz = transformed.xz * rotateMatrix;
    `
  );
};

depthMaterial.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = customUniforms.uTime;
  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
    #include <common>

    uniform float uTime;

    mat2 get2DRotateMatrix(float _angle) {
      return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
    }
    `
  );

  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
    #include <begin_vertex>
    float angle = (position.y + uTime) * 0.9;
    mat2 rotateMatrix = get2DRotateMatrix(angle);

    transformed.xz = transformed.xz * rotateMatrix;
    `
  );
};

// モデル
gltfLoader.load("/models/LeePerrySmith/LeePerrySmith.glb", (gltf) => {
  const mesh = gltf.scene.children[0];
  mesh.rotation.y = Math.PI * 0.5;
  mesh.material = material;
  mesh.customDepthMaterial = depthMaterial;
  scene.add(mesh);

  updateAllMaterials();
});

// 平面

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(15, 15, 15),
  new THREE.MeshStandardMaterial()
);

plane.rotation.y = Math.PI;
plane.position.set(0, -5, 5);

scene.add(plane);

// ライト
const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(0.25, 2, -2.25);
scene.add(directionalLight);

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
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(4, 1, -4);
scene.add(camera);

// オービットコントロール
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// アニメーション
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  customUniforms.uTime.value = elapsedTime;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
```

</details>

### 6.2. 出力結果

<a href="https://gyazo.com/5cd6e8cbbe48ce1aa0516654620af67d"><img src="https://i.gyazo.com/5cd6e8cbbe48ce1aa0516654620af67d.gif" alt="Image from Gyazo" width="1000"/></a>
