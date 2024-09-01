# アニメーションを付与する

- [アニメーションを付与する](#アニメーションを付与する)
  - [アニメーションをフレームレートに適応](#アニメーションをフレームレートに適応)
    - [daltaTime を使用する方法](#daltatime-を使用する方法)
    - [Three.js の Clock 変数を使用する方法](#threejs-の-clock-変数を使用する方法)
  - [オブジェクト以外にもアニメーションは付与できる](#オブジェクト以外にもアニメーションは付与できる)
  - [ライブラリを使ったアニメーション](#ライブラリを使ったアニメーション)


アニメーションを付与するには
`requestAnimationFrame`を関数内で実行する必要がある
引数には関数を渡す必要がある

```js
const animation = () => {
  mesh.position.x += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
};
```

これだけだと関数を呼び出していないので何も表示されない！

```js
const animation = () => {
  mesh.position.x += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
};
// 関数を呼び出すのを忘れずに！
animation();
```

これでオブジェクトが右に移動するアニメーションを付与することができた！

[![Image from Gyazo](https://i.gyazo.com/6e78ccd0b0cc8f403195846ac4b47d94.gif)](https://gyazo.com/6e78ccd0b0cc8f403195846ac4b47d94)

ただこれだと PC やディスプレイの性能等に依存する
FPS(フレームレート)によって移動速度が変化するので
こちらで適応させる必要がある

## アニメーションをフレームレートに適応

### daltaTime を使用する方法

まず Tick(ティック)という用語を知る必要があります

Tick(ティック)とは アニメーションの更新や計算が行われる瞬間のことで
各ティックごとにアニメーションの状態が更新される

アニメーションをフレームレートに適応させるには
最後にティックからどれくらい時間が経過したかを知る必要がある

そこで`Date.now()`を使い時間を測定する

```js
// 現在のタイムスタンプを取得
const time = Date.now();
```

ここで必要なのは現在のタイムスタンプから前のフレームのタイムスタンプの差`deltaTime`を取得し
アニメーションを付与するときの値に`deltatime`を使用します
この`deltaTime`を使用することでフレームレートに関係なく一定の速度を保つことができる

> [!NOTE]
> deltaTime は「前回の更新（ティック）から現在の更新までに経過した時間」を表します。

```js
const tick = () => {
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  mesh.rotation.y += 0.001 * deltaTime;

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
```

[![Image from Gyazo](https://i.gyazo.com/085e8136aa8775e290a2a9ead9ecfd24.gif)](https://gyazo.com/085e8136aa8775e290a2a9ead9ecfd24)

### Three.js の Clock 変数を使用する方法

deltaTime よりも簡単な方法です！

アニメーションを付与する関数の外で Clock 変数をインスタンス化

```js
const clock = new THREE.Clock();
```

```js
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  mesh.rotation.y = elapsedTime;

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
```

[![Image from Gyazo](https://i.gyazo.com/69facdc3fe8af43615a3555f73d521c3.gif)](https://gyazo.com/69facdc3fe8af43615a3555f73d521c3)

## オブジェクト以外にもアニメーションは付与できる

カメラの位置をアニメーションで動かす

```js
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  camera.position.x = Math.cos(elapsedTime);
  camera.position.y = Math.sin(elapsedTime);
  //   camera.lookAt(mesh.position);

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
```

動きではわかないがオブジェクトが動いているのではなくカメラが動いている

[![Image from Gyazo](https://i.gyazo.com/c2ac6590fc7c4123caacb0c9c6c4135d.gif)](https://gyazo.com/c2ac6590fc7c4123caacb0c9c6c4135d)

## ライブラリを使ったアニメーション

ライブラリを使うことでとっても簡単にアニメーションを付与できる！

ここでは GSAP というライブラリを紹介します

`npm install gsap`でインストール

```js
// gsap
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

// Animation
const tick = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
```

[![Image from Gyazo](https://i.gyazo.com/cd7ed1b09d52a6ae9d285c25c3c0a780.gif)](https://gyazo.com/cd7ed1b09d52a6ae9d285c25c3c0a780)
