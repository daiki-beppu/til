# マウスでカメラを制御する

## JavaScript の機能のみで実装

### マウスの座標を取得する

```js
// * Cursor
window.addEventListener("mousemove", (event) => {
  console.log(`x座標: ${event.clientX}`, `Y座標: ${event.clientY}`);
});
```

[![Image from Gyazo](https://i.gyazo.com/7d0e9ee96298765c1b1159e107ad54a1.gif)](https://gyazo.com/7d0e9ee96298765c1b1159e107ad54a1)

### 値を調整して使用する(必須ではないが役立つ)

```js
//canvas内の座標を -0.5 〜 0.5 の間で表示する

const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  console.log(`x座標: ${event.clientX}`, `Y座標: ${event.clientY}`);
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});
```

### 座標のデータを使ってカメラを制御

```js
const tick = () => {
  camera.position.x = cursor.x * 5;
  camera.position.y = cursor.y * 5;
  camera.lookAt(mesh.position);

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
```

[![Image from Gyazo](https://i.gyazo.com/bf47f2372f12db7ad6faba44b976d5d3.gif)](https://gyazo.com/bf47f2372f12db7ad6faba44b976d5d3)

### 更にいい感じにする方法

```js
// メッシュの周囲でカメラをきれいに回転させる

camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
camera.position.y = cursor.y * 5;
```

## 【簡単】Three.js で用意されている機能で実装

OrbitControls を使用した方法で解説

### OrbitControls をインポートする

```js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
```

### OrbitControls クラスから変数をインスタンス化

```js
// * Controls
const controls = new OrbitControls(camera, canvas);
```

[![Image from Gyazo](https://i.gyazo.com/40ff6defc1d1e9b84510183999cd969e.gif)](https://gyazo.com/40ff6defc1d1e9b84510183999cd969e)

これだけでマウスでカメラを制御することができます！
