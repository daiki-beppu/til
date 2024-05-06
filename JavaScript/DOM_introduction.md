# DOM 入門

DOM とは Document Object Model の略で
HTML の要素を取得や操作するために使う

DOM は Web ページを JavaScript で表現したもので
Web ページ と JavaScript を接続する
要するに JavaScript で扱えるオブジェクトの集まりのこと

## DOM で要素を取得する

`getElementBy` を用いた方法

- id 要素を取得 `document.getElementById`
- クラスを取得 `document.getElementsByClassName`
- HTML タグを取得 `document.getElementsByTagName`

```JavaScript

記述例

// id要素を取得
const id = document.getElementById("id");

// クラスを取得
const class = document.getElementsByClassName("className")

// HTML タグを取得
const htmlTag = document.getElementsByTagName("tagName")

```

`querySelector` を用いた方法

- CSS セレクターのように取得(最初に一致した 1 つの要素)
  `document.querySelector`
- CSS セレクターのように取得(一致したすべての要素)
  `document.querySelectorAll`

```JavaScript

記述例

// 最初に一致した要素を取得
const h1 = document.querySelector("h1");
// 引数は文字列でないといけない

// 一致するすべての要素を取得
const imgAll = document.querySelectorAll("img");

```

## DOM を操作する

- テキストの操作 `innerText`
- HTML 要素の操作 `innerHTML`

```JavaScript

記述例

// p タグの中身を JavaScript に変更
const p = document.querySelector("p");
p.innerText = "JavaScript";


// p タグの中に a タグを追加
const p = document.querySelector("p");
p.innerHTML = '<a href="#">リンク</a>';

```

- 属性の操作 `.src`, `.alt`

```JavaScript

記述例

//imgタグのsrcとaltを変更

const img = document.querySelector("img");
img.src = "test.png";
img.alt = "テスト画像";


```

- スタイルの変更 `.style.CSSプロパティ`

```JavaScript

記述例

// div タグのスタイルにwidth 150px background-color 50% を追加
const div = document.querySelector("div")
div.style.width = "150px"
div.style.backgroundColor = "coral"

```

> [!WARNING]
> JavaScript でスタイルを変更する場合はケバブケース(background-color)ではなくキャメルケース(backgroundColor)なので注意！

- クラスの付与 `classList.add`
- クラスの除去 `classList.remove`
- クラスの付与、除去の反転 `classList.toggle`

```JavaScript

記述例

// square クラスの付与
const img = document.querySelector("img");
img.classList.add("square");

// クラスの除去
const img = document.querySelector("img");
img.classList.remove("square");

// クラスの付与、除去の反転
const img = document.querySelector("img");
img.classList.toggle("square");

```

- HTML 要素の作成 `document.createElement()`
- HTML 要素を指定した要素の末尾に挿入 `append`
- HTML 要素を子要素の末尾に挿入 `appendChild`

```JavaScript

記述例

// button タグの作成
const newButton = document.createElement("button");

// button タグを main タグの末尾に挿入
const newButton = document.createElement("button");
document.main.append(newButton);

// button タグを 親要素である div タグの末尾に挿入
const newButton = document.createElement("button");
const div = document.querySelector("div");
div.appendChild(newButton);

```
