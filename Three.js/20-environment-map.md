# 環境マップ

- [環境マップ](#環境マップ)
  - [キューブテクスチャ環境マップの表示](#キューブテクスチャ環境マップの表示)
    - [テクスチャの読み込み](#テクスチャの読み込み)
    - [環境マップを背景として表示](#環境マップを背景として表示)
    - [環境マップを使用してモデルを照らす](#環境マップを使用してモデルを照らす)
    - [環境マッププロパティとの背景の調整](#環境マッププロパティとの背景の調整)

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
