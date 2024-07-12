# リアルなレンダリング

- [リアルなレンダリング](#リアルなレンダリング)
  - [トーンマッピング](#トーンマッピング)
  - [アンチエイリアシング](#アンチエイリアシング)

## トーンマッピング

トーンマッピングは HDR 画像 を LDR 画像 に変換する処理
Three.js のトーンマッピングは、HDR 画像を通常のディスプレイで表示するために使用する、これにより非常にリアルなレンダリングを可能が可能になる。

トーンマッピングを変更するにはレンダラーの`toneMapping` プロパティを更新します。

- `NoToneMapping` (デフォルト)
- `LinearToneMapping`
- `ReinhardToneMapping`
- `CineonToneMapping`
- `ACESFilmicToneMapping`

完成イメージ

<a href="https://gyazo.com/d182d7701d8188ce1640eac45ee31e28"><img src="https://i.gyazo.com/d182d7701d8188ce1640eac45ee31e28.gif" alt="Image from Gyazo" width="989"/></a>

```js
// トーンマッピングを変更
renderer.toneMapping = THREE.ACESFilmicToneMapping;

// デバッグ UIの追加
gui.add(renderer, "toneMapping", {
  No: THREE.NoToneMapping,
  Linear: THREE.LinearToneMapping,
  Reinhard: THREE.ReinhardToneMapping,
  Cineon: THREE.CineonToneMapping,
  ACESFilmic: THREE.ACESFilmicToneMapping,
});
```

**NoToneMapping (デフォルト)**

[![Image from Gyazo](https://i.gyazo.com/db77af5e152f9a1cadae5276a3fdd9dc.png)](https://gyazo.com/db77af5e152f9a1cadae5276a3fdd9dc)

**LinearToneMapping**

[![Image from Gyazo](https://i.gyazo.com/a2f1f78905089aa60638ba2864b42d3c.png)](https://gyazo.com/a2f1f78905089aa60638ba2864b42d3c)

**ReinhardToneMapping**

[![Image from Gyazo](https://i.gyazo.com/7730f2d5b84075b48824884cd4ead2aa.png)](https://gyazo.com/7730f2d5b84075b48824884cd4ead2aa)

**CineonToneMapping**

[![Image from Gyazo](https://i.gyazo.com/040ac986840c56d715496e493e52d4fe.png)](https://gyazo.com/040ac986840c56d715496e493e52d4fe)

**ACESFilmicToneMapping**

[![Image from Gyazo](https://i.gyazo.com/42494a0ebfae341944d8541927f794cb.png)](https://gyazo.com/42494a0ebfae341944d8541927f794cb)

`toneMappingExposure`プロパティでシーンに入る光の量を調整

完成イメージ

<a href="https://gyazo.com/75e89404fa582187aa935ffaabea3f98"><img src="https://i.gyazo.com/75e89404fa582187aa935ffaabea3f98.gif" alt="Image from Gyazo" width="1000"/></a>

```js
// シーンに入る光の量を調整
renderer.toneMappingExposure = 2; // デフォルトは 1
```

## アンチエイリアシング

アンチエイリアシングとは、ジオメトリのエッジなどで見られる、階段状のギザギザを滑らかにする技術です。これにより、滑らかで自然な表現が可能になります。

簡単な解決策の 1 つは、`SSAA(スーパーサンプリング) または FSAA(フルスクリーンサンプリング)`と呼ばれる方法です。

シーン全体を通常の解像度よりも高い解像度、例えば 2 倍の解像度でレンダリングします。その高解像度の画像を通常のサイズに縮小すると、縮小の際に、レンダリングされた複数のピクセル（例えば、4 つのピクセル）から各ピクセルの色を平均化します。これにより、ジャギーが滑らかになります。

レンダリングするピクセル数が多くなるので、パフォーマンに問題が発生する可能性がある。

もう 1 つの解決策は `MSAA(マルチサンプリング)`と呼ばれる方法です。
シーン全体ではなくジオメトリのエッジのみを高解像度でレンダリングします。
最新の GPU ではマルチサンプリングアンチエイリアシングを実行でき、Three.js はセットアップを自動的に処理します。

アンチエイリアシングを有効にするにはレンダラーの`antialias`プロパティを`true`に設定します。

```js
// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,

  // アンチエイリアシングを有効化
  antialias: true,
});
```
