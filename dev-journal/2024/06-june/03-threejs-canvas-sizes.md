# 2024/6/3 開発日誌

制作物
https://threejs-demo-rose.vercel.app/

- [開発環境](#開発環境)
- [目的 canvas 要素を画面いっぱい広げる](#目的-canvas-要素を画面いっぱい広げる)
  - [ビューポートを取得してキャンバスの大きさにする](#ビューポートを取得してキャンバスの大きさにする)
  - [ウィンドウのサイズ変更があった場合にビューポートを更新する](#ウィンドウのサイズ変更があった場合にビューポートを更新する)
- [目的 フルスクリーンのサポート](#目的-フルスクリーンのサポート)


## 開発環境

- Next.js (app Router)
- Tailwind CSS
- Three.js

## 目的 canvas 要素を画面いっぱい広げる

### ビューポートを取得してキャンバスの大きさにする

```diff
const sizes = {
-  width: 1000,
+  width: window.innerWidth,
-  height:800
+  height: window.innerHeight,
};

```

### ウィンドウのサイズ変更があった場合にビューポートを更新する

```js
window.addEventListener("resize", () => {
  // サイズの更新
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // カメラの更新
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // レンダラーの更新
  renderer.setSize(sizes.width, sizes.height);

  // ピクセル比を指定
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
```

## 目的 フルスクリーンのサポート

```tsx
// Fullscreen
window.addEventListener("dblclick", async () => {
  !document.fullscreenElement
    ? await canvas.requestFullscreen()
    : await document.exitFullscreen();
});
```
