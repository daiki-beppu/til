// * フォームイベントの演習問題
// フォームとフォームイベントの練習をしましょう！
// 買い物リストを作るフォームをindex.htmlに用意しています。

// 商品を入力する<input>と、数量を入力する<input>が置かれています。
// また、追加した項目を表示するための<ul>も用意しています。以下の実装を行ってください：

// フォームのsubmitイベントのイベントハンドラを定義
// フォームがsubmitされたときに、preventDefaultでイベントのデフォルトの動作を抑制
// 商品名と数量をinputのvalueから取得
// 新しい<li>を作り、<li>の中のテキストには商品名と数量を含める

// <ul>に、新しい項目を追加する（appendChildを使用）
// inputの中身をクリア

// 注意点：
// Udemyの演習問題ではappend()のようなモダンな構文が使えません
// フォームのDOMはformという変数に代入してください（解答のチェックに必要です）。
// あらかじめapp.jsに用意していますので編集しないでください

// 下の行は編集しないでください！
const form = document.querySelector("form");

// この下にコードを書いてください
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const productNameInput = form.elements.product;
  const qtyInput = form.elements.qty;
  addNewProduct(productNameInput.value, qtyInput.value);
  productNameInput.value = "";
  qtyInput.value = "";
});

const addNewProduct = (productName, qty) => {
  const newLi = document.createElement("li");
  newLi.innerText = `${productName} ✕ ${qty}`;
  const ul = document.querySelector("#list");
  ul.appendChild(newLi);
};
