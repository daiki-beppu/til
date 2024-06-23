# パーティクル (粒子) について

- [パーティクル (粒子) について](#パーティクル-粒子-について)
  - [パーティクル (粒子) の作成](#パーティクル-粒子-の作成)
  - [パーティクル (粒子) をランダムに配置](#パーティクル-粒子-をランダムに配置)
  - [マテリアルの設定](#マテリアルの設定)
    - [color, map, alphaMap の設定](#color-map-alphamap-の設定)
    - [alphaTest の設定](#alphatest-の設定)
    - [depthTest の設定](#depthtest-の設定)
      - [depthTest を無効にする問題点](#depthtest-を無効にする問題点)
    - [depthWrite の設定](#depthwrite-の設定)
  - [パーティクル (粒子) にランダムな色を設定する](#パーティクル-粒子-にランダムな色を設定する)

## パーティクル (粒子) の作成

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/4e919ff8cd0e048248d9c5a92a30aca5.png)](https://gyazo.com/4e919ff8cd0e048248d9c5a92a30aca5)

```js
// パーティクルの値を設定
const particlesParams = {
  radius: 1,
  widthSegments: 32,
  heightSegments: 32,
};
```

```js
// パーティクルのジオメトリを作成
const particlesGeomettry = new THREE.SphereGeometry(
  particlesParams.radius,
  particlesParams.widthSegments,
  particlesParams.heightSegments
);
```

```js
// パーティクルのマテリアルを作成
const particlesMaterial = new THREE.PointsMaterial({
  // 粒子のサイズ
  size: 0.02,
  // サイズをカメラの距離に応じて粒子のサイズが小さくなる設定
  sizeAttenuation: true, // デフォルトは true false にするとカメラの距離にかかわらず粒子のサイズが一定になる
});
```

```js
// パーティクルのオブジェクトを作成

// Mesh ではなく Points を使用する
const particles = new THREE.Points(particlesGeomettry, particlesMaterial);
```

## パーティクル (粒子) をランダムに配置

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/e37aa41609181f1c800cb2acfc0db4f8.png)](https://gyazo.com/e37aa41609181f1c800cb2acfc0db4f8)

[![Image from Gyazo](https://i.gyazo.com/5e258393959ded78442fe6e00bb0ec94.png)](https://gyazo.com/5e258393959ded78442fe6e00bb0ec94)

```js
// ジオメトリの作成
const particlesGeometry = new THREE.BufferGeometry();
```

```js
// パーティクルの数
const count = 5000;

// パーティクルを格納する配列を作成
const position = new Float32Array(count * 3);

// 各パーティクルは3つの値(x,y,z)を持つため、const * 3 のサイズの Float32Array を作成する
```

```js
// 配列 position に ランダムな値を設定
for (let i = 0; i < count * 3; i++) {
  position[i] = (Math.random() - 0.5) * 10; // -0.5 ~ 5 までの値を設定
}
```

```js
// パーティクルの位置をジオメトリに設定
particlesGeomettry.setAttribute(
  "position", // position 属性をジオメトリに設定
  new THREE.BufferAttribute(
    position, //属性に使用するデータを設定
    3 // 各頂点のデータ数を設定
  )
);
```

```js
// パーティクルのマテリアルを設定
const particlesMaterial = new THREE.PointsMaterial({
  // 粒子のサイズ
  size: 0.0001,
  // サイズをカメラの深度で減衰させる設定
  sizeAttenuation: true,
});
```

```js
// パーティクルの作成
const particles = new THREE.Points(particlesGeomettry, particlesMaterial);

// シーンに追加
scene.add(particles);
```

## マテリアルの設定

### color, map, alphaMap の設定

パーティクルにもテクスチャや色を設定できる！

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/9399be8f9a0f136fc457784db17cb13a.png)](https://gyazo.com/9399be8f9a0f136fc457784db17cb13a)

```js
// テクスチャのロード
const textureLoader = new THREE.TextureLoader();
const particlesTexture = textureLoader.load("./textures/particles/2.png"); // 画像のパスは任意のものを使用
```

```js
const particlesMaterial = new THREE.PointsMaterial({
  color: "red", // 色を赤に設定
  map: particlesTexture, // 円のテクスチャを適用
  size: 0.1, // 粒子のサイズ
  sizeAttenuation: true, // サイズをカメラの深度で減衰させる設定
});
```

### alphaTest の設定

`alphaTest` はピクセルの透明度に応じてピクセルを表示するかどうかを設定するプロパティ。

デフォルトの値は `0` ですべてのピクセルが描画されることを意味する。
`0.001` に設定した場合、透明度が `0,001` 以下のピクセルは描画されない。

```js
const particlesMaterial = new THREE.PointsMaterial({
  transparent: true, // 透明度を有効にする
  alphaMap: particlesTexture, // テクスチャの適用
  alphaTest: 0.001, // ピクセルの透明度に応じて表示する設定
  size: 0.1, // 粒子のサイズ
  sizeAttenuation: true, // サイズをカメラの深度で減衰させる設定
});
```

**適用前**

[![Image from Gyazo](https://i.gyazo.com/056f150a7a17c21c9237d45f5c973629.png)](https://gyazo.com/056f150a7a17c21c9237d45f5c973629)

パーティクルの中心が透過していない

**適用後**

[![Image from Gyazo](https://i.gyazo.com/0b0c5ec1f7a510eb6078cd4ee30b1343.png)](https://gyazo.com/0b0c5ec1f7a510eb6078cd4ee30b1343)

ちゃんと透過するようになった！
だけどよく見ると輪郭部分が透過していない...
完璧とは言えないが使えなくもない。

### depthTest の設定

`depthTest` は深度テストの設定をするプロパティ。

深度テストとは、
オブジェクトのピクセルごとにカメラの距離を比較して、奥にあるオブジェクトが手前のオブジェクトで隠れるようにするためのテストのこと。

デフォルトは `true` で 深度テストを有効にします。

`false` に設定した場合深度テストが無効になるので、カメラの距離に関係なく手前のオブジェクトが奥にあるオブジェクトの上に描画されます。

```js
const particlesMaterial = new THREE.PointsMaterial({
  transparent: true,
  alphaMap: particlesTexture,
  depthTest: false,
  AdditiveBlending,
  size: 0.1,
  sizeAttenuation: true,
});
```

**適用前**

[![Image from Gyazo](https://i.gyazo.com/056f150a7a17c21c9237d45f5c973629.png)](https://gyazo.com/056f150a7a17c21c9237d45f5c973629)

**適用後**

[![Image from Gyazo](https://i.gyazo.com/09c926bcaf8664595d799e487667b609.png)](https://gyazo.com/09c926bcaf8664595d799e487667b609)

`depthTest` を `false` に設定したことで透過するようになった！

#### depthTest を無効にする問題点

`depthTest` を無効に設定した場合、大きな問題点が生じる

こちらを見てもらうとわかりやすい

[![Image from Gyazo](https://i.gyazo.com/bcb76e4bff740d6eac08bd5e75561e09.png)](https://gyazo.com/bcb76e4bff740d6eac08bd5e75561e09)

別のオブジェクトがある場合、そのオブジェクトも透過してしまう。

これは多くの開発者が意図しない挙動だと考えられるので設定する場合は注意が必要。

次に紹介する`depthWrite` を設定することで多くの場合は意図した挙動になる可能性が高い！

### depthWrite の設定

`depthWrite` はオブジェクトの描画時に深度バッファに情報を書き込む設定をするプロパティ。

特定のオブジェクトが深度バッファに影響を与えないようにすることができる。

深度バッファとは、各ピクセルの深度情報を格納するためのデータを一時保管するメモリ領域です。
深度バッファによって、正しい前後関係で描画されるようになる。

デフォルトは `true` でオブジェクトの描画時、深度情報が深度バッファに書き込まれ、ほかオブジェクトとの正しい前後関係が確保される。

`false` に設定するとオブジェクトの描画時、深度情報が深度バッファに書き込まれないので、他のオブジェクトとの前後関係が変わる

```js
const particlesMaterial = new THREE.PointsMaterial({
  color: "red",
  transparent: true,
  alphaMap: particlesTexture,
  depthWrite: false,
  size: 0.1,
  sizeAttenuation: true,
});
```

**適用前**

[![Image from Gyazo](https://i.gyazo.com/0abd4d012cfb2f1502fdd228edfb295f.png)](https://gyazo.com/0abd4d012cfb2f1502fdd228edfb295f)

**適用後**

[![Image from Gyazo](https://i.gyazo.com/e93b1ad42bbeffef1a43add22bf83452.png)](https://gyazo.com/e93b1ad42bbeffef1a43add22bf83452)

## パーティクル (粒子) にランダムな色を設定する
