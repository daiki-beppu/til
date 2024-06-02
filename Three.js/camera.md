# カメラについて

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
