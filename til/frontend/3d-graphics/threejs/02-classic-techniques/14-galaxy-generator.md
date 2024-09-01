# 銀河系の制作

- [銀河系の制作](#銀河系の制作)
  - [ベースのパーティクルを作成](#ベースのパーティクルを作成)
  - [パラメータをデバッグ UI で調整](#パラメータをデバッグ-ui-で調整)
  - [銀河系の形を設定](#銀河系の形を設定)
  - [銀河系の色を設定](#銀河系の色を設定)

## ベースのパーティクルを作成

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/e7db3162180caea37132ac4dba2c0af9.png)](https://gyazo.com/e7db3162180caea37132ac4dba2c0af9)

```js
// 銀河系

// パラメータの設定
const galaxyParams = {
  count: 1000, // パーティクルの数
  size: 0.02, // パーティクルの大きさ
};

const generateGalaxy = () => {
  // ジオメトリ
  const particlesGeomtry = new THREE.BufferGeometry();
  const vertices = 3; // 頂点の数(x, y, z)

  // パーティクルの位置情報を格納するための配列を作成
  const position = new Float32Array(galaxyParams.count * vertices);

  for (let i = 0; i < galaxyParams.count; i++) {
    const positionIndex = i * 3; // 各座標にアクセスするためのインデックスを定義
    position[positionIndex] = (Math.random() - 0.5) * 3; // X座標に値を設定 (0,3,6,9,...)
    position[positionIndex + 1] = (Math.random() - 0.5) * 3; // Y座標に値を設定(1,4,7,10,...)
    position[positionIndex + 2] = (Math.random() - 0.5) * 3; // Z座標に値を設定(2,5,8,11,...)
  }
  particlesGeomtry.setAttribute(
    "position", // position をジオメトリに設定
    new THREE.BufferAttribute(
      position, // 属性に使用するデータを設定
      vertices // 各頂点のデータ数を設定
    )
  );

  // マテリアル
  const particlesMaterial = new THREE.PointsMaterial({
    size: galaxyParams.size, // パーティクルの大きさ
    sizeAttenuation: true, // カメラ深度でサイズの変更を有効にする設定
    depthWrite: false, // オブジェクトの描画時に深度バッファに情報を書き込む設定を無効化
    blending: THREE.AdditiveBlending, // // ピクセルの色をすでに描画されているピクセルの色と重ね合わせる設定
  });

  // オブジェクト
  // パーティクルの作成
  const particles = new THREE.Points(particlesGeomtry, particlesMaterial);

  // シーンに追加
  scene.add(particles);
};

generateGalaxy();
```

## パラメータをデバッグ UI で調整

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/317e05ca8187d1e92e93e3ef520ee7e1.gif)](https://gyazo.com/317e05ca8187d1e92e93e3ef520ee7e1)

```js
// デバッグ UI の追加

gui
  .add(galaxyParams, "count")
  .min(0)
  .max(100000)
  .step(100)
  .name("パーティクルの数")
  .onFinishChange(generateGalaxy);
gui
  .add(galaxyParams, "size")
  .min(0.0001)
  .max(0.1)
  .step(0.0001)
  .name("パーティクルの大きさ")
  .onFinishChange(generateGalaxy);
```

メモリリークやパフォーマンスの悪化を防ぐために
古いジオメトリやマテリアルのメモリを GPU から開放する必要がある

```js
let particlesGeomtry = null;
let particlesMaterial = null;
let particles = null;

const generateGalaxy = () => {
  // 古いジオメトリのメモリを GPU から開放
  if (particles !== null) {
    particlesGeomtry.dispose();
    particlesMaterial.dispose();
    scene.remove(particles); // オブジェクトは dispose ではなく remove でシーンから削除
  }
  // ジオメトリ
  particlesGeomtry = new THREE.BufferGeometry(); // const で定義していない
  const vertices = 3;

  const position = new Float32Array(galaxyParams.count * vertices);

  for (let i = 0; i < galaxyParams.count; i++) {
    const positionIndex = i * 3;
    position[positionIndex] = (Math.random() - 0.5) * 3; // X座標に値を設定
    position[positionIndex + 1] = (Math.random() - 0.5) * 3; // Y座標に値を設定
    position[positionIndex + 2] = (Math.random() - 0.5) * 3; // Z座標に値を設定
  }
  particlesGeomtry.setAttribute(
    "position",
    new THREE.BufferAttribute(position, vertices)
  );

  // マテリアル
  particlesMaterial = new THREE.PointsMaterial({
    size: galaxyParams.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  // オブジェクト
  particles = new THREE.Points(particlesGeomtry, particlesMaterial);
  scene.add(particles);
};
```

## 銀河系の形を設定

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/29f90d53cff5afd12ad21d9a3cf7cc6d.png)](https://gyazo.com/29f90d53cff5afd12ad21d9a3cf7cc6d)

```js

const galaxyParams = {
  count: 10000,
  size: 0.01,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
};

const generateGalaxy = () => {

for (let i = 0; i < galaxyParams.count; i++) {
    const positionIndex = i * 3;

    // パーティクルの半径(中心からの距離)をランダムに設定
    const radius = Math.random() * galaxyParams.radius;

    // 回転の角度を計算 (半径に基づいて回転の強さを設定)
    const spinAngle = radius * galaxyParams.spin;

    // ブランチの角度を計算 (ブランチ数に基づいて均等に配置)
    const branchAngle =
      ((i % galaxyParams.branches) / galaxyParams.branches) * Math.PI * 2;

    // ランダム性を加えるためのオフセットを計算
    //中心に近いほどオフセットが小さく、中心から遠いほどオフセットが大きくなる
    const randomX =
      Math.pow(Math.random(), galaxyParams.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      galaxyParams.randomness *
      radius;
    const randomY =
      Math.pow(Math.random(), galaxyParams.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      galaxyParams.randomness *
      radius;
    const randomZ =
      Math.pow(Math.random(), galaxyParams.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      galaxyParams.randomness *
      radius;

    // パーティクルをブランチ上に並べる;
    position[positionIndex] =
      Math.cos(branchAngle + spinAngle) * radius + randomX; // X座標
    position[positionIndex + 1] = randomY; // Y座標 (ランダム性のみ)
    position[positionIndex + 2] =
      Math.sin(branchAngle + spinAngle) * radius + randomZ; // Z座標

}
```

## 銀河系の色を設定

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/103640aaf851340fb86f9243710775a6.png)](https://gyazo.com/103640aaf851340fb86f9243710775a6)

```js
const generateGalaxy = () => {
  // ジオメトリ
  particlesGeomtry = new THREE.BufferGeometry();
  const rgb = 3;

  // パーティクルの色情報を格納するための配列を作成
  const colors = new Float32Array(galaxyParams.count * rgb);

  // 内側の色を設定
  const colorInside = new THREE.Color(galaxyParams.insideColor);

  // 外側の色を設定
  const colorOutside = new THREE.Color(galaxyParams.outsideColor);

  for (let i = 0; i < galaxyParams.count; i++) {
    const colorIndex = i * rgb;

    // 内側の色と外側の色を線形補間（lerp）して、パーティクルの位置に基づいて色を決定
    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / galaxyParams.radius); // radius / galaxyParams.radius の比率で色を混ぜる

    colors[colorIndex] = mixedColor.r; // r
    colors[colorIndex + 1] = mixedColor.g; // g
    colors[colorIndex + 2] = mixedColor.b; // b

    particlesGeomtry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, rgb)
    );

    // マテリアル
    particlesMaterial = new THREE.PointsMaterial({
      size: galaxyParams.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });
  }

  // オブジェクト
  particles = new THREE.Points(particlesGeomtry, particlesMaterial);
  scene.add(particles);
};
```
