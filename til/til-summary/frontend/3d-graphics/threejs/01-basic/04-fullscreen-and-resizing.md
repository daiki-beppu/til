# フルスクリーンとサイズ変更

- [フルスクリーンとサイズ変更](#フルスクリーンとサイズ変更)
  - [canvas をビューポートに合わせる](#canvas-をビューポートに合わせる)
  - [フルスクリーンをサポートする](#フルスクリーンをサポートする)
    - [addEventListener でダブルクリックイベントを監視](#addeventlistener-でダブルクリックイベントを監視)
    - [すでにフルスクリーンになっているかを確認する](#すでにフルスクリーンになっているかを確認する)
    - [フルスクリーンへの切り替えと終了](#フルスクリーンへの切り替えと終了)


## canvas をビューポートに合わせる

```diff js

// pxで固定するのではなく

// * Sizes
const sizes = {
-  width: 1200px,
+  width: window.innerWidth,

-  height 800px
+  height: window.innerHeight,
};

```

これだとブラウザのデフォルトのスタイルがあたっていたり
スクロールバーが表示されたりするので

CSS ファイルに以下の記述をすることで解決

```css
* {
  * {
    margin: 0;
    padding: 0;
  }

  .webgl {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
  }
  html,
  body {
    overflow: hidden;
  }
}
```

これだとサイズが変わったときにサイズが更新されないので
更新する処理を追加する必要がある

```js
window.addEventListener("resize", () => {
  // サイズの更新
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // 投影行列を再計算
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // ピクセル比を指定
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
```

なぜピクセル比を指定するのか
主な理由はパフォーマンスを維持するため

ピクセル比が 1 → 2 に増えるだけでレンダリング数は 2 _ 2 の 4 倍
2 → 3 に増えると 3 _ 3 の 9 倍増加する

多くの場合 2 以上のピクセル比を必要としないのもあり
ピクセル比を指定しておいたほうがよい

## フルスクリーンをサポートする

フルスクリーンでないときダブルクリックをしたらフルスクリーンになるように
フルスクリーンの場合フルスクリーンが終了するように制御

### addEventListener でダブルクリックイベントを監視

```js
window.addEventListener("dblclick", () => {
  console.log("ダブルクリック！");
});
```

### すでにフルスクリーンになっているかを確認する

`document.fullscreenElement`を使用する

```js
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    console.log("go fullscreen");
  } else {
    console.log("leave fullscreen");
  }
});
```

### フルスクリーンへの切り替えと終了

`requestFullscreen`を使用する

フルスクリーンにするためにはどの要素をフルスクリーンにするのか指定する必要がある今回は canvas タグをフルスクリーンにしたいので`canvas.requestFullscreen()`と記述をする

終了する場合は`document.exitFullscreen`を使用する

```js
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
```
