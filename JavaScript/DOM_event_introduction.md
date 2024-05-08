# DOM イベント入門

DOM イベントとはユーザーのアクションによって
自動的に何らかのコードが実行されるようにするためのもの

**イベントの一例**

- 特定の要素をクリック
- キーボードのキーを押す、離す
- フォームに送信される

なんらかのイベントにアクションを付与するためのメソッドが
`addEventListener`

```JavaScript

// クリックするたびにpタグの要素の文字色がランダムで変わる
const p = document.querySelector("p");

const randomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r} ${g} ${b})`;
};

p.addEventListener("click", () => {
  p.style.color = randomColor();
});

// p や color を他の要素やCSSプロパティに変更しても使える

```

## preventDefaultメソッド

フォーム内のボタンをクリックしたときの挙動は
サーバーへフォームを送信しようとする

この挙動だとボタンを押してフォームの内容をページ内で表示させたい場合に
思った挙動にならなかったり、毎回すべてがリロードされユーザー体験が著しく低下する

これを防ぐために`preventDefault`を使う

`preventDefault`はその要素がデフォルトで持っている挙動を無効化する

```JavaScript

記述例

const formButton = document.querySelector("from button");

// フォームのボタンが持っているデフォルトの挙動を無効化
formButton.preventDefault()

```



