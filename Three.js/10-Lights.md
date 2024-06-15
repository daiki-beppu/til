# ライトについて

- [ライトについて](#ライトについて)
  - [ライトの種類](#ライトの種類)
    - [AmbientLight](#ambientlight)
    - [DirectionalLight](#directionallight)
    - [HemisphereLight](#hemispherelight)
    - [PointLight](#pointlight)
    - [RectAreaLight](#rectarealight)
    - [SpotLight](#spotlight)
  - [最適化](#最適化)
  - [ヘルパー](#ヘルパー)
    - [HemisphereLightHelper](#hemispherelighthelper)
    - [DirectionalLightHelper](#directionallighthelper)
    - [PointLightHelper](#pointlighthelper)
    - [SpotLightHelper](#spotlighthelper)
    - [RectAreaLightHelper](#rectarealighthelper)


ライトはシーンに光を追加してよりリアルに表現するために使用する

ライトは以下の手順で使用することができる

1. ライトをインスタンス化
2. パラメータを設定
3. シーンに追加

## ライトの種類

下記の種類を紹介します

- AmbientLight
- DirectionalLight
- HemisphereLight
- PointLight
- RectAreaLight
- SpotLight

### AmbientLight

`AmbientLight`はシーン全体に均等に光を照らすのに使用する

```js
// AmbientLightをインスタンス化
const ambientLight = new THREE.AmbientLight();

// パラメータを設定
ambientLight.color = new THREE.Color(0xffffff); // 光の色を設定
ambientLight.intensity = 1; // 光の強さを設定

// シーンに追加
scene.add(ambientLight);
```

```js
// コンストラクタに直渡すこともできる
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// これなら1行で書くことができます！
```

少し冗長な記述にはなりますが
個人的にはオブジェクトでパラメータを一箇所で管理してするのがわかりやすくて好きです

```js
// オブジェクトでパラメータを管理
const ambientLightParams = {
  color: 0xffffff, // デフォルトは0xffffff
  intensity: 1, //光の強さ デフォルトは 1
};

const ambientLight = new THREE.AmbientLight(
  ambientLightParams.color,
  ambientLightParams.intensity
);
scene.add(ambientLight);
```

※以降はドット記法で解説。

[![Image from Gyazo](https://i.gyazo.com/8fdf7682e93fef68980077a9a9fb114d.png)](https://gyazo.com/8fdf7682e93fef68980077a9a9fb114d)

### DirectionalLight

`DirectionalLight`はシーンの中心に一定の方向からシーンを照らすのに使用する

```js
// DirectionalLightをインスタンス化
const directionalLight = new THREE.DirectionalLight();

// パラメータを設定
directionalLight.color = new THREE.Color(0xfffc); // デフォルトは 0xffffff
directionalLight.intensity = 0.9; // 光の強さ デフォルトは 1
directionalLight.position.set(1, 0.25, 0);

// シーンに追加
scene.add(directionalLight);
```

AmbientLight + DirectionalLight

[![Image from Gyazo](https://i.gyazo.com/6ece44461cf6ae05e258d5b52e318583.png)](https://gyazo.com/6ece44461cf6ae05e258d5b52e318583)

DirectionalLight のみだとこんな感じになる

[![Image from Gyazo](https://i.gyazo.com/ba5ca997ea4268016775fbc709bbebd5.png)](https://gyazo.com/ba5ca997ea4268016775fbc709bbebd5)

### HemisphereLight

`HemisphereLight`はシーンの真上に配置された光で
上方向(空)からの光と下方向(地面)からの光で均等にシーンを照らす

```js
// HemisphereLightをインスタンス化
const hemisphereLight = new THREE.HemisphereLight();

// パラメータを設定
hemisphereLight.color = new THREE.Color(0xff0000); // 上方向(空)からの光の色 デフォルトは 0xffffff
hemisphereLight.groundColor = new THREE.Color(0x0000ff); // 下方向(地面)からの光の色 デフォルトは 0xffffff
hemisphereLight.intensity = 0.9; // デフォルトは 1

// シーンに追加
scene.add(hemisphereLight);
```

AmbientLight + HemisphereLight

[![Image from Gyazo](https://i.gyazo.com/ee04884eb894a2ca09e6a538acd63905.png)](https://gyazo.com/ee04884eb894a2ca09e6a538acd63905)

HemisphereLight のみだとこんな感じ

[![Image from Gyazo](https://i.gyazo.com/d3e79a2719b659071817cd199f9a593b.png)](https://gyazo.com/d3e79a2719b659071817cd199f9a593b)

設定した色のせいでかなり禍々しい感じに 💦

### PointLight

`PointLight` は特定の場所に光を照らすのに使用する

```js
// PointLightをインスタンス化
const pointLight = new THREE.PointLight();

// パラメータを設定
pointLight.color = new THREE.Color(0xff9000); //デフォルトは 0xffffff
pointLight.intensity = 1.5; //デフォルトは 1
pointLight.distance = 10; // 光の届く最大距離を設定 // デフォルトは 0 (制限なし)
pointLight.decay = 2; // 光の距離に応じて暗くなる量を設定 デフォルトは 2
pointLight.position.set(1, -0.5, 1); // 光を照らす位置 デフォルトはシーンの中心(0, 0, 0)

// シーンに追加
scene.add(pointLight);
```

AmbientLight + PointLight

[![Image from Gyazo](https://i.gyazo.com/1801b193a90a4ddf60810d252bf3142f.png)](https://gyazo.com/1801b193a90a4ddf60810d252bf3142f)

### RectAreaLight

`RectAreaLight`は四角形の平面全体に光を照らすのに使用する
`MeshStandardMateril`と`MeshPhysicalMatarial`でのみ動作し影をサポートしない

```js
// RectAreaLightをインスタンス化
const rectAreaLight = new THREE.RectAreaLight();

// パラメータを設定
rectAreaLight.color = new THREE.Color(0x4e00ff); // デフォルトは 0xffffff
rectAreaLight.intensity = 6; // デフォルトは 1
rectAreaLight.width = 1; // 幅を設定 デフォルトは 10
rectAreaLight.height = 1; // 高さを設定 デフォルトは 10
rectAreaLight.position.set(-1.5, 0, 1.5); // 光を照らす位置 デフォルトはシーンの中心(0, 0, 0)
rectAreaLight.lookAt(new THREE.Vector3()); // シーンの中心を向く

// シーンに追加
scene.add(rectAreaLight);
```

AmbientLight + RectAreaLight

[![Image from Gyazo](https://i.gyazo.com/c3e1bcef1967e10fc90e72bed0d67d35.png)](https://gyazo.com/c3e1bcef1967e10fc90e72bed0d67d35)

> [!WARNING]
> カスタムシェーダーや特定のマテリアルと組み合わせて使用する場合には、正しくレンダリングされないことがあり
> `THREE.RectAreaLightUniformsLib.init()`を呼び出す必要がある
>
> ```js
> import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
>
> // RectAreaLight を使用する前に初期化
> RectAreaLightUniformsLib.init();
> ```

### SpotLight

スポットライトを当てるのに使用する

```js
// SpotLight をインスタンス化
const spotLight = new THREE.SpotLight();

// パラメータを設定
spotLight.color = new THREE.Color(0x78ff00);
spotLight.intensity = 4.5;
spotLight.distance = 10;
spotLight.angle = Math.PI * 0.1; // 光が照らす角度 デフォルトは Math.PI/3
spotLight.penumbra = 0.25; // 光の輪郭を設定する デフォルトは 1
spotLight.decay = 1; // 光の距離に応じて暗くなる量を設定 デフォルトは 2
spotLight.position.set(0, 2, 3);

// シーンに追加
scene.add(spotLight);

// スポットライトを向けるターゲットを設定
spotLight.target.position.x = -0.75;

// ターゲットをシーンに追加
scene.add(spotLight.target);

// ターゲットをシーンに追加することでスポットライトの向きをコントロールする
```

AmbientLight + SpotLight

[![Image from Gyazo](https://i.gyazo.com/f22cb983be5684c7fb029fe4e98d2e63.png)](https://gyazo.com/f22cb983be5684c7fb029fe4e98d2e63)

## 最適化

ライトは多くの計算を必要とするのでパフォーマンスの面で大きな負担になる可能性がある。

なのでなるべくコストの安いライトを使用する

低コスト

- AmbientLight
- HemisphereLight

中コスト

- DirectionalLight
- PointLight

高コスト

- RectAreaLight
- SpotLight

テクスチャにライトを付与するベイク処理と呼ばれるテクニックでパフォーマンスを改善することもできる

ただ、たくさんのテクスチャが必要になることやライトを移動することができないデメリットもある

## ヘルパー

ヘルパーをシーンに追加することでライトの位置と方向を表示することができる

ヘルパーの追加手順は

1. ヘルパーをインスタンス化
2. シーンに追加

下記のヘルパーがサポートされている

- HemisphereLightHelper
- DirectionalLightHelper
- PointLightHelper
- SpotLightHelper
- RectAreaLightHelper

### HemisphereLightHelper

```js
// HemisphereLightHelperをインスタンスか
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight, // 視覚化するライト
  0.2 // ヘルパーのサイズ
);

// ヘルパーをシーンに追加
scene.add(hemisphereLightHelper);
```

[![Image from Gyazo](https://i.gyazo.com/ed02bbc0bb22cda61190e768bf3c8dd2.png)](https://gyazo.com/ed02bbc0bb22cda61190e768bf3c8dd2)

### DirectionalLightHelper

```js
// DirectionalLightHelper をインスタンス化
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight, // 視覚化するライト
  0.2 // ヘルパーのサイズ
);

// ヘルパーをシーンに追加
scene.add(directionalLightHelper);
```

[![Image from Gyazo](https://i.gyazo.com/8234e30cf0b8bb398ba002a8ccaf361c.png)](https://gyazo.com/8234e30cf0b8bb398ba002a8ccaf361c)

### PointLightHelper

```js
// PointLightHelper をインスタンス化
const pointLightHelper = new THREE.PointLightHelper(
  pointLight, // 視覚化ライト
  0.2 // ヘルパーのサイズ
);

// ヘルパーをシーンに追加
scene.add(pointLightHelper);
```

[![Image from Gyazo](https://i.gyazo.com/1bb15b4fdd6ca4e1cb1cbaa0106fe14b.png)](https://gyazo.com/1bb15b4fdd6ca4e1cb1cbaa0106fe14b)

### SpotLightHelper

```js
// SpotLightHelper をインスタンス化
const spotLightHelper = new THREE.SpotLightHelper(
  spotLight // 視覚化するライト
);

// ヘルパーをシーンに追加
scene.add(spotLightHelper);
```

[![Image from Gyazo](https://i.gyazo.com/dde7c81fb703cd54018e6f779b91d1d1.png)](https://gyazo.com/dde7c81fb703cd54018e6f779b91d1d1)

### RectAreaLightHelper

他のヘルパーとは違い`RectAreaLightHelper`をインポートする必要がある

```js
// RectAreaLightHelper をインポート
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
```

```js
// RectAreaLightHelper をインスタンス化
const rectAreaLightHelper = new RectAreaLightHelper(
  rectAreaLight // 視覚化するライト
);

// ヘルパーをシーンに追加
scene.add(rectAreaLightHelper);
```

[![Image from Gyazo](https://i.gyazo.com/bd7ecfb788e1c6a51c54c9ee5c3e049f.png)](https://gyazo.com/bd7ecfb788e1c6a51c54c9ee5c3e049f)
