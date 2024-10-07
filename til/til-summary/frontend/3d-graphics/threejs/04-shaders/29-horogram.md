---
title: 29-horogram
date: 2024/08/22
updated: 2024/09/01
---

# ホログラムの制作

- [下準備](#下準備)
- [ストライプパターンの実装](#ストライプパターンの実装)
  - [ストライプパターンの作成](#ストライプパターンの作成)
  - [出力結果](#出力結果)
  - [ストライプパターンにアニメーションを適用](#ストライプパターンにアニメーションを適用)
  - [出力結果](#出力結果-1)
- [フレネル効果の実装](#フレネル効果の実装)
  - [フレネル効果の概要](#フレネル効果の概要)
    - [3D グラフィックにおけるフレネル効果の重要性](#3d-グラフィックにおけるフレネル効果の重要性)
  - [フレネル効果の計算](#フレネル効果の計算)
    - [視線方向の計算](#視線方向の計算)
    - [ドット積の計算](#ドット積の計算)
  - [フレネル効果の問題点と修正](#フレネル効果の問題点と修正)
    - [問題の修正: フレネル効果の計算値がオブジェクトの回転によって変化してしまう](#問題の修正-フレネル効果の計算値がオブジェクトの回転によって変化してしまう)
    - [問題の修正: 表面に規則的な模様が見える](#問題の修正-表面に規則的な模様が見える)
- [ホログラム効果の完成](#ホログラム効果の完成)
  - [ストライプパターンとフレネル効果の組み合わせ](#ストライプパターンとフレネル効果の組み合わせ)
  - [背面の表示と修正](#背面の表示と修正)
  - [深度バッファの調整](#深度バッファの調整)
  - [ブレンディングモードの設定](#ブレンディングモードの設定)
  - [フォールオフ(減衰効果)](#フォールオフ減衰効果)
  - [ここまでのコードの全体像](#ここまでのコードの全体像)
- [色の変更](#色の変更)
  - [デバッグ UI の追加](#デバッグ-ui-の追加)
- [グリッチ効果の実装](#グリッチ効果の実装)
  - [ランダム関数の作成](#ランダム関数の作成)
  - [すべての頂点にグリッチ効果を適用](#すべての頂点にグリッチ効果を適用)
  - [アニメーションの修正](#アニメーションの修正)
  - [下から上へと波のように変化させる](#下から上へと波のように変化させる)
  - [グリッチ効果の頻度を調整](#グリッチ効果の頻度を調整)
  - [異なる周波数を利用してランダム性を追加](#異なる周波数を利用してランダム性を追加)
- [シェーダーチャンクの分離](#シェーダーチャンクの分離)
  - [最終的なコードの全体像](#最終的なコードの全体像)

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

## ストライプパターンの実装

### ストライプパターンの作成

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
>
> UV 座標は 2D 平面上の相対的な位置を表す。 3D オブジェクトの表面に対してのみ適用される。
> 今回はオブジェクト全体に対して適用させたいので 3D 空間における絶対位置である `modelPosition`を使用する
> これにより物体の形状や向きに関係なくシームレスなパターンを作成できる
>
> **スウィズリング**
>
> `vPosition` は `vec3` だが `modelPosition` は `vec4` なので
> `modelPosition.xyz` のようにどの値を取得するか指定する必要がある
> これをスウィズリングと呼ぶ
> また`modelPosition.zxy`のように順序を変更したり、`modelPositon.xxyのように`同じ値を繰り返し指定することもできる

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/89e5e8949ac8c1b557154d475b09ff58.png)](https://gyazo.com/89e5e8949ac8c1b557154d475b09ff58)

### ストライプパターンにアニメーションを適用

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

## フレネル効果の実装

### フレネル効果の概要

フレネル効果 (Fresnel effect) は、光の反射と屈折が視線の角度によって変化する現象のこと

フレネル効果の特徴

- 表面に対して垂直に近い角度から見ると物体は比較的透明に見える
- 表面に対して浅い角度から見ると物体はより反射して見える

例: 水の表面
真上(水面に対して垂直に近い角度)から見ると水中が見えるが、浅い角度(水面に対して水平に近い角度)から見ると水に反射して見える

#### 3D グラフィックにおけるフレネル効果の重要性

- リアルな表現 : 物体をより自然に見せる
- 奥行きを強調 : オブジェクトの形状や位置関係をより強調する
- マテリアル表現の豊かさ : 金属やプラスチック、ガラスなど多彩な材質を表現できる

Three.js の場合 **PBR** を使用している
`MeshStandardMaterial`や`MeshPhysicalMaterial`にはフレネル効果を使用して表現されている

### フレネル効果の計算

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
  vNormal = normal;
}
```

```glsl
// fragment.glsl に記述

uniform float uTime;
uniform float uAnimationSpeed;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {

  // ...

  gl_FragColor = vec4(vec3(1.0), stripes);
  gl_FragColor = vec4(vec3(vNormal), 1.0); // 法線を取得できているかテスト

  // Three.js オプション
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}

```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/9df39a3b2b450dbf66290a2b900accce.png)](https://gyazo.com/9df39a3b2b450dbf66290a2b900accce)

#### 視線方向の計算

フレネル効果の計算には**視線方向**と**ドット積**を使用します
まずは視線方向を計算します

`viewDirection(視線方向)`は
`vPosition(フラグメントの 3D 上の位置)` から `cameraPosition(カメラの位置)`を減算して求めます

```glsl
// fragment.glsl に記述

// ...

varying vec3 vPosition;
varying vec3 vNormal;

void main() {

  // ...

  vec3 viewDirection = vPosition - cameraPosition;

  // ...
}
```

#### ドット積の計算

ドット積は
`dot 関数` という特殊な関数で 2 つのベクトルの内積を求めますが
この関数はベクトルの長さが同じじゃないといけません

`vNoraml(法線)`のベクトルの長さは `1` なので

`viewDirection(視線方向)` のベクトルの長さを `1` にするために `noramize 関数`を使用して値を正規化します。

> [!NOTE]
>
> 📝 **Memo**
>
> なぜ法線ベクトルの長さは 1 なのか？
>
> glsl で法線ベクトルは主に計算の簡略化のために単位ベクトル(長さが 1 のベクトル)として定義されているため

```glsl
// fragment.glsl に記述

// ...

varying vec3 vPosition;
varying vec3 vNormal;

void main() {

  // ...

  vec3 viewDirection = normalize(vPosition - cameraPosition); // 値を 1 に正規化

  // ...
```

これで `dot 関数`が使用できます。

```glsl
// fragment.glsl に記述

// ...

varying vec3 vPosition;
varying vec3 vNormal;

void main() {

  // ...

  vec3 viewDirection = normalize(vPosition - cameraPosition);
  float fresnel = dot(viewDirection, vNormal);

  // ...
```

**出力結果**

めちゃくちゃわかりにくですがうっすら輪郭が見えます

[![Image from Gyazo](https://i.gyazo.com/b2193e5f928b36fe98bc63f3cdda8899.png)](https://gyazo.com/b2193e5f928b36fe98bc63f3cdda8899)

### フレネル効果の問題点と修正

このままだと 2 つの問題があります

1. フレネル効果の計算値がオブジェクトの回転によって変化してしまう
2. 表面に規則的な模様が見える

これらを修正してきます

#### 問題の修正: フレネル効果の計算値がオブジェクトの回転によって変化してしまう

フレネル効果の計算値がオブジェクトの回転で変化しないように修正します。

まずは法線の向きを修正します。
法線の向きを修正するには頂点シェーダーでモデルの法線を計算します

```glsl
// vertex.glsl に記述

varying vec3 vPosition;
varying vec3 vNormal;

void main() {

  // ...

    // モデルの法線
  vec4 modelNormal = modelMatrix * vec4(normal, 0.0); // 0.0 にすることでモデルが変換(移動、回転、スケール)してもそれらが適用されない

  // varying
  vPosition = modelPosition.xyz;
  vNormal = modelNormal.xyz;
}
```

> [!NOTE]
>
> 📝 **Memo**
>
> なぜ normal のときは vec4 の第 4 引数 が 0.0 ？
>
> `1.0` に設定する場合、ベクトルは同次であることを示す
> これにより変換(移動、回転、拡大縮小)も同様に適用される
>
> `0.0` に設定する場合、ベクトルは同次では無いことを示す
> なので変換は適用されない。
> 法線には適用させたくないので `0.0` に 設定する

```glsl
// faragment.glsl に記述
// ...

varying vec3 vPosition;
varying vec3 vNormal;

void main() {

  vec3 viewDirection = normalize(vPosition - cameraPosition);
  float fresnel = dot(viewDirection, vNormal) + 1.0;
  // + 1.0 は 値を 0 から 1 の範囲にするため、これをしないとなにも表示されなくなる

  fresnel = pow(fresnel, 2.0);
  // ストライプの時と同様、よりシャープにするため

  gl_FragColor = vec4(vec3(1.0), fresnel);

  // ...
}
```

出力結果

[![Image from Gyazo](https://i.gyazo.com/f7f3b9af20f081d19a5df0824cc0cddd.png)](https://gyazo.com/f7f3b9af20f081d19a5df0824cc0cddd)

#### 問題の修正: 表面に規則的な模様が見える

[![Image from Gyazo](https://i.gyazo.com/c3a961e393a2d50137f5255d10b57b6f.png)](https://gyazo.com/c3a961e393a2d50137f5255d10b57b6f)

画像ではうまく表示されませんが、よく見ると
規則的な模様が見えます。

これは 頂点間では変化した値が補間されるためベクトルの長さが常に `1` ではなくなっているためです。

これはフラグメントシェーダーで再度正規化することで修正出来ます

```glsl
// farment.glsl に記述

uniform float uTime;
uniform float uAnimationSpeed;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {

  vec3 normal = normalize(vNormal); // 法線の正規化

  // ...

  vec3 viewDirection = normalize(vPosition - cameraPosition);
  float fresnel = dot(viewDirection, normal) + 1.0;

  fresnel = pow(fresnel, 2.0);

  gl_FragColor = vec4(vec3(1.0), fresnel);

  // ...
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/eb44afa5a95328dd313b5d150a862cb8.png)](https://gyazo.com/eb44afa5a95328dd313b5d150a862cb8)

## ホログラム効果の完成

### ストライプパターンとフレネル効果の組み合わせ

```glsl
// farment.glsl に記述

// ...

void main() {
    // 法線
  vec3 normal = normalize(vNormal);

  // ストライプ
  float stripes = mod((vPosition.y - uTime * uAnimationSpeed) * 20.0, 1.0);
  stripes = pow(stripes, 3.0);

  // フレネル効果
  vec3 viewDirection = normalize(vPosition - cameraPosition);
  float fresnel = dot(viewDirection, normal) + 1.0;
  fresnel = pow(fresnel, 2.0);

  // ホログラフィック
  float holographic = stripes * fresnel;
  holographic += fresnel * 1.10; // 暗くて見えにくいので強度を調整

  gl_FragColor = vec4(vec3(1.0), holographic);

  // Three.js オプション
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/7e3e4ea8e0b2eb0e08a563896ca3a2c7.png)](https://gyazo.com/7e3e4ea8e0b2eb0e08a563896ca3a2c7)

### 背面の表示と修正

背面を表示するためにマテリアルの`side`プロパティに`side: THREE.DoubleSide`を追加します。

```js
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uAnimationSpeed: new THREE.Uniform(0.03),
  },
  transparent: true,
  side: THREE.DoubleSide, // オブジェクトの両側を表示する
});
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/59f324876ec85318dc325d4e48ef089c.png)](https://gyazo.com/59f324876ec85318dc325d4e48ef089c)

このままだと、背面が強調されて表示されます。
フレネル効果を適用したとき範囲を調整するために `+ 1.0` を加算しました
背面も表示する場合は、これが悪さをしてしまいます。

こちらを修正するにはまず、背面を取得する必要があります。
GLSL には 描画しているフラグメントがカメラに向いているかを示す
`gl_FrontFacing`という名前の変数があります。

この変数を利用してカメラに向いていないとき値に `-1.0` を乗算して、反転させます

> [!NOTE]
>
> 📝 **Memo**
>
> `gl_ForantFacing`はブール値 (true, false)

```glsl
// fragment.glsl に記述
// ...

void main() {

  // 法線
  vec3 normal = normalize(vNormal);

  if(!gl_FrontFacing) {
    normal *= -1.0;
  }

  // ...
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/95fca759ce3784f824db6b01c81c02d0.png)](https://gyazo.com/95fca759ce3784f824db6b01c81c02d0)

### 深度バッファの調整

良くなりましたが深度バッファが有効化されているため、前面が背面を隠してしまっています。

これを修正するにはマテリアルの`depthWrite`プロパティを`false`に設定します

```js
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uAnimationSpeed: new THREE.Uniform(0.03),
  },
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: false, // 深度バッファを無効化
});
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/16ba40fd6d69fe48255cdc8c48172aa7.png)](https://gyazo.com/16ba40fd6d69fe48255cdc8c48172aa7)

### ブレンディングモードの設定

さらに、ホログラムは光で構成されていることを鑑みて
マテリアルの`blending`プロパティを`THREE.AdditiveBlending`に設定することで
よりより見た目にすることが出来ます。

> [!NOTE]
>
> 📝 **Memo**
>
> `THREE.AdditiveBlending` は 新しく描画されるピクセルの色値を既存のピクセルの色値に加算する。これにより重なり合う部分が明るくなり、光が重なり開くような効果を得られる

```js
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uAnimationSpeed: new THREE.Uniform(0.03),
  },
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/94acba668e41b6a24bc94a0023f3094e.png)](https://gyazo.com/94acba668e41b6a24bc94a0023f3094e)

### フォールオフ(減衰効果)

エッジのアルファ値をフェードアウトします。
フレネル効果にスムーズステップを適用し値を再マッピングすることでフォールオフ(減衰効果)を実現します。

```glsl
// faragment.glsl に記述

// ...

void main() {

  // ...

  // フォールオフ
  float falloff = smoothstep(0.8, 0.0, fresnel);

  // ホログラフィック
  float holographic = stripes * fresnel;
  holographic += fresnel * 1.10;
  holographic *= falloff;

  gl_FragColor = vec4(vec3(1.0), holographic);

  // ...
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/d50cd24b5aa92d635739d03778cb0da3.png)](https://gyazo.com/d50cd24b5aa92d635739d03778cb0da3)

### ここまでのコードの全体像

<details>
<summary>. jsファイル(クリックして展開)</summary>

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
  uniforms: {
    uTime: new THREE.Uniform(0),
    uAnimationSpeed: new THREE.Uniform(0.03),
  },
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
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
  material.uniforms.uTime.value = elapsedTime;

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

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

    // モデルの法線
  vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

  // varying
  vPosition = modelPosition.xyz;
  vNormal = modelNormal.xyz;
}
```

```glsl
// fragent.glsl
uniform float uTime;
uniform float uAnimationSpeed;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {

  // 法線
  vec3 normal = normalize(vNormal);
  if(!gl_FrontFacing) {
    normal *= -1.0;
  }
  // ストライプ
  float stripes = mod((vPosition.y - uTime * uAnimationSpeed) * 20.0, 1.0);
  stripes = pow(stripes, 3.0);

  // フレネル効果
  vec3 viewDirection = normalize(vPosition - cameraPosition);
  float fresnel = dot(viewDirection, normal) + 1.0;
  fresnel = pow(fresnel, 2.0);

  // フォールオフ
  float falloff = smoothstep(0.8, 0.0, fresnel);

  // ホログラフィック
  float holographic = stripes * fresnel;
  holographic += fresnel * 1.10;
  holographic *= falloff;

  gl_FragColor = vec4(vec3(1.0), holographic);

  // Three.js オプション
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}

```

</details>

## 色の変更

デバッグ UI で色の変更を行います

色を変更するためにユニフォームをフラグメントシェーダーに送信します
マテリアルの`uniforms`プロパティに`uColor`ユニフォームを追加し
`new THREE.Uniform(new THREE.Color(('red'))`で追加します

```js
// マテリアル
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uAnimationSpeed: new THREE.Uniform(0.03),
    uColor: new THREE.Uniform(new THREE.Color("red")),
  },
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});
```

```glsl
// fargment.glsl に記述

// ...

uniform vec3  uColor; // 色は vec3 で扱う

// ...

void main() {

// ...

  gl_FragColor = vec4(vec3(uColor), holographic);

  // ...
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/e22e46c343a3788ae82e9843a1f3a411.png)](https://gyazo.com/e22e46c343a3788ae82e9843a1f3a411)

### デバッグ UI の追加

ダミーのオブジェクトを作成します

```js
const debugUIConfig = {
  color: "#70c1ff",
};
```

lilgui で デバッグ UI を追加します
今回は色の変更なので`gui.addColor`を使用します

`onChange`で変更を検知してデバッグ UI での色を再設定します

```js
gui.addColor(debugUIConfig, "color").onChange(() => {
  material.uniforms.uColor.value.set(debugUIConfig.color);
});
```

`uColor`もダミーオブジェクトの値に設定します

```js
// マテリアル
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uAnimationSpeed: new THREE.Uniform(0.03),
    uColor: new THREE.Uniform(new THREE.Color(debugUIConfig.color)),
  },
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});
```

**出力結果**

<a href="https://gyazo.com/dd1fdee7b854ae0a34336ead9d3552da"><img src="https://i.gyazo.com/dd1fdee7b854ae0a34336ead9d3552da.gif" alt="Image from Gyazo" width="1000"/></a>

## グリッチ効果の実装

### ランダム関数の作成

まずは、x 軸と z 軸の頂点がランダムで移動するようにします
ですが GLSL にはランダム関数が組み込まれていません

[Book of Shaders の記事](https://thebookofshaders.com/10/)を参考に次のように変更しました。

```glsl

float random2D(vec2 value) {
  return fract(sin(dot(value.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// vec2 を受け取って float の 0,0 から 1,0 までのランダム値を返す

```

### すべての頂点にグリッチ効果を適用

`random2D関数`を使用して `modelPosition` を変更します。

```glsl
varying vec3 vPosition;
varying vec3 vNormal;

float random2D(vec2 value) {
  return fract(sin(dot(value.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // グリッチ効果
  modelPosition.x += random2D(modelPosition.xz);
  modelPosition.z += random2D(modelPosition.zx);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

    // モデルの法線
  vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

  // varying
  vPosition = modelPosition.xyz;
  vNormal = modelNormal.xyz;
}
```

**出力結果**

<a href="https://gyazo.com/dd3f415e30060f285ba4adc44da7c7cf"><img src="https://i.gyazo.com/dd3f415e30060f285ba4adc44da7c7cf.gif" alt="Image from Gyazo" width="1000"/></a>

> [!NOTE]
>
> 📝 **Memo**
>
> なぜ x 軸には `modelPosition.xz` で z 軸には `modelPosition.zx`なの？
>
> これは、x 軸と z 軸で異なるランダム値を生成するため。
>
> - `modelPosition.xz` は (x, z) 座標を表す
> - `modelPosition.zx` は (z, x) 座標を表す
>
> GLSL のスウィズリングを応用し同じ入力値から異なる値を出力できる
> x 軸と z 軸が同じ値にならないので、より自然なランダムな移動になる

### アニメーションの修正

tick 関数のアニメーションをコメントアウトしモデルの動きを止めると
グリッチ効果も停止して見えます

```js
// アニメーション
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  material.uniforms.uTime.value = elapsedTime;

  // if (suzanne) {
  //   suzanne.rotation.x = -elapsedTime * 0.1;
  //   suzanne.rotation.y = elapsedTime * 0.2;
  // }

  // sphere.rotation.x = -elapsedTime * 0.1;
  // sphere.rotation.y = elapsedTime * 0.2;

  // torusKnot.rotation.x = -elapsedTime * 0.1;
  // torusKnot.rotation.y = elapsedTime * 0.2;

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
```

**出力結果**

<a href="https://gyazo.com/970f29a0178cce4f86c134312b7bb171"><img src="https://i.gyazo.com/970f29a0178cce4f86c134312b7bb171.gif" alt="Image from Gyazo" width="1000"/></a>

これを修正するために
`uTime` を使用します

```glsl
// vertex.glsl に記述

uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

float random2D(vec2 value) {
  return fract(sin(dot(value.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // グリッチ効果
  modelPosition.x += random2D(modelPosition.xz + uTime) - 0.5;
  modelPosition.z += random2D(modelPosition.zx + uTime) - 0.5;

  // 値を - 0.5 しているのは 範囲を - 0.5 から 0.5 にして両方向に動くようにするため

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

    // モデルの法線
  vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

  // varying
  vPosition = modelPosition.xyz;
  vNormal = modelNormal.xyz;
}
```

**出力結果**

<a href="https://gyazo.com/0c54d98832cb41bb3bbf13ae1fde8c23"><img src="https://i.gyazo.com/0c54d98832cb41bb3bbf13ae1fde8c23.gif" alt="Image from Gyazo" width="1000"/></a>

### 下から上へと波のように変化させる

グリッチ効果が下から上へと波のように変化するようにします。
これを実現するには

変数 `glitchStrength` 作成し `sin 関数`で `uTime` を -1.0 から 1.0 の値に変換します
`modelPosition`に乗算します。

下から上へと変化させるために
`modelPosition.y` を減算します

```glsl
// vertex.glsl に記述

uniform float uTime;

// ...

void main() {
  // ...

  // グリッチ効果
  float glitchStrength = sin(uTime - modelPosition.y); // 下から上へと変化
  glitchStrength *= 0.25; // 効果を弱める

  modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchStrength;
  modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * glitchStrength;

  // ...

}
```

**出力結果**

<a href="https://gyazo.com/5b55c7ee737eaa0e213e45f56034945b"><img src="https://i.gyazo.com/5b55c7ee737eaa0e213e45f56034945b.gif" alt="Image from Gyazo" width="1000"/></a>

### グリッチ効果の頻度を調整

sin 関数を使用しているので 値は -1 から 1 に変化します。
そのためほとんどの場合アクティブな状態となるため常にグリッチ効果が表示されてしまいます。

この状態を修正するために `smoothstep 関数` で値を再マッピングします。
これによりグリッチ効果の表示頻度を調整します。

```glsl
// vertex.glsl に記述

uniform float uTime;

// ...

void main() {
  // ...

  // グリッチ効果
  float glitchStrength = sin(uTime - modelPosition.y);

   // 値を再マッピングして表示頻度を調整
  glitchStrength = smoothstep(
    0.3, // 値が 1,0 に近いほど表示頻度が少なくなる
    1.0, // 値が 0.0 に近いほどグリッチ効果が急激に変化する
    glitchStrength);

  glitchStrength *= 0.25;

  modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchStrength;
  modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * glitchStrength;

  // ...

}
```

**出力結果**

<a href="https://gyazo.com/ce186234e5c9a8233f18572a0fa62d07"><img src="https://i.gyazo.com/ce186234e5c9a8233f18572a0fa62d07.gif" alt="Image from Gyazo" width="1000"/></a>

### 異なる周波数を利用してランダム性を追加

まずは繰り返し数式を記述しないために 変数 `glotchTime`を作成

周波数の異なる sin 関数を 3 つ用意しそれぞれを加算します
そして sin 関数の数で割り戻します

```glsl
// vertex.glsl に記述

// ...

void main() {

  // ...

  // グリッチ効果
  float glotchTime = uTime - modelPosition.y;
  float glitchStrength = sin(glotchTime) + sin(glotchTime * 2.354) + sin(glotchTime * 9.6436);
  glitchStrength /= 3.0;
  glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
  glitchStrength *= 0.25;

  modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchStrength;
  modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * glitchStrength;

  // ...
}
```

**出力結果**

<a href="https://gyazo.com/9c1a18ad4b83ae624575c618875f76f0"><img src="https://i.gyazo.com/9c1a18ad4b83ae624575c618875f76f0.gif" alt="Image from Gyazo" width="1000"/></a>

## シェーダーチャンクの分離

`random2D 関数`を別ファイルに切り出します
shaders フォルダ内に includes フォルダを作成して
`random2D.glsl`ファイルを作成します

```glsl
// random2D.glsl に記述

float random2D(vec2 value) {
  return fract(sin(dot(value.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
```

`random2D 関数`の代わりに `#include` を使用します

```glsl
// vertex.glsl に記述

// ...

#include ../includes/random2D.glsl

void main() {
  // ...

  modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchStrength;
  modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * glitchStrength;

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

const debugUIConfig = {
  color: "#70c1ff",
};

gui.addColor(debugUIConfig, "color").onChange(() => {
  material.uniforms.uColor.value.set(debugUIConfig.color);
});

// マテリアル
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uAnimationSpeed: new THREE.Uniform(0.03),
    uColor: new THREE.Uniform(new THREE.Color(debugUIConfig.color)),
  },
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
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
  material.uniforms.uTime.value = elapsedTime;

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

uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

#include ../includes/random2D.glsl

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // グリッチ効果
  float glotchTime = uTime - modelPosition.y;
  float glitchStrength = sin(glotchTime) + sin(glotchTime * 2.354) + sin(glotchTime * 9.6436);
  glitchStrength /= 3.0;
  glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
  glitchStrength *= 0.25;

  modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchStrength;
  modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * glitchStrength;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

    // モデルの法線
  vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

  // varying
  vPosition = modelPosition.xyz;
  vNormal = modelNormal.xyz;
}
```

```glsl
// fragment.glsl

uniform float uTime;
uniform float uAnimationSpeed;
uniform vec3 uColor;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {

  // 法線
  vec3 normal = normalize(vNormal);
  if(!gl_FrontFacing) {
    normal *= -1.0;
  }
  // ストライプ
  float stripes = mod((vPosition.y - uTime * uAnimationSpeed) * 20.0, 1.0);
  stripes = pow(stripes, 3.0);

  // フレネル効果
  vec3 viewDirection = normalize(vPosition - cameraPosition);
  float fresnel = dot(viewDirection, normal) + 1.0;
  fresnel = pow(fresnel, 2.0);

  // フォールオフ
  float falloff = smoothstep(0.8, 0.0, fresnel);

  // ホログラフィック
  float holographic = stripes * fresnel;
  holographic += fresnel * 1.10;
  holographic *= falloff;

  gl_FragColor = vec4(vec3(uColor), holographic);

  // Three.js オプション
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
```

```glsl
// random2D.glsl

float random2D(vec2 value) {
  return fract(sin(dot(value.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
```

</details>
