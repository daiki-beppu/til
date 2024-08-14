# レイキャスターとマウスイベント

- [レイキャスターとマウスイベント](#レイキャスターとマウスイベント)
  - [レイキャスターとは](#レイキャスターとは)
  - [レイキャスターの作成](#レイキャスターの作成)
  - [レイキャスターが交差しているオブジェクトの情報を取得](#レイキャスターが交差しているオブジェクトの情報を取得)
  - [レイキャスターが交差したときに色を変える](#レイキャスターが交差したときに色を変える)
  - [レイキャスターを可視化する](#レイキャスターを可視化する)
  - [マウスホバーでレイキャスターを使用する](#マウスホバーでレイキャスターを使用する)
  - [マウスの進入、離脱イベント](#マウスの進入離脱イベント)
  - [マウスクリックイベント](#マウスクリックイベント)
  - [モデルにレイキャスターを使用する](#モデルにレイキャスターを使用する)

## レイキャスターとは

Three.js おける `Raycaster` は、光線のような仮想的な線をシーンに投影し、その線がオブジェクトと交差するかを検出するツール。
レイキャスティングは、クリックイベントの処理、物体の選択、衝突検出など、さまざまな用途に使用されます。

## レイキャスターの作成

```js
// raycaster をインスタンス化
const raycaster = new THREE.Raycaster();
```

```js
// レイキャスターの原点と始点を定義
const rayOriginVector3 = { x: -3, y: 0, z: 0 };
const rayDirectionVector3 = { x: 1, y: 0, z: 0 };

// レイキャスターの始点を設定 THREE.Vector3 インスタンスを作成し、コピー
const rayOrigin = new THREE.Vector3().copy(rayOriginVector3);

// レイキャスターの原点からのベクトルを設定 THREE.Vector3 インスタンスを作成し、コピー
const rayDirection = new THREE.Vector3().copy(rayDirectionVector3);

// 方向ベクトルの値を正規化して単位ベクトルにする (長さを 1 にする)
rayDirection.normalize();

// レイキャスターの始点と方向ベクトルを設定
raycaster.set(rayOrigin, rayDirection);
```

## レイキャスターが交差しているオブジェクトの情報を取得

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

  // レイキャスターの原点と始点を定義
  const rayOriginVector3 = { x: -3, y: 0, z: 0 };
  const rayDirectionVector3 = { x: 1, y: 0, z: 0 };

  // レイキャスターの始点を設定 THREE.Vector3 インスタンスを作成し、コピー
  const rayOrigin = new THREE.Vector3().copy(rayOriginVector3);

  // レイキャスターの原点からのベクトルを設定 THREE.Vector3 インスタンスを作成し、コピー
  const rayDirection = new THREE.Vector3().copy(rayDirectionVector3);

  // 方向ベクトルの値を正規化して単位ベクトルにする (長さを 1 にする)
  rayDirection.normalize();

  // レイキャスターの始点と方向ベクトルを設定
  raycaster.set(rayOrigin, rayDirection);

  // レイキャスターが交差しているオブジェクトの上方を取得
  const intersects = raycaster.intersectObjects(objects);

  // すべてオブジェクトに赤色を設定
  for (const object of objects) {
    object.material.color.set("#f00");
  }

  // レイキャスターが交差しているオブジェクトに青色を設定
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

  // レイキャスターの原点と始点を定義
  const rayOriginVector3 = { x: -3, y: 0, z: 0 };
  const rayDirectionVector3 = { x: 1, y: 0, z: 0 };

  // レイキャスターの始点を設定 THREE.Vector3 インスタンスを作成し、コピー
  const rayOrigin = new THREE.Vector3().copy(rayOriginVector3);

  // レイキャスターの原点からのベクトルを設定 THREE.Vector3 インスタンスを作成し、コピー
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

  // マウスとカメラの位置を基にレイキャスターを放つ
  raycaster.setFromCamera(mouse, camera);

  // レイキャスターが交差しているオブジェクトの情報を取得
  const intersects = raycaster.intersectObjects(objects);

  // すべてオブジェクトに赤色を設定
  for (const object of objects) {
    object.material.color.set("#f00");
  }

  // レイキャスターが交差しているオブジェクトに青色を設定
  for (const intersect of intersects) {
    intersect.object.material.color.set("#00f");
  }

  // ...
};
```

## マウスの進入、離脱イベント

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/cc0aa16f05b09dc331a37268258331f6.gif)](https://gyazo.com/cc0aa16f05b09dc331a37268258331f6)

```js
// レイキャスターとオブジェクトとの交差状態を保持する変数
let currentIntersect = null;

const tick = () => {
  // ...

  // オブジェクトとの交差判定
  if (intersects.length) {
    // オブジェクトが交差している場合の処理
    if (currentIntersect === null) {
      console.log("マウスがオブジェクトに入った！");
    }

    // 交差しているオブジェクトを記録
    currentIntersect = intersects[0];
  } else {
    // オブジェクトが交差していない場合の処理
    if (currentIntersect) {
      console.log("マウスがオブジェクトから離れた！");
    }
    // 交差状態をリセット
    currentIntersect = null;
  }

  // ...
};

tick();
```

## マウスクリックイベント

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/5e607d5a5217402ae5738be836fe6f67.gif)](https://gyazo.com/5e607d5a5217402ae5738be836fe6f67)

```js
window.addEventListener("click", () => {
  if (currentIntersect) {
    switch (currentIntersect.object) {
      case object1:
        console.log("ボール1をクリック");
        break;
      case object2:
        console.log("ボール2をクリック");
        break;
      case object3:
        console.log("ボール3をクリック");
        break;
    }
  }
});
```

if 文の場合

```js
window.addEventListener("click", () => {
  if (currentIntersect) {
    if (currentIntersect.object === object1) {
      console.log("ボール1をクリック");
    } else if (currentIntersect.object === object2) {
      console.log("ボール2をクリック");
    } else if (currentIntersect.object === object3) {
      console.log("ボール3をクリック");
    }
  }
});
```

## モデルにレイキャスターを使用する

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/6ac36a031cc4b79aefb4410ab3d144fc.gif)](https://gyazo.com/6ac36a031cc4b79aefb4410ab3d144fc)

```js
// モデルの追加

// GLTFLoader のインポート
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// モデルのパラメータをオブジェクトで定義
const modelParams = {
  position: { x: 0, y: -1.2, z: 0 },
};

// モデルを初期化 (グローバルスコープで使用できるように)
let model = null;

// モデルのロード (任意のパスを使用)
const gltfLoader = new GLTFLoader();
gltfLoader.load("./models/Duck/glTF-Binary/Duck.glb", (gltf) => {
  model = gltf.scene;
  model.position.y = modelPrams.position.y; // モデルの位置を調整
  model.rotation.y = -Math.PI / 3; // モデルの向きを調整
  scene.add(model); // シーンに追加
});

// ライト
const ambientLightParams = {
  color: 0xffffff,
  intensity: 0.9,
};

const ambientLight = new THREE.AmbientLight(
  ambientLightParams.color,
  ambientLightParams.intensity
);

const directionalLightParams = {
  color: 0xffffff,
  intensity: 2.1,
  position: { x: 1, y: 2, z: 3 },
};
const directionalLight = new THREE.DirectionalLight(
  directionalLightParams.color,
  directionalLightParams.intensity
);

directionalLight.position.set(
  directionalLightParams.position.x,
  directionalLightParams.position.y,
  directionalLightParams.position.z
);
scene.add(ambientLight, directionalLight);
```

```js
const tick = () => {
  // ...

  // レイキャスターとモデルとの交差判定
  if (model) {
    const modelIntersects = raycaster.intersectObject(model);

    const modelDefaultScale = 1; // デフォルトのサイズ
    const modelIntersectsScale = 1.2; // 交差時のサイズ

    // モデルが交差している場合の処理
    if (modelIntersects.length) {
      model.scale.setScalar(modelIntersectsScale);

      // モデルが交差していない場合の処理
    } else {
      model.scale.setScalar(modelDefaultScale);
    }
  }

  // ...
};

tick();
```
