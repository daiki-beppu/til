# お化け屋敷の制作

- [お化け屋敷の制作](#お化け屋敷の制作)
  - [タイマーの設定](#タイマーの設定)
  - [単位をあらかじめ定める](#単位をあらかじめ定める)
  - [床 (地面) 作成](#床-地面-作成)
  - [家のグループを作成](#家のグループを作成)
    - [家の壁を作成](#家の壁を作成)
    - [家の屋根を作成](#家の屋根を作成)
    - [ドアの作成](#ドアの作成)
    - [茂みの作成](#茂みの作成)
  - [墓の作成](#墓の作成)
  - [テクスチャを適用する](#テクスチャを適用する)
    - [床のテクスチャを適用する](#床のテクスチャを適用する)
    - [家の壁にテクスチャ適用する](#家の壁にテクスチャ適用する)
    - [家の屋根にテクスチャを適用する](#家の屋根にテクスチャを適用する)
    - [ドアにテクスチャを適用する](#ドアにテクスチャを適用する)
    - [茂みにテクスチャを適用する](#茂みにテクスチャを適用する)
    - [墓にテクスチャを適用する](#墓にテクスチャを適用する)
  - [ドアライトの追加](#ドアライトの追加)
  - [幽霊の追加](#幽霊の追加)
  - [影の追加](#影の追加)
    - [ループで墓に影を追加](#ループで墓に影を追加)
    - [影の最適化](#影の最適化)
  - [空の追加](#空の追加)
  - [霧の追加](#霧の追加)
  - [テクスチャの最適化](#テクスチャの最適化)

## タイマーの設定

`Timer`クラスは
これまで使用していた`Clock`クラスの代替です。

`Timer` と `Clock` では以下の違いがあります

- `Clock`で発生していたバグの修正。同じフレームで`getElapsedTime`複数回呼び出すと値がおかしくなる
- `Timer` は`timer.update()`を記述して手動で更新する必要がある
- `Timer` はタブが非アクティブかどうかをテストして、非アクティブの場合に想定していない時間値が発生するのを防ぐ
- `Timer` は手動でインポートする必要がある `import { Timer } from 'three/addons/misc/Timer.js`

## 単位をあらかじめ定める

Three.js では、長さの単位は自由に決めることができます。

例えば、広大な風景を作るなら 1 単位を 1km に、家を作るなら 1m に、小さな小物を作るなら 1cm や 1mm にすることも可能です。

単位を最初に決めておくことで、実際の物のサイズを参考にしながらモデリングしやすくなります。「このオブジェクトの大きさはどれくらいに設定すれば良いんだろう？」と悩む時間を減らし、スムーズに制作を進めることができます。

## 床 (地面) 作成

```js
// 床 (地面)

// PlaneGeometry のパラメータを設定
const planeGeometryParams = {
  width: 20,
  height: 20,
};

// 床の作成
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(
    planeGeometryParams.width,
    planeGeometryParams.height
  ),
  new THREE.MeshStandardMaterial()
);

// 床を回転
floor.rotation.x = -Math.PI / 2;

// マイナスにしないと裏側が表に表示されるため、デフォルトでは何も表示されないように見える

// シーンに追加
scene.add(floor);
```

## 家のグループを作成

オブジェクト全体の移動やスケールの変更に備えて、グループを作成します。

```js
// 家のグループ
const houseGroup = new THREE.Group();
scene.add(houseGroup);
```

このあと作成するオブジェクト(家の壁、家の屋根、ドア)は`scene` ではなく`houseGroup`に追加します

### 家の壁を作成

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/20e8f68bd8f1e498ee6abcb46ef7d183.png)](https://gyazo.com/20e8f68bd8f1e498ee6abcb46ef7d183)

```js
// 家の壁

// 壁のサイズを設定
const wallsParams = {
  width: 4,
  height: 2.5,
  depth: 4,
};

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(
    wallsParams.width,
    wallsParams.height,
    wallsParams.depth
  ),
  new THREE.MeshStandardMaterial()
);

houseGroup.add(walls);
```

[![Image from Gyazo](https://i.gyazo.com/01c89b99f90450d893a4008aad371880.gif)](https://gyazo.com/01c89b99f90450d893a4008aad371880)

オブジェクトの中心はデフォルトでジオメトリの中心に設定されるため、半分地面に埋まっているように見えます。y 軸に壁の高さの半分を設定することで、地面の上に正しく配置できます。

```js
//y軸にジオメトリの高さの半分に設定することで解決
walls.position.y = wallsParams.height / 2;
```

[![Image from Gyazo](https://i.gyazo.com/d7561f44b070b644450f1a4d10c11838.gif)](https://gyazo.com/d7561f44b070b644450f1a4d10c11838)

### 家の屋根を作成

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/4cc2258559ec709bd516664fce45495a.png)](https://gyazo.com/4cc2258559ec709bd516664fce45495a)

```js
// 家の屋根
const roofParams = {
  radius: 3.5,
  height: 1.5,
  radiusSegments: 4,
};

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(
    roofParams.radius,
    roofParams.height,
    roofParams.radiusSegments
  ),
  new THREE.MeshStandardMaterial()
);

// y 軸の位置を壁の高さと屋根の半分の高さを設定
roof.position.y = wallsParams.height + roofParams.height / 2;

// 屋根の向きを壁に合わせる
roof.rotation.y = Math.PI / 4;

houseGroup.add(roof);
```

### ドアの作成

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/d65185dc8c15185a2339905fa558bf4f.png)](https://gyazo.com/d65185dc8c15185a2339905fa558bf4f)

```js
// ドア
const doorParams = {
  width: 2.2,
  height: 2.2,
};

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(doorParams.width, doorParams.height),
  // 色を赤くしてわかりやすく
  new THREE.MeshStandardMaterial({ color: "red" })
);

// 半分だとドアの高さが高くなりすぎるため微調整
door.position.y = doorParams.height / 2 - 0.1;

// Zファイティング対策
door.position.z = wallsParams.depth / 2 + 0.01;

// Zファイティングは 2つの面が全く同じ位置に重なったときにGPUがどちらを表示するか判断できず表示がバグる現象

houseGroup.add(door);
```

### 茂みの作成

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/7b9b9dc343ab541d7148bc5001a071b8.png)](https://gyazo.com/7b9b9dc343ab541d7148bc5001a071b8)

```js
// 茂み
const bushParams = {
  radius: 1,
  widthSegments: 16,
  heightSegments: 16,
};

const bushGeometry = new THREE.SphereGeometry(
  bushParams.radius,
  bushParams.widthSegments,
  bushParams.heightSegments
);

const bushMaterial = new THREE.MeshStandardMaterial();

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.setScalar(0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.setScalar(0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.setScalar(0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.setScalar(0.15);
bush4.position.set(-1, 0.05, 2.6);

houseGroup.add(bush1, bush2, bush3, bush4);
```

## 墓の作成

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/c45fcfcbc0a798427edeff4f6fa20356.png)](https://gyazo.com/c45fcfcbc0a798427edeff4f6fa20356)

```js
// 墓
const graveParams = {
  width: 0.6,
  height: 0.8,
  depth: 0.2,
};

const graveGeometry = new THREE.BoxGeometry(
  graveParams.width,
  graveParams.height,
  graveParams.depth
);
const graveMaterial = new THREE.MeshStandardMaterial();

const graves = new THREE.Group();
scene.add(graves);

// 指定した円の中に墓を 30 個作成
for (let i = 0; i < 30; i += 1) {
  // 円周上の角度をランダムに生成
  const angle = Math.random() * Math.PI * 2;

  // 直径 が 3 メートルから 7 メートルの範囲内の半径をランダムに生成
  const radius = 3 + Math.random() * 4;

  // ランダムな座標を計算
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  // 墓を作成して配置
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.x = x;
  grave.position.y = graveParams.height / 2;
  grave.position.z = z;
  graves.add(grave);

  // 墓の向きをランダムに変更
  grave.rotation.x = ((Math.random() - 0.5) * Math.PI) / 8;
  grave.rotation.y = ((Math.random() - 0.5) * Math.PI) / 8;
  grave.rotation.z = ((Math.random() - 0.5) * Math.PI) / 8;
}
```

## テクスチャを適用する

テクスチャを探すのにおすすめサイトは[Poly Haven](https://polyhaven.com/)です。

高品質なテクスチャが無料でダウンロードでき、商用利用が可能なものもたくさんあります。

### 床のテクスチャを適用する

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/1002112d8ab3f227bdfd496d0c892543.png)](https://gyazo.com/1002112d8ab3f227bdfd496d0c892543)

```js
// テクスチャのロード

// alphaMap アルファテクスチャ
const floorAlphaTexture = textureLoader.load("./floor/alpha.jpg");

// map アルベドテクスチャ
const floorColorTexture = textureLoader.load(
  "./floor/mud_forest_1k/mud_forest_diff_1k.jpg"
);

// aoMap, roughnessMap, metalnessMap アンビエントオクルージョン、ラフネス、メタルネス
const floorARMTexture = textureLoader.load(
  "./floor/mud_forest_1k/mud_forest_arm_1k.jpg"
);

// normalMap 法線マップ
const floorNormalTexture = textureLoader.load(
  "./floor/mud_forest_1k/mud_forest_nor_gl_1k.jpg"
);

// displacementMap 高さマップ
const floorDisplacementTexture = textureLoader.load(
  "./floor/mud_forest_1k/mud_forest_disp_1k.jpg"
);
```

```js
// テクスチャが大きすぎるので修正する

// テクスチャを水平、垂直方向に8回繰り返す
floorColorTexture.repeat.set(8, 8);

// テクスチャの水平方向(S方向)のラップモードを設定
floorColorTexture.wrapS = THREE.RepeatWrapping;

// テクスチャの垂直方向(T方向)のラップモードを設定
floorColorTexture.wrapT = THREE.RepeatWrapping;
floorColorTexture.colorSpace = THREE.SRGBColorSpace;

floorARMTexture.repeat.set(8, 8);
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;

floorNormalTexture.repeat.set(8, 8);
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

floorDisplacementTextuer.repeat.set(8, 8);
floorDisplacementTextuer.wrapS = THREE.RepeatWrapping;
floorDisplacementTextuer.wrapT = THREE.RepeatWrapping;

// 4 つのテクスチャが水平、垂直方向に 8 回繰り返される
```

```js
// マテリアルにテクスチャを設定

//オブジェクト
const floorParams = {
  width: 20,
  height: 20,
  widthSegments: 100,
  heightSegments: 100,
};

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(
    floorParams.width,
    floorParams.height,
    floorParams.widthSegments,
    floorParams.heightSegments
  ),
  new THREE.MeshStandardMaterial({
    transparent: true,
    alphaMap: floorAlphaTexture,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    // 高さマップの効果を設定
    displacementScale: 0.3,

    // 高さマップの基準位置を -0.2 シフト
    displacementBias: -0.2,
  })
);
```

`displacementScale` と `displacementBias`を設定しないと地面が盛り上がりすぎている

[![Image from Gyazo](https://i.gyazo.com/5d3606ecf3a12db2baadbd2485652385.png)](https://gyazo.com/5d3606ecf3a12db2baadbd2485652385)

他のテクスチャも同様に設定していく
新しく出てきた部分以外は説明を割愛

### 家の壁にテクスチャ適用する

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/60f690ab3de6dd0aba2077206f2181e2.png)](https://gyazo.com/60f690ab3de6dd0aba2077206f2181e2)

[![Image from Gyazo](https://i.gyazo.com/dbc395f408e4ee944fb34dfa206da712.png)](https://gyazo.com/dbc395f408e4ee944fb34dfa206da712)

```js
// テクスチャ
const wallColorTexture = textureLoader.load(
  "./wall/weathered_planks_1k/weathered_planks_diff_1k.jpg"
);
wallColorTexture.repeat.set(1.5, 1.5);
wallColorTexture.wrapS = THREE.RepeatWrapping;
wallColorTexture.wrapT = THREE.RepeatWrapping;
wallColorTexture.colorSpace = THREE.SRGBColorSpace;

const wallARMTexture = textureLoader.load(
  "./wall/weathered_planks_1k/weathered_planks_diff_1k.jpg"
);
wallARMTexture.repeat.set(1.5, 1.5);
wallARMTexture.wrapS = THREE.RepeatWrapping;
wallARMTexture.wrapT = THREE.RepeatWrapping;

const wallNormalTexture = textureLoader.load(
  ".wall/weathered_planks_1k/weathered_planks_nor_gl_1k.jpg"
);
wallNormalTexture.repeat.set(1.5, 1.5);
wallNormalTexture.wrapS = THREE.RepeatWrapping;
wallNormalTexture.wrapT = THREE.RepeatWrapping;
```

```js
// オブジェクト
const wallsParams = {
  width: 4,
  height: 2.5,
  depth: 4,
};

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(
    wallsParams.width,
    wallsParams.height,
    wallsParams.depth
  ),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
  })
);
```

### 家の屋根にテクスチャを適用する

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/e176f76a439a798a51778c858634b0d7.png)](https://gyazo.com/e176f76a439a798a51778c858634b0d7)

```js
// テクスチャ
const roofColorTexture = textureLoader.load(
  "./roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg"
);

roofColorTexture.repeat.set(3, 1);
roofColorTexture.wrapS = THREE.RepeatWrapping;
roofColorTexture.colorSpace = THREE.SRGBColorSpace;

const roofARMTexture = textureLoader.load(
  "./roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg"
);
roofARMTexture.repeat.set(3, 1);
roofARMTexture.wrapS = THREE.RepeatWrapping;

const roofNormalTexture = textureLoader.load(
  "./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg"
);
roofNormalTexture.repeat.set(3, 1);
roofNormalTexture.wrapS = THREE.RepeatWrapping;

// 垂直方向の値が 1 以上でないためwarpT は設定する必要がない
```

```js
// オブジェクト
const roofParams = {
  radius: 3.5,
  height: 1.5,
  radiusSegments: 4,
};

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(
    roofParams.radius,
    roofParams.height,
    roofParams.radiusSegments
  ),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
  })
);
```

### ドアにテクスチャを適用する

完成イメージ
[![Image from Gyazo](https://i.gyazo.com/fdfae4d1b3e9c2e26e863854c911fd04.png)](https://gyazo.com/fdfae4d1b3e9c2e26e863854c911fd04)

[![Image from Gyazo](https://i.gyazo.com/24899751fe0cba9cc547e06c3ad769d5.png)](https://gyazo.com/24899751fe0cba9cc547e06c3ad769d5)

```js
// テクスチャ
const doorColorTexture = textureLoader.load("./door/color.jpg");
const doorAlphaTexture = textureLoader.load("./door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("./door/height.jpg");
const doorNormalTexture = textureLoader.load("./door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("./door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("./door/roughness.jpg");
```

```js
// オブジェクト
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(
    doorParams.width,
    doorParams.height,
    doorParams.widthSegments,
    doorParams.heightSegments
  ),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.15,
    displacementBias: -0.04,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
```

### 茂みにテクスチャを適用する

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/b9df6837f6fd504b86a06f9a4c5ec07e.png)](https://gyazo.com/b9df6837f6fd504b86a06f9a4c5ec07e)

[![Image from Gyazo](https://i.gyazo.com/25b19a25fda32415088b2c4a67903739.png)](https://gyazo.com/25b19a25fda32415088b2c4a67903739)

```js
// テクスチャ
const bushColorTexture = textureLoader.load(
  "./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg"
);
bushColorTexture.repeat.set(2, 1);
bushColorTexture.wrapS = THREE.RepeatWrapping;
bushColorTexture.colorSpace = THREE.SRGBColorSpace;

const bushARMTexture = textureLoader.load(
  "./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg"
);
bushARMTexture.repeat.set(2, 1);
bushARMTexture.wrapS = THREE.RepeatWrapping;

const bushNormalTexture = textureLoader.load(
  "./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg"
);
bushNormalTexture.repeat.set(2, 1);
bushNormalTexture.wrapS = THREE.RepeatWrapping;
```

```js
// オブジェクト
const bushParams = {
  radius: 1,
  widthSegments: 16,
  heightSegments: 16,
};

const bushGeometry = new THREE.SphereGeometry(
  bushParams.radius,
  bushParams.widthSegments,
  bushParams.heightSegments
);

const bushMaterial = new THREE.MeshStandardMaterial({
  color: "#ccffcc",
  map: bushColorTexture,
  aoMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  metalnessMap: bushARMTexture,
  normalMap: bushNormalTexture,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.setScalar(0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.rotation.x = -0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.setScalar(0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.x = -0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.setScalar(0.4);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.rotation.x = -0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.setScalar(0.15);
bush4.position.set(-1, 0.05, 2.6);
bush4.rotation.x = -0.75;

houseGroup.add(bush1, bush2, bush3, bush4);
```

### 墓にテクスチャを適用する

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/6ce7e8f4a28bec59830a86f04c6cc545.jpg)](https://gyazo.com/6ce7e8f4a28bec59830a86f04c6cc545)

```js
// テクスチャ
const graveColorTexture = textureLoader.load(
  "./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg"
);
graveColorTexture.repeat.set(0.3, 0.4);
graveColorTexture.colorSpace = THREE.SRGBColorSpace;

const graveARMTexture = textureLoader.load(
  "./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg"
);
graveARMTexture.repeat.set(0.3, 0.4);

const graveNormalTexture = textureLoader.load(
  "./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg"
);
graveNormalTexture.repeat.set(0.3, 0.4);
const graveParams = {
  width: 0.6,
  height: 0.8,
  depth: 0.2,
};
```

```js
// オブジェクト
const graveGeometry = new THREE.BoxGeometry(
  graveParams.width,
  graveParams.height,
  graveParams.depth
);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  aoMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  metalnessMap: graveARMTexture,
  normalMap: graveNormalTexture,
});
```

## ドアライトの追加

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/4e3629a21720a7e4df5cf9600a5cc692.png)](https://gyazo.com/4e3629a21720a7e4df5cf9600a5cc692)

```js
// PointLight をインスタンス化
const doorLight = new THREE.PointLight("#ff7d46", 5);

// ライトの位置を調整
doorLight.position.set(0, 2.2, 2.5);

// シーンに追加
scene.add(doorLight);
```

## 幽霊の追加

今回は簡易的にポイントライトを使って幽霊を表現

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/f249730155c02a8469cb14b18fd36f28.gif)](https://gyazo.com/f249730155c02a8469cb14b18fd36f28)

```js
// 幽霊
const ghost1 = new THREE.PointLight("#8800ff", 6);
const ghost2 = new THREE.PointLight("#ff0088", 6);
const ghost3 = new THREE.PointLight("#ff0000", 6);
scene.add(ghost1, ghost2, ghost3);
```

```js
// アニメーションの追加
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // 幽霊

  // アニメーションの速度を調整
  const ghost1Angle = elapsedTime * 0.5;

  // 円を描くように回転する
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;

  // 浮かび上がったり消えたりを表現
  ghost1.position.y =
    Math.sin(ghost1Angle) *
    Math.sin(ghost1Angle * 2.34) *
    Math.sin(ghost1Angle * 3.45);

  const ghost2Angle = -elapsedTime * 0.38;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y =
    Math.sin(ghost2Angle) *
    Math.sin(ghost2Angle * 2.34) *
    Math.sin(ghost2Angle * 3.45);

  const ghost3Angle = elapsedTime * 0.25;
  ghost3.position.x = Math.cos(ghost3Angle) * 6;
  ghost3.position.z = Math.sin(ghost3Angle) * 6;
  ghost3.position.y =
    Math.sin(ghost3Angle) *
    Math.sin(ghost3Angle * 3.6) *
    Math.sin(ghost3Angle * 1.34);

  window.requestAnimationFrame(tick);
};

tick();
```

## 影の追加

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/42cf9490d4eb44b4fed42dc71771be9a.png)](https://gyazo.com/42cf9490d4eb44b4fed42dc71771be9a)

```js
// 影の投影と描画の設定
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// 影の投影を設定
directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
walls.castShadow = true;
roof.castShadow = true;

// 影の描画を設定
floor.receiveShadow = true;
walls.receiveShadow = true;
```

### ループで墓に影を追加

墓のオブジェクトはループ内で生成するため個別にアクセスできない。

そのため Group クラスが持つ children プロパティを使いグループ内のすべての墓オブジェクトに影の設定を追加する

```js
// ループで各墓に影の設定
for (const grave of graves.children) {
  grave.castShadow = true;
  grave.receiveShadow = true;
}
```

### 影の最適化

```js
// 影の解像度を設定
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;

// 影の投影範囲を調整
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.camera.far = 10;
ghost2.shadow.camera.far = 10;
ghost3.shadow.camera.far = 10;
```

## 空の追加

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/daae8b1a0695aa99bc269981e7efdb12.png)](https://gyazo.com/daae8b1a0695aa99bc269981e7efdb12)

```js
// Sky のインポート
import { Sky } from "three/addons/objects/Sky.js";
```

```js
// Sky をインスタンス化
const sky = new Sky();

// 空の大きさを設定
sky.scale.set(100, 100, 100); //  または sky.scale.setScalar(100)

// シーンに追加
scene.add(sky);
```

```js
// パラメータを設定

// 空の濁度(空気中の浮遊物質の量)を設定
sky.material.uniforms["turbidity"].value = 10; // 値が大きいほど空が濁り霞む
// 晴天時には低めの値、霧やスモッグが多い場合は高めの値を設定

// レイリー散乱 (空の青さ) を設定
sky.material.uniforms["rayleigh"].value = 3; // 値が大きいほど空が蒼く、クリアに表示される
// 晴天時には高めの値が適している

// ミー散乱 (空の色合いや霞み具合) を設定
sky.material.uniforms["mieCoefficient"].value = 1; // 値が大きいほど空が霞んだり、夕焼けのような赤みがかった色になる

// ミー散乱の方向性 (散乱具合) を設定
sky.material.uniforms["mieDirectionalG"].value = 0.95; // 0 に近いほど 全方向かつ均等に 1 に近いほど特定の方向に集中
// 夕焼けや朝焼けを表現するのに重要なパラメータ

// 太陽の位置 を設定
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);
```

## 霧の追加

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/9a22e71b47a394509c3608e0c594b731.png)](https://gyazo.com/9a22e71b47a394509c3608e0c594b731)

霧の追加は 2 通りの方法がある

- `Fog`
- `FogExp2`

```js
// Fog を使った方法
scene.fog = new THREE.Fog(
  "#04343f", // color: 霧の色を設定
  1, // near: 霧が始まる距離を設定
  13 // far: 霧が完全に濃くなる距離を設定
);
```

```js
// FogExp2 を使った方法
scene.fog = new THREE.FogExp2(
  "#04343f", // color
  0.1 // density: 霧の密度を設定
);
```

今回は FogExp2 を使った方法で記述している

## テクスチャの最適化

`jpg` や `png` を `webp` に変換することで見た目をあまり損なうことなくロード時間の短縮につながる

**変換前 14.2MB 全体で 16.3MB**

[![Image from Gyazo](https://i.gyazo.com/a422db7bd09e177f11b310294e778069.png)](https://gyazo.com/a422db7bd09e177f11b310294e778069)

`jpg` を `webp` に変換した結果

**1.6MB 全体で 3.8MB**

[![Image from Gyazo](https://i.gyazo.com/b764fd03b7fe7e6f08af58eb98543054.png)](https://gyazo.com/b764fd03b7fe7e6f08af58eb98543054)

**約 88 %** のパフォーマンスを改善することができた！

画像のコンバートはいろんなサイトで実現可能

今回は[こちらのサイト](https://cloudconvert.com/)で変換した

[CloudConvert ](https://cloudconvert.com/)

この他にも

- [Squoosh](https://squoosh.app/)
- [TinyPNG](https://tinypng.com/)

こちらのサイトもオススメ
