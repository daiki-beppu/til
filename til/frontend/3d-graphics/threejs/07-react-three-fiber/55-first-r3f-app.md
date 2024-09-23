---
title: 55-first-r3f-app
date: 2024/09/21
updated: 2024/09/23
---

# 最初の R3F アプリケーションの制作

- [下準備](#下準備)
- [React Three Fiber (R3F) の準備](#react-three-fiber-r3f-の準備)
- [R3F の構文](#r3f-の構文)
  - [シンプルなメッシュ(ボックスジオメトリ)](#シンプルなメッシュボックスジオメトリ)
  - [位置と回転](#位置と回転)
  - [グループ化されたオブジェクト](#グループ化されたオブジェクト)
- [最初のシーンを作成](#最初のシーンを作成)
  - [Canvas の追加](#canvas-の追加)
- [メッシュの作成とパラメータ処理](#メッシュの作成とパラメータ処理)
  - [ジオメトリのパラメータ設定](#ジオメトリのパラメータ設定)
  - [マテリアルのパラメータ設定](#マテリアルのパラメータ設定)
  - [メッシュの変換](#メッシュの変換)
- [useFrame と useRef を使用したアニメーション](#useframe-と-useref-を使用したアニメーション)
  - [useFrame とは](#useframe-とは)
  - [useFrame の使用方法](#useframe-の使用方法)
  - [useRef と組み合わせてアニメーションを適用](#useref-と組み合わせてアニメーションを適用)
- [オービットコントロール](#オービットコントロール)
- [ライトの追加](#ライトの追加)
- [カスタムジオメトリの作成](#カスタムジオメトリの作成)
  - [position 配列の作成](#position-配列の作成)
  - [BufferGeometry と BufferAttribute の設定](#buffergeometry-と-bufferattribute-の設定)
  - [useMemo で頂点を最適化する](#usememo-で頂点を最適化する)
  - [useRef と useEffect を使用して法線を再計算する](#useref-と-useeffect-を使用して法線を再計算する)

> [!NOTE]
> この記事は下記のバージョンを使用しています
>
> - Three.js `three: v0.166.1`
> - React Three Fiber `@react-three/fiber: v8.16`

## 下準備

以下のソースコードから開始

<details>
<summary>. jsxファイル(クリックして展開)</summary>

```jsx
// index.jsx

import ReactDOM from "react-dom/client";
import "./style.css";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(<div>Soon to be a badass R3F application</div>);
```

**出力結果**
[![Image from Gyazo](https://i.gyazo.com/b36dd4357c1991e7939da9b3759834fd.jpg)](https://gyazo.com/b36dd4357c1991e7939da9b3759834fd)

</details>

## React Three Fiber (R3F) の準備

> [!WARNING]
>
> 使用しているパッケージマネージャーに合わせてコマンドを変更してください

ターミナルから

```bash
# npm を使用する場合
npm install three@0.166 @react-three/fiber@8.16

# yarn を使用する場合
yarn add three@0.166 @react-three/fiber@8.16

# pnpm を使用する場合
pnpm add three@0.166 @react-three/fiber@8.16

# bun を使用する場合
bun add three@0.166 @react-three/fiber@8.16
```

## R3F の構文

`Three.js` と `R3F`の違いがわかりやすいようにそれぞれを記述します

### シンプルなメッシュ(ボックスジオメトリ)

```js
// Three.js の場合

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
```

```jsx
// R3F の場合
<mesh>
  <boxGeometry />
  <meshBasicMaterial color="red" />
</mesh>
```

### 位置と回転

```js
// Three.js の場合

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);

mesh.position.set(1, 2, 3);
mesh.rotation.x = Math.PI / 2;

scene.add(mesh);
```

```jsx
// R3F の場合
<mesh position={[1, 2, 3]} rotation-x={Math.PI / 2}>
  <boxGeometry />
  <meshBasicMaterial color="red" />
</mesh>
```

### グループ化されたオブジェクト

```js
// Three.js の場合

const group = new THREE.Group();
scene.add(group);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: "red" });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

group.add(boxMesh, sphereMesh);
```

```jsx
// R3F の場合
<group>
  <mesh>
    <boxGeometry />
    <meshBasicMaterial color="red" />
  </mesh>
  <mesh>
    <sphereGeometry />
    <meshBasicMaterial color="orange" />
  </mesh>
</group>
```

> [!NOTE]
>
> 📝 **Memo**
>
> ** R3F はどのようにしてコンポーネントの組み合わせを知るのか **
>
> `R3F`は最初にコンポーネント名前をチェックする
>
> - `Material`で終了する場合、自動的に`material`プロパティを割り当てる
> - `Geometry`で終了する場合。自動的に`geometry`プロパティを割り当てる
>
> **どこまで Three.js のクラスがサポートされているのか？**
>
> `R3F`にはすべての`Three.js`クラスがサポートされている
>
> **R3F の命名規則について**
>
> 基本的なコンポーネント名は`PascalCase(パスカルケース)`
>
> - `React`の命名規則を踏襲
> - 例: `<Box />, <Canvas />`
>
> `Three.js`のオブジェクトに対応するコンポーネントは`camelCase(キャメルケース)`
>
> - `Three.js`の命名規則を踏襲
> - 例: `<mesh>`, `<boxGeomrtry />`

## 最初のシーンを作成

### Canvas の追加

`Canvas` コンポーネントは R3F アプリケーションの基盤となる重要な要素です。このコンポーネントは Three.js のレンダリングコンテキストを設定し、その中に配置された全ての 3D オブジェクトを管理します。`Canvas` の中に配置されたコンポーネントは、3D シーンの一部として扱われます。

`Canvas`をインポートして`index.jsx`に追加

```jsx
import { Canvas } from "@react-three/fiber";
```

```jsx
import { Canvas } from "@react-three/fiber";
import ReactDOM from "react-dom/client";
import Experience from "./components/Experience";
import "./style.css";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(<Canvas></Canvas>);
```

`R3F` に関連するすべてのものをカプセル化するための
コンポーネント(`/src/componenst/Experience.jsx`)を作成

`Experience` コンポーネントは、R3F に関連するすべての要素を一つにまとめます。これにより、3D シーンの管理が容易になり、アプリケーションの構造がより明確になります。

```jsx
export default function Experience() {
  return (
    <>
      <mesh>
        <torusKnotGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
}
```

```jsx
import { Canvas } from "@react-three/fiber";
import ReactDOM from "react-dom/client";
import Experience from "./components/Experience";
import "./style.css";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Canvas>
    <Experience />
  </Canvas>
);
```

<details>
<summary>Three.jsの場合(クリックして展開)</summary>

```js
// Canvas
const canvas = document.querySelector("canvas.webgl");

// シーン
const scene = new THREE.Scene();

// リサイズ
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
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 8;
scene.add(camera);

// レンダラー

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

</details>

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/aa5c1b7fa49c28d282c91d532191710a.png)](https://gyazo.com/aa5c1b7fa49c28d282c91d532191710a)

3D オブジェクトが表示されたが小さい
これは`<cavas>`タグのサイズが原因

css で`<canvas>`のサイズを変更する

```css
html,
body,
#root {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: darkgrey;
}
```

**出力結果**

`<Canvas>`コンポーネントがビューポートいっぱいに表示された！

[![Image from Gyazo](https://i.gyazo.com/9281813ffdcaab3facc6c0a91259991d.png)](https://gyazo.com/9281813ffdcaab3facc6c0a91259991d)

> [!NOTE]
>
> 📝 **Memo**
>
> **`<Canvas></Canvas>`でなにがおきているのか？**
>
> - 自動レンダリング:動きがないのでわからないがシーンを各フレームでレンダリングされている
> - シーンの自動生成: あらかじめ`Scene`が作成されている
> - レンダラーの自動生成: あらかじめ`WebGLRenderer`の作成されていてる
> - カメラの自動設定: あらかじめ`PerspectiveCamera`の配置され、カメラをシーンの中央から引いて移す必要もない
> - 自動リサイズ設定: ビューポートのリサイズも自動的に処理される
> - デフォルト値の設定: ほとんどのコンポーネントにデフォルトの値が設定されているので値の指定が必要ない

## メッシュの作成とパラメータ処理

メッシュの作成は `<mesh>` タグでジオメトリとマテリアルを囲むことで行います。R3F では、Three.js のオブジェクトに対応するコンポーネントを提供しており、これらを組み合わせることで 3D オブジェクトを作成できます。

### ジオメトリのパラメータ設定

ジオメトリは `args` 属性でパラメータを設定します。`args` 属性は配列を受け取り、その要素は `Three.js` のコンストラクタに渡される引数と同じ順序で指定する。

```jsx
// 記述例

<sphereGeometry args={[radius, widthSegments, heightSegments]} />
<boxGeometry args={[width, height, depth]} />
<cylinderGeometry args={[radiusTop, radiusBottom, height, radialSegments]} />
```

注意点：

- `args` の値は必ず配列で指定する
- パラメータの順序は `Three.js` のドキュメントを参照する

### マテリアルのパラメータ設定

マテリアルも args 属性でパラメータを設定できますが、プロパティ名を直接指定する方がより読みやすく、柔軟性が高い。

```jsx
// 記述例

<meshBasicMaterial color="orange" wireframe />
<meshStandardMaterial roughness={0.4} metalness={0.7} color="#00ff00" />
<meshPhongMaterial specular="#ff0000" shininess={100} />
```

### メッシュの変換

メッシュの変換は`<mesh>`タグ内で行う

**メッシュの位置**

- Threejs: `mesh.position.x = 2` => R3F: `position-x={2}`
- Threejs: `mesh.position.set(x, y, z)` => R3F: `position={[x, y, z]}`

**メッシュのスケール**

- Threejs: `mesh.scale.x = 2` => R3F: `scale-x={2}`
- Threejs: `mesh.scale.set(x, y, z)` => R3F: `scale={[x, y, z]}`

**メッシュの回転**

- Threejs: `mesh.rotation.x = Math.PI / 2` => R3F: `rotation-x={Math.PI / 2}`

```jsx
export default function Experience() {
  return (
    <>
      <group>
        {/*右側（x軸の正の方向）に配置し、サイズを1.5倍に拡大。*/}
        <mesh position-x={2} scale={1.5}>
          <boxGeometry />
          <meshBasicMaterial color={"skyblue"} /> {/* 水色に変更*/}
        </mesh>
        <mesh position-x={-2}>
          {" "}
          {/*左側（x軸の負の方向）に配置*/}
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={"orange"} />
        </mesh>
      </group>

      {/*下側（y軸の負の方向）に配置し、x軸を基準に90度回転させ、サイズを10倍に拡大*/}
      <mesh position-y={-1} rotation-x={-Math.PI / 2} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color={"yellowgreen"} />
      </mesh>
    </>
  );
}
```

<details>
<summary>Three.js の場合(クリックして展開)</summary>

```js
const group = new THREE.Group();

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: "skyblue" });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.x = 2;
boxMesh.scale.set(1.5, 1.5, 1.5);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: "orange" });
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.x = -2;

group.add(boxMesh, sphereMesh);

const planeGeometry = new THREE.PlaneGeometry(1, 1);
const planeMaterial = new THREE.MeshBasicMaterial({ color: "yellowgreen" });
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.position.y = -1;
planeMesh.rotation.x = -Math.PI / 2;
planeMesh.scale.set(10, 10, 10);
```

</details>

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/e6e55352cb41c01669fb2bc060ec83f4.png)](https://gyazo.com/e6e55352cb41c01669fb2bc060ec83f4)

## useFrame と useRef を使用したアニメーション

`useFrame` と `useRef` を組み合わせることで、特定のオブジェクトに対して毎フレーム更新を行うことができます。`useRef` で参照を作成し、その参照を通じて `useFrame` 内でオブジェクトを操作します。これにより、効率的かつ柔軟なアニメーションの実装が可能になります。

### useFrame とは

`useFrame`は、`R3F`ライブラリの中核的なフックの一つで、3D シーンのアニメーションと更新を管理するために使用されます。

> [!NOTE]
>
> 📝 **Memo**
>
> `useFrame`は`Three.js`の`requestAnimationFrame`を`React`に適応させたものと考えるとわかりやすい

### useFrame の使用方法

`useFrame`はコールバック関数として使用し
コールバック内で記述された処理を各フレームで呼び出すフックです

```jsx
useFrame((state, delta) => {
  console.log("test");
});
```

> [!NOTE]
>
> 📝 **Memo**
>
> **引数の `state` と `delta` について**
>
> - `state`: カメラ、レンダラー、シーンなどの Three.js 環境に関する情報
> - `delta`: 最後のフレームからの経過時間

### useRef と組み合わせてアニメーションを適用

`useRef`については[はじめての React アプリケーション](https://github.com/daiki-beppu/til/blob/main/til/frontend/3d-graphics/threejs/07-react-three-fiber/54-first-react-app.md#useref-%E3%81%A7%E7%89%B9%E5%AE%9A%E3%81%AE%E8%A6%81%E7%B4%A0%E3%81%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%81%99%E3%82%8B)で詳しく記述

```jsx
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Experience() {
  const cubeRef = useRef();

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;
  });

  return (
    <>
      <group>
        <mesh ref={cubeRef} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshBasicMaterial color={"skyblue"} />
        </mesh>

       {* ... *}
    </>
  );
}
```

<details>
<summary>Three.js の場合(クリックして展開)</summary>

```js
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "skyblue" });
const cube = new THREE.Mesh(geometry, material);
cube.position.x = 2;
cube.scale.set(1.5, 1.5, 1.5);
scene.add(cube);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```

</details>

**出力結果**

<a href="https://gyazo.com/114be4f343cf04102531acd5defac2eb"><img src="https://i.gyazo.com/114be4f343cf04102531acd5defac2eb.gif" alt="Image from Gyazo" width="995"/></a>

## オービットコントロール

`@react-three-drei`を使うと簡単にできるが
今回は`@react-three-drei`を使用しない方法で行う

R3F の`extend`と`useThree`を使用する

- `extend`: Three.js のクラスを宣言型に自動変換し`JSX`で使用できるようにする
- `useThree`: 最初のレンダリング時にカメラ、レンダラー、シーンなどの Three.js 環境に関する情報を取得する

```jsx
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/Addons.js";

extend({ OrbitControls });

export default function Experience() {
  const { camera, gl } = useThree();
  const cubeRef = useRef();

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      {* ... *}
    </>
  );
}
```

<details>
<summary>Three.js の場合(クリックして展開)</summary>

```js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
```

</details>

**出力結果**

<a href="https://gyazo.com/ea7245b044486908948adbd33cc343c3"><img src="https://i.gyazo.com/ea7245b044486908948adbd33cc343c3.gif" alt="Image from Gyazo" width="989"/></a>

## ライトの追加

シーンをよりリアルに見せるためライトを追加しマテリアルを
`meshBasicMaterial` => `meshStanderdMaterial`に変更します

ライトの追加は
`<directionalLight />`, `<ambientLight />`で行うことが出来ます

> [!NOTE]
>
> 📝 **Memo**
>
> `<directionalLight />`はデフォルトでは真上から照射する

```jsx
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/Addons.js";

extend({ OrbitControls });

export default function Experience() {
  const { camera, gl } = useThree();
  const cubeRef = useRef();

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight position={[1, 2, 3]} intensity={3.5} />
      <ambientLight intensity={1.5} />

      {/* ... */}
    </>
  );
}
```

<details>
<summary>Three.js の場合(クリックして展開)</summary>

```js
const directionalLight = new THREE.DirectionalLight(0xffffff, 3.5);
directionalLight.position.set(1, 2, 3);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);
```

</details>

**出力結果**

<a href="https://gyazo.com/40b0fc8f03766d3d81254e031d4331dc"><img src="https://i.gyazo.com/40b0fc8f03766d3d81254e031d4331dc.gif" alt="Image from Gyazo" width="989"/></a>

## カスタムジオメトリの作成

カスタムジオメトリを作成する前に新しいコンポーネント(`/src/components/CustomObuject.jsx`)を作成します

```jsx
..
// CustomObuject.jsx に記述
export default function CustomObject() {
  // テストメッシュ
  <mesh>
    <boxGeometry />
    <meshStandardMaterial color={"red"} />
  </mesh>;
}
```

```jsx
// Experience.jsx に記述

import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import CustomObject from "./CustomObuject";

extend({ OrbitControls });

export default function Experience() {
  const { camera, gl } = useThree();
  const cubeRef = useRef();

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;
  });

  return (
    <>
      {/* ... */}

      <mesh position-y={-1} rotation-x={-Math.PI / 2} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color={"yellowgreen"} />
      </mesh>

      <CustomObject />
    </>
  );
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/b63a6cd63f2b6fa63777410d78b18663.png)](https://gyazo.com/b63a6cd63f2b6fa63777410d78b18663)

### position 配列の作成

```jsx
export default function CustomObject() {
  const verticesCount = 10 * 3; // 三角形の数 * 頂点の数

  // 頂点の位置を保存する配列
  const positions = new Float32Array(verticesCount * 3);
  // * 3 => 頂点ごとに x, y, z の値が必要なため

  // -1.5 から 1.5 のランダムな値を配列に保存
  for (let i = 0; i < verticesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 3;
  }

  return {
    /* ... */
  };
}
```

### BufferGeometry と BufferAttribute の設定

`BufferGeometry`は`<bufferGeometry>`タグで囲むことで設定する事ができる
`<bufferGeometry>`タグ内に`<bufferAttribute />`タグを記述し各属性を設定することでことで`BufferAttribute`を設定することができる

> [!NOTE]
>
> 📝 **Memo**
>
> **`<bufferAttribute />`の属性について**
>
> - `attach`: `"attributes-position"` => `geometry.attribute.position`に変換する
> - `count`: 頂点の数
> - `itemSize`: 1 つの頂点を構成する配列の項目数
> - `array`: 適用する配列

```jsx
export default function CustomObject() {
  // ...

  return {
  <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={DoubleSide} />
    </mesh>
  };
}
```

<details>
<summary>Three.js の場合(クリックして展開)</summary>

```js
const verticesCount = 10 * 3;
const positions = new Float32Array(verticesCount * 3);

for (let i = 0; i < verticesCount * 3; i++) {
  i3 = i * 3;
  positions[i] = (Math.random() - 0.5) * 3;
  positions[i + 1] = (Math.random() - 0.5) * 3;
  positions[i + 2] = (Math.random() - 0.5) * 3;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.MeshStandardMaterial({
  color: "red",
  side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

</details>

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/5d5f781ca459043d4e5a51704ef5041b.png)](https://gyazo.com/5d5f781ca459043d4e5a51704ef5041b)

### useMemo で頂点を最適化する

`useMemo` で頂点の情報をキャシュしておき
コンポーネントが再レンダリングされた場合キャッシュしている値を返すようにします

```jsx
import { useMemo, useRef } from "react";
import { DoubleSide } from "three";

export default function CustomObject() {
  const verticesCount = 10 * 3;

  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }

    return positions;
  }, []);

  return {
    {/* ... */}
  };
}
```

### useRef と useEffect を使用して法線を再計算する

```jsx
import { useEffect, useMemo, useRef } from "react";
import { DoubleSide } from "three";

export default function CustomObject() {
  const geometryRef = useRef();
  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, []);

  const verticesCount = 10 * 3;

  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }

    return positions;
  }, []);

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={DoubleSide} />
    </mesh>
  );
}
```


