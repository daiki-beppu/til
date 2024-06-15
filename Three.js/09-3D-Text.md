# 3D テキストについて

- [3D テキストについて](#3d-テキストについて)
  - [フォントの設定](#フォントの設定)
  - [フォントの読み込み](#フォントの読み込み)
    - [FontLoader のインポート](#fontloader-のインポート)
    - [FontLoader をインスタンス化](#fontloader-をインスタンス化)
    - [フォントを読み込む](#フォントを読み込む)
  - [3D テキストの表示](#3d-テキストの表示)
    - [ジオメトリの作成](#ジオメトリの作成)
    - [テキストの中央揃え](#テキストの中央揃え)
    - [オブジェクトの追加(ドーナツ)](#オブジェクトの追加ドーナツ)
    - [最適化](#最適化)

3D テキストを表示させるには
以下の手順を行います。

1. フォントの設定
2. フォントの読み込み
3. 3D テキストの表示

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/624b6629290be277209a796660b20016.gif)](https://gyazo.com/624b6629290be277209a796660b20016)

## フォントの設定

3D フォントを表示させる前に
フォントを設定をする

今回は、Three.js で用意されているフォントを設定する

`/node_modules/three/examples/fonts/`から任意のフォントをコピー

`fonts`(任意のフォルダ名)フォルダを作成してペースト

これでパスを使ってアクセスできる

## フォントの読み込み

Three.js で 3D テキストを表示するには、フォントを読み込む必要があります。

フォントの読み込みは以下の手順で行う

1. `FontLoader` のインポート
2. `FontLoader` をインスタンス化
3. フォントを読み込む

### FontLoader のインポート

```js
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
```

### FontLoader をインスタンス化

```js
const fontLoader = new FontLoader();
```

### フォントを読み込む

`load` メソッドで読み込むことができる
第 1 引数にはフォントのパスを指定
第 2 引数はコールバック関数を記述し中に処理を書いていく

```js
fontLoader.load("/fonts/helvetiker_regular.typeface.json", () => {
  // 読み込みが成功しているかの確認
  console.log("フォントの読み込み完了");
});
```

## 3D テキストの表示

フォントの読み込みが成功しているかの確認ができたら 3D テキストを実際に表示していく！！

以下の手順で行う

1. ジオメトリの作成
2. テキストの中央揃え
3. オブジェクトの追加(ドーナツ)
4. 最適化

### ジオメトリの作成

```js
// テキストジオメトリのインポート
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hello Three.js ! ", {
    font: font, // THREE.Fontのインスタンス
    size: 0.5, // テキストのサイズ デフォルトは 100
    depth: 0.2, // テキストを押し出す太さ デフォルトは 50
    curveSegments: 5, // カーブの分割数 デフォルトは 12
    bevelEnabled: true, // ベベルをオンにする デフォルトは false
    bevelThickness: 0.03, // ベベルの深さ デフォルトは 10
    bevelSize: 0.02, // テキストのアウトラインからのベベルの距離 デフォルトは 8
    bevelOffset: 0, // テキストのアウトラインのベベルの開始位置。デフォルトは 0
    bevelSegments: 4, // ベベルの分割数 デフォルトは 3
  });

  // シーンに3D テキストを追加
  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
});
```

### テキストの中央揃え

`center` プロパティを設定するだけ！

```js
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hello Three.js ! ", {
    font: font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  textGeometry.center();

  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
});
```

### オブジェクトの追加(ドーナツ)

完成イメージでは 100 個のドーナツがランダムに配置されている

```js
// 100個のドーナツをランダムな配置で表示

for (let i = 0; i < 100; i += 1) {
  // ドーナツの形を作成
  const donutParams = {
    radius: 0.3,
    tube: 0.2,
    radiusSegments: 20,
    tubeSegments: 45,
  };

  const donutGeometory = new THREE.TorusGeometry(
    donutParams.radius,
    donutParams.tube,
    donutParams.radiusSegments,
    donutParams.tubeSegments
  );

  const donut = new THREE.Mesh(donutGeometory, material);

  const randomPosition = {
    x: (Math.random() - 0.5) * 10,
    y: (Math.random() - 0.5) * 10,
    z: (Math.random() - 0.5) * 10,
  };
  donut.position.x = randomPosition.x;
  donut.position.y = randomPosition.y;
  donut.position.z = randomPosition.z;

  const randomRotaiton = {
    x: Math.random() * Math.PI,
    y: Math.random() * Math.PI,
    z: Math.random() * Math.PI,
  };

  donut.rotation.x = randomRotaiton.x;
  donut.rotation.y = randomRotaiton.y;

  const scale = Math.random();
  donut.scale.set(scale, scale, scale);

  scene.add(donut);
}
```

### 最適化

先程のコードだとレンダリングに時間がかかりすぎる

ジオメトリの生成をループの外に記述することで大幅にパフォーマンスが改善される

`console.time("test");`を使ってパフォーマンスを測定

1000 個にしてわかりやすいようにする

```js
// ジオメトリをループの外で記述
const donutParams = {
  radius: 0.3,
  tube: 0.2,
  radiusSegments: 20,
  tubeSegments: 45,
};

const donutGeometory = new THREE.TorusGeometry(
  donutParams.radius,
  donutParams.tube,
  donutParams.radiusSegments,
  donutParams.tubeSegments
);

for (let i = 0; i < 100; i += 1) {
  const donut = new THREE.Mesh(donutGeometory, material);

  const randomPosition = {
    x: (Math.random() - 0.5) * 10,
    y: (Math.random() - 0.5) * 10,
    z: (Math.random() - 0.5) * 10,
  };
  donut.position.x = randomPosition.x;
  donut.position.y = randomPosition.y;
  donut.position.z = randomPosition.z;

  const randomRotaiton = {
    x: Math.random() * Math.PI,
    y: Math.random() * Math.PI,
    z: Math.random() * Math.PI,
  };

  donut.rotation.x = randomRotaiton.x;
  donut.rotation.y = randomRotaiton.y;

  const scale = Math.random();
  donut.scale.set(scale, scale, scale);

  scene.add(donut);
}
```

パフォーマンス改善前 約 111ms
[![Image from Gyazo](https://i.gyazo.com/fc741eca273a20c0ac52d2eaa1fd39ec.png)](https://gyazo.com/fc741eca273a20c0ac52d2eaa1fd39ec)

パフォーマンス改善後 約 3.1ms
[![Image from Gyazo](https://i.gyazo.com/07a51de4edc967f4b7798baf297e0a30.png)](https://gyazo.com/07a51de4edc967f4b7798baf297e0a30)

約 97 % のパフォーマンス向上！！
