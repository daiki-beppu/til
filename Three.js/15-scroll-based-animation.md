# スクロールに基づいたアニメーション

- [スクロールに基づいたアニメーション](#スクロールに基づいたアニメーション)
  - [背景色の変更](#背景色の変更)
  - [オブジェクトを追加](#オブジェクトを追加)
  - [デバッグ UI での色の変更](#デバッグ-ui-での色の変更)
  - [オブジェクトの位置を調整](#オブジェクトの位置を調整)
  - [アニメーションの追加](#アニメーションの追加)
  - [スクロールに合わせてカメラを動かす](#スクロールに合わせてカメラを動かす)
  - [視差効果の適用](#視差効果の適用)
  - [パーティクルの追加](#パーティクルの追加)
  - [スクロール位置に基づいてアニメーションを適用](#スクロール位置に基づいてアニメーションを適用)

## 背景色の変更

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/07d3508901c9b2a9b4d8c37852ec4aa4.png)](https://gyazo.com/07d3508901c9b2a9b4d8c37852ec4aa4)

```js
// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true, // 透明度を有効にする
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

```CSS
html {
  background: #1e1a20;
}
```

## オブジェクトを追加

```js
// オブジェクト

const material = new THREE.MeshToonMaterial({
  color: "#ff0000",
});

const torusParams = {
  radius: 1,
  tube: 0.4,
  tubularSegments: 60,
  radialSegments: 16,
};

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(
    torusParams.radius,
    torusParams.tube,
    torusParams.tubularSegments,
    torusParams.radialSegments
  ),
  material
);

const coneParams = {
  radius: 1,
  height: 2,
  radialSegments: 32,
};

const cone = new THREE.Mesh(
  new THREE.ConeGeometry(
    coneParams.radius,
    coneParams.height,
    coneParams.radialSegments
  ),
  material
);

const torusKnotParams = {
  radius: 0.8,
  tube: 0.35,
  tubularSegments: 100,
  radialSegments: 16,
};

const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(
    torusKnotParams.radius,
    torusKnotParams.tube,
    torusKnotParams.tubularSegments,
    torusKnotParams.radialSegments
  ),
  material
);

scene.add(torus, cone, torusKnot);
```

[![Image from Gyazo](https://i.gyazo.com/a89644fc62a6544a840fdc9c05483a1e.png)](https://gyazo.com/a89644fc62a6544a840fdc9c05483a1e)

`MeshToonMaterial` は 光がないと表示されません。
なのでライトを追加します

```js
// ライト
const directionalLightParams = {
  color: "#ffffff",
  intensity: 3,
};

const directionalLight = new THREE.DirectionalLight(
  directionalLightParams.color,
  directionalLightParams.intensity
);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);
```

これで意図した表示になります！

[![Image from Gyazo](https://i.gyazo.com/34180f3ccae355d8fd8d8b4fa403e369.png)](https://gyazo.com/34180f3ccae355d8fd8d8b4fa403e369)

## デバッグ UI での色の変更

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/d98dac67dea453c3cde25e7505d793d5.gif)](https://gyazo.com/d98dac67dea453c3cde25e7505d793d5)

```js
// デバッグ UI
const gui = new GUI();

const guiParams = {
  materialColor: "#ffeded",
};

gui.addColor(guiParams, "materialColor").onChange(() => {
  material.color.set(guiParams.materialColor);
});
```

```js
// マテリアル
const material = new THREE.MeshToonMaterial({
  color: guiParams.materialColor, // デバッグ UI で設定した色を適用
});
```

## オブジェクトの位置を調整

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/6e11198a8825bdac05a6e85e735bf017.png)](https://gyazo.com/6e11198a8825bdac05a6e85e735bf017)

```js
const objectDistance = 4; // スクロールアニメーションで使用する

torus.position.x = 2;
torus.position.y = -objectDistance * 0;

cone.position.x = -2;
cone.position.y = -objectDistance * 1;

torusKnot.position.x = 2;
torusKnot.position.y = -objectDistance * 2;
```

## アニメーションの追加

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/b6c096aaa9dc6c4d12faa89718b982e9.gif)](https://gyazo.com/b6c096aaa9dc6c4d12faa89718b982e9)

```js
// 各メッシュを配列に格納してループ処理
const sectionMeshes = [torus, cone, torusKnot];
```

```js
// アニメーション
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // オブジェクトアニメーション
  for (const Mesh of sectionMeshes) {
    Mesh.rotation.x = elapsedTime * 0.1;
    Mesh.rotation.y = elapsedTime * 0.12;
  }
  // レンダラーの更新
  renderer.render(scene, camera);

  // 次のフレームを呼び出し
  window.requestAnimationFrame(tick);
};

tick();
```

## スクロールに合わせてカメラを動かす

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/8993f3bd4866f03d6708b6bc91ef1ac9.gif)](https://gyazo.com/8993f3bd4866f03d6708b6bc91ef1ac9)

```js
// スクロール
let scrollY = window.scrollY;

// ウィンドウのスクロールが発生するたびに以下の処理を実行
window.addEventListener("scroll", () => {
  // スクロールの位置を最新の位置で更新
  scrollY = window.scrollY; // window.scrollY は現在のスクロール位置(ピクセル数)を返す
});
```

## 視差効果の適用

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/b41a8ead513dae84733d36d68ccbe3dd.gif)](https://gyazo.com/b41a8ead513dae84733d36d68ccbe3dd)

**視差とは**、視点の位置によって見えるものがずれて見える現象のこと。
例えば電車の窓から見える景色では近くの景色ほど早く流れ、遠くの景色はゆっくり流れます。

**視差効果とは**、視差の原理を利用して、平面的な画面に奥行きや立体感、動きを与える表現技法。

**視差効果をのメリット**

- 没入感の向上
- 視覚的な面白さ
- 情報の整理

今回は、より没入感のある体験を実現するために、マウスの動きに合わせてカメラを動かすことで視差効果を適用します

```js
// カーソルの位置情報を保持するオブジェクト
const cursor = {
  x: 0,
  y: 0,
};

// マウスの動きを検知し、カーソル位置情報を更新
window.addEventListener("mousemove", (event) => {
  // マウスイベントからカーソルのX座標とY座標を取得
  cursor.x = event.clientX / sizes.width - 0.5; // 0を中心として -0.5(左端) から 0.5(右端) の範囲を取得
  cursor.y = event.clientY / sizes.height - 0.5; // 0を中心として -0.5(下端) から 0.5(上端) の範囲を取得
});
```

```js
// アニメーション
const clock = new THREE.Clock();
let praviousTime = 0; // 前回のフレームの経過時間を保持

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - praviousTime; // 前回からの経過時間
  praviousTime = elapsedTime;
  // オブジェクトアニメーション
  for (const Mesh of sectionMeshes) {
    Mesh.rotation.x = elapsedTime * 0.1;
    Mesh.rotation.y = elapsedTime * 0.12;
  }

  // スクロールアニメーション
  camera.position.y = (-scrollY / sizes.height) * objectDistance;

  const parallaxX = cursor.x * 0.5; // カーソルの X 位置からの視差効果を計算
  const parallaxY = -cursor.y * 0.5; // カーソルの Y 位置からの視差効果を計算
  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 5 * deltaTime; // 水平方向に視差効果の適用
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 5 * deltaTime; // 垂直方向に視差効果を適用

  // レンダラーの更新
  renderer.render(scene, camera);

  // 次のフレームを呼び出し
  window.requestAnimationFrame(tick);
};

tick();
```

## パーティクルの追加

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/68e082beb62ea447015b3658de2e786c.gif)](https://gyazo.com/68e082beb62ea447015b3658de2e786c)

```js
// * パーティクル

// ジオメトリ
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 200; // パーティクルの数
const vertices = 3; // 頂点の数

// パーティクルの位置を格納する配列を作成
const positions = new Float32Array(particlesCount * vertices);

for (let i = 0; i < particlesCount; i++) {
  // 各座標にアクセスするためのインデックスを定義
  const positionIndex = i * vertices;

  // X 座標をランダムに設定 (-5 から 5 の範囲)
  positions[positionIndex] = (Math.random() - 0.5) * 10;

  // Y 座標をランダムに設定 (オブジェクトの高さの範囲内に分散)
  positions[positionIndex + 1] =
    objectDistance * 0.4 - // オブジェクトの中心よりやや上に配置
    Math.random() * objectDistance * sectionMeshes.length; // 各セクションメッシュの間に分散

  // Z 座標をランダムに設定 (-5 から 5 の範囲)
  positions[positionIndex + 2] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
  "position", // position をジオメトリに設定
  new THREE.BufferAttribute(
    positions, // 属性に使用するデータを設定
    vertices // 各頂点のデータ数を設定
  )
);

particlesGeometry.setAttribute;
```

## スクロール位置に基づいてアニメーションを適用

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/72e936475d58831ae1fd86d7e7a560f9.gif)](https://gyazo.com/72e936475d58831ae1fd86d7e7a560f9)

```shell
# gsap のインストール
bun add gsap@3.5.1
```

```js
// GSAP のインポート
import gsap from "gsap";
```

```js
// スクロール位置に基づいてアニメーションを適用

// * スクロール
let scrollY = window.scrollY;
let currentSection = 0; // 現在のセクション (初期値は 0)

// ウィンドウのスクロールが発生するたびに以下の処理を実行
window.addEventListener("scroll", () => {
  // スクロールの位置を最新の位置で更新
  scrollY = window.scrollY; // window.scrollY は現在のスクロール位置(ピクセル数)を返す

  // 現在のセクションを計算
  const newSection = Math.round(scrollY / sizes.height);

  // セクションが切り替わった場合の処理
  if (newSection !== currentSection) {
    currentSection = newSection; // 現在のセクションを更新

    gsap.to(sectionMeshes[currentSection].rotation, {
      duration: 1.5,
      ease: "power2.inOut",
      x: "+=6",
      y: "+=3",
      z: "+=1.5",
    });
  }
});
```

```js
// elapsedTime ではなく 前回の経過時間に基づいて回転を設定
// * アニメーション
const clock = new THREE.Clock();
let praviousTime = 0; // 前回のフレームの経過時間を保持

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - praviousTime; // 前回からの経過時間
  praviousTime = elapsedTime;
  // オブジェクトアニメーション
  for (const Mesh of sectionMeshes) {
    Mesh.rotation.x += deltaTime * 0.1;
    Mesh.rotation.y += deltaTime * 0.12;
  }

  // スクロールアニメーション
  camera.position.y = (-scrollY / sizes.height) * objectDistance;

  const parallaxX = cursor.x * 0.5; // カーソルの X 位置からの視差効果を計算
  const parallaxY = -cursor.y * 0.5; // カーソルの Y 位置からの視差効果を計算
  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 5 * deltaTime; // 水平方向に視差効果の適用
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 5 * deltaTime; // 垂直方向に視差効果を適用

  // レンダラーの更新
  renderer.render(scene, camera);

  // 次のフレームを呼び出し
  window.requestAnimationFrame(tick);
};

tick();
```
