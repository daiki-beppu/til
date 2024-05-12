# CSS セレクターについて

## CSS セレクターとは

どの HTML タグにスタイルを当てるか指定すること
HTML タグだけではなくクラスや ID も指定することができる

### クラスをセレクターと ID セレクター

クラスセレクター `.クラス名` で指定
ID セレクター `#ID名` で指定

```CSS

記述例
/* fooクラスを指定 */
.foo {
  color: white;
  background-color orange:
}

/* ID barを指定 */
#bar {
  font-size 20px;
  font-weight: bold;
}

```

### 子孫セレクター,隣接セレクター,直下セレクター

親要素にある HTML タグやクラスなどを詳細に指定することも可能

子孫セレクター `スペース区切り` で指定
隣接セレクター `+` で指定
直下セレクター `>` で指定

子孫セレクターは子要素 "すべて" を指定
隣接セレクターは同じ親要素の子要素同士で "直後" の要素を指定
直下セレクターはある要素の "直下" にある要素を指定

```css

記述例
/* goku クラスの子要素 gohan を指定 */
.goku gohan {
  color: orange;
}

/* 同じ goku クラスの子要素同士である gohan の直下の goten を指定 */
.goku gohan + goten {
  font-family: Saiyan-Sans;
}

/* vegeta の直下にある nappa を指定 */
vegeta > nappa {
  hight 200px;
}

```

### 属性セレクター

HTML の属性を指定することもできる
属性セレクター `[]` で指定

```css

記述例

/* type 属性が text の要素を指定  */
input[type="text"] {
  background-color: orange;
  width 100px;
}

```

### カスケードについて

記述する順番が **"超大事"**
CSS ではあとに書かれた記述を優先する

```css
記述例

h1 {
  color; red;
}

h1 {
  color:orange;
}

/* この場合、文字色はorangeになる */
```

### 詳細度について

複数のスタイルが競合した場合
｢より｣その要素と関係があるセレクターのスタイルを優先する

**優先順位**
ID >クラス,属性,擬似クラス > 要素,疑似要素

## 疑似クラス

選択された要素に対して特定の状態であることを示すためのもの

- ホバーしたとき `:hover`
- n 番目の要素に対して `:nth-child()`

```css
記述例

/*companyクラス に ホバーしたとき */
.company:hover {
  color: black;
}

/* 2番目の div に対して */
div:nth-child(2) {
  background-color: red;
}

偶数番目、奇数番目も指定できる

/* 偶数番目 引数にeven  */
div:nth-child(even) {
  background-color: red;
}

/* 奇数番目 引数にodd  */
div:nth-child(odd) {
  background-color: red;
}
```
