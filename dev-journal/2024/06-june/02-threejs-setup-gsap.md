# 2024/6/2 開発日誌

制作物
https://threejs-demo-rose.vercel.app/

- [開発環境](#開発環境)
- [目的:GSAP(ライブラリ)を使ってアニメーションを付与](#目的gsapライブラリを使ってアニメーションを付与)
  - [GSAP のインストール](#gsap-のインストール)
  - [アニメーションの付与](#アニメーションの付与)
- [目的:マウスでカメラを制御する](#目的マウスでカメラを制御する)
  - [OrbitControls を使って実装](#orbitcontrols-を使って実装)
    - [OrbitControls をインポート](#orbitcontrols-をインポート)
    - [OrbitControls クラスからインスタンス化](#orbitcontrols-クラスからインスタンス化)


## 開発環境

- Next.js (app Router)
- Tailwind CSS
- Three.js

## 目的:GSAP(ライブラリ)を使ってアニメーションを付与

### GSAP のインストール

`bun add gsap@latest`

### アニメーションの付与

```js
// gsap
const tl = gsap.timeline();
tl.to(boxGroup.position, { x: 1 })
  .to(boxGroup.rotation, { x: Math.PI })
  .to(boxGroup.position, { y: -2 })
  .to(boxGroup.rotation, { y: Math.PI, x: Math.PI })
  .to(boxGroup.position, { x: -1.5 })
  .to(boxGroup.rotation, { x: -Math.PI })
  .to(boxGroup.position, { y: 2 })
  .to(boxGroup.rotation, { y: -Math.PI, x: -Math.PI })
  .to(boxGroup.position, { x: 1.5 })
  .to(boxGroup.rotation, { x: Math.PI })
  .to(boxGroup.position, { y: -0.5 })
  .to(boxGroup.rotation, { y: Math.PI, x: -Math.PI })
  .to(boxGroup.position, { x: -0.25 })
  .delay(1)
  .repeat(-1);
```

## 目的:マウスでカメラを制御する

### OrbitControls を使って実装

#### OrbitControls をインポート

```js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
```

#### OrbitControls クラスからインスタンス化

```js
// Contorols
const controls = new OrbitControls(camera, canvas);
```
