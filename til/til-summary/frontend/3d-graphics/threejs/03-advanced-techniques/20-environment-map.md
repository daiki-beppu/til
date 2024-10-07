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
    - [カメラの作成](#カメラの作成)
    - [レンダリングを確認後、HDR として保存](#レンダリングを確認後hdr-として保存)
    - [作成した環境マップを Three.js で表示](#作成した環境マップを-threejs-で表示)
  - [地上投影環境マップ](#地上投影環境マップ)
    - [地上投影環境マップの表示](#地上投影環境マップの表示)
  - [リアルタイム環境マップの表示](#リアルタイム環境マップの表示)

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

<a href="https://gyazo.com/7191751a41fbf5803b120e50ba7aa8a6"><img src="https://i.gyazo.com/7191751a41fbf5803b120e50ba7aa8a6.gif" alt="Image from Gyazo" width="1000"/></a>

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

<a href="https://gyazo.com/ff9c17db174696347d275db9bf38b17a"><img src="https://i.gyazo.com/ff9c17db174696347d275db9bf38b17a.gif" alt="Image from Gyazo" width="1000"/></a>

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

<a href="https://gyazo.com/70fd3bec3172720105d7533c0e12b487"><img src="https://i.gyazo.com/70fd3bec3172720105d7533c0e12b487.gif" alt="Image from Gyazo" width="1000"/></a>

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

<a href="https://gyazo.com/aa76104fc361d6c23cc6dfd22a310cd0"><video width="1000" autoplay muted loop playsinline controls><source src="https://i.gyazo.com/aa76104fc361d6c23cc6dfd22a310cd0.mp4" type="video/mp4"/></video></a>

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

完成イメージ
<a href="https://gyazo.com/d493a20108d04995e7ec3de77190ced0"><img src="https://i.gyazo.com/d493a20108d04995e7ec3de77190ced0.gif" alt="Image from Gyazo" width="1000"/></a>

```js
// RGBELoader のインポート
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
```

```js
// RGBELoader をインスタンス化
const rgbeLoader = new RGBELoader();
```

```js
// テクスチャの読み込み (任意のパスを指定)
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

> [!WARNING]
> blender ver.4.1 を使用しています。
> お使いのバージョンによって一部表示が異なる場合があります。

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

オブジェクトプロパティからレイの可視性 → `カメラにチェック`

[![Image from Gyazo](https://i.gyazo.com/f977c96a8ce66b38c7382e02c3331043.png)](https://gyazo.com/f977c96a8ce66b38c7382e02c3331043)

### カメラの作成

`⇧ (shift) + A`でメニューからカメラを選択

[![Image from Gyazo](https://i.gyazo.com/6c4a78b7435c94356b8154464ac3f962.png)](https://gyazo.com/6c4a78b7435c94356b8154464ac3f962)

カメラを作成したら右側のメニューから`位置 X,Y,Z をすべて 0` に設定 → `回転 X を 90°, Y,Z を 0°` に設定

メニューが表示されていない場合は`N`で表示できます。

[![Image from Gyazo](https://i.gyazo.com/0b56ffd5c3e45b4d321508ff043af246.jpg)](https://gyazo.com/0b56ffd5c3e45b4d321508ff043af246)

データプロパティからレンズ → `タイプをパノラマ状`に変更 → `パノラマタイプを正距円筒図法`に変更

[![Image from Gyazo](https://i.gyazo.com/79296de50aa6f57ca114f845d086c5c5.png)](https://gyazo.com/79296de50aa6f57ca114f845d086c5c5)

### レンダリングを確認後、HDR として保存

`F12` でシーンのレンダリング
※ PC のスペックなどの関係でレンダリングに時間がかかる場合があります

[![Image from Gyazo](https://i.gyazo.com/9af91a906ecc722f567105c3d6404b0b.png)](https://gyazo.com/9af91a906ecc722f567105c3d6404b0b)

レンダリング画面で `⌘ (option)+ S` → 保存先とファイル名を変更 → `Radiance HDR 形式`に変更 → `画像を別名保存`をクリックして保存

[![Image from Gyazo](https://i.gyazo.com/b3f9d3efbf4ea2565bf41e7912b1072f.png)](https://gyazo.com/b3f9d3efbf4ea2565bf41e7912b1072f)

### 作成した環境マップを Three.js で表示

```js
// RGBELoader のインポート
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
```

```js
// RGBELoader をインスタンス化
const rgbeLoader = new RGBELoader();
```

```js
// テクスチャの読み込み (任意のパスを指定)
rgbeLoader.load("/environmentMaps/blender-2k.hdr", (environmentMap) => {
  // 環境マップの適用
  // 正距円筒図法（Equirectangular Projection）を反射マッピングとして設定
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  // 環境マップのテクスチャを背景に適用
  scene.background = environmentMap;

  // シーン全体に環境マップの環境を適用
  scene.environment = environmentMap;
});
```

## 地上投影環境マップ

環境マップを背景として使用したときに、オブジェクトが空を飛んでいるように見えてしまうことがあります。これは、環境マップが無限に遠くにあるため、どの視点から見ても変わらない景色を提供するためです。言い換えると、環境マップはオブジェクトの周囲の景色が常に一定であるように設定されています。

### 地上投影環境マップの表示

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/e6051cb00e9d2fcacaff1af1b088d2a0.png)](https://gyazo.com/e6051cb00e9d2fcacaff1af1b088d2a0)

```js
// GroundedSkybox のインポート
import { GroundedSkybox } from "three/addons/objects/GroundedSkybox.js";
```

```js
// 地上投影環境マップ
rgbeLoader.load("./environmentMaps/2/2k.hdr", (environmentMap) => {
  // 環境マップの反射マッピングを設定
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  // シーン全体に環境マップの環境を適用
  scene.environment = environmentMap;

  // スカイボックスのサイズを定義
  const skyBoxHeight = 15;
  const skyBoxRadius = 70;

  // スカイボックスをインスタンスを作成
  const skyBox = new GroundedSkybox(
    environmentMap, // 使用する環境マップ
    skyBoxHeight, // スカイボックスの高さ
    skyBoxRadius // スカイボックスの半径
  );

  // スカイボックスの位置を調整 (オブジェクトが地面に接するように)
  skyBox.position.y = 15;
  scene.add(skyBox);
});
```

ワイヤーフレームを適用し視覚的に地面に押しつぶされた球体を確認できる

[![Image from Gyazo](https://i.gyazo.com/6d31eb6b4928680f1ca4c37f38f3ccc2.png)](https://gyazo.com/6d31eb6b4928680f1ca4c37f38f3ccc2)

```js
skyBox.material.wireframe = true;
```

## リアルタイム環境マップの表示

リアルタイム環境マップは、オブジェクトや光が動的に動く環境マップのことで各フレームでシーンをレンダリングして、その結果を Three.js で直接動作する動的環境マップを作成します。

完成イメージ

<a href="https://gyazo.com/7521e68b57c659da205b41cc9473f562"><img src="https://i.gyazo.com/7521e68b57c659da205b41cc9473f562.gif" alt="Image from Gyazo" width="1000"/></a>

```js
// リアルタイム環境マップ

// 環境マップに適用するテクスチャのロード
const environmentMap = textureLoader.load(
  "/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg"
);

// テクスチャを反射マッピングに適用
environmentMap.mapping = THREE.EquirectangularReflectionMapping;

// テクスチャに SRGB カラースペースを適用
environmentMap.colorSpace = THREE.SRGBColorSpace;

// テクスチャを背景に適用
scene.background = environmentMap;
```

トーラス(ドーナツ形状のオブジェクト)を作成して、そのオブジェクトの表面を照らして反射するようにする。(カッコいいのでホーリードーナツと命名します。)

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/bb113e5a2bdc17c1ff6e12b232b5ed5c.png)](https://gyazo.com/bb113e5a2bdc17c1ff6e12b232b5ed5c)

```js
// ホーリードーナツ
const holyDonutParams = {
  radius: 8,
  tube: 0.5,
  position: {
    x: 0,
    y: 3.5,
    z: 0,
  },
  color: 0xffffff,
};

const holyDonutGeometry = new THREE.TorusGeometry(
  holyDonutParams.radius,
  holyDonutParams.tube
);

const holyDonutMaterial = new THREE.MeshBasicMaterial({
  color: holyDonutParams.color,
});

const holyDonut = new THREE.Mesh(holyDonutGeometry, holyDonutMaterial);

holyDonut.position.y = holyDonutParams.position.y;
scene.add(holyDonut);
```

ホーリードーナツを回転させてみる

完成イメージ

<a href="https://gyazo.com/2fb9599fdf12cb9433988d2cd6b9aaef"><img src="https://i.gyazo.com/2fb9599fdf12cb9433988d2cd6b9aaef.gif" alt="Image from Gyazo" width="1000"/></a>

```js
// アニメーション
const clock = new THREE.Clock();
const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime();

  // リアルタイム環境マップ
  if (holyDonut) {
    holyDonut.rotation.x = Math.sin(elapsedTime) * 2;
  }

  // カメラ制御の更新
  controls.update();

  // レンダラー
  renderer.render(scene, camera);

  // 次のフレームを呼び出し
  window.requestAnimationFrame(tick);
};

tick();
```

独自の環境マップテクスチャ内でシーンをレンダラーで処理してそのテクスチャを立方体のテクスチャにすることで動的に変化する環境マップを作成する

完成イメージ

<a href="https://gyazo.com/3607616583debce24207ec79c07a6889"><img src="https://i.gyazo.com/3607616583debce24207ec79c07a6889.gif" alt="Image from Gyazo" width="800"/></a>

```js
// キューブレンダーターゲット
const cubeRenderTargetSize = 256; // 解像度を指定 (256 px)
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(cubeRenderTargetSize, {
  type: THREE.HalfFloatType, // 16 bit Float を使用。これによりデフォルトよりも多くの色情報を保持し、32bit Float よりもパフォーマンスがいい
});

// シーンにテクスチャとして追加
scene.environment = cubeRenderTarget.texture;
```

立方体の各面に対してテクスチャをレンダラーで処理する必要があるので、6 つの正方形のテクスチャをレンダラーで処理する必要がある

CubeCamera を使用することで、視野が立方体の各面を完全に覆い、6 つの方向（立方体の各面）のレンダリングを自動的に処理することができます。

```js
// キューブカメラ
const cubeCameraParams = {
  near: 0.1,
  far: 100,
  renderTarget: cubeRenderTurget,
};
const cubeCamera = new THREE.CubeCamera(
  cubeCameraParams.near,
  cubeCameraParams.far,
  cubeCameraParams.renderTarget
);
```

```diff
// アニメーション
const clock = new THREE.Clock();
const animationDuration = 2;

const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime();

  // リアルタイム環境マップ
  if (holyDonut) {
    const animateHolyDonut = Math.sin(elapsedTime) * animationDuration;
    holyDonut.rotation.x = animateHolyDonut;

+   cubeCamera.update(renderer, scene);
  }

  // カメラ制御の更新
  controls.update();

  // レンダラー
  renderer.render(scene, camera);

  // 次のフレームを呼び出し
  window.requestAnimationFrame(tick);
};

tick();

```

ただ、よく見るとオブジェクト自身が反射して映り込んでいるのでレイヤーを設定して修正する

[![Image from Gyazo](https://i.gyazo.com/9f467945cabddde182baba9e979e0394.png)](https://gyazo.com/9f467945cabddde182baba9e979e0394)

カメラにレイヤーを設定することで設定したカメラはレイヤーに一致するオブジェクトのみを表示する
レイヤーは`数値`で設定する。デフォルトは `0`

オブジェクトやカメラのレイヤーを変更するには 3 つの方法がある

- `object.layers.enable` レイヤーの追加
- `object.layers.remove` レイヤーの削除
- `object.layers.set` 指定レイヤー以外を無効化

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/c1dc5083d7d76912860adfc8fa8266f3.png)](https://gyazo.com/c1dc5083d7d76912860adfc8fa8266f3)

```js
// キューブカメラ
const cubeCameraParams = {
  near: 0.1,
  far: 100,
  renderTarget: cubeRenderTarget,
};
const cubeCamera = new THREE.CubeCamera(
  cubeCameraParams.near,
  cubeCameraParams.far,
  cubeCameraParams.renderTarget
);

// レイヤーをセット
cubeCamera.layers.set(1);

// ホーリードーナツにレイヤーを追加
holyDonut.layers.enable(1);
holyDonut.position.y = holyDonutParams.position.y;
scene.add(holyDonut);
```
