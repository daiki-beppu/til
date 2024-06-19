# 2024/6/14 開発日誌

制作物
https://threejs-demo-rose.vercel.app/

- [2024/6/14 開発日誌](#2024614-開発日誌)
  - [開発環境](#開発環境)
  - [目的 1: タイマーの設定](#目的-1-タイマーの設定)
  - [目的 2 : ギターの作成](#目的-2--ギターの作成)
    - [躓いたところ 1 ｢デバッグ UI が 2 つ表示される問題｣](#躓いたところ-1-デバッグ-ui-が-2-つ表示される問題)
    - [躓いたところ 2 ｢パラメータの設定むずすぎ問題｣](#躓いたところ-2-パラメータの設定むずすぎ問題)
    - [ギターグループを作成](#ギターグループを作成)
    - [ボディの作成](#ボディの作成)
    - [ネックの作成](#ネックの作成)
    - [ヘッドの作成](#ヘッドの作成)
    - [ペグの作成](#ペグの作成)

## 開発環境

- Next.js (app Router)
- Tailwind CSS
- Three.js

## 目的 1: タイマーの設定

```js
// タイマーのインポート
import { Timer } from "three/addons/misc/Timer.js";
```

```js
useEffect(() => {
  if (canvasRef.current) {
    // タイマーのインスタンス化
    const timer = new Timer();

    // ループアニメーション
    const animetion = () => {
      controls.update();
      renderer.render(scene, camera);

      // タイマーの更新
      timer.update();
      const elapsedTime = timer.getElapsed();

      requestAnimationFrame(animetion);
    };
    animetion();
  }
}, []);
```

## 目的 2 : ギターの作成

モデルのギター

[![Image from Gyazo](https://i.gyazo.com/d19f0543c795075c23e7e4983e3cad08.png)](https://gyazo.com/d19f0543c795075c23e7e4983e3cad08)

制作物

[![Image from Gyazo](https://i.gyazo.com/d5e198aa903dcc6d8bdf2f935083e97a.png)](https://gyazo.com/d5e198aa903dcc6d8bdf2f935083e97a)

### 躓いたところ 1 ｢デバッグ UI が 2 つ表示される問題｣

一番親のデバッグ UI を閉じてもなぜか子のフォルダたちが残ってしまっていた

chatGPT に聞いて解決

- `useRef` を使ってインスタンスを保持する
- `useEffect` 内で GUI インスタンスがすでに存在しない場合のみ初期化する
- GUI インスタンスの保存

```tsx
//useRefでGUIインスタンスを管理

const guiRef = useRef<GUI | null>(null);  // GUIインスタンスを保持するためのRef
// この行は、useRefを使用してGUIインスタンスを保持します。これにより、useEffect内でGUIインスタンスを複数回作成するのを防ぎます。

// useEffectの条件にGUIインスタンスのチェックを追加
useEffect(() => {
    if (canvasRef.current && !guiRef.current) {  // GUIが既に存在しない場合のみ実行
        ...
// useEffectが実行される条件に、guiRef.currentがnullであることを追加しました。これにより、useEffectが複数回実行されることを防ぎます。

// GUIインスタンスの保存
const gui = new GUI({
    width: 300,
    title: "デバッグUI",
});
guiRef.current = gui;  // GUIインスタンスをRefに保存
//新しく作成したGUIインスタンスをguiRef.currentに保存します。これにより、次回useEffectが実行されたときに同じインスタンスを再利用できます。

```

### 躓いたところ 2 ｢パラメータの設定むずすぎ問題｣

躓いたと言うよりは改めて難しいと感じたのは
`scale` や `position` などのパラメータの設定

今回はかなりシンプルなので思った位置に持っていけないということはなかったがサイズの調整はむじぃ
これが複雑になるとかなり大変だし難しいだろうな感じる

### ギターグループを作成

```tsx
// ギターグループ
const guiterGroup = new THREE.Group();
guiterGroup.position.x = -3.5;

guiterGroup.rotation.z = -Math.PI / 3;
guiterGroup.rotation.x = -Math.PI / 9;
scene.add(guiterGroup);
```

### ボディの作成

```tsx
// オブジェクト
const bodyParams = {
  width: 2.75,
  height: 5.5,
  depth: 0.28,
};
const body = new THREE.Mesh(
  new THREE.BoxGeometry(bodyParams.width, bodyParams.height, bodyParams.depth),
  new THREE.MeshStandardMaterial({ color: "#D7A625" })
);

body.rotation.z = -Math.PI / 4;

guiterGroup.add(body);

// デバッグ UI
const bodyFolder = gui.addFolder("ボディ");
bodyFolder.add(body.scale, "x").min(1).max(5).step(0.1).name("幅");
bodyFolder.add(body.scale, "y").min(1).max(5).step(0.1).name("高さ");
bodyFolder.add(body.scale, "z").min(1).max(5).step(0.1).name("奥行き");
bodyFolder.add(body.position, "x").min(1).max(5).step(0.1).name("x軸 移動");
bodyFolder.add(body.position, "y").min(1).max(5).step(0.1).name("y軸 移動");
bodyFolder.add(body.position, "z").min(1).max(5).step(0.1).name("z軸 移動");
```

### ネックの作成

```tsx
// ギターのネック
const neckParams = {
  width: 0.8,
  height: 6.2,
  depth: 0.15,
};

const neck = new THREE.Mesh(
  new THREE.BoxGeometry(neckParams.width, neckParams.height, neckParams.depth),
  new THREE.MeshStandardMaterial({ color: "#734e30" })
);

neck.position.x = bodyParams.width;
neck.position.y = bodyParams.height / 2;
neck.position.z = bodyParams.depth / 2;
neck.rotation.z = -Math.PI / 4;

guiterGroup.add(neck);

// デバッグ UI
const neckFolder = gui.addFolder("ネック");
neckFolder.add(neck.scale, "x").min(0.1).max(5).step(0.01).name("幅");
neckFolder.add(neck.scale, "y").min(0.1).max(5).step(0.01).name("高さ");
neckFolder.add(neck.scale, "z").min(0.1).max(5).step(0.01).name("奥行き");
neckFolder.add(neck.position, "x").min(0.1).max(5).step(0.01).name("x軸 移動");
neckFolder.add(neck.position, "y").min(0.1).max(5).step(0.01).name("y軸 移動");
neckFolder.add(neck.position, "z").min(0.1).max(5).step(0.01).name("z軸 移動");
```

### ヘッドの作成

```tsx
// ヘッド
const headParams = {
  width: 1.2,
  height: 1.3,
  depth: 0.28,
};

const head = new THREE.Mesh(
  new THREE.BoxGeometry(headParams.width, headParams.height, headParams.depth),
  new THREE.MeshStandardMaterial({ color: "black" })
);

head.position.x = (bodyParams.width + neckParams.height) / 2;
head.position.y = (bodyParams.width + neckParams.height) / 2;
head.position.z = bodyParams.depth / 2;
head.rotation.z = -Math.PI / 4;

guiterGroup.add(head);

// デバッグ UI
const headFolder = gui.addFolder("ヘッド");
headFolder.add(head.scale, "x").min(0.1).max(5).step(0.01).name("幅");
headFolder.add(head.scale, "y").min(0.1).max(5).step(0.01).name("高さ");
headFolder.add(head.scale, "z").min(0.1).max(5).step(0.01).name("奥行き");
headFolder.add(head.position, "x").min(0.1).max(5).step(0.01).name("x軸 移動");
headFolder.add(head.position, "y").min(0.1).max(5).step(0.01).name("y軸 移動");
headFolder.add(head.position, "z").min(0.1).max(5).step(0.01).name("z軸 移動");
```

### ペグの作成

**躓いたところ**

ペグのサイズをデバッグ UI で半径に直接アクセスできないので
設定するのが難しかった
`.onChange`の扱いでかなり苦戦したが今回でかなり理解できたように思う

```tsx
// ペグ

const pegGroup = new THREE.Group();

const pegParams = {
  radius: 0.1,
  segments: 16,
};

const peg1stString = new THREE.Mesh(
  new THREE.CircleGeometry(pegParams.radius, pegParams.segments),
  new THREE.MeshStandardMaterial({ color: "silver" })
);
peg1stString.position.x = headParams.width / 5;
peg1stString.position.y =
  (bodyParams.height + neckParams.height + headParams.height) / 2 + 0.4;
peg1stString.position.z = headParams.depth + 0.01;
pegGroup.add(peg1stString);

// 1弦のペグ
const pegFolder = gui.addFolder("ペグ");
const peg1stStringFolder = pegFolder.addFolder("1弦ペグ");
peg1stStringFolder
  .add(pegParams, "radius")
  .min(0.01)
  .max(10)
  .step(0.01)
  .name("半径")
  .onChange((value: number) => {
    // メモリからジオメトリを削除
    peg1stString.geometry.dispose();

    // 新しいジオメトリの作成
    peg1stString.geometry = new THREE.CircleGeometry(value, pegParams.segments);
  });

peg1stStringFolder
  .add(peg1stString.position, "x")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
peg1stStringFolder
  .add(peg1stString.position, "y")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
peg1stStringFolder
  .add(peg1stString.position, "z")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("z軸 移動");

// 2弦のペグ

const peg2ndString = new THREE.Mesh(
  new THREE.CircleGeometry(pegParams.radius, pegParams.segments),
  new THREE.MeshStandardMaterial({ color: "silver" })
);
peg2ndString.position.x = headParams.width / 5 + 0.075;
peg2ndString.position.y =
  (bodyParams.height + neckParams.height + headParams.height) / 2 + 0.8;
peg2ndString.position.z = headParams.depth + 0.01;

pegGroup.add(peg2ndString);

const peg2ndStringFolder = pegFolder.addFolder("2弦ペグ");
peg2ndStringFolder
  .add(pegParams, "radius")
  .min(0.01)
  .max(10)
  .step(0.01)
  .name("半径")
  .onChange((value: number) => {
    peg2ndString.geometry.dispose();
    peg2ndString.geometry = new THREE.CircleGeometry(value, pegParams.segments);
  });

peg2ndStringFolder
  .add(peg2ndString.position, "x")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
peg2ndStringFolder
  .add(peg2ndString.position, "y")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
peg2ndStringFolder
  .add(peg2ndString.position, "z")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("z軸 移動");

// 3弦のペグ
const peg3rdString = new THREE.Mesh(
  new THREE.CircleGeometry(pegParams.radius, pegParams.segments),
  new THREE.MeshStandardMaterial({ color: "silver" })
);
peg3rdString.position.x = headParams.width / 5 + 0.15;
peg3rdString.position.y =
  (bodyParams.height + neckParams.height + headParams.height) / 2 + 1.2;
peg3rdString.position.z = headParams.depth + 0.01;

pegGroup.add(peg3rdString);

const peg3rdStringFolder = pegFolder.addFolder("3弦ペグ");
peg3rdStringFolder
  .add(pegParams, "radius")
  .min(0.01)
  .max(10)
  .step(0.01)
  .name("半径")
  .onChange((value: number) => {
    peg3rdString.geometry.dispose();
    peg3rdString.geometry = new THREE.CircleGeometry(value, pegParams.segments);
  });

peg3rdStringFolder
  .add(peg3rdString.position, "x")
  .min(0.1)
  .max(6)
  .step(0.01)
  .name("x軸 移動");
peg3rdStringFolder
  .add(peg3rdString.position, "y")
  .min(0.1)
  .max(6)
  .step(0.01)
  .name("y軸 移動");
peg3rdStringFolder
  .add(peg3rdString.position, "z")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("z軸 移動");

// 4弦のペグ
const peg4thString = new THREE.Mesh(
  new THREE.CircleGeometry(pegParams.radius, pegParams.segments),
  new THREE.MeshStandardMaterial({ color: "silver" })
);
peg4thString.position.x = -headParams.width / 5;
peg4thString.position.y =
  (bodyParams.height + neckParams.height + headParams.height) / 2 + 0.4;
peg4thString.position.z = headParams.depth + 0.01;

pegGroup.add(peg4thString);

const peg4thStringFolder = pegFolder.addFolder("4弦ペグ");
peg4thStringFolder
  .add(pegParams, "radius")
  .min(0.01)
  .max(10)
  .step(0.01)
  .name("半径")
  .onChange((value: number) => {
    peg4thString.geometry.dispose();
    peg4thString.geometry = new THREE.CircleGeometry(value, pegParams.segments);
  });

peg4thStringFolder
  .add(peg4thString.position, "x")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
peg4thStringFolder
  .add(peg4thString.position, "y")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
peg4thStringFolder
  .add(peg4thString.position, "z")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("z軸 移動");

// 5弦のペグ

const peg5thString = new THREE.Mesh(
  new THREE.CircleGeometry(pegParams.radius, pegParams.segments),
  new THREE.MeshStandardMaterial({ color: "silver" })
);
peg5thString.position.x = -headParams.width / 5 - 0.075;
peg5thString.position.y =
  (bodyParams.height + neckParams.height + headParams.height) / 2 + 0.8;
peg5thString.position.z = headParams.depth + 0.01;

pegGroup.add(peg5thString);

const peg5thStringFolder = pegFolder.addFolder("5弦ペグ");
peg5thStringFolder
  .add(pegParams, "radius")
  .min(0.01)
  .max(10)
  .step(0.01)
  .name("半径")
  .onChange((value: number) => {
    peg5thString.geometry.dispose();
    peg5thString.geometry = new THREE.CircleGeometry(value, pegParams.segments);
  });

peg5thStringFolder
  .add(peg5thString.position, "x")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
peg5thStringFolder
  .add(peg5thString.position, "y")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
peg5thStringFolder
  .add(peg5thString.position, "z")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("z軸 移動");

// 6弦のペグ
const peg6thString = new THREE.Mesh(
  new THREE.CircleGeometry(pegParams.radius, pegParams.segments),
  new THREE.MeshStandardMaterial({ color: "silver" })
);
peg6thString.position.x = -headParams.width / 5 - 0.15;
peg6thString.position.y =
  (bodyParams.height + neckParams.height + headParams.height) / 2 + 1.2;
peg6thString.position.z = headParams.depth + 0.01;

pegGroup.add(peg6thString);

const peg6thStringFolder = pegFolder.addFolder("6弦ペグ");
peg6thStringFolder
  .add(pegParams, "radius")
  .min(0.01)
  .max(10)
  .step(0.01)
  .name("半径")
  .onChange((value: number) => {
    peg6thString.geometry.dispose();
    peg6thString.geometry = new THREE.CircleGeometry(value, pegParams.segments);
  });

peg6thStringFolder
  .add(peg6thString.position, "x")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
peg6thStringFolder
  .add(peg6thString.position, "y")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
peg6thStringFolder
  .add(peg6thString.position, "z")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("z軸 移動");

guiterGroup.add(pegGroup);
```
