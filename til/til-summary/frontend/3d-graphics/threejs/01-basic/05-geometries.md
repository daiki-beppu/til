# ジオメトリについて

- [ジオメトリについて](#ジオメトリについて)
  - [ジオメトリとは](#ジオメトリとは)
  - [Three.js で用意されているジオメトリ](#threejs-で用意されているジオメトリ)
    - [ジオメトリのパラメーター](#ジオメトリのパラメーター)
  - [オリジナルのジオメトリを作成](#オリジナルのジオメトリを作成)
    - [`BufferGeometry`をインスタンス化](#buffergeometryをインスタンス化)
    - [`BufferGeometry`に頂点を追加する](#buffergeometryに頂点を追加する)
    - [`BufferAttribute`に変換](#bufferattributeに変換)
    - [`BufferAttribute`を`BufferGeometry`に追加する](#bufferattributeをbuffergeometryに追加する)
  - [ランダムな三角形ををたくさん生成する](#ランダムな三角形ををたくさん生成する)


## ジオメトリとは

Three.js でジオメトリは頂点と面で構成される

頂点: 3D 空間内のポイント座標
面: 3D 空間内のポイント座標の頂点を｢結合して表面を作成する三角形

ジオメトリを使用することでメッシュ(立体)やパーティクル(粒子)を作成する事ができる

## Three.js で用意されているジオメトリ

Three.js で用意されているジオメトリは`BufferGeometry`から継承されておりたくさんのメソッドが用意されている

公式ドキュメントでは全ての用意されているジオメトリに
実例があるので詳しくは[公式ドキュメント](https://threejs.org/docs/?q=geome#api/en/core/BufferGeometry)を参照

### ジオメトリのパラメーター

ほとんどのジオメトリにはパラメーターが用意されているので使用する前に公式ドキュメントを確認すしてください

ここでは`BoxGeometry`を例に紹介します

BoxGeometry には 6 つのパラメーターが用意されています

- `width` x 軸上のサイズ
- `height` y 軸上のサイズ
- `depth` z 軸上のサイズ
- `widthSegment` x 軸の分割数
- `heightSegment` y 軸の分割数
- `depthegment` z 軸の分割数

分割数のデフォルトは `1` 面ごとに三角形が 2 つのみ存在することを意味している

```js
const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
```

![分割数が1の立方体のワイヤーフレーム](https://i.gyazo.com/096c49e5dcc92f56ce9a3cbac2cb2a98.png)

![分割数が 1 の立方体のワイヤーフレームのイメージ](https://i.gyazo.com/18e7d6a30884a51835c803dfe9ed7b68.png)

分割数を 2 に増やすと

```js
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
```

![分割数が2の立方体のワイヤーフレーム](https://i.gyazo.com/af0b2d0851878e7e9d80238c05e83b94.png)

![分割数が2の立方体のワイヤーフレームのイメージ](https://i.gyazo.com/ab2d4ed83ce1024425dfb0e294299dc5.png)

## オリジナルのジオメトリを作成

### `BufferGeometry`をインスタンス化

オリジナルのジオメトリを作成するには
空の`BufferGeometry`をインスタンス化する

```js
const geometry = new THREE.BufferGeometry();
```

### `BufferGeometry`に頂点を追加する

`BufferGeometry`に頂点を追加するには

`Flote32Array`を使って配列を作成する

```js
const positionsArray = new Float32Array(9);

// 1つ目の頂点
positionsArray[0] = 0;
positionsArray[1] = 0;
positionsArray[2] = 0;

// 2つ目の頂点
positionsArray[3] = 0;
positionsArray[4] = 0;
positionsArray[5] = 0;

// 3つ目の頂点
positionsArray[6] = 0;
positionsArray[7] = 0;
positionsArray[8] = 0;

//もしくは配列で渡す

const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
```

### `BufferAttribute`に変換

さきほど作成した配列を`BufferAttribute`に変換する必要がある

> [!NOTE]BufferAttribute とは？
> BufferAttribute は、頂点属性（位置、法線、色など）を格納するためのオブジェクトです。BufferGeometry に追加して、3D オブジェクトの形状を定義するために使用します。

```js
BufferAttribute(positionsArray, 3);
```

1 つ目のパラメーターは型指定された配列に対応しており
頂点の位置情報を格納する配列を指す

2 つ目のパラメーターは 1 つの頂点を構成する要素の数

### `BufferAttribute`を`BufferGeometry`に追加する

`BufferAttribute`を`BufferGeometry`に追加することでジオメトリの形状を定義できる

```js
geometry.setAttribute("position", positionAttribute);
```

```js
// ここまでのコード

// BufferGeometryのインスタンス化
const geometry = new THREE.BufferGeometry();

// 型付き配列の作成
const positionsArray = new Float32Array([
  // 1つの目の頂点
  0, // x座標
  0, // y座標
  0, // z座標

  // 2つの目の頂点
  0, // x座標
  1, // y座標
  0, // z座標

  // 3つの目の頂点
  1, // x座標
  0, // y座標
  0, // z座標
]);

const positionsAttribute = new THREE.BufferAttribute(
  positionsArray, // 頂点の位置情報を格納する配列
  3 //  頂点を構成する要素の数
);
geometry.setAttribute("position", positionsAttribute);
```

## ランダムな三角形ををたくさん生成する

```js
const geometry = new THREE.BufferGeometry();

// 100個の三角形を作る
const count = 100;
const positionsArray = new Float32Array(
  count * // 作成する三角形の数
    3 * // 各三角形の頂点の数
    3 // 三角形の頂点を構成する要素の数
);

for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = Math.random();
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionsAttribute);
```
