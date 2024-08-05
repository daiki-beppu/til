# 組み込みマテリアルの変更

- [1. 下準備](#1-下準備)
- [2. マテリアルのシェーダーを変更](#2-マテリアルのシェーダーを変更)
  - [2.1. onBeforeCompile プロパティ](#21-onbeforecompile-プロパティ)
  - [2.2. 頂点シェーダーにコードを追加する](#22-頂点シェーダーにコードを追加する)

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

独自シェーダーにを組み込みマテリアルに統合する方法は 2 つあります

- シェーダーがコンパイルされる前にトリガーされる Three.js のフックを使い追加したいパラメータを使用する方法
- 新しいマテリアルを作成して Three.js で使用されているコードをに追加したいパラメータを使用する方法

1 つ目の方法で行っていきます。
理由は新しいマテリアルを作成して Three.js で使用されているコードをに追加したいパラメータを使用する方法は
Three.js のソースコードを正しく設定する方法を理解していなければ多大な時間を費やすことになるからです

### 2.1. onBeforeCompile プロパティ

マテリアルを変更するには、まず元のシェーダーにアクセスする必要がある。
これを行うために `onBefoeCompile`プロパティを使用する。

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

`#include`は Three.js の node_modules の特定のフォルダにあるコードを注入します

これらの部分を `replace` メソッドで置き換えることでシェーダーにコードを追加することができます。
