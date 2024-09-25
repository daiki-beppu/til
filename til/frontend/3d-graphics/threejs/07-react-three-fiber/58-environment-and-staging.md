---
title: 58-environment-and-staging
date: 2024/09/25
updated: 2024/09/25
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

CSS で背景色を指定する方法は行なったが
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
