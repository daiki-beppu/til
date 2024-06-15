# 影について

- [影について](#影について)
  - [影の表示](#影の表示)
    - [ライトを設定する](#ライトを設定する)
    - [影を有効にする](#影を有効にする)
    - [castShadow を有効にする](#castshadow-を有効にする)
    - [receiveShadow を有効にする](#receiveshadow-を有効にする)
  - [シャドウマップの最適化](#シャドウマップの最適化)
    - [shadow.mapSize](#shadowmapsize)
    - [shadow.camera](#shadowcamera)
    - [カメラヘルパー](#カメラヘルパー)
    - [shadow.radius](#shadowradius)
    - [影がベイクされたテクスチャを使用する](#影がベイクされたテクスチャを使用する)
    - [テクスチャを使って動的に影を動かす](#テクスチャを使って動的に影を動かす)


オブジェクトにある影を**コアシャドウ**と呼ぶ
今回はオブジェクトが他のオブジェクトに影を生成する**ドロップシャドウ**を設定する

## 影の表示

影を表示するには以下の手順で行います。

1. ライトを設定する
2. 影を有効にする
3. `castShadow` を有効にする
4. `receiveShadow` を有効にする

完成イメージ
[![Image from Gyazo](https://i.gyazo.com/3b1c436a4a57a14049cc95fc2dd2d7e7.png)](https://gyazo.com/3b1c436a4a57a14049cc95fc2dd2d7e7)

### ライトを設定する

```js
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(2, 2, -1);
scene.add(directionalLight);

// 影を落とす設定 (影の投影する) デフォルトは false
directionalLight.castShadow = true;
```

### 影を有効にする

影を表示するためにシャドウマップを有効にする必要がある。

```js
// シャドウマップを有効にする
renderer.shadowMap.enabled = true;

// シャドウマップの品質設定
renderer.shadowMap.type = THREE.PCFShadowMap;
```

**その他の品質設定**

- `BasicShadowMap`
  ハイパフォーマンスで低品質
- `PCFShadowMap`
  パフォーマンスはやや劣るが、輪郭が滑らか
- `PCFSoftShadowMap`
  さらにパフォーマンスは劣るが、輪郭がより滑らか
- `VSMShadowMap`
  フォーマンスが低く、制約が多く、予期しない結果が生じる可能性がある

### castShadow を有効にする

`castShadow` はオブジェクトが影を投影するためのプロパティ

```js
// 影を落とす設定 (影の投影する) デフォルトは false
sphere.castShadow = true;
```

### receiveShadow を有効にする

`receiveShadow` はオブジェクトに影を描画するためのプロパティ

```js
// 影を受け取る (影を描画する) 設定 デフォルトは false
plane.receiveShadow = true;
```

## シャドウマップの最適化

以下のプロパティを設定してシャドウマップを最適化していく

- `shadow.mapSize` 影の解像度を設定
- `shadow.camera` 影を生成するカメラの設定
- `shadow.radius` 影のぼかしを設定

### shadow.mapSize

`shadow.mapSize` は影の解像度(レンダリングサイズ)を設定するプロパティ。

影のディティールや品質を制御するために使用する。

影の解像度は影がどれだけシャープに見えるか、どれだけ細かいディテールを表現できるかに影響します。

状況に合わせて適切に解像度を設定することでパフォーマンスの向上につながる

```js
// 影の解像度を設定 デフォルトは 512
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

// 設定する値は2の累乗である必要がある
```

デフォルト (512 \* 512)の場合
[![Image from Gyazo](https://i.gyazo.com/5d70140c41a84e1b00dafc5ae36a417c.png)](https://gyazo.com/5d70140c41a84e1b00dafc5ae36a417c)

解像度を上げた( 1024 \* 1024) 場合

[![Image from Gyazo](https://i.gyazo.com/025622c4b4cdae530fc5b0bc45be885c.png)](https://gyazo.com/025622c4b4cdae530fc5b0bc45be885c)

更に上げた (2048 \* 2048)場合

[![Image from Gyazo](https://i.gyazo.com/de6e43aa0639f3ed8ee9052ab48b838f.png)](https://gyazo.com/de6e43aa0639f3ed8ee9052ab48b838f)

### shadow.camera

`shadow.camera` は ライトの影を計算するためのカメラを設定するプロパティ。

影を投影する範囲や影の細かさを調整するために使用する。

影が見切れていたり、うまく表示されていない場合はカメラを調整すると解決することも多い

```js
// 影の生成範囲を制御
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 5;
```

### カメラヘルパー

カメラヘルパーを使って影のカメラを可視化することができる

これによってカメラの範囲が視覚的に表示されるので調整しやすくなり、設定が正しいか確認することができる

カメラヘルパーを表示する手順は

1. カメラヘルパーをインスタンス化
2. シーンにカメラヘルパー追加

```js
// directionalLight のカメラヘルパー

// カメラヘルパーをインスタンス化
const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);

// シーンに追加
scene.add(directionalLightCameraHelper);
```

```js
// visible プロパティで表示を切り替えることができる

// カメラヘルパーを非表示
directionalLightCameraHelper.visible = false;
```

[![Image from Gyazo](https://i.gyazo.com/fcf5860adf686c5c7b814743435b7107.png)](https://gyazo.com/fcf5860adf686c5c7b814743435b7107)

### shadow.radius

`shadow.radius` 影の輪郭にぼかしを設定するプロパティ

影の輪郭をぼかすことでよりリアルな表現ができるようになる

```js
// 影のぼかしを設定
directionalLight.shadow.radius = 10; // デフォルトは 1
```

若干、影の輪郭がぼける

[![Image from Gyazo](https://i.gyazo.com/8b9d9647b4e32ee2725cccf6ed6e30d7.png)](https://gyazo.com/8b9d9647b4e32ee2725cccf6ed6e30d7)

### 影がベイクされたテクスチャを使用する

影がベイクされたテクスチャを使用することで影のレンダリングを計算しなくてすみパフォーマンスが向上する

```js
// シャドウマップを無効にする
renderer.shadowMap.enabled = false;

// テクスチャを読み込む
const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load("/textures/bakedShadow.jpg"); // 任意のテクスチャを使用する
bakedShadow.colorSpace = THREE.SRGBColorSpace;

//MeshStandardMaterialをMeshBasicMaterialをに変更

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  new THREE.MeshBasicMaterial({
    map: ,
  })
);
```

[![Image from Gyazo](https://i.gyazo.com/23130b034364f985b79362c08fc72533.png)](https://gyazo.com/23130b034364f985b79362c08fc72533)

ただし、オブジェクトを動かす場合に影はついてこなくなる

[![Image from Gyazo](https://i.gyazo.com/7bc0160917ae226f070af8e970ef4dc3.png)](https://gyazo.com/7bc0160917ae226f070af8e970ef4dc3)

### テクスチャを使って動的に影を動かす

```js
const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadow,
  })
);
sphereShadow.rotation.x = -Math.PI * 0.5;

sphereShadow.position.y = plane.position.y + 0.01;
// + 0.01 は pleanと被ってしまうとGPUがどちらを表示したらいいかわからなくなりバグが発生するため

scene.add(sphere, sphereShadow, plane);
```

```js
//アニメーションの追加
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //  球体の更新
  sphere.position.x = Math.cos(elapsedTime) * 1.5;
  sphere.position.z = Math.sin(elapsedTime) * 1.5;
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

  //   影の更新
  sphereShadow.position.x = sphere.position.x;
  sphereShadow.position.z = sphere.position.z;
  sphereShadow.material.opacity = (1 - Math.abs(sphere.position.y)) * 1;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

[![Image from Gyazo](https://i.gyazo.com/04cfb515f2c0100c21e05b146b06918e.gif)](https://gyazo.com/04cfb515f2c0100c21e05b146b06918e)
