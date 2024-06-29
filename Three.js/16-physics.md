# 物理演算について

- [物理演算について](#物理演算について)
  - [物理世界の設定](#物理世界の設定)
  - [物理世界にオブジェクトを作成](#物理世界にオブジェクトを作成)
  - [Cannon.js の world と Three.js のシーンを更新](#cannonjs-の-world-と-threejs-のシーンを更新)
  - [剛体同士が接触した際の物質特性の設定 (ボールが跳ねる)](#剛体同士が接触した際の物質特性の設定-ボールが跳ねる)
  - [オブジェクトに力を加える](#オブジェクトに力を加える)
  - [オブジェクトの作成を関数にまとめる](#オブジェクトの作成を関数にまとめる)
  - [デバッグ UI でオブジェクトを追加](#デバッグ-ui-でオブジェクトを追加)
  - [ボックスの追加](#ボックスの追加)
  - [パフォーマンスの最適化](#パフォーマンスの最適化)
  - [オブジェクトが衝突したときに音を鳴らす](#オブジェクトが衝突したときに音を鳴らす)
  - [デバッグ UI で オブジェクトをリセット](#デバッグ-ui-で-オブジェクトをリセット)

## 物理世界の設定

物理世界の設定は以下の手順で行う

1. `Cannon.js` のインストール及びインポート
2. 物理世界を作成
3. 物理世界に重力を設定

> [!NOTE]
> 2D 物理ライブラリや 3D 物理ライブラリはたくさんありますが、今回は
> `Cannon.js` を使用します。

```shell
# cannon.jsのインストール
bun add cannon
```

```js
// cannon.js のインポート
import CANNON from "cannon";
```

```js
// 物理世界を作成
const world = new CANNON.World(); // 物理シュミレーションの世界を作成

// 物理世界に重力を設定 (地球上の重力を再現)
world.gravity.set(
  0, // x 軸方向の重力を設定
  -9.82, // y 軸方向の重力を設定 (地球上の重力は y 軸方向に -9.82 m/s²)
  0 // z 軸方向の重力を設定
);
```

## 物理世界にオブジェクトを作成

物理世界にオブジェクトを作成するには以下の手順で行う

1. オブジェクトを作成
2. 剛体を作成
3. 剛体に形状を適用
4. 物理世界に剛体を追加

```js
// 球体を作成
const radius = 0.5;
const sphereShape = new CANNON.Sphere(radius);

// 剛体を作成 (変形しない物体として扱うモデル)
const sphereBody = new CANNON.Body({
  mass: 1, // 質量を 1 に設定
  position: new CANNON.Vec3(
    0, // x 軸の位置
    3, // y 軸の位置
    0 // z 軸の位置
  ),
  shape: sphereShape, // 剛体に形状を適用
});

// 物理世界に剛体を追加
world.addBody(sphereBody);

// 床

// 無限平面の形状を作成
const floorShape = new CANNON.Plane();

// 床用の剛体を作成
const floorBody = new CANNON.Body({
  mass: 0, // 質量を 0 に設定(静止した床として扱う)
  shape: floorShape, // 剛体に形状を適用
});

// 床の回転 (水平に設定)
// Three.js のように rotation は使えないので注意
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2); // x 軸を中心に  -90 度回転させ水平にする
world.addBody(floorBody);
```

## Cannon.js の world と Three.js のシーンを更新

```js
// アニメーション
const clock = new THREE.Clock();
let oldElapsedTime = clock.getElapsedTime();

const tick = () => {
  // 経過時間の取得
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  // 物理世界の更新
  const fixedTimeStep = 1 / 60; // 1 秒間に 60 回の更新を設定
  const maxSubStep = 3; // 最大 3 回のサブステップを設定 (遅延時の補正)
  world.step(fixedTimeStep, deltaTime, maxSubStep);

  // Cannon.js の剛体の位置を Three.js のメッシュにコピー
  sphere.position.copy(sphereBody.position);

  // このように記述することも可能
  // sphere.position.x = sphereBody.position.x
  // sphere.position.y = sphereBody.position.y
  // sphere.position.z = sphereBody.position.z

  // カメラの制御を更新
  controls.update();

  // レンダラーの更新
  renderer.render(scene, camera);

  // 次のフレームを呼び出し
  window.requestAnimationFrame(tick);
};

tick();
```

## 剛体同士が接触した際の物質特性の設定 (ボールが跳ねる)

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/76c58d19aad68b4bbc85cab99d2e3b17.gif)](https://gyazo.com/76c58d19aad68b4bbc85cab99d2e3b17)

`ContactMaterial` の設定は以下の手順で行う

1. マテリアルを作成
2. 接触マテリアルを作成(剛体同士が接触した際の物質特性の設定)
3. 接触マテリアルを物理世界に追加
4. 剛体にマテリアルを適用

```js
// 名前がコンクリートのマテリアルを作成
const concreteMaterial = new CANNON.Material("concrete");

// 名前がプラスチックのマテリアルを作成
const plasticMaterial = new CANNON.Material("plastic");
```

```js
// 接触マテリアルの作成 (剛体同士が接触した際の物質特性の設定)
const concretePlasticContactMaterial = new CANNON.ContactMaterial(
  concreteMaterial,
  plasticMaterial,
  {
    friction: 0.1, // 摩擦係数 0 から 1 で設定 値が大きほど滑る
    restitution: 0.7, // 反発係数 0 から 1 で設定 値が大きほど跳ねる
  }
);

world.addContactMaterial(concretePlasticContactMaterial);
```

```js
// ボール
const sphereBody = new CANNON.Body({
  material: concreteMaterial, // 剛体にマテリアルを適用
});

// 床
const floorBody = new CANNON.Body({
  material: defaultMaterial, // 剛体にマテリアルを適用
});
```

異なるマテリアルがあり、それぞれの組み合わせに対して `ContactMaterial` を作成するととても煩雑なコードになってしまう。

なので 2 つのマテリアルをデフォルトのマテリアルに置き換えて全てに適用することでコードがスッキリする！

```js
const defaultMaterial = new CANNON.Material("default");
const defaultContactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.1,
    restitution: 0.7,
  }
);

world.addContactMaterial(defaultContactMaterial);

// すべてのマテリアルに defaultContactMaterial を適用
world.defaultContactMaterial = defaultContactMaterial;
```

## オブジェクトに力を加える

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/7a74e06b329c5021a3955eac1f065e1b.gif)](https://gyazo.com/7a74e06b329c5021a3955eac1f065e1b)

```js
// ボールに局所的な力を加える (奥に押し出す)
sphereBody.applyLocalForce(
  new CANNON.Vec3(150, 0, 0), // 力を加える向き
  new CANNON.Vec3(0, 0, 0) // 力を加える位置ベクトル
);
```

```js
// 物理世界の更新 (ボールが手前に戻って来る)
sphereBody.applyForce(
  new CANNON.Vec3(-0.5, 0, 0), // 力を加える向きを設定
  sphereBody.position // 力を加える位置
);
```

## オブジェクトの作成を関数にまとめる

1 つの関数で `Three.js` と `Cannon.js` の 2 つのオブジェクトを作成する
ついでにランダム色を割り当てる設定も追加

```js
// * オブジェクトを作成する関数
// 更新対象のオブジェクトを格納する配列を作成
const objectToUpdate = [];

// ボール
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);

// ボールのオブジェクトを作成する関数
const createSphere = (radius, position) => {
  //ランダムな色を生成
  const rgb = {
    r: Math.random(),
    g: Math.random(),
    b: Math.random(),
  };

  // Three.js メッシュ
  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(rgb.r, rgb.g, rgb.b),
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
  });

  const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  mesh.scale.setScalar(radius); // スケールを radius に合わせる
  mesh.castShadow = true;
  mesh.position.copy(position);
  scene.add(mesh);

  // Cannon.js オブジェクト
  const shape = new CANNON.Sphere(radius);
  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape: shape,
    material: defaultMaterial,
  });

  body.position.copy(position);
  world.addBody(body);
};

// オブジェクトの作成
createSphere(0.5, { x: 0, y: 3, z: 0 });
```

```js
// 作成したオブジェクトを配列に格納
const objectToUpdate = [];

objectToUpdate.push({
  mesh,
  body,
});
```

```js
const tick = () => {
  // ループでCannon.js の剛体の位置を Three.js のメッシュにコピー
  for (const object of objectToUpdate) {
    object.mesh.position.copy(object.body.position);
  }
};
```

## デバッグ UI でオブジェクトを追加

完成イメージ
[![Image from Gyazo](https://i.gyazo.com/c463ff85a6787b0b2343c55d4547a457.gif)](https://gyazo.com/c463ff85a6787b0b2343c55d4547a457)

```shell
# lil-gui のインストール
bun add lil-gui
```

```js
// lil-gui のインポート
import GUI from "lil-gui";
```

```js
// デバッグ UI に追加するオブジェクト
const debugObject = {
  createSphere: () => {
    createSphere(Math.random() * 0.5, {
      x: (Math.random() - 0.5) * 3,
      y: 3,
      z: (Math.random() - 0.5) * 3,
    });
  },
};
gui.add(debugObject, "createSphere");
```

## ボックスの追加

```js
// ボックス
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

// ボックスのオブジェクトを作成する関数
const createBox = (width, height, depth, position) => {
  //ランダムな色を生成
  const rgb = {
    r: Math.random(),
    g: Math.random(),
    b: Math.random(),
  };
  // Three.js メッシュ

  const boxMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(rgb.r, rgb.g, rgb.b),
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
  });
  const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
  mesh.scale.set(width, height, depth);
  mesh.castShadow = true;
  mesh.position.copy(position);
  scene.add(mesh);

  // Cannon.js オブジェクト
  const shape = new CANNON.Box(
    new CANNON.Vec3(width / 2, height / 2, depth / 2)
    // 引数は Vec3 halfExtents (中心から各辺までの距離)を表すため、半分に割った値にする必要がある
  );
  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape: shape,
    material: defaultMaterial,
  });

  body.position.copy(position);
  world.addBody(body);

  // 作成したオブジェクトを配列に格納
  objectToUpdate.push({
    mesh,
    body,
  });
};
createBox(1, 1, 1, { x: 2, y: 3, z: 0 });
```

```js
// ループでCannon.js の剛体の位置を Three.js のメッシュにコピー
for (const object of objectToUpdate) {
  object.mesh.position.copy(object.body.position); // 位置を同期
  object.mesh.quaternion.copy(object.body.quaternion);
  // 回転を同期 (rotation ではなく quaternion を使用)
}
```

## パフォーマンスの最適化

今回は 2 つの設定を行います

1. ブロードフェーズを設定
   多数のオブジェクトから、実際に衝突する可能性のあるペアを絞り込みます。
   これにより不要な計算を大幅に削減することができます。

2. スリープ機能を有効にする
   静止したオブジェクトは、物理演算の対象から外すことができます。
   これにより静止したオブジェクトの計算を省略しパフォーマンスを大きく向上させます。
   他のオブジェクトが衝突したり、外部から力を加えられたりすると、自動的にスリープ状態が解除されます。

```js
// パフォーマンス設定

// ブロードフェーズを設定
world.broadphase = new CANNON.SAPBroadphase(world);
// 多数のオブジェクトから、衝突する可能性のあるペアを絞り込む

// スリープ機能を有効にする
world.allowSleep = true;
// 静止したオブジェクトを計算の対象から外す
// 他のオブジェクトと衝突するかコードで力を加えると自動でスリープが解除
```

## オブジェクトが衝突したときに音を鳴らす

[![Image from Gyazo](https://i.gyazo.com/26789e819d8908db1d981fb8d66bedb2.gif)](https://gyazo.com/26789e819d8908db1d981fb8d66bedb2)

```js
// *  サウンド
const hitSound = new Audio("/sounds/hit.mp3");
const playHitSound = (collision) => {
  // 衝突の強さを取得
  const impactStrenght = collision.contact.getImpactVelocityAlongNormal();

  // 衝突が一定以上の強さの場合衝突音を再生 (音量はランダム)
  if (impactStrenght > 1.5) {
    hitSound.volume = Math.random();
    hitSound.currentTime = 0; // 再生位置をリセット 再生中に呼び出しても音がなる
    hitSound.play();
  }
};
```

```js
// 衝突イベント発生時に、playHitSound を呼び出す
const createBox = (width, height, depth, position) => {
  // ...
  body.addEventListener("collide", playHitSound); // 衝突イベントリスナーを設定
  // ...
};
```

## デバッグ UI で オブジェクトをリセット

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/442e94e2ce46bdae76746393d5390da4.gif)](https://gyazo.com/442e94e2ce46bdae76746393d5390da4)

```js
const debugObject = {
  reset: () => {
    // シーン内のオブジェクトをリセット
    for (const object of objectsToUpdate) {
      // Cannon.js のオブジェクト(body) を削除
      object.body.removeEventListener("collide", playHitSound); // 衝突イベントリスナーを削除
      world.removeBody(object.body);

      // Three.js のオブジェクト(mesh) を削除
      scene.remove(object.mesh);
    }
    // オブジェクトを管理する配列を空にする
    objectsToUpdate.splice(0, objectsToUpdate.length);
  },
};
```
