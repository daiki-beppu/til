---
title: 25-raging-sea
date: 2024-07-29
update: 2024-07-30
---

# ｢荒れ狂う海｣の制作

- [1. 下準備](#1-下準備)
  - [1.1. GLSL ファイルの準備](#11-glsl-ファイルの準備)
  - [1.2. ShaderMaterial を作成](#12-shadermaterial-を作成)
  - [1.3. 出力結果](#13-出力結果)
- [2. 波を作る](#2-波を作る)
  - [2.1. ユニフォームの設定](#21-ユニフォームの設定)
  - [2.2. 頂点シェーダーの実装](#22-頂点シェーダーの実装)
  - [2.3. デバッグ UI に追加](#23-デバッグ-ui-に追加)
  - [2.4. ここまでのコードの全体像](#24-ここまでのコードの全体像)
  - [2.5. 出力結果](#25-出力結果)
- [3. 波をアニメーション化する](#3-波をアニメーション化する)
  - [3.1. ユニフォームを作成](#31-ユニフォームを作成)
  - [3.2. tick 関数の値を更新](#32-tick-関数の値を更新)
  - [3.3. 頂点シェーダーの実装](#33-頂点シェーダーの実装)
  - [3.4. デバッグ UI の追加](#34-デバッグ-ui-の追加)
  - [3.5. ここまでのコードの全体像](#35-ここまでのコードの全体像)
  - [3.6. 出力結果](#36-出力結果)
- [4. 色の設定](#4-色の設定)
  - [4.1. デバッグオブジェクトの作成](#41-デバッグオブジェクトの作成)
  - [4.2. ユニフォームの設定](#42-ユニフォームの設定)
  - [4.3. フラグメントシェーダーの実装](#43-フラグメントシェーダーの実装)
  - [4.4. デバッグ UI の追加](#44-デバッグ-ui-の追加)
  - [4.5. ここまでのコードの全体像](#45-ここまでのコードの全体像)
  - [4.6. 出力結果](#46-出力結果)
- [5. 小さな波の作成](#5-小さな波の作成)
  - [5.1. パーリンノイズの適用](#51-パーリンノイズの適用)
  - [5.2. ユニフォームの設定](#52-ユニフォームの設定)
  - [5.3. 頂点シェーダーの実装](#53-頂点シェーダーの実装)
  - [5.4. デバッグ UI の追加](#54-デバッグ-ui-の追加)
  - [5.5. ここまでのコードの全体像](#55-ここまでのコードの全体像)
  - [5.6. 出力結果](#56-出力結果)

## 1. 下準備

このセクションでは、GLSL ファイルの準備と ShaderMaterial の作成について説明します。これらは波のエフェクトを作成するための基礎となります。
下準備として以下のことを行います。

- GLSL ファイルの準備
- ShaderMaterial を作成

### 1.1. GLSL ファイルの準備

以下の手順で行います。

1. `/src/shaders/water`フォルダを作成
2. `water`フォルダ内に`vertex.glsl`ファイル と `fragment.glsl`ファイルを作成

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
  gl_FragColor = vec4(0.5, 0.8, 1.0, 1.0);
}
```

### 1.2. ShaderMaterial を作成

以下の手順で行います。

1. glsl ファイルのインポート
2. `vertexShader`プロパティ、`fragmentShader`プロパティを glsl ファイルに設定

```js
import waterVertexShader from './shaders/water/vertex.glsl';
import waterFragmentShader from './shaders/water/fragment.glsl';

const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
});
```

### 1.3. 出力結果

[![Image from Gyazo](https://i.gyazo.com/367276bb52d4b6602296813daf96cac5.png)](https://gyazo.com/367276bb52d4b6602296813daf96cac5)

## 2. 波を作る

このセクションでは、ユニフォームの設定と頂点シェーダーの実装を通じて、実際に波のエフェクトを作成する方法を説明します。
波を作るには以下のことを行います。

- ユニフォームの設定
- 頂点シェーダーの実装

### 2.1. ユニフォームの設定

`uniforms`プロパティに以下を定義

- `uElevation`: 波の高さを設定 `float`
- `uFrequency`: 波の数を設定 `vec2`

```js
const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  uniforms: {
    uElevation: { value: 0.2 },
    uFrequency: { value: new THREE.Vector2(4, 1.5) },
  },
});
```

> [!NOTE]
> 📝 **Memo**
>
> 1 つの値は `float` 浮動小数点数で設定
> 2 つ以上の値は `vec2`, `vec3`, `vec4` で 設定
>
> `uFrequency` は x 方向と z 方向で分けて設定したいので `vec2`
>
> `uElevation` の値を変更することで波の高さを制御することができる
> `0.0 から 1.0 の間で設定`し値が大きいほど波は高く、低いほど波は低くなる
>
> `uFrequency` の値を変更することで波の数を制御する事ができる
> `vec2(x, y)で設定` 値が大きほど波の数が多くなり、低いほど少なくなる

> [!WARNING]
>
> **注意点**
> 実際の実装では、これらのユニフォームは`uBigWavesElevation`と`uBigWavesFrequenc`y`という名前で使用します。

### 2.2. 頂点シェーダーの実装

波を作るには`sin 関数`を使用します。

`elevation 変数`: 波の高さを制御
x 方向と z 方向に `sin 関数` を適用して、それらを乗算します

`elevation 変数`を `modelPosition` の y 方向に適用することで波を表現

```glsl

uniform float uElevation;
uniform vec2 uFrequency;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // 波の高さを計算
  float elevation =
  sin(modelPosition.x * uFrequency.x) *
  sin(modelPosition.z * uFrequency.y) *
  uElevation;

  modelPosition.y += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;
}
```

> [!NOTE]
> 📝 **Memo**
>
> `sin(modelPosition.z * uFrequency.y` の `uFrequency.y` を z にしないこと
> `uFrequency` は vec2 なので x と y のプロパティしかないので z プロパティは存在しない
> z 方向だからといって `uFrequency.z` とするとエラーになる

### 2.3. デバッグ UI に追加

`lil-gui` を使用してデバッグ UI を作成し
ユニフォームのプロパティを設定していきます。

[デバッグ UI の詳細](https://github.com/daiki-beppu/til/blob/main/Three.js/06-Debug-ui.md)

```js
gui
  .add(waterMaterial.uniforms.uBigWavesElevation, 'value')
  .min(0)
  .max(1)
  .step(0.001)
  .name('uBigWavesElevation');

gui
  .add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x')
  .min(0)
  .max(10)
  .step(0.01)
  .name('uBigWavesFrequencyX');

gui
  .add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y')
  .min(0)
  .max(10)
  .step(0.01)
  .name('uBigWavesFrequencyY');
```

### 2.4. ここまでのコードの全体像

<details>
<summary>.jsファイル(クリックして展開)</summary>

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import waterVertexShader from './shaders/water/vertex.glsl';
import waterFragmentShader from './shaders/water/fragment.glsl';

// セットアップ
const gui = new GUI({ width: 340 });
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

// 海
const waterGeometry = new THREE.PlaneGeometry(2, 2, 128, 128);
const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  uniforms: {
    uBigWavesElevation: { value: 0.2 },
    uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
  },
});

const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI * 0.5;
scene.add(water);

// デバッグ UI
gui
  .add(waterMaterial.uniforms.uBigWavesElevation, 'value')
  .min(0)
  .max(1)
  .step(0.001)
  .name('uBigWavesElevation');

gui
  .add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x')
  .min(0)
  .max(10)
  .step(0.01)
  .name('uBigWavesFrequencyX');

gui
  .add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y')
  .min(0)
  .max(10)
  .step(0.01)
  .name('uBigWavesFrequencyY');

// ウィンドウサイズ
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
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
camera.position.set(1, 1, 1);
scene.add(camera);

// オービットコントロール
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
<summary>.glslファイル(クリックして展開)</summary>

```glsl
// vertex.glsl
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation =
  sin(modelPosition.x * uBigWavesFrequency.x ) *
  sin(modelPosition.z * uBigWavesFrequency.y ) *
  uBigWavesElevation;

  modelPosition.y += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;
}
```

```glsl
// fragment.glsl
void main() {
  gl_FragColor = vec4(0.5, 0.8, 1.0, 1.0);
}
```

</details>

### 2.5. 出力結果

[![Image from Gyazo](https://i.gyazo.com/278f5f77c33acc93d4e5bcf50af8986e.png)](https://gyazo.com/278f5f77c33acc93d4e5bcf50af8986e)

## 3. 波をアニメーション化する

このセクションでは、ユニフォームの設定と頂点シェーダーの実装を通じて、実際に波のエフェクトを作成する方法を説明します。
波をアニメーション化するには以下のことを行います。

- ユニフォームを作成
- tick 関数の値を更新
- 頂点シェーダーの実装

### 3.1. ユニフォームを作成

`uniforms`プロパティに以下を定義

- `uTime`: アニメーションの開始時点 `float`
- `uSpeed`: アニメーションの速さを設定 `float`

```js
const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  uniforms: {
    uTime: { value: 0 },

    uElevation: { value: 0.2 },
    uFrequency: { value: new THREE.Vector2(4, 1.5) },
    uSpeed: { value: 0.75 },
  },
});
```

> [!NOTE]
> 📝 **Memo**
>
> `uTime`の値は開始時点を表すため、初期値として`0`を設定。
>
> `uSpeed`の値を変更することでアニメーションの速度を調整できる
> 値が大きいほど早く、値が小さいほど遅くなる

### 3.2. tick 関数の値を更新

`tick 関数`に波のマテリアルを経過時間に基づいて更新する記述を追加

```js
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // こちらの記述を追加
  waterMaterial.uniforms.uTime.value = elapsedTime;

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
```

### 3.3. 頂点シェーダーの実装

x 方向 と z 方向それぞれに`uTime` と `Speed`をかけ合わせた値を加算する

```glsl
uniform float uTime;
uniform float uElevation;
uniform vec2 uFrequency;
uniform float uSpeed;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation =
  sin(modelPosition.x * uFrequency.x + uTime * uSpeed) *
  sin(modelPosition.z * uFrequency.y + uTime * uSpeed) *
  uElevation;

  modelPosition.y += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;
}
```

### 3.4. デバッグ UI の追加

```js
gui
  .add(waterMaterial.uniforms.uBigWavesSpeed, 'value')
  .min(0)
  .max(5)
  .step(0.001)
  .name('uBigWavesSpeed');
```

### 3.5. ここまでのコードの全体像

<details>
<summary>.jsファイル(クリックして展開)</summary>

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import waterVertexShader from './shaders/water/vertex.glsl';
import waterFragmentShader from './shaders/water/fragment.glsl';

// セットアップ
const gui = new GUI({ width: 340 });
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

// 海
const waterGeometry = new THREE.PlaneGeometry(2, 2, 128, 128);
const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  uniforms: {
    uTime: { value: 0 },

    uBigWavesElevation: { value: 0.2 },
    uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
    uBigWavesSpeed: { value: 0.75 },
  },
});

const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI * 0.5;
scene.add(water);

// デバッグ UI
gui
  .add(waterMaterial.uniforms.uBigWavesElevation, 'value')
  .min(0)
  .max(1)
  .step(0.001)
  .name('uBigWavesElevation');

gui
  .add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x')
  .min(0)
  .max(10)
  .step(0.01)
  .name('uBigWavesFrequencyX');

gui
  .add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y')
  .min(0)
  .max(10)
  .step(0.01)
  .name('uBigWavesFrequencyY');

gui
  .add(waterMaterial.uniforms.uBigWavesSpeed, 'value')
  .min(0)
  .max(5)
  .step(0.001)
  .name('uBigWavesSpeed');

// ウィンドウサイズ
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
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
camera.position.set(1, 1, 1);
scene.add(camera);

// オービットコントロール
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// アニメーション
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  waterMaterial.uniforms.uTime.value = elapsedTime;

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
```

</details>

<details>
<summary>.glslファイル(クリックして展開)</summary>

```glsl
// vertex.glsl
uniform float uTime;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Elevation
  float elevation =
  sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
  sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
  uBigWavesElevation;

  modelPosition.y += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;
}
```

```glsl
// fragment.glsl
void main() {
  gl_FragColor = vec4(0.5, 0.8, 1.0, 1.0);
}
```

</details>

### 3.6. 出力結果

<a href="https://gyazo.com/e9d3bbe796bad44b1e91ef57aece3860"><img src="https://i.gyazo.com/e9d3bbe796bad44b1e91ef57aece3860.gif" alt="Image from Gyazo" width="1000"/></a>

## 4. 色の設定

このセクションでは、波の色をカスタマイズし、よりリアルな水の表現を作成する方法を説明します。
以下のことを行います。

- デバッグオブジェクトの作成
- ユニフォームの設定
- フラグメントシェーダーの実装

### 4.1. デバッグオブジェクトの作成

```js
const debugObuject = {
  // こちらの値は調整を重ねた最終的な値ですまずは簡単な値から調整してください
  depthColor: '#1e92b8',
  surfaceColor: '#a8deff',
};
```

### 4.2. ユニフォームの設定

`uniforms`プロパティに以下を定義

- uDepthColor: 深い部分の色を設定 `vec3`
- uSurfaceColor: 浅い部分の色を設定 `vec3`
- uColorOffset: オフセットする値を設定 `float`
- uColorMulutiplier: 強度の強さを設定 `float`

> [!NOTE] > **📝 Memo**
>
> 深い部分と浅い部分で色の変化をつけるためにそれぞれをユニフォームに設定している
> JavaScript では `THREE.Color` を使用し、
> GLSL では 色は主に `vec3`で扱う
>
> `vEleation` の値を `0.2` に設定しているため `-0.2 から 0.2` の間での変化になるため変化が分かりづらい、そのため`uColorMultiplier`で強度を調整し`ColorOffset`で値をオフセットすることで変化をわかりやすくする

```js
const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  uniforms: {
    uTime: { value: 0 },

    uElevation: { value: 0.2 },
    uFrequency: { value: new THREE.Vector2(4, 1.5) },
    uSpeed: { value: 0.75 },

    uDepthColor: { value: new THREE.Color(debugObuject.depthColor) },
    uSurfaceColor: { value: new THREE.Color(debugObuject.surfaceColor) },
    uColorOffset: { value: 0.08 },
    uColorMultiplier: { value: 5 },
  },
});
```

### 4.3. フラグメントシェーダーの実装

頂点シェーダーから`varying`を使用してフラグメントシェーダーにデータを送信
これによりフラグメントシェーダーで波の高さの計データが使用できる
`vElevation`をしようして波の高さに応じて色が変化するように設定
そのままだと変化が小さいので`uColorOffset`と`uColorMultiplier`で変化を調整する

```glsl
// ...
varying float vElevation;

void main() {
  // ...

  vElevation = elevation;
}

```

```glsl
uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMlutiplier;

varying float vElevation;

void main() {
  float mixStrength = (vElevation + uColorOffset) * uColorMalutiplier;
  vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}
```

> [!NOTE]
> 📝 **Memo**
>
> ` #include <colorspace_fragment>`はカラースペースを適切に使用するための記述
> 詳細については後述する

### 4.4. デバッグ UI の追加

```js
gui
  .addColor(debugObuject, 'depthColor')
  .name('depthColor')
  .onChange(() => {
    waterMaterial.uniforms.uDepthColor.value.set(debugObuject.depthColor);
  });
gui
  .addColor(debugObuject, 'surfaceColor')
  .name('surefaceColor')
  .onChange(() => {
    waterMaterial.uniforms.uSurfaceColor.value.set(debugObuject.surfaceColor);
  });

gui
  .add(waterMaterial.uniforms.uColorOffset, 'value')
  .min(0)
  .max(1)
  .step(0.001)
  .name('uColorOffset');
gui
  .add(waterMaterial.uniforms.uColorMalutiplier, 'value')
  .min(0)
  .max(10)
  .step(0.001)
  .name('uColorMalutiplier');
```

> [!NOTE]
> 📝 **Memo**
>
> `=` で代入するのではなく`.set`プロパティで値を更新する

### 4.5. ここまでのコードの全体像

<details>
<summary>.jsファイル(クリックして展開)</summary>

```js
iimport * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import waterVertexShader from './shaders/water/vertex.glsl';
import waterFragmentShader from './shaders/water/fragment.glsl';

// セットアップ
const gui = new GUI({ width: 340 });
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

const debugObuject = {
  depthColor: '#1e92b8',
  surfaceColor: '#a8deff',
};

// 海
const waterGeometry = new THREE.PlaneGeometry(2, 2, 128, 128);
const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  uniforms: {
    uTime: { value: 0 },

    uBigWavesElevation: { value: 0.2 },
    uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
    uBigWavesSpeed: { value: 0.75 },

    uDepthColor: { value: new THREE.Color(debugObuject.depthColor) },
    uSurfaceColor: { value: new THREE.Color(debugObuject.surfaceColor) },
    uColorOffset: { value: 0.08 },
    uColorMalutiplier: { value: 5 },
  },
});

const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI * 0.5;
scene.add(water);

// デバッグ UI
gui
  .add(waterMaterial.uniforms.uBigWavesElevation, 'value')
  .min(0)
  .max(1)
  .step(0.001)
  .name('uBigWavesElevation');

gui
  .add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x')
  .min(0)
  .max(10)
  .step(0.01)
  .name('uBigWavesFrequencyX');

gui
  .add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y')
  .min(0)
  .max(10)
  .step(0.01)
  .name('uBigWavesFrequencyY');

gui
  .add(waterMaterial.uniforms.uBigWavesSpeed, 'value')
  .min(0)
  .max(5)
  .step(0.001)
  .name('uBigWavesSpeed');

gui
  .addColor(debugObuject, 'depthColor')
  .name('depthColor')
  .onChange(() => {
    waterMaterial.uniforms.uDepthColor.value.set(debugObuject.depthColor);
  });
gui
  .addColor(debugObuject, 'surfaceColor')
  .name('surefaceColor')
  .onChange(() => {
    waterMaterial.uniforms.uSurfaceColor.value.set(debugObuject.surfaceColor);
  });

gui
  .add(waterMaterial.uniforms.uColorOffset, 'value')
  .min(0)
  .max(1)
  .step(0.001)
  .name('uColorOffset');
gui
  .add(waterMaterial.uniforms.uColorMalutiplier, 'value')
  .min(0)
  .max(10)
  .step(0.001)
  .name('uColorMalutiplier');

// ウィンドウサイズ
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
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
camera.position.set(1, 1, 1);
scene.add(camera);

// オービットコントロール
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// アニメーション
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  waterMaterial.uniforms.uTime.value = elapsedTime;

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

```

</details>

<details>
<summary>.glslファイル(クリックして展開)</summary>

```glsl
// vertex.glsl
uniform float uTime;
uniform float uTime;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;

varying float vElevation;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation =
  sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
  sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
  uBigWavesElevation;

  modelPosition.y += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  vElevation = elevation;
}
```

```glsl
// fragment.glsl
uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMalutiplier;

varying float vElevation;

void main() {
  float mixStrength = (vElevation + uColorOffset) * uColorMalutiplier;
  vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}
```

</details>

### 4.6. 出力結果

<a href="https://gyazo.com/15ddf7a508c7026ed6daeaccfbf10929"><img src="https://i.gyazo.com/15ddf7a508c7026ed6daeaccfbf10929.gif" alt="Image from Gyazo" width="1000"/></a>

## 5. 小さな波の作成

このセクションでは、大きな波の上に小さな波を重ねることで、より自然で複雑な水面の表現を作成する方法を説明します。
小さな波を作成するには以下のことを行います

- パーリンノイズの適用
- ユニフォームの設定
- 頂点シェーダーの実装

### 5.1. パーリンノイズの適用

より現実的な表現にするためにパーリンノイズを使用する

`cnoise 関数`のパラメータは`vec3`で指定

- x: `modelPosition.x` (平面の x 座標)
- y: `modelPosition.z` (平面の z 座標) ※ y 座標を使用しないのは、平面が水平方向にひろがっているため
- z: `uTime` (時間経過による変化を表現)

これにより、水平面上で時間とともに変化するノイズパターンが生成される

<details>
<summary>パーリンノイズのソースコード(クリックして展開)</summary>

> [!NOTE]
>
> ** Stefan Gustavson** による `Classic Perlin 3D Noise` を使用しています
> [gist.github](https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83)

```glsl
//	Classic Perlin 3D Noise
//	by Stefan Gustavson (https://github.com/stegu/webgl-noise)
//
vec4 permute(vec4 x) {return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 taylorInvSqrt(vec4 r) {return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) {return t * t*t * (t * (t * 6.0 - 15.0) + 10.0); }

float cnoise(vec3 P) {
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
  vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
  vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
  vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
  vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}
```

</details>

### 5.2. ユニフォームの設定

`uniforms`プロパティに以下を定義

- `uSmallWavesEleveation`: 小さい波の高さ `float`
- `uSmallWavesFrequency`: 小さい波の数 `float`
- `uSmallWavesSpeed`: 小さい波のアニメーション速度 `float`
- `uSmallWavesIteratation`: 小さい波の反復回数 `float`

```js
const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  uniforms: {
    // ...

    uSmallWavesEleveation: { value: 0.08 },
    uSmallWavesFrequency: { value: 3.7 },
    uSmallWavesSpeed: { value: 0.7 },
    uSmallWavesIteratation: { value: 5 },

    // ...
  },
});
```

### 5.3. 頂点シェーダーの実装

`abs 関数`を使用してより現実的な波を表現します。

- `abs 関数`を使用することで、ノイズ値が常に正の値になり、波が上下に揺れるのではなく、主に上方向に盛り上がるような動きを生成します。これにより、より自然な水面の動きを表現できます。

複数のパーリンノイズを `for 文`を使用して反復処理させる

- 反復処理により、異なる周波数のノイズを重ね合わせることができます。
- 各反復で周波数を増加させ、振幅を減少させることで、大きな波の上に小さな波が乗っているような、複雑で自然な水面の動きを表現します。

```glsl

// ...

void main() {

  // ...

  for(float i = 1.0; i <= uSmallWavesIteratation; i ++ ) {
    elevation -= abs(
      cnoise(vec3(modelPosition.xz * uSmallWavesFrequency * i,
        uTime * uSmallWavesSpeed)) * uSmallWavesEleveation / i);
    }
  modelPosition.y += elevation;

  // ...
}
```

> [!NOTE]
>
> **📝 Memo**
>
> `for 文` の構文は JavaScript と同じ

### 5.4. デバッグ UI の追加

```js
gui
  .add(waterMaterial.uniforms.uSmallWavesEleveation, 'value')
  .min(0)
  .max(1)
  .step(0.001)
  .name('uSmallWavesEleveation');
gui
  .add(waterMaterial.uniforms.uSmallWavesFrequency, 'value')
  .min(0)
  .max(30)
  .step(0.001)
  .name('uSmallWavesFrequency');
gui
  .add(waterMaterial.uniforms.uSmallWavesSpeed, 'value')
  .min(0)
  .max(5)
  .step(0.001)
  .name('uSmallWavesSpeed');
gui
  .add(waterMaterial.uniforms.uSmallWavesIteratation, 'value')
  .min(0)
  .max(5)
  .step(1)
  .name('uSmallWavesIteratation');
```

### 5.5. ここまでのコードの全体像

<details>
<summary>.jsファイル(クリックして展開)</summary>

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import waterVertexShader from './shaders/water/vertex.glsl';
import waterFragmentShader from './shaders/water/fragment.glsl';

// セットアップ
const gui = new GUI({ width: 340 });
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

const debugObuject = {
  depthColor: '#30b3df',
  surfaceColor: '#9bd7fd',
};

// 海
const waterGeometry = new THREE.PlaneGeometry(5, 5, 2048, 2048);
const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  uniforms: {
    uTime: { value: 0 },

    uBigWavesElevation: { value: 0.28 },
    uBigWavesFrequency: { value: new THREE.Vector2(1.7, 0.75) },
    uBigWavesSpeed: { value: 1.2 },

    uSmallWavesEleveation: { value: 0.08 },
    uSmallWavesFrequency: { value: 3.7 },
    uSmallWavesSpeed: { value: 0.7 },
    uSmallWavesIteratation: { value: 5 },

    uDepthColor: { value: new THREE.Color(debugObuject.depthColor) },
    uSurfaceColor: { value: new THREE.Color(debugObuject.surfaceColor) },
    uColorOffset: { value: 0.08 },
    uColorMulutiplier: { value: 7.6 },
  },
});

const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI * 0.5;
scene.add(water);

// デバッグ UI
gui
  .add(waterMaterial.uniforms.uBigWavesElevation, 'value')
  .min(0)
  .max(1)
  .step(0.001)
  .name('uBigWavesElevation');

gui
  .add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x')
  .min(0)
  .max(10)
  .step(0.01)
  .name('uBigWavesFrequencyX');

gui
  .add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y')
  .min(0)
  .max(10)
  .step(0.01)
  .name('uBigWavesFrequencyY');

gui
  .add(waterMaterial.uniforms.uBigWavesSpeed, 'value')
  .min(0)
  .max(5)
  .step(0.001)
  .name('uBigWavesSpeed');

gui
  .addColor(debugObuject, 'depthColor')
  .name('depthColor')
  .onChange(() => {
    waterMaterial.uniforms.uDepthColor.value.set(debugObuject.depthColor);
  });
gui
  .addColor(debugObuject, 'surfaceColor')
  .name('surefaceColor')
  .onChange(() => {
    waterMaterial.uniforms.uSurfaceColor.value.set(debugObuject.surfaceColor);
  });

gui
  .add(waterMaterial.uniforms.uColorOffset, 'value')
  .min(0)
  .max(1)
  .step(0.001)
  .name('uColorOffset');
gui
  .add(waterMaterial.uniforms.uColorMulutiplier, 'value')
  .min(0)
  .max(10)
  .step(0.001)
  .name('uColorMulutiplier');

gui
  .add(waterMaterial.uniforms.uSmallWavesEleveation, 'value')
  .min(0)
  .max(1)
  .step(0.001)
  .name('uSmallWavesEleveation');
gui
  .add(waterMaterial.uniforms.uSmallWavesFrequency, 'value')
  .min(0)
  .max(30)
  .step(0.001)
  .name('uSmallWavesFrequency');
gui
  .add(waterMaterial.uniforms.uSmallWavesSpeed, 'value')
  .min(0)
  .max(5)
  .step(0.001)
  .name('uSmallWavesSpeed');
gui
  .add(waterMaterial.uniforms.uSmallWavesIteratation, 'value')
  .min(0)
  .max(5)
  .step(1)
  .name('uSmallWavesIteratation');

// ウィンドウサイズ
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
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
camera.position.set(1, 1, 1);
scene.add(camera);

// オービットコントロール
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// アニメーション
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  waterMaterial.uniforms.uTime.value = elapsedTime;

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
```

</details>

<details>
<summary>.glslファイル(クリックして展開)</summary>

```glsl
// vertex.glsl
uniform float uTime;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;

uniform float uSmallWavesEleveation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallWavesIteratation;

varying float vElevation;

//	Classic Perlin 3D Noise
//	by Stefan Gustavson (https://github.com/stegu/webgl-noise)
//
vec4 permute(vec4 x) {return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 taylorInvSqrt(vec4 r) {return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) {return t * t*t * (t * (t * 6.0 - 15.0) + 10.0); }

float cnoise(vec3 P) {
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
  vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
  vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
  vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
  vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation =
  sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
  sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
  uBigWavesElevation;

  for(float i = 1.0; i <= uSmallWavesIteratation; i ++ ) {
    elevation -= abs(
      cnoise(vec3(modelPosition.xz * uSmallWavesFrequency * i,
        uTime * uSmallWavesSpeed)) * uSmallWavesEleveation / i);
      }
      modelPosition.y += elevation;

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPosition = projectionMatrix * viewPosition;

      gl_Position = projectionPosition;

      vElevation = elevation;
    }
```

```glsl
// fragment.glsl
uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMalutiplier;

varying float vElevation;

void main() {
  float mixStrength = (vElevation + uColorOffset) * uColorMalutiplier;
  vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}
```

</details>

### 5.6. 出力結果

<a href="https://gyazo.com/ee7a9dcf47d4d102fde52666911afcfa"><img src="https://i.gyazo.com/ee7a9dcf47d4d102fde52666911afcfa.gif" alt="Image from Gyazo" width="1000"/></a>
