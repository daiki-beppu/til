---
title: 55-first-r3f-app
date: 2024/09/21
updated: 2024/09/21
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

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/aa5c1b7fa49c28d282c91d532191710a.png)](https://gyazo.com/aa5c1b7fa49c28d282c91d532191710a)

3D オブジェクトが表示されたが小さい
これは`<cavas>`タグのサイズが原因

css で<canvas>のサイズを変更する

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

`<canvas>`タグがビューポートいっぱいに表示された！

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
> - カメラの自動設定: あらかじめ`PerspectiveCamera`の配置され、あらかじめカメラをシーンの中央から引いて移す必要もない
> - 自動リサイズ設定: ビューポートのリサイズも自動的に処理される
> - デフォルト値の設定: ほとんどのコンポーネントにデフォルトの値が設定されているので値の指定が必要ない
