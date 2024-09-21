---
title: 55-first-r3f-app
date: 2024/09/21
updated: 2024/09/21
---

# 最初の R3F アプリケーションの制作

- [下準備](#下準備)
- [React Three Fiber (R3F) のセットアップ](#react-three-fiber-r3f-のセットアップ)
- [R3F の構文](#r3f-の構文)
  - [シンプルなメッシュ(ボックスジオメトリ)](#シンプルなメッシュボックスジオメトリ)
  - [位置と回転](#位置と回転)
  - [グループ化されたオブジェクト](#グループ化されたオブジェクト)

> [!NOTE]
> この記事は下記のバージョンを使用しています
>
> - Three.js `three: v0.166.1`
> - React Three Fiber `@react-three/fiber: v8.16`

## 下準備

以下のソースコードからスタート

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

## React Three Fiber (R3F) のセットアップ

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
  <boxGeometry  />
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
