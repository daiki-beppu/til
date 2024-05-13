# CSS プロパティについて

CSS プロパティとは
適用する CSS スタイルの種類のこと

## 文字色の変更

文字色の変更は `color` プロパティを使う

color プロパティの記述方法は 3 種類で

- あらかじめ CSS が用意しているカラー名を指定する
- RGB で指定する
- RGB を 16 進数で表現して指定する

RGB で指定するほうがより細かく色の調整ができる
RGB の各値は 0〜255 で表現する
16 進数で指定する場合、一部を省略することもできる

```css
記述例

/* カラー名を指定 */
h1 {
  color: red;
}

/* RGBで指定 */
h1 {
  /* rgb (r, g, b) */
  color: rgb(255, 0, 0);
}

/* RGBを16進数で表現  */
h1 {
  color: #ff0000;

  /* 省略することもできる */
  color: #f00;
}
```

## 背景色の変更

背景色の変更は `background-color` を使う
色の指定は color プロパティと同様

```css

記述例

/* カラー名で指定 */
h1 {
  background-color: blue
}

 /* RGBで指定 */
h1 {
     /* rgb (r, g, b) */
  background-color: rgb(0,0,255)

}

 /* RGBを16進数で表現 */
h1 {
   background-color: #0000ff;
}
```

## 文字の装飾

文字に色々と装飾することができる

- 文字の大きさ `font-size`
- 文字の太さ `font-weight`
- フォントの種類 `font-family`
- 右,中央,左揃え `text-aline`
- 下線を引いたり、消したり `text-decoration`
- 大文字にしたり、小文字にしたり `text-transform`

他にもたくさんのことができる
詳しくは[MDN CSS を参照](https://developer.mozilla.org/ja/docs/Web/CSS)

```css

記述例

h1 {
  font-size: 100px;
  font-weight: bold;  /* 数字で指定することもできる */
  font-family: sans-serif;
  text-aline: center;  /* 中央揃え */
  text-decoration: under-line solid  /* 下線 solid は実線のこと none にすると削除 */
  text-transform: uppercase  /* 大文字にする */
}

```
