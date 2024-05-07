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

// クリックするたびにランダムで文字色が変わる
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
