# オブジェクトの変換

- [オブジェクトの変換](#オブジェクトの変換)
  - [アクセスヘルパーの表示](#アクセスヘルパーの表示)
  - [オブジェクトの位置を変える](#オブジェクトの位置を変える)
    - [表示例](#表示例)
  - [オブジェクトの大きさを変える](#オブジェクトの大きさを変える)
    - [表示例](#表示例-1)
  - [オブジェクトを回転させる](#オブジェクトを回転させる)
    - [使用例](#使用例)
  - [オブジェクトの変換を組み合わせる](#オブジェクトの変換を組み合わせる)
  - [オブジェクトのグループ化](#オブジェクトのグループ化)

## アクセスヘルパーの表示

アクセスヘルパーとは
X,Y,Z の軸をわかりやすく視覚化するためのヘルパー

![アクセスヘルパー](https://i.gyazo.com/20e0e04d7b0822f358f4748a04f326cd.png)

赤が X 軸、緑が Y 軸、青が Z 軸を表す

```JavaScript
// Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

```

## オブジェクトの位置を変える

`mesh.position.x`
オブジェクトを x 軸に移動 x が正なら右に x が負なら左に

`mesh.position.y`
オブジェクトを y 軸に移動 y が正なら上に y が負なら下に

`mesh.position.z`
オブジェクトを z 軸に移動 z が正なら手前に z が負なら奥に

`mesh.posirion.set(x, y, z)`
set プロパティを使うことで 1 行で記述することもできる

デフォルトの値は `0`

### 表示例

`mesh.position` を指定していない場合

![mesh.position を指定していない場合](https://i.gyazo.com/09d4271087ca20fc78db983b62570b4a.jpg)

`mesh.position.x = 1` x が正の場合

![mesh.position.x = 1  xが正の場合](https://i.gyazo.com/b48522eeab29d96186f092f55126e783.png)

`mesh.position.x = -1` x が負の場合

![mesh.position.x = -1 x が負の場合](https://i.gyazo.com/ce53fd4f35442a589f92bb1c2e68d773.png)

`mesh.position.y = 1` y が正の場合

![mesh.position.y = 1 y が正の場合](https://i.gyazo.com/c022cd9d0e8ddd1a66914f2f0bb614ee.png)

`mesh.position.y = -1` y が負の場合

![mesh.position.y = -1 y が負の場合](https://i.gyazo.com/548de12fd3b09986b904bba8ab6e18f0.png)

`mesh.position.z = 1` z が正の場合

![mesh.position.z = 1` z が正の場合](https://i.gyazo.com/373fd0841cae9a3fef7777ba9ca36762.png)

`mesh.position.z = -1` z が負の場合

![mesh.position.z = -1` z が負の場合](https://i.gyazo.com/96384ae165b02f0dfb93181b72383e9e.png)

set プロパティで指定
`mesh.position.set(0.7, -0.6, 1);`

![setプロパティで指定](https://i.gyazo.com/f88c5bc942f3f0e058bf9184a7c60150.png)

## オブジェクトの大きさを変える

`mesh.scale.x` オブジェクトを x 軸を基準に大きさを変更 1 に対して n 倍の大きさを指定する

`mesh.scale.y` オブジェクトを y 軸を基準に大きさを変更 1 に対して n 倍の大きさを指定する

`mesh.scale.z` オブジェクトを z 軸を基準に大きさを変更 1 に対して n 倍の大きさを指定する

`mesh.scale.set(x, y, z)` set プロパティを使うことで 1 行で記述することもできる

デフォルトの値は `1`

### 表示例

`mesh.scale` を指定していない場合

![mesh.scale を指定していない場合](https://i.gyazo.com/88a4d40389e0e968af809ecb3a742e4b.png)

`mesh.scale.x = 2`の場合

![mesh.scale.x = 2の場合](https://i.gyazo.com/70e6630d0b25b4ecff6361a8c055a6e5.png)

`mesh.scale.y =0.5`の場合

![mesh.scale.y =0.5の場合](https://i.gyazo.com/2483295a0d124f6491e10ecf1e0de996.png)

`mesh.scale.z = 1.5`の場合

![mesh.scale.z = 1.5の場合](https://i.gyazo.com/adf56c9099818f2ddf1e3291d6e9e27e.png)

set プロパティで指定
`mesh.scale.set(2, 0.5, 1.5)`

![set プロパティで指定](https://i.gyazo.com/bd9f9002fddf82b30e03881834566882.png)

## オブジェクトを回転させる

`mesh.rotation.x` x 軸を基準に回転
`mesh.rotation.y` y 軸を基準に回転
`mesh.rotation.x` z 軸を基準に回転

`mesh.rotation.x`の場合
x 軸に棒が刺さっていてそれを軸に回転するイメージ

回転を組み合わせた場合に意図しない方向に回転する可能性がある
その理由は x 軸を回転させた場合、一緒に y 軸や z 軸も動くからです
意図した方向に回転するには`reorder`プロパティを使います
`reorder`プロパティで回転の順序を制御します
`mesh.rotation.reorder(YXZ)`と指定すると
Y → X → Z の順で回転する

### 使用例

`mesh.rotation` を指定していない場合

![`mesh.rotation` を指定していない場合](https://i.gyazo.com/21ee2bf16ba9f9252e03f07a5965225d.png)

`mesh.rotation.x = Math.PI / 4`の場合

> [!NOTE] >`Math.PI` = 180 度なので `Math.PI / 4`は 45 度となる

![`mesh.rotation.x = Math.PI / 4`の場合](https://i.gyazo.com/9a0c15a1e80531a0bb1fb86fe9bc9958.png)

`mesh.rotation.y = Math.PI / 4;` の場合

![`mesh.rotation.y = Math.PI / 4;` の場合](https://i.gyazo.com/3f7bf3265b4fb1b94070e31555741fc1.png)

`mesh.rotation.z = Math.PI / 4;`の場合

![`mesh.rotation.z = Math.PI / 4;`の場合](https://i.gyazo.com/90e6a392b7d4764197683e38bf6432eb.png)

`reorder`プロパティを指定しない場合
記述した順序 X → Y → Z の順で回転

```JavaScript

mesh.rotation.x = Math.PI / 4;
mesh.rotation.y = Math.PI / 4;
mesh.rotation.z = Math.PI / 4;

```

**X 軸を 45 度回転**
[X 軸を 45 度回転](https://i.gyazo.com/9a0c15a1e80531a0bb1fb86fe9bc9958.png)

**X 軸を 45 度回転 → Y 軸を 45 度回転**

![X 軸を 45 度回転してから Y 軸を45度回転させる](https://i.gyazo.com/3a5e21a57e8ad89c634f862a8ce2d5eb.png)

**X 軸を 45 度回転 → Y 軸を 45 度回転 → Z 軸を 45 度回転**

![`reorder`プロパティを指定するしない場合](https://i.gyazo.com/b247dfff344e7c023265e05c6fb14141.png)

`reorder`プロパティを指定する場合
`reorder("YXZ")` Y → X → Z の順で回転

**Y 軸を 45 度回転**

![Y軸を45 度回転](https://i.gyazo.com/3f7bf3265b4fb1b94070e31555741fc1.png)

**Y 軸を 45 度回転 → X 軸を 45 度回転**

![Y軸を45度回転してから X軸を45度回転](https://i.gyazo.com/fada0dbaa3ab40bcb91a4617b0f326f7.png)

**Y 軸を 45 度回転 → X 軸を 45 度回転 → Z 軸を 45 度回転**
![Y 軸を 45 度回転 → X 軸を 45 度回転 → Z 軸を 45 度回転](https://i.gyazo.com/19fc325a884a36958f32aafa5d6a9308.png)

回転の順序で出力結果が変わるため注意が必要！

## オブジェクトの変換を組み合わせる

Position や Scale Rotation の記述する順番を換えても出力結果は変わらない

```JavaScript

// Position
mesh.position.set(0.7, -0.6, 1);

// Scale
mesh.scale.set(2, 0.5, 1.5);

// Rotaion
mesh.rotation.reorder("YXZ");
mesh.rotation.x = Math.PI / 4;
mesh.rotation.y = Math.PI / 4;
mesh.rotation.z = Math.PI / 4;

```

![立方体をレンダリングした画像](https://i.gyazo.com/bf4d4fd8c010868481818720be86902c.png)

Position を Rotaition のあとに移動させても

```JavaScript

// Scale
mesh.scale.set(2, 0.5, 1.5);

// Rotaion
mesh.rotation.reorder("YXZ");
mesh.rotation.x = Math.PI / 4;
mesh.rotation.y = Math.PI / 4;
mesh.rotation.z = Math.PI / 4;

// Position
mesh.position.set(0.7, -0.6, 1);

```

![出力結果は変わらない](https://i.gyazo.com/bf4d4fd8c010868481818720be86902c.png)

## オブジェクトのグループ化

`Groupクラス`を使って複数のオブジェクトをまとめて管理する

```JavaScript

// Groupクラスを使って3つのオブジェクトをグループ化

// * Objects
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = -2;
group.add(cube2);
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 2;
group.add(cube3);

```

![グループ化した3つの立方体](https://i.gyazo.com/ed13e48d8b339500d592ce95199d5395.png)

グループ化しているので
position や scale の指定も 1 つ記述すれば
3 つともに反映される

```JavaScript

// * Objects
const group = new THREE.Group();
group.position.y = 1;
group.scale.y = 2;
group.rotation.y = 1;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = -2;
group.add(cube2);
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 2;
group.add(cube3);


```

![3つまとめて反映される](https://i.gyazo.com/3198751260d9585922988fce5825c9f8.png)
