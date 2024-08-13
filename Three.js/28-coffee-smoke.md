---
title: 28-coffee-smoke
date: 2024/08/13
updated: 2024/08/13
---

# コーヒーの煙の制作

- [下準備](#下準備)
  - [ベースメッシュの作成](#ベースメッシュの作成)
  - [GLSL ファイルの準備](#glsl-ファイルの準備)
  - [ShaderMaterial の作成](#shadermaterial-の作成)
  - [ここまでのコードの全体像](#ここまでのコードの全体像)
  - [出力結果](#出力結果)

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
マテリアル: `MeshBasicMaterial` (のちほど ShaderMaterial に変更)

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
