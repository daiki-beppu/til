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

## preventDefault メソッド

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

## input イベント change イベント

input イベントを使うと input に入力された値を
リアルタイムで表示したりすることができる

change イベントも同様

```JavaScript

記述例

// input イベントを使って h1 のテキストをinput に入力された値にする
const input = document.querySelector("input");

// input の値を取ってきてh1に変更を加える
input.addEventListener("input", () => {
  const h1 = document.querySelector("h1");
  if (input.value.length !== 0) {
    h1.innerText = `${input.value}`;
  } else {
    h1.innerText = "なにか入力してください";
  }
});

```

## イベントのバブリング

ある場所でイベントが発火した際に上にイベントが伝達されていく性質のこと

**例**
親要素にクリックイベントがあり子要素にもクリックイベントがある場合
子要素のクリックイベントが発火した際に親要素のクリックイベントも発火する

### 意図しないバブリング

ボタンをクリックすると文字が消えるイベントが親要素にあり
子要素にはボタンクリックしたときに背景色を変化させるイベントがある場合
子要素のボタンをクリックしたときに親要素のクリックイベントも発火してしまうため
意図しない挙動になってしまう

こうした意図しないバブリングを無効化するメソッドが
`stopPropagation`

```JavaScript

記述例

// 意図しないバブリングを無効化

const button = document.querySelector("button");

button.addEventListener("click", (event) => {
  event.stopPropagation()
})

```

## イベントデリゲーション

イベント処理を他の要素に委譲する処理

```JavaScript
// イベントデリゲーションが必要な一例

// li をクリックしたときに削除する機能
const lis = document.querySelectorAll("li");

for (let li of lis) {
  li.remove();
}

// この場合あとから追加したliにはremoveが適応されない
// そのためul に削除する機能をデリゲーションする

// さっきのコードはコメントアウトして
/* const lis = document.querySelectorAll("li");

 for (let li of lis) {
  li.remove();
}
*/

// 新しくコードを書き直す
const ul = document.querySelector("ul");

ul.addEventListener("click", (event) => {
  event.target.remove();
});

// target には実際にクリックされた要素が入っている
```

こうすることであとから追加された li 要素も削除することができる！
