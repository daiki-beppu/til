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

## タイマーの設定

`Timer`クラスは
これまで使用していた`Clock`クラスの代替です。

`Timer` と `Clock` では以下の違いがあります

- `Clock`で発生していたバグの修正。同じフレームで`getElapsedTime`複数回呼び出すと値がおかしくなる
- `Timer` は`timer.update()`を記述して手動で更新する必要がある
- `Timer` はタブが非アクティブかどうかをテストして、非アクティブの場合に想定していない時間値が発生するのを防ぐ
- `Timer` は手動でインポートする必要がある `import { Timer } from 'three/addons/misc/Timer.js`

## 単位をあらかじめ定める

Three.js では、1 の単位は任意の意味を持つことができる。

例えば、かなり広い風景を制作する場合、1 の単位は 1km と定めるかもしれません。家を建てる場合、1 の単位は 1m と定めるかもしれません。もっと小さいものを制作する場合、1cm あるいは 1mm と定めるかもしれません。

特定の単位比率があることで、ジオメトリの作成に役立ちます。リアルなものの大きさを測定してそれを実際の単位に当てはめて制作すると「これの大きさどう設定しよう？」といった不要な混乱を避けることができます。

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

これだと半分地面に埋まっている(ジオメトリの原点が中心にある)ので y 軸に壁の半分に設定することで解決

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
