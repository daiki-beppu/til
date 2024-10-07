# パーティクル (粒子) について

- [パーティクル (粒子) について](#パーティクル-粒子-について)
  - [パーティクル (粒子) の作成](#パーティクル-粒子-の作成)
  - [パーティクル (粒子) をランダムに配置](#パーティクル-粒子-をランダムに配置)
  - [マテリアルの設定](#マテリアルの設定)
    - [color, map, alphaMap の設定](#color-map-alphamap-の設定)
    - [alphaTest の設定](#alphatest-の設定)
    - [depthTest の設定](#depthtest-の設定)
      - [depthTest を無効にする問題点](#depthtest-を無効にする問題点)
    - [depthWrite の設定](#depthwrite-の設定)
  - [パーティクル (粒子) にランダムな色を設定する](#パーティクル-粒子-にランダムな色を設定する)
  - [パーティクルにアニメーションを付与](#パーティクルにアニメーションを付与)

## パーティクル (粒子) の作成

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/4e919ff8cd0e048248d9c5a92a30aca5.png)](https://gyazo.com/4e919ff8cd0e048248d9c5a92a30aca5)

```js
// パーティクルの値を設定
const particlesParams = {
  radius: 1,
  widthSegments: 32,
  heightSegments: 32,
};
```

```js
// パーティクルのジオメトリを作成
const particlesGeomettry = new THREE.SphereGeometry(
  particlesParams.radius,
  particlesParams.widthSegments,
  particlesParams.heightSegments
);
```

```js
// パーティクルのマテリアルを作成
const particlesMaterial = new THREE.PointsMaterial({
  // 粒子のサイズ
  size: 0.02,
  // サイズをカメラの距離に応じて粒子のサイズが小さくなる設定
  sizeAttenuation: true, // デフォルトは true false にするとカメラの距離にかかわらず粒子のサイズが一定になる
});
```

```js
// パーティクルのオブジェクトを作成

// Mesh ではなく Points を使用する
const particles = new THREE.Points(particlesGeomettry, particlesMaterial);
```

## パーティクル (粒子) をランダムに配置

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/e37aa41609181f1c800cb2acfc0db4f8.png)](https://gyazo.com/e37aa41609181f1c800cb2acfc0db4f8)

[![Image from Gyazo](https://i.gyazo.com/5e258393959ded78442fe6e00bb0ec94.png)](https://gyazo.com/5e258393959ded78442fe6e00bb0ec94)

```js
// ジオメトリの作成
const particlesGeometry = new THREE.BufferGeometry();
```

```js
// パーティクルの数
const count = 5000;

// パーティクルの位置を格納する配列を作成
const position = new Float32Array(count * 3);

// 各パーティクルは3つの値(x,y,z)を持つため、const * 3 のサイズの Float32Array を作成する
```

```js
// 配列 position に ランダムな値を設定
for (let i = 0; i < count * 3; i++) {
  position[i] = (Math.random() - 0.5) * 10; // -0.5 から 5 までの値を設定
}
```

```js
// パーティクルの位置をジオメトリに設定
particlesGeometry.setAttribute(
  "position", // position 属性をジオメトリに設定
  new THREE.BufferAttribute(
    position, // 属性に使用するデータを設定
    3 // 各頂点のデータ数を設定
  )
);
```

```js
// パーティクルのマテリアルを設定
const particlesMaterial = new THREE.PointsMaterial({
  // 粒子のサイズ
  size: 0.0001,
  // サイズをカメラの深度で減衰させる設定
  sizeAttenuation: true,
});
```

```js
// パーティクルの作成
const particles = new THREE.Points(particlesGeometry, particlesMaterial);

// シーンに追加
scene.add(particles);
```

## マテリアルの設定

### color, map, alphaMap の設定

パーティクルにもテクスチャや色を設定できる！

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/9399be8f9a0f136fc457784db17cb13a.png)](https://gyazo.com/9399be8f9a0f136fc457784db17cb13a)

```js
// テクスチャのロード
const textureLoader = new THREE.TextureLoader();
const particlesTexture = textureLoader.load("./textures/particles/2.png"); // 画像のパスは任意のものを使用
```

```js
const particlesMaterial = new THREE.PointsMaterial({
  color: "red", // 色を赤に設定
  map: particlesTexture, // 円のテクスチャを適用
  size: 0.1, // 粒子のサイズ
  sizeAttenuation: true, // サイズをカメラの深度で減衰させる設定
});
```

### alphaTest の設定

`alphaTest` はピクセルの透明度に応じてピクセルを表示するかどうかを設定するプロパティ。

デフォルトの値は `0` ですべてのピクセルが描画されることを意味する。
`0.001` に設定した場合、透明度が `0,001` 以下のピクセルは描画されない。

```js
const particlesMaterial = new THREE.PointsMaterial({
  transparent: true, // 透明度を有効にする
  alphaMap: particlesTexture, // テクスチャの適用
  alphaTest: 0.001, // ピクセルの透明度に応じて表示する設定
  size: 0.1, // 粒子のサイズ
  sizeAttenuation: true, // サイズをカメラの深度で減衰させる設定
});
```

**適用前**

[![Image from Gyazo](https://i.gyazo.com/056f150a7a17c21c9237d45f5c973629.png)](https://gyazo.com/056f150a7a17c21c9237d45f5c973629)

パーティクルの中心が透過していない

**適用後**

[![Image from Gyazo](https://i.gyazo.com/0b0c5ec1f7a510eb6078cd4ee30b1343.png)](https://gyazo.com/0b0c5ec1f7a510eb6078cd4ee30b1343)

ちゃんと透過するようになった！
だけどよく見ると輪郭部分が完全に透過していないので注意が必要
完璧とは言えないが使えなくもない。

### depthTest の設定

`depthTest` は深度テストの設定をするプロパティ。

深度テストとは、
オブジェクトのピクセルごとにカメラの距離を比較して、奥にあるオブジェクトが手前のオブジェクトで隠れるようにするためのテストのこと。

デフォルトは `true` で 深度テストを有効にします。

`false` に設定した場合深度テストが無効になるので、カメラの距離に関係なく手前のオブジェクトが奥にあるオブジェクトの上に描画されます。

```js
const particlesMaterial = new THREE.PointsMaterial({
  transparent: true,
  alphaMap: particlesTexture,
  depthTest: false,
  size: 0.1,
  sizeAttenuation: true,
});
```

**適用前**

[![Image from Gyazo](https://i.gyazo.com/056f150a7a17c21c9237d45f5c973629.png)](https://gyazo.com/056f150a7a17c21c9237d45f5c973629)

**適用後**

[![Image from Gyazo](https://i.gyazo.com/09c926bcaf8664595d799e487667b609.png)](https://gyazo.com/09c926bcaf8664595d799e487667b609)

`depthTest` を `false` に設定したことで透過するようになった！

#### depthTest を無効にする問題点

`depthTest` を無効に設定した場合、大きな問題点が生じる

以下の画像を見てもらうとわかりやすいでしょう。

[![Image from Gyazo](https://i.gyazo.com/bcb76e4bff740d6eac08bd5e75561e09.png)](https://gyazo.com/bcb76e4bff740d6eac08bd5e75561e09)

別のオブジェクトがある場合、そのオブジェクトも透過してしまう。

これは多くの開発者が意図しない挙動だと考えられるので設定する場合は注意が必要。

多くの場合、次に紹介する `depthWrite` を設定することで、意図したとおりの描画結果が得られます。

### depthWrite の設定

`depthWrite` はオブジェクトの描画時に深度バッファに情報を書き込む設定をするプロパティ。

特定のオブジェクトが深度バッファに影響を与えないようにすることができる。

深度バッファとは、各ピクセルの深度情報を格納するためのデータを一時保管するメモリ領域です。
深度バッファによって、正しい前後関係で描画されるようになる。

デフォルトは `true` でオブジェクトの描画時、深度情報が深度バッファに書き込まれ、ほかオブジェクトとの正しい前後関係が確保される。

`false` に設定するとオブジェクトの描画時、深度情報が深度バッファに書き込まれないので、他のオブジェクトとの前後関係が変わる

```js
const particlesMaterial = new THREE.PointsMaterial({
  color: "red",
  transparent: true,
  alphaMap: particlesTexture,
  depthWrite: false,
  size: 0.1,
  sizeAttenuation: true,
});
```

**適用前**

[![Image from Gyazo](https://i.gyazo.com/0abd4d012cfb2f1502fdd228edfb295f.png)](https://gyazo.com/0abd4d012cfb2f1502fdd228edfb295f)

**適用後**

[![Image from Gyazo](https://i.gyazo.com/e93b1ad42bbeffef1a43add22bf83452.png)](https://gyazo.com/e93b1ad42bbeffef1a43add22bf83452)

## パーティクル (粒子) にランダムな色を設定する

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/7554d3284252b24ae71a53df58dfc348.gif)](https://gyazo.com/7554d3284252b24ae71a53df58dfc348)

```js
const particlesGeometry = new THREE.BufferGeometry();
const count = 20000;

const position = new Float32Array(count * 3);

// パーティクルの色を格納するための配列を作成
const colors = new Float32Array(count * 3); // rgb の 3 つ値を使用するため * 3

for (let i = 0; i < count * 3; i++) {
  position[i] = (Math.random() - 0.5) * 10;

  // rgb に 0 から 1までのランダムな数字を設定
  colors[i] = Math.random(); // rgb の各値が 1 に近いほど 白く 0 に近いほど黒くなる
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(position, 3)
);
particlesGeometry.setAttribute(
  "color", // color 属性をジオメトリに設定
  new THREE.BufferAttribute(
    colors, // 属性に使用するデータを設定
    3 // rgb の3つ値を使用するため 3
  )
);

const particlesTexture = textureLoader.load("./textures/particles/2.png");
particlesTexture.colorSpace = THREE.SRGBColorSpace;

const particlesMaterial = new THREE.PointsMaterial({
  transparent: true,
  alphaMap: particlesTexture,
  depthWrite: false,
  blending: THREE.AdditiveBlending, // ピクセルの色をすでに描画されているピクセルの色と重ね合わせる設定
  size: 0.1,
  sizeAttenuation: true,
  vertexColors: true, // 頂点カラーを有効にする
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);
```

## パーティクルにアニメーションを付与

パーティクル全体にアニメーションを付与する

こんなことや

[![Image from Gyazo](https://i.gyazo.com/0b60e517a0d0070c5b3cee57acb84b82.gif)](https://gyazo.com/0b60e517a0d0070c5b3cee57acb84b82)

```js
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // パーティクルアニメーション
  particles.rotation.y = elapsedTime * 0.2; // 左向きに回転

  particlesGeometry.attributes.position.needsUpdate = true;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

こんなことも

[![Image from Gyazo](https://i.gyazo.com/de199906accb9d883e10adea6a4ffe1e.gif)](https://gyazo.com/de199906accb9d883e10adea6a4ffe1e)

```js
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // パーティクルアニメーション
  particles.position.y = -elapsedTime * 0.02; // 雪のように落ちる

  particlesGeometry.attributes.position.needsUpdate = true;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

個別のパーティクルにアニメーションを付与する

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/bb6f25082e08c7259cfa17585f85cc11.gif)](https://gyazo.com/bb6f25082e08c7259cfa17585f85cc11)

```js
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // パーティクルアニメーション

  for (let i = 0; i < count; i++) {
    const i3 = i * 3; // 頂点配列内の現在の頂点のインデックスを計算 (各頂点は 3 つの値を持つため)
    const offsetX = particlesGeometry.attributes.position.array[i3]; // X座標を取得

    // Y座標をサイン波に基づいて変更
    particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(
      elapsedTime + offsetX
    );
  }

  // ジオメトリの位置属性が更新されたことを Three.js に通知
  particlesGeometry.attributes.position.needsUpdate = true;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```
