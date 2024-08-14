# デバック UI

- [デバック UI](#デバック-ui)
  - [lil-gui のインスタンス化](#lil-gui-のインスタンス化)
  - [いろんな種類の調整](#いろんな種類の調整)
    - [範囲の追加](#範囲の追加)
    - [チェックボックスの追加](#チェックボックスの追加)
    - [色の追加](#色の追加)
    - [機能/ボタンの追加](#機能ボタンの追加)
    - [ジオメトリの細分化を調整](#ジオメトリの細分化を調整)
  - [GUI の設定](#gui-の設定)
    - [表示の切り替え](#表示の切り替え)


**lil-gui** というライブラリを使用する

## lil-gui のインスタンス化

ますはプロジェクトに lil-gui を追加する

`bun add lil-gui`

> [!NOTE]
> お使いのパッケージマネージャーに合わせてコマンドは変更してください

インストールが完了したら lil-gui をインポートしインスタンス化

```js
// lil-guiをインポート
import GUI from "lil-gui";

// lil-guiをインスタンス化
const gui = new GUI();
```

## いろんな種類の調整

- 範囲: 最小値と最大値を持つ数値
- 色: さまざまな形式の色
- テキスト: シンプルなテキスト用
- チェックボックス: boolian の制御
- 選択: リストから選択
- ボタン: 機能のトリガー

### 範囲の追加

`gui.add(オブジェクト, "プロパティ")`で追加

**position.y の範囲を調整**

```js
gui
  .add(mesh.position, "y") // mesh.position.yを調整
  .min(-3) // position.yの最小値
  .max(3) // position.yの最大値
  .step(0.01) // position.yの増減幅
  .name("y軸移動"); // デバックUIのラベル
```

[![Image from Gyazo](https://i.gyazo.com/dba5801e2237b17afbdf7cb92e28985d.gif)](https://gyazo.com/dba5801e2237b17afbdf7cb92e28985d)

### チェックボックスの追加

```js
// ジオメトリの表示切り替え
gui.add(mesh, "visible").name("ジオメトリの表示");
// ワイヤーフレーム表示の切り替え
gui.add(material, "wireframe").name("ワイヤーフレームに切り替え");
```

### 色の追加

```js
gui.addColor(material, "color");

// addではないので注意！
```

カラーピッカーから色の値を取得して`color`プロパティに適用すると...
色が変わってしまう！

**変更した色の追加は 2 つ方法がある**

- 色が変更されたときに getHexStirng()で色を取得する方法
- 修正されていない色のみを扱う方法

**色が変更されたときに getHexStirng()で色を取得する方法**

```js
// lil-gui
gui.addColor(material, "color").onChange(() => {
  console.log(material.color.getHexString());
});
```

これだとコンソールを開いている必要があり、エンジニア以外の人(デザイナーさんやクライアント)と作業する場合にとても不便

**修正されていない色のみを扱う方法**

```js
// プロパティを保持することを目的としたオブジェクトを作成
const debugObject = {};

// Object
debugObject.color = "ff0000";
const material = new THREE.MeshBasicMaterial({
  color: debugObject.color,
});

//lil-gui
gui.addColor(debugObject, "color").onChange(() => {
  material.color.set(debugObject.color);
});
```

### 機能/ボタンの追加

```js
// デバッグオブジェクトにスピンアニメーションを追加
debugObject.spin = () => {
  gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 });
};
```

### ジオメトリの細分化を調整

まずはワイヤーフレームを追加

```diff

// * Object
debugObject.color = "#ff0000";

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: debugObject.color,
+ wireframe: true,
});

```

```js
// debugObject に subdivisionプロパティを追加
debugObject.subdivision = 2;

gui
  .add(debugObject, "subdivision") // デバッグUIに追加
  .min(1) // 細分化の最小値
  .max(20) // 細分化の最大値
  .step(1) // 細分化の増減幅
  .onFinishChange(() => {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivision,
      debugObject.subdivision,
      debugObject.subdivision
    );
  });
```

onchage ではなく onFinishChange を使う理由は
ジオメトリの構築は CPU にとって非常に時間がかかる場合がある

onchage の場合、ユーザーが範囲調整をドラッグ&ドロップ市すぐりと頻繁に変更イベントが発生する

これを防ぐために onFinishChange を使用する
値の調整が終了したときのみがトリガーになるので不要な処理を減らすことができる！

## GUI の設定

```js
// lil-gui

const gui = new GUI({
  width: 400, // GUIの幅
  title: "デバック", // GUIのタイトル
  closeFolders: false, // デフォルトで閉じない
});
// gui.close() //デフォルトで閉じる
// gui.hide(); // デフォルトで隠す
```

### 表示の切り替え

```js
// "h"キーが押されたとき表示切り替え
window.addEventListener("keydown", (event) => {
  if (event.key === "h") gui.show(gui._hidden);
});
```
