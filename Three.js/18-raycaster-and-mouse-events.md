# レイキャスターとマウスイベント

- [レイキャスターとマウスイベント](#レイキャスターとマウスイベント)
  - [レイキャスターとは](#レイキャスターとは)
  - [レイキャスターの作成](#レイキャスターの作成)
  - [光線が交差しているオブジェクトの情報を取得](#光線が交差しているオブジェクトの情報を取得)
  - [レイキャスターが交差したときに色を変える](#レイキャスターが交差したときに色を変える)
  - [レイキャスターを可視化する](#レイキャスターを可視化する)
  - [マウスホバーでレイキャスターを使用する](#マウスホバーでレイキャスターを使用する)

## レイキャスターとは

Three.js おける `Raycaster` は、光線のような仮想的な線をシーンに投影し、その線がオブジェクトと交差するかを検出するツール。
レイキャスティングは、クリックイベントの処理、物体の選択、衝突検出など、さまざまな用途に使用されます。

## レイキャスターの作成

```js
// raycaster をインスタンス化
const raycaster = new THREE.Raycaster();
```

```js
// 光線の原点と始点を定義
const rayOriginVector3 = { x: -3, y: 0, z: 0 };
const rayDirectionVector3 = { x: 1, y: 0, z: 0 };

// 光線の始点を設定 THREE.Vector3 インスタンスを作成し、コピー
const rayOrigin = new THREE.Vector3().copy(rayOriginVector3);

// 光線の原点からのベクトルを設定 THREE.Vector3 インスタンスを作成し、コピー
const rayDirection = new THREE.Vector3().copy(rayDirectionVector3);

// 方向ベクトルの値を正規化して単位ベクトルにする (長さを 1 にする)
rayDirection.normalize();

// レイキャスターの始点と方向ベクトルを設定
raycaster.set(rayOrigin, rayDirection);
```

## 光線が交差しているオブジェクトの情報を取得

```js
// 単一のオブジェクトと交差している場合の情報を取得
const intersect = raycaster.intersectObject(object2);

// 複数のオブジェクトと交差している場合の情報を取得
const intersects = raycaster.intersectObjects([object1, object2, object3]);
```

オブジェクトの情報は配列で返されます。
配列の各項目には多くの有用な情報が含まれます。

- `distance` : 光線の原点と衝突点との距離
- `face` : 光線がジオメトリのどの面に当たったのか
- `faceIndex` : 光線がジオメトリのに当たった面のインデックス
- `object` : 衝突の対象となるオブジェクト
- `point` : 衝突の 3D 空間における正確な位置 (Vecter3)
- `uv`: そのジオメトリの UV 座標

## レイキャスターが交差したときに色を変える

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/9f2cbca53e8ea5cde8ba54d83d3bfade.gif)](https://gyazo.com/9f2cbca53e8ea5cde8ba54d83d3bfade)

```js
// アニメーション
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // アニメーションの速度
  const animationSpeeds = [0.3, 0.8, 1.4];

  // 移動の範囲
  const movementRange = 1.5;

  // 変化をさせる対象のオブジェクト
  const objects = [object1, object2, object3];

  // オブジェクトアニメーション (上下に揺れる)
  objects.map((object, index) => {
    object.position.y = Math.sin(
      elapsedTime * animationSpeeds[index] * movementRange
    );
  });

  // 光線の原点と始点を定義
  const rayOriginVector3 = { x: -3, y: 0, z: 0 };
  const rayDirectionVector3 = { x: 1, y: 0, z: 0 };

  // 光線の始点を設定 THREE.Vector3 インスタンスを作成し、コピー
  const rayOrigin = new THREE.Vector3().copy(rayOriginVector3);

  // 光線の原点からのベクトルを設定 THREE.Vector3 インスタンスを作成し、コピー
  const rayDirection = new THREE.Vector3().copy(rayDirectionVector3);

  // 方向ベクトルの値を正規化して単位ベクトルにする (長さを 1 にする)
  rayDirection.normalize();

  // レイキャスターの始点と方向ベクトルを設定
  raycaster.set(rayOrigin, rayDirection);

  // 光線が交差しているオブジェクトの上方を取得
  const intersects = raycaster.intersectObjects(objects);

  // すべてオブジェクトに赤色を設定
  for (const object of objects) {
    object.material.color.set("#f00");
  }

  // 光線が交差しているオブジェクトに青色を設定
  for (const intersect of intersects) {
    intersect.object.material.color.set("#00f");
  }

  // カメラ制御の更新
  controls.update();

  // レンダラーを更新
  renderer.render(scene, camera);

  // 次のフレームを呼び出し
  window.requestAnimationFrame(tick);
};

tick();
```

## レイキャスターを可視化する

```js
// レイキャスターを可視化
const arrowHelper = new THREE.ArrowHelper(
  raycaster.ray.direction, // 矢印の向き (原点からの方向ベクトル)
  raycaster.ray.origin, // 矢印の始点
  8, // 矢印の長さ
  0xff0000 // 矢印の色
);

scene.add(arrowHelper);

const tick = () => {
  // ...

  // 光線の原点と始点を定義
  const rayOriginVector3 = { x: -3, y: 0, z: 0 };
  const rayDirectionVector3 = { x: 1, y: 0, z: 0 };

  // 光線の始点を設定 THREE.Vector3 インスタンスを作成し、コピー
  const rayOrigin = new THREE.Vector3().copy(rayOriginVector3);

  // 光線の原点からのベクトルを設定 THREE.Vector3 インスタンスを作成し、コピー
  const rayDirection = new THREE.Vector3().copy(rayDirectionVector3);

  // 方向ベクトルの値を正規化して単位ベクトルにする (長さを 1 にする)
  rayDirection.normalize();

  // レイキャスターの始点と方向ベクトルを設定
  raycaster.set(rayOrigin, rayDirection);

  // arrowHelperの位置と方向を raycaster に合わせて更新更新
  arrowHelper.setDirection(raycaster.ray.direction);
  arrowHelper.position.copy(raycaster.ray.origin);

  // 今回の例ではあまり意味はないが、レイキャスターが動的に変化する場合に常に最新の状態を可視化することができる

  // ... (その他のレンダリング処理)
};

tick();
```

## マウスホバーでレイキャスターを使用する

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/4552e5e85a864a0350993f6aa8fd75ea.gif)](https://gyazo.com/4552e5e85a864a0350993f6aa8fd75ea)

```js
// マウス
const mouse = new THREE.Vector2(); // マウス座標を保持するVecter2
const normalizeFactor = 2; // 正規化のスケールファクター(範囲を -1 から 1にする)
const normalizeOffset = 1; // 正規化のオフセット (中心を 0 にする)

// マウスの移動イベントリスナーを作成
window.addEventListener("mousemove", (event) => {
  // マウスの座標を正規化 (デバイスの座標 => -1 から 1 の範囲に正規化)
  mouse.x = (event.clientX / sizes.width) * normalizeFactor - normalizeOffset;
  mouse.y = -(event.clientY / sizes.height) * normalizeFactor + normalizeOffset;
});
```

```js
const tick = () => {
  // ...

  // マウスとカメラの位置を基に光線を放つ
  raycaster.setFromCamera(mouse, camera);

  // 光線が交差しているオブジェクトの情報を取得
  const intersects = raycaster.intersectObjects(objects);

  // すべてオブジェクトに赤色を設定
  for (const object of objects) {
    object.material.color.set("#f00");
  }

  // 光線が交差しているオブジェクトに青色を設定
  for (const intersect of intersects) {
    intersect.object.material.color.set("#00f");
  }

  // ...
};
```
