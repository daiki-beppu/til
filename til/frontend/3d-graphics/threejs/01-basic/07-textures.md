# テクスチャについて

- [テクスチャについて](#テクスチャについて)
  - [テクスチャとは](#テクスチャとは)
    - [Albedo（アルベドテクスチャ）](#albedoアルベドテクスチャ)
    - [Alpha（アルファテクスチャ）](#alphaアルファテクスチャ)
    - [Height（高さマップ）](#height高さマップ)
    - [Normal（法線マップ）](#normal法線マップ)
    - [Ambient Occlusion（アンビエントオクルージョン）](#ambient-occlusionアンビエントオクルージョン)
    - [Metalness（メタリックテクスチャ）](#metalnessメタリックテクスチャ)
    - [Roughness（ラフネステクスチャ）](#roughnessラフネステクスチャ)
    - [PBR: 物理ベースレンダリング (PBR: Physically Based Rendering)](#pbr-物理ベースレンダリング-pbr-physically-based-rendering)
  - [テクスチャを読み込む方法](#テクスチャを読み込む方法)
    - [`TextureLoader` を使用して読み込む](#textureloader-を使用して読み込む)
    - [`LoadingManager`を使用して複数の画像をロードし、すべての画像がロードされたときにイベントを発火させる](#loadingmanagerを使用して複数の画像をロードしすべての画像がロードされたときにイベントを発火させる)
  - [UV unwrapping (UV アンラッピング)](#uv-unwrapping-uv-アンラッピング)
  - [テクスチャの変換](#テクスチャの変換)
    - [テクスチャの繰り返し適用](#テクスチャの繰り返し適用)
    - [Offset (オフセット)](#offset-オフセット)
    - [Rotaition (回転)](#rotaition-回転)
  - [フィルタリングとミップマッピング (mip mapping)](#フィルタリングとミップマッピング-mip-mapping)
    - [縮小フィルター](#縮小フィルター)
    - [拡大フィルター](#拡大フィルター)
  - [テクスチャフォーマットと最適化](#テクスチャフォーマットと最適化)
    - [重さ (データサイズ)](#重さ-データサイズ)
    - [サイズ (または解像度)](#サイズ-または解像度)
    - [データ](#データ)


## テクスチャとは

テクスチャとはジオメトリ(物体の形状)の表面を覆う画像です。
テクスチャには様々な種類があり、テクスチャはジオメトリの見た目に影響を与えます。

### Albedo（アルベドテクスチャ）

アルベドテクスチャは、物体の表面の基本的な色と模様を決めるためのテクスチャです。
アルベドテクスチャは影や光の影響を受けません。
テクスチャのピクセル情報を取得して、ジオメトリに適用します。

### Alpha（アルファテクスチャ）

アルファテクスチャは、物体の透明度を決めるためのテクスチャです。
白い部分は完全に不透明(透けない)なので表示され、黒い部分は完全に透明(透ける)ので表示されません。
灰色の部分は半透明になります。
アルファテクスチャを使うことで、物体の細かいデザインや透明度をリアルに表現できます。

### Height（高さマップ）

高さマップは、頂点を移動して起伏（物体の表面の凹凸）を作成するテクスチャです。
グレースケールで表示され、明るい部分は高く（盛り上がり）、暗い部分は低く（へこみ）表示されます。
高さマップを表現するには、ジオメトリを細分化する必要があります。
高さマップを使うことで、物体の表面が平らではなく、凹凸があるように見せることができます。

### Normal（法線マップ）

法線マップは物体の表面がどの方向を向いているのかを示すためのテクスチャです。
高さマップと同様、物体の表面の凹凸を表現する事ができます。
法線マップはジオメトリを細分化する必要がないため、優れたパフォーマンスでディテールを追加するのに有効です。

### Ambient Occlusion（アンビエントオクルージョン）

アンビエントオクルージョンは、物体の影を表現するためのテクスチャです。
グレースケールで表示され、明るい部分は高く（影が薄く）、暗い部分は低く（影が濃く）表示されます。
アンビエントオクルージョンを使うことで物体の形や細かい凹凸が強調され、物体をよりリアルに表現することができます。

### Metalness（メタリックテクスチャ）

メタリックテクスチャは、物体の表面がどれだけ金属的に見えるかを決めるためのテクスチャです。
グレースケールで表示され、金属的な部分は白く、非金属的な部分は黒く表示されます。
メタリックテクスチャを使うことで、物体が本物の金属のように光を反射しよりリアルに表現することができます。

### Roughness（ラフネステクスチャ）

ラフネステクスチャは、物体の粗さを決めるためのテクスチャです。
グレースケールで表示され、粗い部分は白く、滑らかな部分は黒く表示されます。
ラフネステクスチャを使うことで、物体の光を分散させることができます。
メタリックテクスチャと一緒に使用することが多く、物体の見た目をよりリアルに表現することができます。

### PBR: 物理ベースレンダリング (PBR: Physically Based Rendering)

PBR: 物理ベースレンダリング(以下、PBR と記述)は、物体の見た目をよりリアルに表現するための技術です。
PBR は物体が実際にどう光と相互作用するかをシミュレートしています。

これまで紹介したテクスチャ(特にメタリックテクスチャとラフネステクスチャ)は、物理ベースレンダリングに基づいています。

PBR は、リアルなレンダリングを実現するための標準的な方法になりつつあり、多くのソフトウェア、ゲームエンジン、ライブラリで使用されています。

PBR の技術を活用することで物体をよりリアルに表現することができます。

## テクスチャを読み込む方法

### `TextureLoader` を使用して読み込む

```js
// TextureLoaderクラスを使用して変数をインスタンス化
const textureLoader = new THREE.TextureLoader();

// loadメソッドを使用してテクスチャを作成
const texture = textureLoader.load("画像のパス");

// 画像によってはsRGB カラースペースを使用してエンコードされているのでsRGB を設定
texture.colorSpace = THREE.SRGBColorSpace;

// テクスチャの表示
const material = new THREE.MeshBasicMaterial({ map: texture });
```

テクスチャがうまく反映されない場合はエラー原因を特定するために
コールバック関数を追加すると役立つ場合があります。

```js
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
  "/textures/door/color.jpg",
  () => {
    console.log("ロード完了");
  },
  () => {
    console.log("ロード中");
  },
  () => {
    console.log("ロード失敗");
  }
);
texture.colorSpace = THREE.SRGBColorSpace;
```

### `LoadingManager`を使用して複数の画像をロードし、すべての画像がロードされたときにイベントを発火させる

```js
// LoadingManager クラスのインスタンスを作成
const loadingManager = new THREE.LoadingManager();

// LoadingManager クラスをTextureLoaderに渡す。
const textureLoader = new THREE.TextureLoader(loadingManager);
```

これで LoadingManager が持っているプロパティでイベントを発火させる事ができる。

```js
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("ロード開始");
};
loadingManager.onLoad = () => {
  console.log("ロード完了");
};
loadingManager.onProgress = () => {
  console.log("ロード中");
};
loadingManager.onError = () => {
  console.log("ロード失敗");
};

const textureLoader = new THREE.TextureLoader(loadingManager);
```

これで複数の画像の読み込みを開始できる。

```js
const texture1 = textureLoader.load("画像のパス");
const texture2 = textureLoader.load("画像のパス");
const texture3 = textureLoader.load("画像のパス");
const texture4 = textureLoader.load("画像のパス");
const texture5 = textureLoader.load("画像のパス");
```

## UV unwrapping (UV アンラッピング)

立方体以外のジオメトリにテクスチャを適用すると
さまざまな方法で引き伸ばされたり圧縮され、ジオメトリをカバーします。
これを UV アンラッピングと呼びます。

立方体の展開図をイメージしてください。
それぞれの頂点には平面上の 2D 座標を持っています。
これを UV 座標と呼びます。

独自のジオメトリに対して、テクスチャを適用する場合は、UV 座標を指定する必要があります。ですが、ほとんどの 3D ソフトウェアには自動アンラップ機能を備えているので、あまり問題になることはありません。

## テクスチャの変換

### テクスチャの繰り返し適用

`repeat`を使用して繰り返し適用することができる。
`x` と `y`を指定し`wrap`メソッドを `RepeatWrapping`に更新する必要がある
`wrapS` => `x軸`を示します。
`wrapT` => `y軸`を示します。

```js
const texture = textureLoader.load("画像のパス");
colorTexture.colorSpace = THREE.SRGBColorSpace;
colorTexture.repeat.x = 2;
colorTexture.repeat.y = 3;

colorTexture.wrapS = THREE.RepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;
```

[![Image from Gyazo](https://i.gyazo.com/88d56a78b84de4504a47dc8f3b6cace5.png)](https://gyazo.com/88d56a78b84de4504a47dc8f3b6cace5)

次のように方向を切り替える事もできる。

```js
colorTexture.wrapS = THREE.MirroredRepeatWrapping;
colorTexture.wrapT = THREE.MirroredRepeatWrapping;
```

[![Image from Gyazo](https://i.gyazo.com/b185e52ce22b8d8c4c1ea8f1c120387f.png)](https://gyazo.com/b185e52ce22b8d8c4c1ea8f1c120387f)

### Offset (オフセット)

オフセットとは位置をずらすこと。

```js
// x軸に 0.5 位置をずらす
colorTexture.offset.x = 0.5;

// y軸に  0.5 位置をずらす
colorTexture.offset.y = 0.5;
```

[![Image from Gyazo](https://i.gyazo.com/2a105a7989ada71f4b6b45928a3d4b1c.png)](https://gyazo.com/2a105a7989ada71f4b6b45928a3d4b1c)

### Rotaition (回転)

```js
// 45度(1/8周) 回転させる
colorTexture.rotation = Math.PI * 0.25;

//center プロパティで中心を軸に回転
colorTexture.center.x = 0.5;
colorTexture.center.y = 0.5;
```

[![Image from Gyazo](https://i.gyazo.com/0b37401ae35e20ff305d31a3c667d94f.png)](https://gyazo.com/0b37401ae35e20ff305d31a3c667d94f)

## フィルタリングとミップマッピング (mip mapping)

ミップマッピングはテクスチャの元の画像を、いくつかのサイズに換えて保存します。
これによって、どの距離から見てもキレイに見えるようにします。

ミップマッピングは 1 \* 1 のテクスチャが得られるまで、テクスチャの半分の小さいバージョンを繰り返し作成する手法です。

例えば、元の画像が 1024x1024 ピクセルだとすると、512x512、256x256、128x128 といった具合に 1 \* 1 のテクスチャが得られるまで小さくしていきます。

これらのテクスチャのバリエーションはすべて GPU に送信され、GPU は最も適切なテクスチャを選択します。

Three.js と GPU はすでにすべて処理しているので、あとは使用するフィルターアルゴリズムを設定するだけです。

フィルターアルゴリズムには 2 種類あります。

- 縮小フィルター
- 拡大フィルター

### 縮小フィルター

縮小フィルターはテクスチャがカバーする表面に対してテクスチャが大きすぎる場合に発生します。

[![Image from Gyazo](https://i.gyazo.com/285046e52beb331a98187e503f0ac021.png)](https://gyazo.com/285046e52beb331a98187e503f0ac021)

`minFilter`プロパティを使用してテクスチャの縮小フィルターを変更できます。

使用できる値は 6 つあります。

- `THREE.NearestFilter`
- `THREE.LinearFilter`
- `THREE.NearestMipmapNearestFilter`
- `THREE.NearestMipmapLinearFilter`
- `THREE.LinearMipmapNearestFilter`
- `THREE.LinearMipmapLinearFilter`

デフォルトでは`THREE.LinearMipmapLinearFilter`が使用されます。

### 拡大フィルター

拡大フィルターはテクスチャがカバーする表面に対してテクスチャが小さすぎる場合に発生します。

非常に大きな表面上の非常に小さなテクスチャであるため、テクスチャ全体がぼやけてしまいます。

[![Image from Gyazo](https://i.gyazo.com/f6eae7820a4dc96f7c03e43cf79ca312.png)](https://gyazo.com/f6eae7820a4dc96f7c03e43cf79ca312)

`magFilter`プロパティを使用してテクスチャの拡大フィルターを変更できます。

使用できる値は 2 つだけです。

- `THREE.NearestFilter`
- `THREE.LinearFilter`

デフォルトでは`THREE.LinearFilter`

`magFilter` と `NearestFilter`を適用すると鮮明に！
[![Image from Gyazo](https://i.gyazo.com/81107c7673963e22fb2dc8d6623f1ebb.png)](https://gyazo.com/81107c7673963e22fb2dc8d6623f1ebb)

これまで紹介したフィルターについて付け加えると、
`THREE.NearestFilter` は他のフィルターよりもコストが低く、使用するとパフォーマンスが向上する可能性があります。

また、ミップマップは `minFilter` プロパティにのみ使用してください。
もし `THREE.NearestFilter`を使用する場合は、ミップマップは必要ありませんので、`colorTexture.generateMipmaps = false` としてミップマップを無効にすることができます。

## テクスチャフォーマットと最適化

テクスチャを適用するときは 3 つの重要な要素を念頭に置く必要があります。

- 重さ (データサイズ)
- サイズ (または解像度)
- データ

### 重さ (データサイズ)

ウェブサイトにアクセスするユーザーは、テクスチャをダウンロードする必要があります。
`.jpg` や `.png` ウェブ上で使用されるほとんどの種類を使用できます。

画像を圧縮したりするなど、できるだけ軽い画像を用意してください。

### サイズ (または解像度)

使用するテクスチャの各ピクセルは画像の重さに関係なく GPU に保存する必要があります。
ですが GPU にもストレージの制限があります。
さらに自動的に生成される、ミップマッピングによって保存する必要があるピクセル数が増えることになります。

なので画像のサイズをできるだけ小さくするようにしてください。
ミップマッピングのことを考慮して テクスチャの幅と高さは 2 の累乗でなければなりません。

### データ

テクスチャは透明度をサポートしています。
jpg ファイルにはアルファチャンネルがないので png を使用することをおすすめします。
