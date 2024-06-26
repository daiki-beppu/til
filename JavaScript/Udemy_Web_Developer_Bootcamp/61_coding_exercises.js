// * inputイベントの演習問題
// inputイベントを使ってみましょう！
// index.htmlに<h1>と<input type="text">要素を用意しています。
// index.htmlには変更を加えずに次の要件を満たす実装をapp.jsに書いてください：

// h1は'Enter Your Username'というテキストを初期値にします（既にしています）
// inputイベントが<input>要素で発火するたびに、<h1>の中身が'Welcome, 'と、現在のinputの値になるようにします
// もし<input>の値が空になった場合には、<h1>の中を'Enter Your Username'に戻します

// 注意：GIFアニメーションを見るとわかるように、inputに入力をするたびにリアルタイムにh1をアップデートしています
// 使うのはinputイベントで、changeイベントではないことに注意してください。わからない人は直前の講義を見直しましょう！

const input = document.querySelector("#username");

input.addEventListener("input", () => {
  const h1 = document.querySelector("h1");
  if (input.value.length !== 0) {
    h1.innerText = `Welcome, ${input.value}`;
  } else {
    h1.innerText = "Enter Your Username";
  }
});
