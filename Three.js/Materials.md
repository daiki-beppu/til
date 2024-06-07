# マテリアルについて

## マテリアルとは

マテリアルとはジオメトリの可視ピクセルに色をつけるために使用される。

ピクセルの色を決定するアルゴリズムは、シェーダーと呼ばれるプログラムに記述されます。

シェーダーの記述は、WebGL と Three.js のとても難しい部分の 1 つです。

ですが心配は無用です。
Three.js には、事前に作成されたシェーダーを備えた組み込みマテリアルがたくさんあります。

## `MeshBasicMaterial`

最も｢基本的な｣マテリアル

プロパティの設定は 2 パターン(以降はドット記法で解説)

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
透明度を制御することを Three.js に伝えるために`transparent`を`ture`にする必要がある

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

- THREE.FrontSide (前面)
- THREE.BackSide (背面)
- THREE.DoubleSide (両面)

デフォルトでは THREE.FrontSide (前面)が指定されている

デフォルトでは球体の中に入ると向こうが透けて見える(裏側が表示されない)
[![Image from Gyazo](https://i.gyazo.com/9fd0525e2245dc1adbb7ee82ca134050.gif)](https://gyazo.com/9fd0525e2245dc1adbb7ee82ca134050)

```js
material.side = THREE.DoubleSide;
```
