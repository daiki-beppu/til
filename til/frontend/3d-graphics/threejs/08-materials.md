# マテリアルについて

- [マテリアルについて](#マテリアルについて)
  - [マテリアルとは](#マテリアルとは)
  - [MeshBasicMaterial](#meshbasicmaterial)
    - [map プロパティ](#map-プロパティ)
    - [color プロパティ](#color-プロパティ)
    - [wireframe プロパティ](#wireframe-プロパティ)
    - [opacity プロパティ](#opacity-プロパティ)
    - [alphaMap プロパティ](#alphamap-プロパティ)
    - [side プロパティ](#side-プロパティ)
  - [MeshNormalMaterial](#meshnormalmaterial)
  - [MeshMatcapMaterial](#meshmatcapmaterial)
  - [MeshDepthMaterial](#meshdepthmaterial)
  - [MeshLambertMaterial](#meshlambertmaterial)
  - [MeshPhongMaterial](#meshphongmaterial)
  - [MeshToonMaterial](#meshtoonmaterial)
  - [MeshStandardMaterial](#meshstandardmaterial)
  - [デバッグ UI を追加する](#デバッグ-ui-を追加する)
  - [環境マップの追加](#環境マップの追加)
    - [DirectionalLight](#directionallight)
    - [環境マップの読み込み](#環境マップの読み込み)
    - [その他のプロパティ](#その他のプロパティ)
    - [map プロパティ](#map-プロパティ-1)
    - [aoMap プロパティ](#aomap-プロパティ)
    - [displacementMap プロパティ](#displacementmap-プロパティ)
    - [metalnessMap プロパティ](#metalnessmap-プロパティ)
    - [roughnessMap プロパティ](#roughnessmap-プロパティ)
    - [normalMap プロパティ](#normalmap-プロパティ)
    - [alphaMap プロパティ](#alphamap-プロパティ-1)
  - [MeshPhysicalMaterial](#meshphysicalmaterial)
    - [clearcoat プロパティ](#clearcoat-プロパティ)
    - [sheen プロパティ](#sheen-プロパティ)
    - [iridescence プロパティ](#iridescence-プロパティ)
    - [transmission プロパティ](#transmission-プロパティ)


## マテリアルとは

マテリアルとはジオメトリの可視ピクセルに色をつけるために使用される。

ピクセルの色を決定するアルゴリズムは、シェーダーと呼ばれるプログラムに記述されます。

シェーダーの記述は、WebGL と Three.js のとても難しい部分の 1 つです。

だけど心配はいりません！
Three.js には、事前に作成されたシェーダーを備えた組み込みマテリアルがたくさんあります。

## MeshBasicMaterial

"最も基本的なマテリアル"

2 通りの方法でプロパティを設定できます。(以降はドット記法で解説)

```js
// パラメータで設定

const material = new THREE.MeshBasicMaterial({ map: doorColorTexture });

// ドット記法で設定する
material.map = doorColorTexture;
```

### map プロパティ

ジオメトリの表面にテクスチャを適用するプロパティ

```js
material.map = doorColorTexture;
```

[![Image from Gyazo](https://i.gyazo.com/04896172fa86ec85da5848278d743bd3.png)](https://gyazo.com/04896172fa86ec85da5848278d743bd3)

### color プロパティ

ジオメトリの表面にに均一な色を適用するプロパティ
color プロパティを直接変更する場合は、Color クラスをインスタンス化する必要がある

```js
material.color = new THREE.Color("f00");
```

[![Image from Gyazo](https://i.gyazo.com/74779bc93a90dff7b6cf4c0e6d57e458.png)](https://gyazo.com/74779bc93a90dff7b6cf4c0e6d57e458)

いろんな形式をサポートしている

- **'#f00' (公式推奨)**
- 'rgb(250, 0,0)'
- 'rgb(100%,0%,0%)'
- 'hsl(0, 100%, 50%)'
- '#ff0000'
- 'red'

map と組み合わせることもできる

```js
const material = new THREE.MeshBasicMaterial();
material.map = doorColorTexture;
material.color = new THREE.Color("red");
```

[![Image from Gyazo](https://i.gyazo.com/8db555d838c55def1c7fdcda913010da.png)](https://gyazo.com/8db555d838c55def1c7fdcda913010da)

### wireframe プロパティ

カメラの距離に関係なく、ジオメトリを構成する三角形を 1 ピクセルの細い線で表示するプロパティ

```js
material.wireframe = true;
```

[![Image from Gyazo](https://i.gyazo.com/181380d08b6cd3a0ffb8d271ff5d6f31.png)](https://gyazo.com/181380d08b6cd3a0ffb8d271ff5d6f31)

### opacity プロパティ

透明度を制御するプロパティ
透明度を制御することを Three.js に伝えるために`transparent`を`true`にする必要がある

```js
material.transparent = true;

// 1から0までの値を設定する
// 1は完全に不透明 0は完全に透明を意味する
material.opacity = 0.3;
```

[![Image from Gyazo](https://i.gyazo.com/bd8a5b95291324e18f2634c1739c3801.png)](https://gyazo.com/bd8a5b95291324e18f2634c1739c3801)

### alphaMap プロパティ

アルファテクスチャ を用いてテクスチャの透明度を制御するプロパティ

アルファテクスチャ とは透明度を表現した画像のこと

```js
material.transparent = true;

// 任意のアルファテクスチャを使用
material.alphaMap = doorAlphaTexture;
```

[![Image from Gyazo](https://i.gyazo.com/04b62c8785cc73e52c610982c8f43f3a.png)](https://gyazo.com/04b62c8785cc73e52c610982c8f43f3a)

### side プロパティ

面のどちら側を表示するかを指定するプロパティ

以下のいずれかを指定する

- THREE.FrontSide (前面、デフォルト)
- THREE.BackSide (背面)
- THREE.DoubleSide (両面)

デフォルトでは球体の中に入ると向こうが透けて見える(裏側が表示されない)
[![Image from Gyazo](https://i.gyazo.com/9fd0525e2245dc1adbb7ee82ca134050.gif)](https://gyazo.com/9fd0525e2245dc1adbb7ee82ca134050)

```js
material.side = THREE.DoubleSide;
```

両面が見えるようになったため球体の中が見える(裏側も表示される)

[![Image from Gyazo](https://i.gyazo.com/44ce5680169503717834f0fa85813aa5.gif)](https://gyazo.com/44ce5680169503717834f0fa85813aa5)

`THREE.DoubleSide`は可能な限り使用を避ける方が良い。

理由はパフォーマンスで
レンダリング時に多くのリソースが必要になるため。

## MeshNormalMaterial

`MeshNormalMaterial` は 法線マップと同じような青みがかかったマーブル模様を表示します

```js
const material = new THREE.MeshNormalMaterial();
```

[![Image from Gyazo](https://i.gyazo.com/29dcb455b49014d40b17a9f99d994dab.png)](https://gyazo.com/29dcb455b49014d40b17a9f99d994dab)

法線マップは面をどのように照らすか、環境がジオメトリの表面でどのように反射、屈折するかを計算するなど様々な目的で使用できます。

色はカメラに対する法線方向のみを表示し、球体の周りを回転させると球体がどの部分を向いているかにかかわらず、色が常に同じであることがわかります。

```js
material.flatShading = true;
```

`flatShading`プロパティを設定することで面が平坦化され頂点間の法線が補間されなくなります。

[![Image from Gyazo](https://i.gyazo.com/ab706abc918ad5b09a98e2c5e83abcf1.png)](https://gyazo.com/ab706abc918ad5b09a98e2c5e83abcf1)

## MeshMatcapMaterial

`MeshMatcapMaterial` は優れたパフォーマンスを維持しながら、リアルな質感を表現できます。

```js
const material = new THREE.MeshMatcapMaterial();

// 任意のMatcapテクスチャを使用
material.matcap = matcapTexture;

// material.mapではないので注意！
```

[![Image from Gyazo](https://i.gyazo.com/1b02926fe22ea07e37529ffb5c375095.png)](https://gyazo.com/1b02926fe22ea07e37529ffb5c375095)

## MeshDepthMaterial

`MeshDepthMaterial`は、カメラの`far`に近い場合は白く、カメラの`near` に近い場合は黒く表示されます。

```js
const material = new THREE.MeshDepthMaterial();
```

[![Image from Gyazo](https://i.gyazo.com/df1cfeea17059d1421c7bc9cb61ada71.gif)](https://gyazo.com/df1cfeea17059d1421c7bc9cb61ada71)

実際はもうちょっと複雑ですが、このマテリアルはテクスチャの深度を保存し、影の処理などの複雑な計算に使用できます

## MeshLambertMaterial

`MeshLambertMaterial`は、ライトを使用する最もパフォーマンスが高いマテリアルです。

ライトが無いと画面全体が真っ黒になってしまいます。

```js
const material = new THREE.MeshLambertMaterial();
```

[![Image from Gyazo](https://i.gyazo.com/d2defabb6d946c3a1dd883a5920fc4fb.png)](https://gyazo.com/d2defabb6d946c3a1dd883a5920fc4fb)

```js
// シーンにライトを追加する

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);
```

[![Image from Gyazo](https://i.gyazo.com/8bb323752030c3812baa50a72aefedbf.png)](https://gyazo.com/8bb323752030c3812baa50a72aefedbf)

## MeshPhongMaterial

`MeshPhongMaterial`にとても似ていますが、パフォーマンスがやや劣ります。

ですがプロパティを設定することで光の反射を制御することができます。

- `shininess`: 値が高いほど、表面の光沢感が増す。
- `specular`: 反射の色を変更する。

```js
// 光沢感の設定
material.shininess = 100;

// 反射の色を設定
material.specular = new THREE.Color(0x1188ff);
```

[![Image from Gyazo](https://i.gyazo.com/95ee06bd146609b28629bfce903a4160.png)](https://gyazo.com/95ee06bd146609b28629bfce903a4160)

## MeshToonMaterial

` MeshToonMaterial`は漫画風にするマテリアルです

[![Image from Gyazo](https://i.gyazo.com/164194b85d96a624d9f20097958a49f4.png)](https://gyazo.com/164194b85d96a624d9f20097958a49f4)

```js
material.gradientMap = gradientTextur;
```

テクスチャにこのようなグラデーションを表した画像を適用
[![Image from Gyazo](https://i.gyazo.com/73627aa61b0d07e5a7e36272014020da.png)](https://gyazo.com/73627aa61b0d07e5a7e36272014020da)

漫画のような効果がなくなった

[![Image from Gyazo](https://i.gyazo.com/3eea6146a3c37ec706ca118f62834cac.png)](https://gyazo.com/3eea6146a3c37ec706ca118f62834cac)

画像サイズが 3 \* 1 ピクセルと非常に小さいので拡大フィルターを設定してみると

```js
const material = new THREE.MeshToonMaterial();

// 拡大フィルター
gradientTexture.magFilter = THREE.**NearestFilter**;
material.gradientMap = gradientTexture;
```

[![Image from Gyazo](https://i.gyazo.com/b080a1db412139188843f327be0e8fc5.png)](https://gyazo.com/b080a1db412139188843f327be0e8fc5)

これで漫画のような効果が適用される

## MeshStandardMaterial

`MeshStandardMaterial`は PBR: 物理ベースレンダリング使用したマテリアル。

`MeshPhongMaterial`と同様ライトをサポートするがよりリアルなアルゴリズムとメタリックやラフネスの優れたパラメーターを備えている

> [!NOTE]
> なぜ StandardMaterial なのか？
> PBR は多くのソフトウェアやライブラリの標準となっているため Standardmaterial となっている

```js
const material = new THREE.MeshStandardMaterial();

// ライト
const ambientLight = new THREE.AmbientLight();
const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(ambientLight, pointLight);
```

デフォルトとだとこんな感じ

[![Image from Gyazo](https://i.gyazo.com/87a0e4cdd3049c53e9af9816bb1a0e32.png)](https://gyazo.com/87a0e4cdd3049c53e9af9816bb1a0e32)

`metalness`や`roughness`プロパティを設定できる

**metalness プロパティ**
`metalness`プロパティは
どの程度金属に近いかを設定するプロパティ
デフォルトは`0.0`
`0.0 - 1.0` の範囲で指定する
0 に近いほど木材や石材のなどの非金属材質に、1 に近いほど錆びた金属の近くなる

**roughness プロパティ**
`roughness`プロパティは
マテリアルの粗さの度合いを設定プロパティ

デフォルトは`1.0`
`0.0 - 1.0`での範囲で指定する
0 に近いほど滑らかで鏡面反射をするようになり 1 に近いほど反射しなくなる

roughnessMap も指定してる場合は
両方の値が**乗算**される。

```js
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.45;
material.roughness = 0.65;
```

[![Image from Gyazo](https://i.gyazo.com/94a067e80624bb66850e457ab0afe4c4.png)](https://gyazo.com/94a067e80624bb66850e457ab0afe4c4)

## デバッグ UI を追加する

コマンドを叩く
`npm install lil-gui`

lil-gui をインポート

```js
import GUI from "lil-gui";
```

lil-gui をインスタンス化してデバッグ UI の追加

```js
// デバッグUI

// lil-guiをインスタンス化
const gui = new GUI();

// metalnessプロパティのデバッグUIを追加
gui.add(material, "metalness").min(0).max(1).step(0.001);

//roughnessプロパティのデバッグUIを追加
gui.add(material, "roughness").min(0).max(1).step(0.001);
```

[![Image from Gyazo](https://i.gyazo.com/b7abe9afe9378f70194fa7e503b87382.gif)](https://gyazo.com/b7abe9afe9378f70194fa7e503b87382)

## 環境マップの追加

環境マップとは、360 度カメラで撮影された画像のこと

Google マップのストリートビューがイメージしやすい

### DirectionalLight

`DirectionalLight` を設定すると
現在の DirectionalLight と AmbientLight に加えて、反射や屈折、照明をオブジェクトに追加することができる

### 環境マップの読み込み

`RGBELoader`をインポート

```js
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
```

`RGBELoader`インスタンス化して
環境マップに使用する画像を読み込んでシーンに適用

```js
// 環境マップ

// 環境マップのインスタンス化
const rgbeLoader = new RGBELoader();

// 環境マップに使用する画像を読み込み
rgbeLoader.load("./textures/environmentMap/2k.hdr", (environmentMap) => {
  // シーンに適用
  // mappingプロパティをTHREE.EquirectangularReflectionMapping(反射マップ)に変更
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  // EquirectangularReflectionMapping(反射マップ)に変更することで反射を計算してくれる

  // シーンのbackgroundプロパティとenvironmentプロパティに設定
  scene.background = environmentMap;
  scene.environment = environmentMap;
});
```

AmbientLignt と pointLight は環境マップで十分なので削除してください。

### その他のプロパティ

以下のプロパティをざっくり紹介します

- `map` アルファテクスチャの適用
- `aoMap` アンビエントオクルージョンマップの適用
  - `aoMapIntensity` アンビエントオクルージョンの効果の強さを設定
- `displacementMap` 高さマップの適用
  - `displacemanetScale` 高さマップ効果の強さを制御
- `metalnessMap` メタリックテクスチャの適用
- `roughnessMap` ラフネステクスチャの適用
- `normalMap.set` 法線マップの適用
  - `normalScale` 法線マップの効果の強さを設定
- `transparent` 透明度を制御することを Three.js に伝える
- `alphaMap` アルファテクスチャの適用

テクスチャは任意の画像を使用してください

### map プロパティ

```js
// アルベドテクスチャを適用
material.map = doorColorTexture;
```

### aoMap プロパティ

```js
// アンビエントオクルージョンマップの適用
material.aoMap = doorAmbientOcclusionTexture;

// アンビエントオクルージョンの効果の強さを設定
material.aoMapIntensity = 1; // デフォルトは 1
```

### displacementMap プロパティ

```js
// 高さマップの適用
material.displacementMap = doorHeightTexture;
// 高さマップ効果の強さを制御
material.displacementScale = 1; // デフォルトは 1
```

### metalnessMap プロパティ

```js
// メタリックテクスチャの適用
material.metalnessMap = doorMetalnessTexture;
```

### roughnessMap プロパティ

```js
// ラフネステクスチャの適用
material.roughnessMap = doorRoughnessTexture;
```

### normalMap プロパティ

```js
// 法線マップの適用
material.normalMap = doorNormalTexture;

// 法線マップの効果の強さを設定
material.normalScale.set(
  0.5, // width: 幅
  0.5 // height: 高さ
);
// 2Dベクトルで設定
```

### alphaMap プロパティ

```js
// 透明度を制御することを Three.js に伝える
material.transparent = true;

// アルファテクスチャの適用
material.alphaMap = doorAlphaTexture;
```

## MeshPhysicalMaterial

`MeshPhysicalMaterial`は`MeshStandardMaterial`に

- `clearcoat` クリアコート
- `sheen` 光沢
- `iridescence` 虹彩
- `opacity` 透過

などの追加機能をサポートしている

### clearcoat プロパティ

clearcoat プロパティがマテリアルの上に薄いニスを塗ったような効果を再現します。

マテリアルの色や質感を保ちつつ、独自の反射特性で光沢や艶感を表現できます。

デフォルトは `0.0`
効果の強さを `0.0 - 1.0`の間で設定

```js
// クリアコートを設定
material.clearcoat = 1;

// クリアコートの粗さを設定
material.clearcoatRoughness = 0.5; // デフォルトは 0
```

### sheen プロパティ

`sheen`プロパティは マテリアルの光沢を設定するプロパティ。
布地のようなふわふわした素材でよく用いられる。

デフォルトは `0.0`
効果の強さを `0.0- 1.0`の間で設定

```js
// 光沢を設定
material.sheen = 1;

// 光沢の粗さ(艶)を設定
material.sheenRoughness = 0.25;

// 光沢の反射の色を設定
material.sheenColor.set(
  1, // r 0.0 〜 1.0 の間で設定
  1, // g 0.0 〜 1.0 の間で設定
  1 // b 0.0 〜 1.0 の間で設定
);

// RGBではなく16進数(hex)でも可能
material.sheenColor.set(0xffffff);
```

### iridescence プロパティ

`iridescence` プロパティは 虹彩効果を設定するプロパティ。

シャボン玉や CD のような光沢を表現できる

表面とカメラ間の角度に基づいて虹彩効果を再現します

デフォルトは `0.0`
虹彩効果の強さを `0.0 - 1.0` の間で設定

```js
// 虹彩効果を設定
material.iridescence = 1;

// 屈折率を設定
material.iridescenceIOR = 1; // デフォルトは 2.333
// 1.0 〜 2.333の間で設定

// 虹彩層の最小と最大の厚さを設定
material.iridescenceThicknessRange = [
  100, // 最小の厚さ
  800, // 最大の暑さ
];

//デバックUIに追加する場合
gui.add(
  material.iridescenceThicknessRange,
  "0" //インデックスを指定
);
```

虹色に反射しているのが虹彩効果
[![Image from Gyazo](https://i.gyazo.com/2ef6dc27218ad8cb4d667fe72ee3b9dc.gif)](https://gyazo.com/2ef6dc27218ad8cb4d667fe72ee3b9dc)

### transmission プロパティ

`transmission` プロパティはオブジェクトの透過を設定するプロパティ。

透過を設定することで光が素材を通過するようになる。

デフォルトは `0.0`
透明度を `0.0 - 1.0`の間で設定

`transmissionが` `0` 以外の場合は `opacity`を `1` に設定する必要がある

```js
// 透過を設定
material.transmission = 1;

// 屈折率を設定
material.ior = 1.5; // デフォルトは 1.5

// 厚さを設定
material.thickness = 0.5; // デフォルトは 0
```

[![Image from Gyazo](https://i.gyazo.com/dee33fe479ac45a0d9f60d66d0a712d6.png)](https://gyazo.com/dee33fe479ac45a0d9f60d66d0a712d6)

テクスチャをなくすとこんな感じ
[![Image from Gyazo](https://i.gyazo.com/f84b657039b514ac508abb3d45604e53.png)](https://gyazo.com/f84b657039b514ac508abb3d45604e53)

屈折率は表現する物質によって異なります。詳しくは[こちらを参照](https://en.wikipedia.org/wiki/List_of_refractive_indices)

```

```
