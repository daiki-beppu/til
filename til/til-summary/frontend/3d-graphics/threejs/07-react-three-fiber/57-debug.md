---
title: 57-debug
date: 2024/09/24
updated: 2024/09/25
---

# デバッグについて

- [下準備](#下準備)
- [Leva を使用したデバッグ UI](#leva-を使用したデバッグ-ui)
  - [値の範囲を設定](#値の範囲を設定)
  - [ベクトルの設定](#ベクトルの設定)
  - [色の設定](#色の設定)
  - [オブジェクト表示、非表示の切り替え(チェックボックスの設定)](#オブジェクト表示非表示の切り替えチェックボックスの設定)
  - [関数を呼び出すボタン](#関数を呼び出すボタン)
  - [セレクターでの設定](#セレクターでの設定)
  - [フォルダで整理する](#フォルダで整理する)
  - [Leva の設定](#leva-の設定)
- [r3f-perf でのパフォーマンスモニタリング](#r3f-perf-でのパフォーマンスモニタリング)
  - [Leva に r3f-pref の表示切り替えを追加する](#leva-に-r3f-pref-の表示切り替えを追加する)

> [!NOTE]
> この記事は下記のバージョンを使用しています
>
> - Three.js `three: v0.166.1`
> - React Three Fiber `@react-three/fiber: v8.16`
> - react-three-drei `@react-three/drei@9.108`
> - leva `leva@0.9.34`
> - react-three-pref `r3f-perf@7.2`

## 下準備

以下のソースコードから開始

<details>
<summary>jsxファイル(クリックして展開)</summary>

```jsx
// index.jsx

import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";

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

import { OrbitControls } from "@react-three/drei";

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />

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

[![Image from Gyazo](https://i.gyazo.com/9e9f3abda47b7c50eeba21c43f9fa3f1.png)](https://gyazo.com/9e9f3abda47b7c50eeba21c43f9fa3f1)

</details>

## Leva を使用したデバッグ UI

`Leva`は、`React Three Fiber (R3F)` プロジェクトでよく使用される、強力で柔軟な GUI コントロールライブラリです。

まずは`Leva`のインストールを行う

```bash
# npm を使用する場合
npm install leva@0.9.34

# yarn を使用する場合
yarn add leva@0.9.34

# pnpm を使用する場合
pnpm add leva@0.9.34

# bun を使用する場合
bun add leva@0.9.34
```

`useControls`を使用しての引数にオブジェクトを渡し
`<mesh>`の属性に割り当てることでデバッグ UI を右上に表示することができ、UI を操作して値を変更することができる
分割代入を使用して変数を宣言することで短い記述ですむ

```jsx
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

export default function Experience() {
  const { position } = useControls({ position: -2 });
  // 引数で渡す position => 任意の名前(設定値として表示される値)

  return (
    <>
      {/* ... */}

      <mesh position-x={position}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* ... /}
    </>
  );
}
```

**出力結果**

<a href="https://gyazo.com/9a8f365843f8294a4c01a4a48b897bd3"><img src="https://i.gyazo.com/9a8f365843f8294a4c01a4a48b897bd3.gif" alt="Image from Gyazo" width="996"/></a>

### 値の範囲を設定

オブジェクトのプロパティ直接値を指定するのではなく
オブジェクトで`value`,`min`,`max`,`step`のキーで記述することで値の範囲を設定することができる

```jsx
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

export default function Experience() {
  const { position } = useControls({
    position: {
      value: -2,
      min: -10,
      max: 10,
      step: 0.01,
    },
  });

  return (
    <>
      {/* ... */}

      <mesh position-x={position}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* ... */}
    </>
  );
}
```

**出力結果**

<a href="https://gyazo.com/b17eb464a49aedd3503dc8276e710d31"><img src="https://i.gyazo.com/b17eb464a49aedd3503dc8276e710d31.gif" alt="Image from Gyazo" width="989"/></a>

### ベクトルの設定

これまでは x 軸に対してのみ設定していましたが
`value`にオブジェクトで各軸の値を設定し
`<mesh>`の属性に割り当てることでベクトルごとの変更が可能になります

2 軸以上指定すると範囲での調整はできなくなるので注意
ただし 2 軸の指定の場合ジョイスティックでの移動が可能になる

```jsx
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

export default function Experience() {
  const { position } = useControls({
    position: {
      value: { x: -2, y: 0, z: 0 },
      step: 0.01,
    },
  });

  return (
    <>
      {/* ... */}

      <mesh position={[position.x, position.y, position.z]}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* ... */}
    </>
  );
}
```

**出力結果**

<a href="https://gyazo.com/32257b35386fbe41bf55ec5ee77d67a3"><img src="https://i.gyazo.com/32257b35386fbe41bf55ec5ee77d67a3.gif" alt="Image from Gyazo" width="993"/></a>

**ジョイスティックを使用する場合の出力結果**

<a href="https://gyazo.com/ddea4dccbe6720ad5223b0590b6cc6e4"><img src="https://i.gyazo.com/ddea4dccbe6720ad5223b0590b6cc6e4.gif" alt="Image from Gyazo" width="990"/></a>

### 色の設定

カラーパレットで色を変更できるようになります
`color`を追加して割り当てるだけ

いろんなフォーマットをサポートしている

- `"rgb(255, 0, 0)"`
- `"orange"`
- `"hsl(100deg, 100%, 50%)"`
- `"hsla(100deg, 100%, 50%, 0.5)"`

アルファチャンネルを変更する場合は`tarnsparent`を有効化する必要がある

```jsx
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

export default function Experience() {
  const { position, color } = useControls({
    position: {
      value: { x: -2, y: 0 },
      step: 0.01,
    },
    color: "orange",
  });

  return (
    <>
      {/* ... */}

      <mesh position={[position.x, position.y, position.z]}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* ... */}
    </>
  );
}
```

**出力結果**

<a href="https://gyazo.com/00c14aee9769ea3b95338228690a6ca9"><img src="https://i.gyazo.com/00c14aee9769ea3b95338228690a6ca9.gif" alt="Image from Gyazo" width="990"/></a>

### オブジェクト表示、非表示の切り替え(チェックボックスの設定)

プロパティにブール値を設定することでチェックボックスでの切り替え可能になる

```jsx
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

export default function Experience() {
  const { position, color, visible } = useControls({
    position: {
      value: { x: -2, y: 0 },
      step: 0.01,
    },
    color: "orange",
    visible: true,
    checkbox: true,
  });

  return (
    <>
      {/* ... */}

      <mesh position={[position.x, position.y, position.z]}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* ... */}
    </>
  );
}
```

**出力結果**

<a href="https://gyazo.com/9f513a0a6c9e345747f0151122104b7f"><img src="https://i.gyazo.com/9f513a0a6c9e345747f0151122104b7f.gif" alt="Image from Gyazo" width="990"/></a>

### 関数を呼び出すボタン

`Leva`から`button`をインポートして
`button(()=> {})`で使用することができる

```jsx
import { OrbitControls } from "@react-three/drei";
import { button, useControls } from "leva";

export default function Experience() {
  const { position, color, visible } = useControls({
    position: {
      value: { x: -2, y: 0 },
      step: 0.01,
    },
    color: "orange",
    visible: true,
    checkbox: true,
    button: button(() => {
      console.log("click");
    }),
  });

  return (
    <>
      {/* ... */}

      <mesh position={[position.x, position.y, position.z]}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* ... */}
    </>
  );
}
```

**出力結果**

<a href="https://gyazo.com/2a8268a8637012fb9c06e63e03ba4f57"><img src="https://i.gyazo.com/2a8268a8637012fb9c06e63e03ba4f57.gif" alt="Image from Gyazo" width="1000"/></a>

### セレクターでの設定

`options`プロパティに配列を設定することで設定した要素からセレクターで選択できる様になる

```jsx
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

export default function Experience() {
  const { position, color, visible } = useControls({
    position: {
      value: { x: -2, y: 0 },
      step: 0.01,
    },
    color: "orange",
    visible: true,
    checkbox: true,
    button: button(() => {
      console.log("click");
    }),
    selecter: { options: ["case1", "case2", "case3"] },
  });

  return (
    <>
      {/* ... */}

      <mesh position={[position.x, position.y, position.z]}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* ... */}
    </>
  );
}
```

**出力結果**

<a href="https://gyazo.com/3033248a0a7eca107cc9562b144b1ab1"><img src="https://i.gyazo.com/3033248a0a7eca107cc9562b144b1ab1.gif" alt="Image from Gyazo" width="996"/></a>

### フォルダで整理する

フォルダを作成する場合は`useControls`の第一引数に`folderName`を指定してあげる
フォルダを複数作成する場合は`useControls`を複数作成すればいい

フォルダの中にフォルダを作成したい場合は`folder()`を使用する

```jsx
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

export default function Experience() {
  const { position, color, visible } = useControls("sphere", {
    position: {
      value: { x: -2, y: 0 },
      step: 0.01,
    },
    color: "orange",
    bool: folder({
      visible: true,
      checkbox: true,
    }),

    button: button(() => {
      console.log("click");
    }),
    selecter: { options: ["case1", "case2", "case3"] },
  });

  const { scale } = useControls("cube", {
    scale: {
      value: 1.5,
      min: 1.5,
      max: 4,
      step: 0.01,
    },
  });

  return (
    <>
      {/* ... */}

      <mesh position={[position.x, position.y, position.z]}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* ... */}
    </>
  );
}
```

**出力結果**

<a href="https://gyazo.com/9288e8b472bd18defdae762a122d0703"><img src="https://i.gyazo.com/9288e8b472bd18defdae762a122d0703.gif" alt="Image from Gyazo" width="989"/></a>

### Leva の設定

`Experience.jsx`内だと属性から設定を変更できないので
`index.jsx`に`<Leva />`を記述します

こうすることでコンポーネントの属性から設定を変更することが出来ます

```jsx
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Experience from "./Experience.jsx";
import "./style.css";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <StrictMode>
    <Leva collapsed /> {/* デフォルトで閉じる */}
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
  </StrictMode>
);
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/981a96643b83685a6b6f69f466c821a2.png)](https://gyazo.com/981a96643b83685a6b6f69f466c821a2)

## r3f-perf でのパフォーマンスモニタリング

`r3f-perf` は、FPS、レンダリング時間、メモリ使用量などの重要な指標を提供します。これらの指標を監視することで、パフォーマンスのボトルネックを特定し、最適化の方向性を決定できます。

`r3f-perf` を使用するには依存関係を追加します

```bash
# npm を使用する場合
npm install r3f-perf@7.2

# yarn を使用する場合
yarn add r3f-perf@7.2

# pnpm を使用する場合
pnpm add r3f-perf@7.2

# bun を使用する場合
bun add r3f-perf@7.2
```

あとは`JSX`に`<Perf />`を追加するだけです
デフォルトでは右上に表示され`Leva`とかぶるので`position`属性に`top-left`を設定します

```jsx
import { OrbitControls } from "@react-three/drei";
import { button, folder, useControls } from "leva";
import { Perf } from "r3f-perf";

export default function Experience() {
  const { position, color, visible } = useControls("sphere", {
    position: {
      value: { x: -2, y: 0 },
      step: 0.01,
    },
    color: "orange",
    bool: folder({
      visible: true,
      checkbox: true,
    }),

    button: button(() => {
      console.log("click");
    }),
    selecter: { options: ["case1", "case2", "case3"] },
  });

  const { scale } = useControls("cube", {
    scale: {
      value: 1.5,
      min: 1.5,
      max: 4,
      step: 0.01,
    },
  });

  return (
    <>
      <Perf position={"top-left"} />
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh position={[position.x, position.y, 0]} visible={visible}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position-x={2} scale={scale}>
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

### Leva に r3f-pref の表示切り替えを追加する

`<Perf />`には`visible`属性が無いので少し回りくどい方法で行う必要がある
`論理 AND 演算子(&&)`を使用して `ture` のときに表示 `false` のときに非表示にします

> [!NOTE]
>
> 📝 **Memo**
>
> **論理 AND 演算子(&&)**
>
> 論理 AND 演算子は
> `&&` より左の値が`truthy`な場合 `&&` より右の値を評価して返す
> `&&` より左の値が`falsy`な場合 `&&` 左の値を評価して返す (短絡評価)
>
> **truthy, falsy な値**
>
> truthy な値は falsy な値以外の値のこと
> fasly な値は `JavaScript`では以下の値のこと
>
> - `false`
> - `0`
> - `null`
> - `''(空文字)`
> - `undefined`
> - `NaN`

```jsx
import { OrbitControls } from "@react-three/drei";
import { button, folder, useControls } from "leva";
import { Perf } from "r3f-perf";

export default function Experience() {
  const { prefVisible } = useControls({
    prefVisible: true,
  });

  // ...

  return (
    <>
      {prefVisible && <Perf position={"top-left"} />}

      {/* ... */}
    </>
  );
}
```

**出力結果**

<a href="https://gyazo.com/c81be6a9c6489de6dbd7daed7944153b"><img src="https://i.gyazo.com/c81be6a9c6489de6dbd7daed7944153b.gif" alt="Image from Gyazo" width="989"/></a>
