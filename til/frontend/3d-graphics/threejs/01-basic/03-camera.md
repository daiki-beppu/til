# カメラについて

- [カメラについて](#カメラについて)
  - [カメラの種類](#カメラの種類)
  - [PerspectiveCamera(パースペクティブカメラ)](#perspectivecameraパースペクティブカメラ)
  - [OrthofraphicCamera(正投影カメラ)](#orthofraphiccamera正投影カメラ)
  - [マウスでカメラを制御する](#マウスでカメラを制御する)
    - [JavaScript の機能のみで実装](#javascript-の機能のみで実装)
      - [マウスの座標を取得する](#マウスの座標を取得する)
      - [値を調整して使用する(必須ではないが役立つ)](#値を調整して使用する必須ではないが役立つ)
      - [座標のデータを使ってカメラを制御](#座標のデータを使ってカメラを制御)
      - [更にいい感じにする方法](#更にいい感じにする方法)
  - [【簡単】Three.js で用意されている機能で実装](#簡単threejs-で用意されている機能で実装)
    - [OrbitControls をインポートする](#orbitcontrols-をインポートする)
    - [OrbitControls クラスから変数をインスタンス化](#orbitcontrols-クラスから変数をインスタンス化)


## カメラの種類

- Camera
- ArrayCamera(アレイカメラ)
- StereoCamera(ステレオカメラ)
- CubeCamera(キューブカメラ)
- OrthographicCamera(正投影カメラ)
- PerspectiveCamera(パースペクティブカメラ)

**Camera**
Camera クラスは抽象クラスと呼ばれる。
直接使用することはできず、継承することで共通プロパティやメソッドにアクセスできる

**ArrayCamera(アレイカメラ)**
複数のカメラを使用してシーンを複数回レンダリングするために使用する。
各カメラはキャンバスの特定の領域をレンダリングし、昔ながらのマルチプレイゲームのように見えると考えられる

**StereoCamera(ステレオカメラ)**
人の目を模した 2 台のカメラを通してシーンをレンダリングするために使用する。
脳に奥行きがあるように思わせる効果があり、結果を確認するためには VR ヘッドセットや 3D メガネが必要になる

**CubeCamera(キューブカメラ)**
各方向(前方、後方、左方向、右方向、上方向、下方向)を向いたレンダリングを取得する。
周囲のレンダリングを作成するのに使用される。
反射用の環境マップやシャドウマップを作成できる

**OrthographicCamera(正投影カメラ)**
オブジェクトがカメラの距離に関係なく、常に同じサイズでシーンのレンダリングを作成するのに使用される。
2D ゲームの背景や正確な視覚データが必要なオブジェクトを作成できる

**PerspectiveCamera(パースペクティブカメラ)**
遠近感のある実際のカメラをシュミレートしたもの

## PerspectiveCamera(パースペクティブカメラ)

```js
const camera = new THREE.PerspectiveCamera(
  75, //視野角(FOV)
  sizes.width / sizes.height, // アスペクト比
  1, // near カメラの錐台に近い平面
  1000 // far カメラの錐台の遠方面
);
```

[![nearとfarを視覚化した画像](https://i.gyazo.com/31b74363b4cc30318ff92c3fb87d66a0.png)](https://gyazo.com/31b74363b4cc30318ff92c3fb87d66a0)

near と far`near: 0.0001 far:9999`のような極端な値を入れてしまうと
2 つの面がどちらを上にレンダリングするかを争う Z ファイティングと呼ばれるバグが発生する可能性がある

なので妥当な値を使用し、必要な場合に増やすようにする

## OrthofraphicCamera(正投影カメラ)

OrthofraphicCamera は PrespectiveCamera とは
引数に渡す値が異なる

```js
// aspectRatioを掛けることでキャンバスの比率を保ったまま表示できる

const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio, //left
  1 * aspectRatio, // right
  1, // top
  -1, // bottom
  0.1, // near
  100 // far
);
```

**aspectRatio あり**
![aspectRatioあり](https://i.gyazo.com/92563b5279dbf7e2b066c9a9d04c03b3.png)

**aspectRatio なし**

![aspectRatioなし](https://i.gyazo.com/dea8f3d00e583027396cf4adf1e94031.png)

## マウスでカメラを制御する

### JavaScript の機能のみで実装

#### マウスの座標を取得する

```js
// * Cursor
window.addEventListener("mousemove", (event) => {
  console.log(`x座標: ${event.clientX}`, `Y座標: ${event.clientY}`);
});
```

[![Image from Gyazo](https://i.gyazo.com/7d0e9ee96298765c1b1159e107ad54a1.gif)](https://gyazo.com/7d0e9ee96298765c1b1159e107ad54a1)

#### 値を調整して使用する(必須ではないが役立つ)

```js
//canvas内の座標を -0.5 〜 0.5 の間で表示する

const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  console.log(`x座標: ${event.clientX}`, `Y座標: ${event.clientY}`);
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});
```

#### 座標のデータを使ってカメラを制御

```js
const tick = () => {
  camera.position.x = cursor.x * 5;
  camera.position.y = cursor.y * 5;
  camera.lookAt(mesh.position);

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
```

[![Image from Gyazo](https://i.gyazo.com/bf47f2372f12db7ad6faba44b976d5d3.gif)](https://gyazo.com/bf47f2372f12db7ad6faba44b976d5d3)

#### 更にいい感じにする方法

```js
// メッシュの周囲でカメラをきれいに回転させる

camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
camera.position.y = cursor.y * 5;
```

## 【簡単】Three.js で用意されている機能で実装

OrbitControls を使用した方法で解説

### OrbitControls をインポートする

```js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
```

### OrbitControls クラスから変数をインスタンス化

```js
// * Controls
const controls = new OrbitControls(camera, canvas);
```

[![Image from Gyazo](https://i.gyazo.com/40ff6defc1d1e9b84510183999cd969e.gif)](https://gyazo.com/40ff6defc1d1e9b84510183999cd969e)

これだけでマウスでカメラを制御することができます！
