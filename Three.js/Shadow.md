# 影について

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
