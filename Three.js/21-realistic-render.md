# リアルなレンダリング

- [リアルなレンダリング](#リアルなレンダリング)
  - [トーンマッピング](#トーンマッピング)
  - [アンチエイリアシング](#アンチエイリアシング)
  - [影の追加](#影の追加)
  - [テクスチャと色空間](#テクスチャと色空間)
    - [テクスチャを使用して床と壁を作成](#テクスチャを使用して床と壁を作成)
    - [色空間について](#色空間について)
  - [シャドウアクネの解消](#シャドウアクネの解消)
    - [シャドウアクネの解消方法](#シャドウアクネの解消方法)

## トーンマッピング

トーンマッピングは HDR(High Dynamic Range) 画像 を LDR(Low Dynamic Range) 画像 に変換する処理
Three.js のトーンマッピングは、HDR 画像を通常のディスプレイで表示するために使用する、これにより非常にリアルなレンダリングを可能が可能になる。

トーンマッピングを変更するにはレンダラーの`toneMapping` プロパティを更新します。

- `NoToneMapping` (デフォルト)
- `LinearToneMapping`
- `ReinhardToneMapping`
- `CineonToneMapping`
- `ACESFilmicToneMapping`

完成イメージ

<a href="https://gyazo.com/d182d7701d8188ce1640eac45ee31e28"><img src="https://i.gyazo.com/d182d7701d8188ce1640eac45ee31e28.gif" alt="Image from Gyazo" width="989"/></a>

```js
// トーンマッピングを変更
renderer.toneMapping = THREE.ACESFilmicToneMapping;

// デバッグ UIの追加
gui.add(renderer, "toneMapping", {
  No: THREE.NoToneMapping,
  Linear: THREE.LinearToneMapping,
  Reinhard: THREE.ReinhardToneMapping,
  Cineon: THREE.CineonToneMapping,
  ACESFilmic: THREE.ACESFilmicToneMapping,
});
```

**NoToneMapping (デフォルト)**

[![Image from Gyazo](https://i.gyazo.com/db77af5e152f9a1cadae5276a3fdd9dc.png)](https://gyazo.com/db77af5e152f9a1cadae5276a3fdd9dc)

**LinearToneMapping**

[![Image from Gyazo](https://i.gyazo.com/a2f1f78905089aa60638ba2864b42d3c.png)](https://gyazo.com/a2f1f78905089aa60638ba2864b42d3c)

**ReinhardToneMapping**

[![Image from Gyazo](https://i.gyazo.com/7730f2d5b84075b48824884cd4ead2aa.png)](https://gyazo.com/7730f2d5b84075b48824884cd4ead2aa)

**CineonToneMapping**

[![Image from Gyazo](https://i.gyazo.com/040ac986840c56d715496e493e52d4fe.png)](https://gyazo.com/040ac986840c56d715496e493e52d4fe)

**ACESFilmicToneMapping**

[![Image from Gyazo](https://i.gyazo.com/42494a0ebfae341944d8541927f794cb.png)](https://gyazo.com/42494a0ebfae341944d8541927f794cb)

`toneMappingExposure`プロパティでシーンに入る光の量を調整

完成イメージ

<a href="https://gyazo.com/75e89404fa582187aa935ffaabea3f98"><img src="https://i.gyazo.com/75e89404fa582187aa935ffaabea3f98.gif" alt="Image from Gyazo" width="1000"/></a>

```js
// シーンに入る光の量を調整
renderer.toneMappingExposure = 2; // デフォルトは 1
```

## アンチエイリアシング

アンチエイリアシングとは、ジオメトリのエッジなどで見られる、階段状のギザギザを滑らかにする技術です。これにより、滑らかで自然な表現が可能になります。

簡単な解決策の 1 つは、`SSAA(スーパーサンプリング) または FSAA(フルスクリーンサンプリング)`と呼ばれる方法です。

シーン全体を通常の解像度よりも高い解像度、例えば 2 倍の解像度でレンダリングします。その高解像度の画像を通常のサイズに縮小すると、縮小の際に、レンダリングされた複数のピクセル（例えば、4 つのピクセル）から各ピクセルの色を平均化します。これにより、ジャギーが滑らかになります。

レンダリングするピクセル数が多くなるので、パフォーマンに問題が発生する可能性がある。

もう 1 つの解決策は `MSAA(マルチサンプリング)`と呼ばれる方法です。
シーン全体ではなくジオメトリのエッジのみを高解像度でレンダリングします。
最新の GPU ではマルチサンプリングアンチエイリアシングを実行でき、Three.js はセットアップを自動的に処理します。

アンチエイリアシングを有効にするにはレンダラーの`antialias`プロパティを`true`に設定します。

```js
// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,

  // アンチエイリアシングを有効化
  antialias: true,
});
```

## 影の追加

環境マップは周囲の環境を反映した画像で、あらゆる方向からの光をシミュレートしますが、直接的な光源ではないため影を落とすことはできません。

そのため、影を表現するには、環境マップのライティングとほぼ一致するライト（例えば、複数の DirectionalLight や PointLight）を追加することで、影をリアルに表現することが可能です。

完成イメージ

<a href="https://gyazo.com/c8f6b8dd8b5e532d6c85ffc97228457e"><img src="https://i.gyazo.com/c8f6b8dd8b5e532d6c85ffc97228457e.gif" alt="Image from Gyazo" width="800"/></a>

```js
// ライト
const directionalLightParams = {
  color: 0xffffff,
  intensity: 6,
  position: { x: -4, y: 6.5, z: 2.5 },
  targetPosition: { x: 0, y: 4, z: 0 },
  shadowCamera: {
    far: 15,
  },
  shadowMapSize: { x: 1024, y: 1024 },
};

const { color, intensity, position } = directionalLightParams;
const directionalLight = new THREE.DirectionalLight(color, intensity);

directionalLight.position.set(position.x, position.y, position.z);
```

```js
// 影の設定
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
```

```js
// ライトの影を設定
const { shadowCamera, shadowMapSize, targetPosition } = directionalLightParams;
directionalLight.castShadow = true;
directionalLight.shadow.camera.far = shadowCamera.far;
directionalLight.shadow.mapSize.set(shadowMapSize.x, shadowMapSize.y);

directionalLight.target.position.set(
  targetPosition.x,
  targetPosition.y,
  targetPosition.z
);
directionalLight.target.updateWorldMatrix();
```

必要であればカメラヘルパーを追加して位置や影の投影範囲を設定

```js
const directionalLightHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
scene.add(directionalLightHelper);
```

```js
// デバッグ UI の追加
gui
  .add(directionalLight, "intensity")
  .min(0)
  .max(10)
  .step(0.001)
  .name("lightIntensity");
gui
  .add(directionalLight.position, "x")
  .min(-10)
  .max(10)
  .step(0.001)
  .name("lightPositionX");
gui
  .add(directionalLight.position, "y")
  .min(-10)
  .max(10)
  .step(0.001)
  .name("lightPositionY");
gui
  .add(directionalLight.position, "z")
  .min(-10)
  .max(10)
  .step(0.001)
  .name("lightPositionZ");
gui.add(directionalLight, "castShadow");
```

```js
// シーン内すべてのメッシュオブジェクトに影の設定を適用
const updateAllMaterials = () => {
  // シーン内すべてのオブジェクトとその子孫に対してコールバックを実行
  scene.traverse((child) => {
    // child オブジェクトがメッシュであるか確認し影の設定を適用
    if (child.isMesh) {
      // Activate shadow here
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};
```

## テクスチャと色空間

### テクスチャを使用して床と壁を作成

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/24d3e0c9b3ad1e422481c3632c5937a3.png)](https://gyazo.com/24d3e0c9b3ad1e422481c3632c5937a3)

**床の作成**

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/6cbcb7f822e2a987d0266ccc4648710b.png)](https://gyazo.com/6cbcb7f822e2a987d0266ccc4648710b)

```js
// 床
const FLOOR_TEXTURE_PATHS = {
  diff: "./textures/wood_cabinet_worn_long/wood_cabinet_worn_long_diff_1k.jpg",
  norGl:
    "./textures/wood_cabinet_worn_long/wood_cabinet_worn_long_nor_gl_1k.png",
  arm: "./textures/wood_cabinet_worn_long/wood_cabinet_worn_long_arm_1k.jpg",
};

const floorParams = {
  width: 8,
  height: 8,
  rotation: { x: -Math.PI / 2 },
  textures: {
    map: textureLoader.load(FLOOR_TEXTURE_PATHS.diff),
    normalMap: textureLoader.load(FLOOR_TEXTURE_PATHS.norGl),
    aoMap: textureLoader.load(FLOOR_TEXTURE_PATHS.arm),
    roughnessMap: textureLoader.load(FLOOR_TEXTURE_PATHS.arm),
    metalnessMap: textureLoader.load(FLOOR_TEXTURE_PATHS.arm),
  },
};

floorParams.textures.map.colorSpace = THREE.SRGBColorSpace;

// 床と壁のパラメータで名前衝突を避けるため分割代入(デストラクチャリング)で別名を指定
const {
  width: floorWidth,
  height: floorHeight,
  rotation: floorRotation,
  textures: floorTexture,
} = floorParams;

const floorGeometry = new THREE.PlaneGeometry(floorWidth, floorHeight);
const floorMaterial = new THREE.MeshStandardMaterial({
  map: floorTexture.map,
  normalMap: floorTexture.normalMap,
  aoMap: floorTexture.aoMap,
  roughnessMap: floorTexture.roughnessMap,
  metalnessMap: floorTexture.metalnessMap,
});

const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = floorRotation.x;
scene.add(floor);
```

**壁の作成**

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/24d3e0c9b3ad1e422481c3632c5937a3.png)](https://gyazo.com/24d3e0c9b3ad1e422481c3632c5937a3)

```js
// 壁
const WALL_TEXTURE_PATHS = {
  diff: "./textures/castle_brick_broken_06/castle_brick_broken_06_diff_1k.jpg",
  norGl:
    "./textures/castle_brick_broken_06/castle_brick_broken_06_nor_gl_1k.png",
  arm: "./textures/castle_brick_broken_06/castle_brick_broken_06_arm_1k.jpg",
};

const wallParams = {
  width: 8,
  height: 8,
  textures: {
    map: textureLoader.load(WALL_TEXTURE_PATHS.diff),
    normalMap: textureLoader.load(WALL_TEXTURE_PATHS.norGl),
    aoMap: textureLoader.load(WALL_TEXTURE_PATHS.arm),
    roughnessMap: textureLoader.load(WALL_TEXTURE_PATHS.arm),
    metalnessMap: textureLoader.load(WALL_TEXTURE_PATHS.arm),
  },
};

wallParams.textures.map.colorSpace = THREE.SRGBColorSpace;

wallParams.position = {
  x: 0,
  y: wallParams.width / 2,
  z: -wallParams.height / 2,
};

const {
  width: wallWidth,
  height: wallHeight,
  position: wallPosition,
  textures: wallTexture,
} = wallParams;
const wallGeometry = new THREE.PlaneGeometry(wallWidth, wallHeight);
const wallMaterial = new THREE.MeshStandardMaterial({
  map: wallTexture.map,
  normalMap: wallTexture.normalMap,
  aoMap: wallTexture.aoMap,
  roughnessMap: wallTexture.roughnessMap,
  metalnessMap: wallTexture.metalnessMap,
});

const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.set(wallPosition.x, wallPosition.y, wallPosition.z);
scene.add(wall);
```

### 色空間について

色空間は、人の目の感度に応じて色を最適化する方法です。
Three.js ではデフォルトで色空間に線形カラー（Linear）を使用します。

テクスチャが期待した色にならないのは、色空間が異なるためです。一般的にテクスチャは sRGB 色空間で作成されるため、Three.js で正しく表示するにはテクスチャの色空間を sRGB に設定する必要があります

ちなみに、glTF ファイルには色空間の情報があらかじめ設定されているため、追加の色空間設定は不要です。

カラースペースの適用なし

[![Image from Gyazo](https://i.gyazo.com/af45397303161600ff028e405f435041.png)](https://gyazo.com/af45397303161600ff028e405f435041)

カラースペースの適用あり (sRGBColorSpace)

[![Image from Gyazo](https://i.gyazo.com/24d3e0c9b3ad1e422481c3632c5937a3.png)](https://gyazo.com/24d3e0c9b3ad1e422481c3632c5937a3)

詳しくは[公式ドキュメント - Color management](https://threejs.org/docs/#manual/en/introduction/Color-management)を参照

## シャドウアクネの解消

前回作成した別のモデル(ハンバーガー)をインポートしてみます。

```js
gltfLoader.load("./models/hamburger.glb", (gltf) => {
  const modelParams = {
    scale: 0.5,
    position: { y: 2.5 },
  };

  const { scale, position } = modelParams;
  scene.add(gltf.scene);
  gltf.scene.scale.setScalar(scale);
  gltf.scene.position.y = position.y;
  updateAllMaterials();
});
```

よく見ると、表面に影がデコボコしています。これをシャドウアクネと呼びます。

[![Image from Gyazo](https://i.gyazo.com/a726221f2e164ee8072ee1e07fda8a72.png)](https://gyazo.com/a726221f2e164ee8072ee1e07fda8a72)

environmentIntensity を下げるとわかりやすいです

[![Image from Gyazo](https://i.gyazo.com/6cc5bea08698e556fd375f4719fdd65f.png)](https://gyazo.com/6cc5bea08698e556fd375f4719fdd65f)

シャドウアクネ（Shadow Acne）は、リアルタイムシャドウをレンダリングする際に発生するアーティファクトの一種です。

シャドウアクネの原因は、物体の表面と影がずれることで発生します。

### シャドウアクネの解消方法

`normalBias`と`bias`プロパティを調整する必要があります。

```js
const directionalLightParams = {
  shadowNormalBias: 0.027,
  shadowBias: -0.004,
};

const { shadowNormalBias, shadowBias } = directionalLightParams;
directionalLight.shadow.normalBias = shadowNormalBias;
directionalLight.shadow.bias = shadowBias;
```

デバッグ UI を追加して調整するのがいいです

```js
gui.add(directionalLight.shadow, "normalBias").min(-0.05).max(0.05).step(0.001);
gui.add(directionalLight.shadow, "bias").min(-0.05).max(0.05).step(0.001);
```

シャドウアクネの解消前

[![Image from Gyazo](https://i.gyazo.com/a726221f2e164ee8072ee1e07fda8a72.png)](https://gyazo.com/a726221f2e164ee8072ee1e07fda8a72)

シャドウアクネの解消後

[![Image from Gyazo](https://i.gyazo.com/91ad81e1b1c6a95e0df58dddc365e604.png)](https://gyazo.com/91ad81e1b1c6a95e0df58dddc365e604)
