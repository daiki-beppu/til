# 2024/5/31 開発日誌

制作物
https://threejs-demo-rose.vercel.app/

- [開発環境](#開発環境)
- [目的:作成したオブジェクトをに回転するアニメーションをつけたい](#目的作成したオブジェクトをに回転するアニメーションをつけたい)
  - [オブジェクト自体を回転させる方法](#オブジェクト自体を回転させる方法)
- [canvas の背景色を変更したい](#canvas-の背景色を変更したい)
  - [CSS でスタイルを変更する方法](#css-でスタイルを変更する方法)
  - [Three.js で記述](#threejs-で記述)


## 開発環境

- Next.js (app Router)
- Tailwind CSS
- Three.js

## 目的:作成したオブジェクトをに回転するアニメーションをつけたい

### オブジェクト自体を回転させる方法

アニメーションループを追加して各フレームごとに物体の回転を更新する必要がある

```tsx
const animetion = () => {
  requestAnimationFrame(animetion);

  //Rotete the mesh
  mesh.rotation.x += 0.03;
  mesh.rotation.y += 0.01;

  renderer.render(scene, camera);
};
animetion();
```

## canvas の背景色を変更したい

### CSS でスタイルを変更する方法

renderer → alpha を true によって
アルファチャンネルを使用する
デフォルト値は 1(完全に不透明)

```tsx
//背景を透明にする

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});

//canvasにCSSでbgを当てることで背景色を変更

<canvas ref={canvasRef} className="w-[800px] h-[600px] bg-blue-400"></canvas>;
```

### Three.js で記述

```tsx
// Rendererに追記
renderer.setClearColor("#93C5FD");
```
