---
title: 58-environment-and-staging
date: 2024/09/25
updated: 2024/10/03
---

# 環境とステージングについて

> [!NOTE]
> この記事は下記のバージョンを使用しています
>
> - Three.js `three: v0.166.1`
> - React Three Fiber `@react-three/fiber: v8.16`
> - react-three-drei `@react-three/drei@9.108`
> - react-three-pref `r3f-perf@7.2`

- [下準備](#下準備)
- [背景色の変更](#背景色の変更)
- [ライトヘルパー](#ライトヘルパー)
- [影の追加と設定](#影の追加と設定)
  - [影の設定](#影の設定)
  - [影のベーキング](#影のベーキング)
  - [SoftShadows で影を柔らかくする](#softshadows-で影を柔らかくする)
  - [AccumulatativeShadows でリアルな影をレンダリング](#accumulatativeshadows-でリアルな影をレンダリング)

## 下準備

下記のソースコードから開始

<details>
<summary>jsxファイル(クリックして展開)</summary>

```jsx
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
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";

export default function Experience() {
  const cube = useRef();

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh ref={cube} position-x={2} scale={1.5}>
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

<a href="https://gyazo.com/e03ba3627b129b4cab96197e7a04f731"><img src="https://i.gyazo.com/e03ba3627b129b4cab96197e7a04f731.gif" alt="Image from Gyazo" width="986"/></a>

</details>

## 背景色の変更

[CSS で背景色を指定する方法](https://github.com/daiki-beppu/til/blob/main/til/frontend/3d-graphics/threejs/07-react-three-fiber/55-first-r3f-app.md#canvas-%E3%81%AE%E8%BF%BD%E5%8A%A0)は行なったが
今回は`R3F`で背景色を設定していく

`<color />`タグを使用し`attach`属性を使用して
`scene.background`にアクセスする

```jsx
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useRef } from "react";

export default function Experience() {
  const cube = useRef();

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      <color args={['skyblue']} attach={'background'} />

      <Perf position="top-left" />

      {/* ... * /}
    </>
  );
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/c80c17861a9200630cd7402ef401c7b6.png)](https://gyazo.com/c80c17861a9200630cd7402ef401c7b6)

## ライトヘルパー

ライトヘルパーを表示するには`drei`の`useHelper`,`useRef`と`THREE.(DirectionalLight)Helper`を使用します(任意のライト)

```jsx
import { OrbitControls, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import * as THREE from "three";

export default function Experience() {
  const cube = useRef();
  const directionalLightRef = useRef();
  useHelper(
    directionalLightRef, // 参照を指定
    THREE.DirectionalLightHelper, // 使用するヘルパー
    1 // ヘルパーのサイズ 1 => デフォルト値
    );

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      {/* ... */}

      <directionalLight
        ref={directionalLightRef}
        position={[1, 2, 3]}
        intensity={4.5}
      />
      <ambientLight intensity={1.5} />

      {/* ... /}
    </>
  );
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/4660c14fe7e2bce67bfb63327a7ed672.png)](https://gyazo.com/4660c14fe7e2bce67bfb63327a7ed672)

## 影の追加と設定

影のレンダリングを有効にするには
`<Canvas>`に`shadows`属性を追加するだけ

```jsx
import { Canvas } from "@react-three/fiber";
import ReactDOM from "react-dom/client";
import Experience from "./Experience.jsx";
import "./style.css";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Canvas
    shadows
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

あとはライトとメッシュに
影の投射(`castShadow`)と投影(`receiveShadow`)の設定を行う

- `castShadow`: 影の投射(`オブジェクトの`影を表示する)
- `receiveShadow`: 影の投影(`オブジェクトに`影を表示する)

```jsx
import {
  BakeShadows,
  OrbitControls,
  SoftShadows,
  useHelper,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import * as THREE from "three";

export default function Experience() {
  const cube = useRef();
  const directionalLightRef = useRef();
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      {/* ... */}

      <directionalLight
        ref={directionalLightRef}
        position={[1, 2, 3]}
        intensity={4.5}
        s
        castShadow
      />
      <ambientLight intensity={1.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh ref={cube} castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
```

**出力結果**

<a href="https://gyazo.com/87ba6a9679c31cbaeb3ea346536b9882"><img src="https://i.gyazo.com/87ba6a9679c31cbaeb3ea346536b9882.gif" alt="Image from Gyazo" width="987"/></a>

### 影の設定

`Three.js`では`directionalLight.shadow.mapSize.set(1024, 1024)`と記述することで
影の解像度を変更することが出来ます

`R3F`では属性から`.(ドット)`の代わりに`-(ハイフン)`を記述することで
影の設定を変更する事ができます

- `shadow-mapSize={[1024, 1024]}`: 影の解像度を変更
- `shadow-camera`: 影が描画される範囲を指定

```jsx
import { OrbitControls, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import * as THREE from "three";

export default function Experience() {
  const cube = useRef();
  const directionalLightRef = useRef();
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      {/* ... */}

      <directionalLight
        ref={directionalLightRef}
        position={[1, 2, 3]}
        intensity={4.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-left={-5}
        shadow-camera-bottom={-5}
      />
      <ambientLight intensity={1.5} />

      {/* ... */}
    </>
  );
}
```

**出力結果**

<a href="https://gyazo.com/8601940cd6eb0e30950b64a07c77dfee"><img src="https://i.gyazo.com/8601940cd6eb0e30950b64a07c77dfee.gif" alt="Image from Gyazo" width="989"/></a>

### 影のベーキング

`deri`から`BakeShadows`をインポートして
`<BakeShadows />`を記述することで影を一度レンダリングフレームごとではなく 1 回だけにする事ができる

これにより、動きがないシーンなどではかなりパフォーマンスが向上する

```jsx
import { BakeShadows, OrbitControls, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import * as THREE from "three";

export default function Experience() {
  const cube = useRef();
  const directionalLightRef = useRef();
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      <BakeShadows />

      <color args={["skyblue"]} attach={"background"} />

      <Perf position="top-left" />

      {/* ... */}
    </>
  );
}
```

**出力結果**

<a href="https://gyazo.com/01a325b6fe72eee0468f28bdfe58e691"><img src="https://i.gyazo.com/01a325b6fe72eee0468f28bdfe58e691.gif" alt="Image from Gyazo" width="995"/></a>

### SoftShadows で影を柔らかくする

`SoftShadows`は影を投影するオブジェクトと影を投射するオブジェクト間の距離に応じて
影のぼやけ具合を自動で調整してくれます

`Three.js`で実装する場合、シェーダーチャンクを直接変更する必要があり、難しいです
`R3F`なら`<SoftShadows />`を追加するだけで実装できる

`SoftShadows`の属性

- `size`: 柔らかさの半径
- `sample`: 品質(サンプル数が多いほどノイズが少なくなるがパフォーマンスは低下する)
- `focus`: 影が最も鮮明になる距離

```jsx
import {
  BakeShadows,
  OrbitControls,
  SoftShadows,
  useHelper,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import * as THREE from "three";

export default function Experience() {
  const cube = useRef();
  const directionalLightRef = useRef();
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      <BakeShadows />
      <SoftShadows size={25} samples={10} focus={0} />

      <color args={["skyblue"]} attach={"background"} />

      {/* ... */}
    </>
  );
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/330818b03374060503f51905cd062022.png)](https://gyazo.com/330818b03374060503f51905cd062022)

### AccumulatativeShadows でリアルな影をレンダリング

`AccumulatativeShadows`は複数の影のレンダリングを累積して
各レンダリングの前にライトをランダムに移動させることで
様々な角度からレンダリングした束で構成されるのでとてもリアルで柔らかい影をレンダリングすることができる
