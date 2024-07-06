# 環境マップ

- [環境マップ](#環境マップ)
  - [キューブテクスチャ環境マップの表示](#キューブテクスチャ環境マップの表示)
    - [テクスチャの読み込み](#テクスチャの読み込み)
    - [環境マップを背景として表示](#環境マップを背景として表示)
    - [環境マップを使用してモデルを照らす](#環境マップを使用してモデルを照らす)
    - [環境マッププロパティとの背景の調整](#環境マッププロパティとの背景の調整)
  - [HDRI 正距円筒図法環境マップの表示](#hdri-正距円筒図法環境マップの表示)
    - [テクスチャの読み込みと環境マップの表示](#テクスチャの読み込みと環境マップの表示)
  - [キューブテクスチャ環境マップと HDRI 正距円筒図法環境マップの違い](#キューブテクスチャ環境マップと-hdri-正距円筒図法環境マップの違い)
  - [blender で環境マップの作成](#blender-で環境マップの作成)
    - [プロジェクトの設定](#プロジェクトの設定)
    - [ライトの作成](#ライトの作成)

## キューブテクスチャ環境マップの表示

キューブテクスチャは、6 つの面(立方体の各面)にテクスチャが割り当てられたもの。
それぞれの面に対応する画像を立方体の各面にマッピングします。

通常は以下のように 6 つの方向の画像が必要

- px (+ 方向の X)
- nx (- 方向の X)
- py (+ 方向の Y)
- ny (- 方向の Y)
- pz (+ 方向の Z)
- nz (- 方向の Z)

### テクスチャの読み込み

```js
// キューブテクスチャローダーをインスタンス化
const cubeTextureLoader = new THREE.CubeTextureLoader();
```

```js
// LDR(ローダイナミックレンジ) キューブテクスチャ
const environmentMap = cubeTextureLoader.load([
  // この順番じゃないとダメ
  "./environmentMaps/0/px.png",
  "./environmentMaps/0/nx.png",
  "./environmentMaps/0/py.png",
  "./environmentMaps/0/ny.png",
  "./environmentMaps/0/pz.png",
  "./environmentMaps/0/nz.png",
]);
```

### 環境マップを背景として表示

完成イメージ
[![Image from Gyazo](https://i.gyazo.com/726bc0376d3c8aa615b12d7b4a28ccc5.png)](https://gyazo.com/726bc0376d3c8aa615b12d7b4a28ccc5)

```js
// 背景に環境マップを適用
scene.background = environmentMap;
```

### 環境マップを使用してモデルを照らす

完成イメージ
[![Image from Gyazo](https://i.gyazo.com/0d34793223368f5f0b3d1b3f3ac9affa.png)](https://gyazo.com/0d34793223368f5f0b3d1b3f3ac9affa)

```js
// シーン全体に環境マップを適用
scene.environment = environmentMap;
```

### 環境マッププロパティとの背景の調整

**環境マップの明るさを調整**

完成イメージ

<a href="https://gyazo.com/7191751a41fbf5803b120e50ba7aa8a6"><img src="https://i.gyazo.com/7191751a41fbf5803b120e50ba7aa8a6.gif" alt="Image from Gyazo" width="800"/></a>

```js
const environmentMapParams = {
  intensity: 1,
  rotation: { x: 1, y: 1, z: 1 },
};

// 環境マップの明るさを変更
scene.environmentIntensity = environmentMapParams.intensity; // デフォルトは 1 で値が大きいほど明るく、小さいほど暗くなる
```

**背景のブラー(ぼかし)を調整**

完成イメージ

<a href="https://gyazo.com/ff9c17db174696347d275db9bf38b17a"><img src="https://i.gyazo.com/ff9c17db174696347d275db9bf38b17a.gif" alt="Image from Gyazo" width="800"/></a>

```js
const backgroundParams = {
  intensity: 1,
  blurriness: 0,
  rotation: { x: 1, y: 1, z: 1 },
};

// 背景のブラー(ぼかし)を変更
scene.backgroundBlurriness = backgroundParams.blurriness; // デフォルトは 0, 0 から 1 の範囲で設定値が大きくなるほど背景がぼやける
```

**背景の明るさを調整**

完成イメージ

<a href="https://gyazo.com/70fd3bec3172720105d7533c0e12b487"><img src="https://i.gyazo.com/70fd3bec3172720105d7533c0e12b487.gif" alt="Image from Gyazo" width="993"/></a>

```js
const backgroundParams = {
  intensity: 1,
  blurriness: 0,
  rotation: { x: 1, y: 1, z: 1 },
};

// 背景の明るさを変更
scene.backgroundIntensity = backgroundParams.intensity;
```

**環境マップと背景の向きを調整**

完成イメージ

<a href="https://gyazo.com/aa76104fc361d6c23cc6dfd22a310cd0"><video width="982" autoplay muted loop playsinline controls><source src="https://i.gyazo.com/aa76104fc361d6c23cc6dfd22a310cd0.mp4" type="video/mp4"/></video></a>

```js
const backgroundParams = {
  intensity: 1,
  blurriness: 0,
  rotation: { x: 1, y: 1, z: 1 },
};

const environmentMapParams = {
  intensity: 1,
  rotation: { x: 1, y: 1, z: 1 },
};

// 背景の向きを変更
scene.backgroundRotation.y = backgroundParams.rotation.y;
```

## HDRI 正距円筒図法環境マップの表示

**HDRI と 正距円筒図法について**

HDRI とは **High Dynamic Range Imaging** の略で、通常の画像よりも広い範囲のカラー値を持つ画像フォーマットで明るさのデータを保存するのに最適。

正距円筒図法とは地球などの球面を平面に投影する方法の一つ。
360 度の環境を 1 枚の 2D 画像として表現し、正距円筒図法の画像は横方向に 360 度、縦方向に 180 度の範囲をカバーする

### テクスチャの読み込みと環境マップの表示

```js
// RGBELoader のインポート
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
```

```js
// RGBELoader をインスタンス化
const rgbeLoader = new RGBELoader();
```

```js
// テクスチャの読み込み
rgbeLoader.load("/environmentMaps/0/2k.hdr", (environmentMap) => {
  // 環境マップの適用
  // 正距円筒図法（Equirectangular Projection）を反射マッピングとして設定
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  // 環境マップのテクスチャを背景に適用
  scene.background = environmentMap;

  // シーン全体に環境マップの環境を適用
  scene.environment = environmentMap;
});
```

## キューブテクスチャ環境マップと HDRI 正距円筒図法環境マップの違い

以下にキューブテクスチャ環境マップと HDRI 正距円筒図法環境マップの違いを表にまとめました：

| 特徴             | キューブテクスチャ環境マップ   | HDRI 正距円筒図法環境マップ        |
| ---------------- | ------------------------------ | ---------------------------------- |
| 画像形式         | 6 つの正方形画像               | 1 つの長方形画像                   |
| マッピング方法   | Cube Mapping                   | Equirectangular Mapping            |
| 環境表現         | ゲームやリアルタイム用途に最適 | フォトリアリスティックな用途に最適 |
| レンダリング効率 | 高効率                         | 高負荷                             |
| 使用例           | 反射や屈折のシミュレーション   | 高品質なビジュアライゼーション     |

## blender で環境マップの作成

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/ff11f9f3422a3e588ed1c962fbdc16dc.png)](https://gyazo.com/ff11f9f3422a3e588ed1c962fbdc16dc)

[![Image from Gyazo](https://i.gyazo.com/9af91a906ecc722f567105c3d6404b0b.png)](https://gyazo.com/9af91a906ecc722f567105c3d6404b0b)

### プロジェクトの設定

`A → A`で全選択 → `X`で削除してなにもない状態をつくる → レンダープロパティからレンダーエンジンを `Cycles`に変更 → サンプリングの最大サンプル数を `256`に変更 → レンダーの最大サンプル数を `256`に変更

[![Image from Gyazo](https://i.gyazo.com/d806fbd3eedf78554b516cd783773d35.png)](https://gyazo.com/d806fbd3eedf78554b516cd783773d35)

ワールドプロパティからサーフェスの`カラーを完全に黒(アルファ値を 1)`に設定

[![Image from Gyazo](https://i.gyazo.com/a9104ab3a5df2e04a434615da221cdea.png)](https://gyazo.com/a9104ab3a5df2e04a434615da221cdea)

出力プロパティからフォーマットの解像度 X を`2048px`に → フォーマット解像度 Y を`1024px`も変更
※ 2 の累乗の値を設定する

[![Image from Gyazo](https://i.gyazo.com/bc7073c039f6c45f0670307d3f3d29db.png)](https://gyazo.com/bc7073c039f6c45f0670307d3f3d29db)

### ライトの作成

`⇧ (shift) + A`のメニューから`ライト` → `エリアライト`を選択

[![Image from Gyazo](https://i.gyazo.com/45d0064fc3a6beeeab39be2500ad3b2e.png)](https://gyazo.com/45d0064fc3a6beeeab39be2500ad3b2e)

`G`で移動 → `R`でライトが中心から当たるように回転 → `S`でサイズを調整

<a href="https://gyazo.com/3b12d4c29eaa8e7e0b245c0bf582436f"><img src="https://i.gyazo.com/3b12d4c29eaa8e7e0b245c0bf582436f.gif" alt="Image from Gyazo" width="1000"/></a>

`⇧ (shift) + D`で複製して残り 2 つも位置と向きを調整

データプロパティから 1 つ目のライトのカラーを`白`、2 つ目のライトのカラーを`青`、3 つ目のライトのカラーを`赤`に設定

データプロパティからすべてのライトの`パワーを 1000 W `に変更

[![Image from Gyazo](https://i.gyazo.com/2c7c49273dbac4d49af5bcc334cad750.png)](https://gyazo.com/2c7c49273dbac4d49af5bcc334cad750)

[![Image from Gyazo](https://i.gyazo.com/b80b8be75e9003ad901f7e0e7877fd09.png)](https://gyazo.com/b80b8be75e9003ad901f7e0e7877fd09)

[![Image from Gyazo](https://i.gyazo.com/15cdd68dfe84ac431662660137215a6b.png)](https://gyazo.com/15cdd68dfe84ac431662660137215a6b)

