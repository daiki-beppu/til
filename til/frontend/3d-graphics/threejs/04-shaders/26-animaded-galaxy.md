---
title: 26-animaded-galaxy
date: 2024/08/03
updated: 2024/08/04
---

# アニメーションを適用した銀河の制作

- [1. 下準備](#1-下準備)
  - [1.1. GLSL ファイルの準備](#11-glsl-ファイルの準備)
  - [1.2. ShaderMaterial に置き換え](#12-shadermaterial-に置き換え)
  - [1.3. 出力結果](#13-出力結果)
- [2. パーティクルサイズを変更](#2-パーティクルサイズを変更)
  - [2.1. ユニフォームの設定 (JavaScript の実装)](#21-ユニフォームの設定-javascript-の実装)
  - [2.2. 頂点シェーダーの実装 (GLSL の実装)](#22-頂点シェーダーの実装-glsl-の実装)
  - [2.3. ランダムなサイズの適用](#23-ランダムなサイズの適用)
  - [2.4. ピクセル比の固定](#24-ピクセル比の固定)
  - [2.5. サイズの減衰](#25-サイズの減衰)
  - [2.6. ここまでのコードの全体像](#26-ここまでのコードの全体像)
  - [2.7. 出力結果](#27-出力結果)
- [3. パーティクルの形を変える](#3-パーティクルの形を変える)
  - [3.1. フラグメントシェーダーの実装](#31-フラグメントシェーダーの実装)
  - [3.2. ここまでのコードの全体像](#32-ここまでのコードの全体像)
  - [3.3. 出力結果](#33-出力結果)
- [4. アニメーションの適用](#4-アニメーションの適用)
  - [4.1. ユニフォームの設定](#41-ユニフォームの設定)
  - [4.2. 頂点シェーダーの実装](#42-頂点シェーダーの実装)
  - [4.3. ランダム性の修正](#43-ランダム性の修正)
  - [4.4. コードの全体像](#44-コードの全体像)
  - [4.5. 出力結果](#45-出力結果)

## 1. 下準備

下準備は以下のことを行います:

- GLSL ファイルの準備
- `ShaderMaterial` に置き換え
  > [!NOTE]
  > こちらは[以前、制作した銀河](https://github.com/daiki-beppu/til/blob/main/Three.js/14-galaxy-generator.md)から
  > スピンさせる記述を取り除いたものになります
  <details>
  <summary>. jsファイル(クリックして展開)</summary>

```js
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import fragmentShader from "./Shaders/fragment.glsl";
import vertexShader from "./Shaders/vertex.glsl";

// セットアップ
const gui = new GUI();
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

// 銀河の設定パラメータ
const parameters = {};
parameters.count = 200000;
parameters.size = 0.005;
parameters.radius = 5;
parameters.branches = 3;
parameters.spin = 1;
parameters.randomness = 0.5;
parameters.randomnessPower = 3;
parameters.insideColor = "#ff6030";
parameters.outsideColor = "#1b3984";

let geometry = null;
let material = null;
let points = null;

const generateGalaxy = () => {
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  // ジオメトリ
  geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  const insideColor = new THREE.Color(parameters.insideColor);
  const outsideColor = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;

    // Position
    const radius = Math.random() * parameters.radius;

    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const randomX =
      Math.random() ** parameters.randomnessPower *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomY =
      Math.random() ** parameters.randomnessPower *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomZ =
      Math.random() ** parameters.randomnessPower *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;

    positions[i3] = Math.cos(branchAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle) * radius + randomZ;

    // Color
    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;

    // scale

    scales[i] = Math.random();
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // マテリアル
  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  // ポイントメッシュ
  points = new THREE.Points(geometry, material);
  scene.add(points);
};

gui
  .add(parameters, "count")
  .min(100)
  .max(1000000)
  .step(100)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "radius")
  .min(0.01)
  .max(20)
  .step(0.01)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "branches")
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomness")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomnessPower")
  .min(1)
  .max(10)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

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
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

generateGalaxy();

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

**出力結果**
[![Image from Gyazo](https://i.gyazo.com/6897c6c342e4d5adb9852597fcce7739.png)](https://gyazo.com/6897c6c342e4d5adb9852597fcce7739)

</details>

### 1.1. GLSL ファイルの準備

GLSL ファイルの準備は以下の手順で行います

1. `src/shaders`フォルダを作成
2. `shaders`フォルダ内に以下のファイルを作成
   - `vertex.glsl`
   - `fragment.glsl`

```glsl
// vertex.glsl に記述

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;
  gl_PointSize = 2.0;
}
```

```glsl
// fragment.glsl に記述

void main() {

  gl_FragColor = vec4(1.0);
  #include <colorspace_fragment>

}
```

### 1.2. ShaderMaterial に置き換え

`ShaderMaterial` の作成は以下の手順で行います

1. `PointsMaterial` を `ShaderMaterial` に置き換える
2. 以下のプロパティを削除
   - `size: parameters.size`
   - `sizeAttenuation: true,`
3. GLSL ファイルのインポート
   GLSL のファイルをインポートするには`Vite`の設定とプラグインを追加する必要があります[詳細はこちら](https://github.com/daiki-beppu/til/blob/main/Three.js/23-shaders.md#sheder-%E3%82%92%E5%88%A5%E3%81%AE%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AB%E5%88%86%E3%81%91%E3%82%8B)
4. 以下のプロパティを追加
   - `vertexShader`
   - `fragmentShader`

```js
import fragmentShader from "./Shaders/fragment.glsl";
import vertexShader from "./Shaders/vertex.glsl";
```

```js
material = new THREE.ShaderMaterial({
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});
```

> [!NOTE]
>
> **📝 Memo**
>
> - `size: parameters.size`
> - `sizeAttenuation: true,`
>
> こちらのプロパティを削除する理由は
> `PointMaterial`用のプロパティで`ShaderMaterial`にはプロパティが設定されていないから

> [!NOTE]
>
> **📝 Memo**
>
> `gl_PointSize` で パーティクルのサイズを設定できるのは
> あらかじめ組み込み変数が設定されているから

### 1.3. 出力結果

[![Image from Gyazo](https://i.gyazo.com/64e40770635e44d5a505c2e0e060c3cd.png)](https://gyazo.com/64e40770635e44d5a505c2e0e060c3cd)

## 2. パーティクルサイズを変更

パーティクルサイズを変更するには
以下のことを行います:

- ユニフォームの設定
- 頂点シェーダーの実装

あわせて以下の設定も行います

- ランダムなサイズの適用
- ピクセル比の固定
- サイズの減衰

### 2.1. ユニフォームの設定 (JavaScript の実装)

`ShaderMaterial`に`uniforms`プロパティを設定し
`uniforms`プロパティに`uSize`プロパティを設定

ここで設定する `uSize` の値は、パーティクルの基本サイズをピクセル単位で表します。この値が大きいほど、パーティクルは大きく表示されます

```js
material = new THREE.ShaderMaterial({
  // ...

  uniforms: {
    uSize: { value: 8 },
  },

  // ...
});
```

### 2.2. 頂点シェーダーの実装 (GLSL の実装)

ユニフォーム変数を追加し定数でしていた部分をユニフォーム変数に書き換える

```glsl
uniform float uSize;

void main() {
  // Poisition
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  // Size
  gl_PointSize = uSize;
}

```

### 2.3. ランダムなサイズの適用

- ジオメトリに `aScale` 属性を追加しランダムな値を設定(JavaScript の実装)
- 頂点シェーダーで `aScale` 属性を設定 ( GLSL の実装)

**JavaScript の実装**

`scales`の配列を定義し
ループの中で`scales配列`に`Math.random()`でランダムな値を設定
`setAttrubte`で`aScale`属性を設定する

ここで生成される `scales` 配列の各要素は`0 から 1` の範囲のランダムな値となります。これにより、各パーティクルのサイズに変化をつけ、より自然な見た目を実現します。

```js
geometry = new THREE.BufferGeometry();

const positions = new Float32Array(parameters.count * 3);
const colors = new Float32Array(parameters.count * 3);
const scales = new Float32Array(parameters.count * 1);

// ...

for (let i = 0; i < parameters.count; i++) {
  // ...

  // Scale
  scales[i] = Math.random();
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
```

**GLSL の実装**

attribute 変数に `aScale` 属性を格納し
uSize 変数に乗算することでランダムなサイズを適用することができる

```glsl
uniform float uSize;

attribute float aScale;

void main()
{
    // ...

    gl_PointSize = uSize * aScale;
}

```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/2420e5798af9ad4d1c8169122c10f2e3.png)](https://gyazo.com/2420e5798af9ad4d1c8169122c10f2e3)

### 2.4. ピクセル比の固定

ピクセル比が`1`の場合、ピクセル比が`2`のデバイスよりもパーティクルが 2 倍大きく見えてしまいます。

どのデバイスで見ても同じ出力結果になるようにピクセル比の固定を行います

uSize の値に `renderer.getPixelRatio()`を使用してピクセル比取得し乗算します。

```js
material = new THREE.ShaderMaterial({
  // ...

  uniforms: {
    uSize: { value: 8 * renderer.getPixelRatio() },
  },

  // ...
});
```

ただ、これだとエラーが出てしまいます。
原因は関数の呼び出すタイミングです。
レンダラーを作成する前に`rendarer`を呼び出してしまっているためエラーが発生します

修正するには`generateGalaxy`関数をレンダラーがインスタンス化された後に記述します

```js
// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

generateGalaxy();
```

### 2.5. サイズの減衰

`ShaderMaterial`はサイズの減衰を設定する`sizeAttenuation`プロパティをサポートしていないため

独自に適用する必要があります。
これによってカメラから遠いパーティクルは小さく、カメラに近いパーティクルは大きく表示されます。

今回の場合は`/node_modules/three/src/renderers/shaders/ShaderLib/point_vert.glsl.js`に記述されている一部を引用します

```glsl
gl_PointSize *= scale / -mvPosition.z;
```

次のように変更することでサイズの減衰を計算することができます

```glsl
gl_PointSize = uSize * aScale;
gl_PointSize *= (1.0 / - viewPosition.z);
```

> [!NOTE]
>
> **📝 Memo**
>
> サイズの減衰の計算式
> `gl_PointSize *= scale / -mvPosition.z;` > `mvPosition` は `modelViewPosition` の略らしい
> つまり `modelPosition` に `ViweMatrix` を掛けて計算した `viewPosition` と同じもの
>
> scale を 1.0 にするのは扱いやすくするためだそう

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/de7d1e488650be37a42a91274e758e67.png)](https://gyazo.com/de7d1e488650be37a42a91274e758e67)

### 2.6. ここまでのコードの全体像

<details>
<summary>. jsファイル(クリックして展開)</summary>

```js
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import fragmentShader from "./Shaders/fragment.glsl";
import vertexShader from "./Shaders/vertex.glsl";

// セットアップ
const gui = new GUI();
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

// 銀河の設定パラメータ
const parameters = {};
parameters.count = 200000;
parameters.size = 0.005;
parameters.radius = 5;
parameters.branches = 3;
parameters.spin = 1;
parameters.randomness = 0.5;
parameters.randomnessPower = 3;
parameters.insideColor = "#ff6030";
parameters.outsideColor = "#1b3984";

let geometry = null;
let material = null;
let points = null;

const generateGalaxy = () => {
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  // ジオメトリ
  geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);
  const scales = new Float32Array(parameters.count * 1);

  const insideColor = new THREE.Color(parameters.insideColor);
  const outsideColor = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;

    // Position
    const radius = Math.random() * parameters.radius;

    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const randomX =
      Math.random() ** parameters.randomnessPower *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomY =
      Math.random() ** parameters.randomnessPower *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomZ =
      Math.random() ** parameters.randomnessPower *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;

    positions[i3] = Math.cos(branchAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle) * radius + randomZ;

    // Color
    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;

    // scale

    scales[i] = Math.random();
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(colors, 1));

  // マテリアル
  material = new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uSize: { value: 8 * renderer.getPixelRatio() },
    },
  });

  // ポイントメッシュ
  points = new THREE.Points(geometry, material);
  scene.add(points);
};

gui
  .add(parameters, "count")
  .min(100)
  .max(1000000)
  .step(100)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "radius")
  .min(0.01)
  .max(20)
  .step(0.01)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "branches")
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomness")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomnessPower")
  .min(1)
  .max(10)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

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
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

generateGalaxy();

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
// vertex.glsl

uniform float uSize;

attribute float aScale;

void main() {
  // Poisition
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  // Size
  gl_PointSize = uSize * aScale;
  gl_PointSize *= (1.0 / -viewPosition.z);

}

```

```glsl
// fragment.glsl
void main() {

  gl_FragColor = vec4(1.0);
  #include <colorspace_fragment>

}

```

</details>

### 2.7. 出力結果

[![Image from Gyazo](https://i.gyazo.com/a0842ad8a8065dc25b84d5cad700009c.png)](https://gyazo.com/a0842ad8a8065dc25b84d5cad700009c)

## 3. パーティクルの形を変える

シェーダーパターンを適用してパーティクルの形を変更します
パーティクルの形を変更するには以下のことを行います

- フラグメントシェーダーの実装

### 3.1. フラグメントシェーダーの実装

今回は 3 つのパターンを作成してその内の 1 つを適用します。

`gl_PointCoord` は パーティクルの uv 座標を格納した組み込み変数(パーティクルのみ使用可能)
[シェーダーパターンの学習](https://github.com/daiki-beppu/til/blob/main/Three.js/24-shader-patterns.md)で使用していた`vUv`と同様に
2D 座標を表現するために使用し `0.0 から 1.0` の間の値

```glsl
void main(){
  gl_FragColor = vec4(gl_PointCoord, 1.0, 1.0);
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/23372b6f8f04fe89d4a3dbd43441829d.png)](https://gyazo.com/23372b6f8f04fe89d4a3dbd43441829d)

**パターン 1 : 円形**

詳細は [シェーダーパターンの学習 パターン 33 を参考 ](https://github.com/daiki-beppu/til/blob/main/Three.js/24-shader-patterns.md)

```glsl
void main() {
  float strength = 1.0 - step(0.5, distance(gl_PointCoord, vec2(0.5)));
  gl_FragColor = vec4(vec3(strength), 1.0);
  #include <colorspace_fragment>
}
```

**パターン 2 : 拡散点**

パターン 1 に比べて ぼやっとした円形

詳細は [シェーダーパターンの学習 パターン 33 を参考 ](https://github.com/daiki-beppu/til/blob/main/Three.js/24-shader-patterns.md)

```glsl
void main() {
  float strength = 1.0 - step(0.5, distance(gl_PointCoord, vec2(0.5)));
  gl_FragColor = vec4(vec3(strength), 1.0);
  #include <colorspace_fragment>
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/392b9c28fd0e082af6074468a106568c.png)](https://gyazo.com/392b9c28fd0e082af6074468a106568c)

**パターン 3 : 光点**

累乗計算をすることで非線形値を適用している

詳細は [シェーダーパターンの学習 パターン 29 を参考 ](https://github.com/daiki-beppu/til/blob/main/Three.js/24-shader-patterns.md)

```glsl
void main() {
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 - strength;
  strength = pow(strength,10.0);

  gl_FragColor = vec4(vec3(strength), 1.0);
  #include <colorspace_fragment>
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/a1b878b2cf8ec1c1e23ceb2cda38d519.png)](https://gyazo.com/a1b878b2cf8ec1c1e23ceb2cda38d519)

### 3.2. ここまでのコードの全体像

<details>
<summary>. jsファイル(クリックして展開)</summary>

```js
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import fragmentShader from "./Shaders/fragment.glsl";
import vertexShader from "./Shaders/vertex.glsl";

// セットアップ
const gui = new GUI();
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

// 銀河の設定パラメータ
const parameters = {};
parameters.count = 200000;
parameters.size = 0.005;
parameters.radius = 5;
parameters.branches = 3;
parameters.spin = 1;
parameters.randomness = 0.5;
parameters.randomnessPower = 3;
parameters.insideColor = "#ff6030";
parameters.outsideColor = "#1b3984";

let geometry = null;
let material = null;
let points = null;

const generateGalaxy = () => {
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  // ジオメトリ
  geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);
  const scales = new Float32Array(parameters.count * 1);

  const insideColor = new THREE.Color(parameters.insideColor);
  const outsideColor = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;

    // Position
    const radius = Math.random() * parameters.radius;

    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const randomX =
      Math.random() ** parameters.randomnessPower *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomY =
      Math.random() ** parameters.randomnessPower *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomZ =
      Math.random() ** parameters.randomnessPower *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;

    positions[i3] = Math.cos(branchAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle) * radius + randomZ;

    // Color
    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;

    // scale

    scales[i] = Math.random();
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(colors, 1));

  // マテリアル
  material = new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uSize: { value: 30 * renderer.getPixelRatio() },
    },
  });

  // ポイントメッシュ
  points = new THREE.Points(geometry, material);
  scene.add(points);
};

gui
  .add(parameters, "count")
  .min(100)
  .max(1000000)
  .step(100)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "radius")
  .min(0.01)
  .max(20)
  .step(0.01)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "branches")
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomness")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomnessPower")
  .min(1)
  .max(10)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

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
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

generateGalaxy();

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
// vertex.glsl
uniform float uSize;

attribute float aScale;

void main() {
  // Poisition
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  // Size
  gl_PointSize = uSize * aScale;
  gl_PointSize *= (1.0 / -viewPosition.z);

}
```

```glsl
// fragment.glsl
void main() {

  // 円形 pattern
  // float strength = 1.0 - step(0.5, distance(gl_PointCoord, vec2(0.5)));

  // 拡散点パターン
  // float strength = 1.0 - distance(gl_PointCoord, vec2(0.5)) * 2.0;

  // 光点パターン
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 - strength;
  strength = pow(strength,10.0);

  gl_FragColor = vec4(vec3(strength), 1.0);

  #include <colorspace_fragment>
}

```

</details>

### 3.3. 出力結果

[![Image from Gyazo](https://i.gyazo.com/9080ad1df3bdfecbb56191d434c4585a.png)](https://gyazo.com/9080ad1df3bdfecbb56191d434c4585a)

## 4. アニメーションの適用

アニメーションを適用するには以下のことを行います

- ユニフォーム設定
- 頂点シェーダーの実装

あわせてランダム性が失われたので修正していきます

### 4.1. ユニフォームの設定

`uniform`プロパティに`uTime`を設定

```js
material = new THREE.ShaderMaterial({
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uSize: { value: 30 * renderer.getPixelRatio() },
  },
});
```

ここで設定する`uTime`の値は経過時間の初期化なので`0`を設定する

### 4.2. 頂点シェーダーの実装

`atan関数`で`modelPosition.x`と`modelPosition.z`角度を取得
`length関数`で中心からの距離を取得

中心に近いほど角度は大きく、遠くなるほど角度は小さくなるようにオフセット角度を計算
その値に `uTime` を乗算することで経過時間ごとにパーティクルの位置が変化します

`uTime * 0.2 ` は アニメーションの速度を調整しています

```glsl
void main() {
// Spin

  // ...

  float angle = atan(modelPosition.x, modelPosition.z);
  float distanceToCenter = length(modelPosition.xz);
  float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
  angle += angleOffset;

  modelPosition.x = cos(angle) * distanceToCenter ;
  modelPosition.z = sin(angle) * distanceToCenter ;

  // ...
}
```

### 4.3. ランダム性の修正

このままだと時間がたった場合、すべてのパーティクルが完全な円を軌道上を移動するため、規則的な模様を描いてしまいます。
これは意図した挙動ではないので修正してきます。

修正するには `position` 属性 のランダム性を削除して
新たに `aRandomness` 属性を作成
頂点シェーダーで回転させた後でランダム性を加えます

```js
// ...

const randomness = new Float32Array(parameters.count * 3);

for (let i = 0; i < parameters.count; i++) {
  const i3 = i * 3;

  // ...

  const randomX =
    Math.random() ** parameters.randomnessPower *
    (Math.random() < 0.5 ? 1 : -1) *
    parameters.randomness *
    radius;
  const randomY =
    Math.random() ** parameters.randomnessPower *
    (Math.random() < 0.5 ? 1 : -1) *
    parameters.randomness *
    radius;
  const randomZ =
    Math.random() ** parameters.randomnessPower *
    (Math.random() < 0.5 ? 1 : -1) *
    parameters.randomness *
    radius;

  randomness[i3] = randomX;
  randomness[i3 + 1] = randomY;
  randomness[i3 + 2] = randomZ;

  // ...
}

geometry.setAttribute("aRandomness", new THREE.BufferAttribute(randomness, 3));
```

```glsl
attribute vec3 aRandomness;

void main() {
  //...

  modelPosition.x = cos(angle) * distanceToCenter + aRandomness.x;
  modelPosition.y = aRandomness.y;
  modelPosition.z = sin(angle) * distanceToCenter + aRandomness.z;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  // ..
}
```

**修正前**
<a href="https://gyazo.com/74242279523a4fdbd81833564825fd00"><img src="https://i.gyazo.com/74242279523a4fdbd81833564825fd00.gif" alt="Image from Gyazo" width="1000"/></a>

**修正後**

<a href="https://gyazo.com/83d9f4865548ce77432b5aa6862553de"><img src="https://i.gyazo.com/83d9f4865548ce77432b5aa6862553de.gif" alt="Image from Gyazo" width="1000"/></a>

### 4.4. コードの全体像

<details>
<summary>. jsファイル(クリックして展開)</summary>

```js
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import fragmentShader from "./Shaders/fragment.glsl";
import vertexShader from "./Shaders/vertex.glsl";

// セットアップ
const gui = new GUI();
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

// 銀河の設定パラメータ
const parameters = {};
parameters.count = 200000;
parameters.size = 0.005;
parameters.radius = 5;
parameters.branches = 3;
parameters.spin = 1;
parameters.randomness = 0.5;
parameters.randomnessPower = 3;
parameters.insideColor = "#ff6030";
parameters.outsideColor = "#1b3984";

let geometry = null;
let material = null;
let points = null;

const generateGalaxy = () => {
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  // ジオメトリ
  geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);
  const scales = new Float32Array(parameters.count * 1);
  const randomness = new Float32Array(parameters.count * 3);

  const insideColor = new THREE.Color(parameters.insideColor);
  const outsideColor = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;

    // Position
    const radius = Math.random() * parameters.radius;

    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const randomX =
      Math.random() ** parameters.randomnessPower *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomY =
      Math.random() ** parameters.randomnessPower *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomZ =
      Math.random() ** parameters.randomnessPower *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;

    randomness[i3] = randomX;
    randomness[i3 + 1] = randomY;
    randomness[i3 + 2] = randomZ;

    positions[i3] = Math.cos(branchAngle) * radius;
    positions[i3 + 1] = 0;
    positions[i3 + 2] = Math.sin(branchAngle) * radius;

    // Color
    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;

    // scale
    scales[i] = Math.random();
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute(
    "aRandomness",
    new THREE.BufferAttribute(randomness, 3)
  );

  // マテリアル
  material = new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: 5 * renderer.getPixelRatio() },
    },
  });

  // ポイントメッシュ
  points = new THREE.Points(geometry, material);
  scene.add(points);
};

gui
  .add(parameters, "count")
  .min(100)
  .max(1000000)
  .step(100)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "radius")
  .min(0.01)
  .max(20)
  .step(0.01)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "branches")
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomness")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomnessPower")
  .min(1)
  .max(10)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

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
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

generateGalaxy();

// アニメーション
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  material.uniforms.uTime.value = elapsedTime;

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
uniform float uSize;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;

void main() {
  // Poisition
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Spin
  float angle = atan(modelPosition.x, modelPosition.z);
  float distanceToCenter = length(modelPosition.xz);
  float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
  angle += angleOffset;

  modelPosition.x = cos(angle) * distanceToCenter + aRandomness.x;
  modelPosition.y = aRandomness.y;
  modelPosition.z = sin(angle) * distanceToCenter + aRandomness.z;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  // Size
  gl_PointSize = uSize * aScale;
  gl_PointSize *= (1.0 / -viewPosition.z);

  // Color
  vColor = color;
}


```

```glsl
// fragment.glsl
varying vec3 vColor;

void main() {

  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 - strength;
  strength = pow(strength, 10.0);

  vec3 color = mix(vec3(0.0), vColor, strength);
  gl_FragColor = vec4(color, 1.0);

  #include <colorspace_fragment>
}

```

</details>

### 4.5. 出力結果

<a href="https://gyazo.com/6b0f034fbb2802c9b5886b3a2faaf3ec"><img src="https://i.gyazo.com/6b0f034fbb2802c9b5886b3a2faaf3ec.gif" alt="Image from Gyazo" width="1000"/></a>

数式を変えるとこんな感じにもなる

<a href="https://gyazo.com/ecf24bb54ffbb7c096f7f0848d07f6a3"><img src="https://i.gyazo.com/ecf24bb54ffbb7c096f7f0848d07f6a3.gif" alt="Image from Gyazo" width="1000"/></a>
