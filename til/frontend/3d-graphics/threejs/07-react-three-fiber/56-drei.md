---
title: 56-drei
date: 2024/09/23
updated: 2024/09/23
---

# React Three Drei について

- [下準備](#下準備)
- [R3F drei とは：React Three Fiber のための強力な拡張ライブラリ](#r3f-drei-とはreact-three-fiber-のための強力な拡張ライブラリ)
- [R3F drei の準備](#r3f-drei-の準備)
- [オービットコントロール](#オービットコントロール)
- [トランスフォームコントロール](#トランスフォームコントロール)
  - [修正: ギズモをオブジェクトと同じ位置に表示する](#修正-ギズモをオブジェクトと同じ位置に表示する)
  - [修正: ギズモの操作中はオービットコントロールを無効にする](#修正-ギズモの操作中はオービットコントロールを無効にする)
  - [mode 属性](#mode-属性)

> [!NOTE]
> この記事は下記のバージョンを使用しています
>
> - Three.js `three: v0.166.1`
> - React Three Fiber `@react-three/fiber: v8.16`
> - react-three-drei `@react-three/drei@9.108`

## 下準備

以下のソースコードから開始

<details>
<summary> jsxファイル(クリックして展開)</summary>

```jsx
// index.jsx

import { Canvas } from "@react-three/fiber";
import ReactDOM from "react-dom/client";
import Experience from "./Experience.jsx";
import "./style.css";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Canvas
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [-4, 3, 6],
    }}
  >
    <Experience />
  </Canvas>
);
```

```jsx
// Experience.jsx

import { extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

extend({ OrbitControls });

export default function Experience() {
  const { camera, gl } = useThree();

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
```

[![Image from Gyazo](https://i.gyazo.com/42533e19ce2189483a4f39b5a469b5cc.png)](https://gyazo.com/42533e19ce2189483a4f39b5a469b5cc)

</details>

## R3F drei とは：React Three Fiber のための強力な拡張ライブラリ

`react-three-drei`（通称 drei）は、`React Three Fiber`（R3F）のための強力なヘルパーライブラリです。Three.js を React で使用するための R3F の機能を拡張し、3D シーンの作成と操作を大幅に簡素化します。

drei が提供する主な機能：

- 便利なコントロール（OrbitControls, TransformControls など）
- テキスト、ボックス、平面などの共通の 3D プリミティブ
- テクスチャ、マテリアル、ライティングの簡易設定
- パフォーマンス最適化ツール

これらの機能により、開発者はより少ないコードでより豊かな 3D 体験を作成できます。

## R3F drei の準備

> [!WARNING]
>
> 使用しているパッケージマネージャーに合わせてコマンドを変更してください

```bash
# npm を使用する場合
npm install @react-three/drei@9.108

# yarn を使用する場合
yarn add @react-three/drei@9.108

# pnpm を使用する場合
pnpm add @react-three/drei@9.108

# bun を使用する場合
bun add @react-three/drei@9.108
```

## オービットコントロール

`react-three-drei`から`OrbitControls`をインポートして
`<OrbitControls />`を記述するだけでオービットコントロールを適用できます

```jsx
import { OrbitControls } from "@react-three/drei";

export default function Experience() {
  return (
    <>
      <OrbitControls />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      {/* ... */}
    </>
  );
}
```

**出力結果**

<a href="https://gyazo.com/e502c78feb0664ca2c673ca67a5f59d6"><img src="https://i.gyazo.com/e502c78feb0664ca2c673ca67a5f59d6.gif" alt="Image from Gyazo" width="998"/></a>

元のソースコードと比較しても
`extend`や`useThree`は使用しなくてもよくなりました

```jsx
// 元のソースコードとの比較

// Experience.jsx

import { extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

extend({ OrbitControls });

export default function Experience() {
  const { camera, gl } = useThree();

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      {/* ... */}
    </>
  );
}
```

## トランスフォームコントロール

`<TransformControls>`を使用することで
オブジェクトを変換するためのギズモを表示することができる

`<mesh>`を`<TransformControls>`で囲むことでそのオブジェクト対するギズモを表示できます

```jsx
import { OrbitControls, TransformControls } from "@react-three/drei";

export default function Experience() {
  return (
    <>
      <OrbitControls />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <TransformControls>
        <mesh position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </TransformControls>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
```

[![Image from Gyazo](https://i.gyazo.com/03ac2f984a8ee34de8edfd93c90142a0.png)](https://gyazo.com/03ac2f984a8ee34de8edfd93c90142a0)

この場合、オブジェクトではなくシーンの中心にギズモが表示されてしまいます。
また、ギズモを操作するときもオービットコントロールが有効なので操作しづらいです。
これらを修正します

### 修正: ギズモをオブジェクトと同じ位置に表示する

`<mesh>`のあとに`<TransformControls />`を移動させ
`useRef`を使用して`object`属性を使用して関連付けることで修正することができます

```jsx
import { OrbitControls, TransformControls } from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const cubeRef = useRef();
  return (
    <>
      {/* ... */}

      <mesh ref={cubeRef} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <TransformControls object={cubeRef} />

      {/* ... */}
    </>
  );
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/ad2f7568da492f6981659230e74737cb.png)](https://gyazo.com/ad2f7568da492f6981659230e74737cb)

### 修正: ギズモの操作中はオービットコントロールを無効にする

こちらはとても簡単で`<OrbitControls>`に`makeDefault`属性を追加するだけです

```jsx
import { OrbitControls, TransformControls } from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const cubeRef = useRef();
  return (
    <>
      <OrbitControls makeDefault />

      {/* ... */}

      <mesh ref={cubeRef} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <TransformControls object={cubeRef} />

      {/* ... */}
    </>
  );
}
```

**出力結果**

<a href="https://gyazo.com/66b8f94d95b7b9ead2c8c6d7ce7e886e"><img src="https://i.gyazo.com/66b8f94d95b7b9ead2c8c6d7ce7e886e.gif" alt="Image from Gyazo" width="995"/></a>

### mode 属性

デフォルトは`translate`(位置)が設定されている
`mode`属性から回転やスケールもギズモで操作することができます

- `mode={"rotate"}` => 回転
- `mode={"scale"}` => スケール

```jsx
import { OrbitControls, TransformControls } from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const cubeRef = useRef();
  return (
    <>
      {/* ... */}

      <TransformControls object={cubeRef} mode="rotate" />

      {/* ... */}
    </>
  );
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/57df122827c210266712786479d78cd5.png)](https://gyazo.com/57df122827c210266712786479d78cd5)

```jsx
import { OrbitControls, TransformControls } from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const cubeRef = useRef();
  return (
    <>
      {/* ... */}

      <TransformControls object={cubeRef} mode="scale" />

      {/* ... */}
    </>
  );
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/0e39d99b0b8d39a75c1e52026df11701.png)](https://gyazo.com/0e39d99b0b8d39a75c1e52026df11701)
