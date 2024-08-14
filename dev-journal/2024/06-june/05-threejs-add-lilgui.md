# 2024/6/5 開発日誌

制作物
https://threejs-demo-rose.vercel.app/

- [開発環境](#開発環境)
- [6/4 のエラーの解消](#64-のエラーの解消)
- [目的: lil-gui を使ってデバッグ UI の追加](#目的-lil-gui-を使ってデバッグ-ui-の追加)
  - [サイズ変更を追加](#サイズ変更を追加)
  - [BOX の表示切替を追加](#box-の表示切替を追加)
  - [アニメーションの追加](#アニメーションの追加)
  - [色の変更を追加](#色の変更を追加)
  - [フォルダのネスト](#フォルダのネスト)
  - [GUI の設定](#gui-の設定)


## 開発環境

- Next.js (app Router)
- Tailwind CSS
- Three.js

## 6/4 のエラーの解消

```tsx
gui.add(boxGroup.position, "y").min(-3).max(3).step(0.01);

// こちらの記述を追加しても画面に反映されず以下のエラーが発生

ReferenceError: document is not defined
    at eval (./app/page.tsx:17:13)
    at (ssr)/./app/page.tsx (/Users/daikibeppu/development/threejs-demo/.next/server/app/page.js:162:1)
    at Object.__webpack_require__ [as require] (/Users/daikibeppu/development/threejs-demo/.next/server/webpack-runtime.js:33:42)
    at JSON.parse (<anonymous>)

```

どうやら問題は useEffect 内でインスタンス化を行っていなかったことが原因

```tsx
// エラー解消

// lil-gui
useEffect(() => {
  // lil-gui
  const gui = new GUI(); // lil-guiをインスタンス化
  gui.add(boxGroup.position, "y").min(-3).max(3).step(0.01);
}, []);
```

## 目的: lil-gui を使ってデバッグ UI の追加

### サイズ変更を追加

```tsx
//lil-gui

// debugObjectの定義
const debugObject: any = {
  scale: 1,
};

gui
  .add(debugObject, "scale")
  .min(1)
  .max(10)
  .step(0.01)
  .name("大きさの変更")
  .onChange(() => {
    boxGroup.scale.set(debugObject.scale, debugObject.scale, debugObject.scale);
  });
```

[![Image from Gyazo](https://i.gyazo.com/ae522680f6b3eadad672e98de04284a1.gif)](https://gyazo.com/ae522680f6b3eadad672e98de04284a1)

### BOX の表示切替を追加

```tsx
// lil-gui

// 表示切替のチェックボックスを追加
gui.add(leftBox, "visible").name("左のBOX");
gui.add(centerBox, "visible").name("中央BOX");
gui.add(rightBox, "visible").name("右のBOX");
```

**ボックスの表示切替でグループ化**

```tsx
// lil-gui

//チェックボックスを追加
const visibleFolder = gui.addFolder("BOX表示");

visibleFolder.add(leftBox, "visible").name("左のBOX");
visibleFolder.add(centerBox, "visible").name("中央BOX");
visibleFolder.add(rightBox, "visible").name("右のBOX");
```

[![Image from Gyazo](https://i.gyazo.com/cbb1b0db9632cb434244398288968b67.gif)](https://gyazo.com/cbb1b0db9632cb434244398288968b67)

### アニメーションの追加

```tsx
// lil-gui

// アニメーションファイルにスピンアニメーションを追加
const animationFolder = gui.addFolder("アニメーション");
animationFolder.add(debugObject, "spin");

// debugObjectにスピンアニメーションを追加
const debugObject = {
  scale: 1,
  spin: () => {
    gsap.to(boxGroup.rotation, {
      duration: 1,
      x: Math.PI * 2,
    });
  },
};
```

**躓いたところ**
ボタンを押しても一回しか回らない問題

**原因:** boxGroup.rotation.x に回転角度を加算していない
ただ回転するだけになっていた

**解決方法:** boxGroup.rotation.x に回転角度を加算する

```diff js

// lil-gui

const debugObject = {
  scale: 1,
  spin: () => {
    gsap.to(boxGroup.rotation, {
      duration: 1,
-      x: Math.PI * 2,
+      x: boxGroup.rotation.x + Math.PI * 2,
    });
  },
};

```

### 色の変更を追加

```tsx
const colorFolder = boxFolder.addFolder("BOXカラー");

colorFolder.addColor(leftBox.material, "color").name("左のBOXカラー");
colorFolder.addColor(centerBox.material, "color").name("中央BOXカラー");
colorFolder.addColor(rightBox.material, "color").name("右のBOXカラー");
```

### フォルダのネスト

```tsx
// BOXフォルダを作成
const boxFolder = gui.addFolder("BOX");

// gui.addではなく追加したいフォルダ名.addに変更するだけ
const visibleFolder = boxFolder.addFolder("BOX表示");
visibleFolder.add(leftBox, "visible").name("左のBOX");
visibleFolder.add(centerBox, "visible").name("中央BOX");
visibleFolder.add(rightBox, "visible").name("右のBOX");

const wireframeFolder = boxFolder.addFolder("ワイヤーフレーム");
wireframeFolder.add(leftBox.material, "wireframe").name("左のBOX");
wireframeFolder.add(centerBox.material, "wireframe").name("中央BOX");
wireframeFolder.add(rightBox.material, "wireframe").name("右のBOX");

const animationFolder = boxFolder.addFolder("アニメーション");
animationFolder.add(debugObject, "spin");

boxFolder
  .add(debugObject, "scale")
  .min(1)
  .max(3)
  .step(0.001)
  .name("大きさの変更")
  .onChange(() => {
    boxGroup.scale.set(debugObject.scale, debugObject.scale, debugObject.scale);
  });

const colorFolder = boxFolder.addFolder("BOXカラー");
colorFolder.addColor(leftBox.material, "color").name("左のBOXカラー");
colorFolder.addColor(centerBox.material, "color").name("中央BOXカラー");
colorFolder.addColor(rightBox.material, "color").name("右のBOXカラー");
```

### GUI の設定

```tsx
// lil-gui
const gui = new GUI({
  width: 400,
  title: "デバッグUI",
  closeFolders: true,
});
```

**表示/非表示の切り替え**

```tsx
window.addEventListener("keydown", (event) => {
  event.key === "," ? gui.show(gui._hidden) : "";
});
```
