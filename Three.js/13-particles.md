# パーティクル (粒子) について

- [パーティクル (粒子) について](#パーティクル-粒子-について)
  - [パーティクル (粒子) の作成](#パーティクル-粒子-の作成)
  - [パーティクル (粒子) をランダムに配置](#パーティクル-粒子-をランダムに配置)

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

// パーティクルを格納する配列を作成
const position = new Float32Array(count * 3);

// 各パーティクルは3つの値(x,y,z)を持つため、const * 3 のサイズの Float32Array を作成する
```

```js
// 配列 position に ランダムな値を設定
for (let i = 0; i < count * 3; i++) {
  position[i] = (Math.random() - 0.5) * 10; // -0.5 ~ 5 までの値を設定
}
```

```js
// パーティクルの位置をジオメトリに設定
particlesGeomettry.setAttribute(
  "position", // position 属性をジオメトリに設定
  new THREE.BufferAttribute(
    position, //属性に使用するデータを設定
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
const particles = new THREE.Points(particlesGeomettry, particlesMaterial);

// シーンに追加
scene.add(particles);
```
