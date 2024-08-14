// * addEventListenerの演習問題
// addEventListenerの練習をしましょう。
// 2個のボタンを用意し、IDをそれぞれ'hello'と'goodbye'にしています。
// それぞれのボタンにクリックイベントが発生したときのイベントハンドラを定義してください。

// helloボタンがクリックされたときにはconsole.logに'hello'を出力してください
const helloButton = document.querySelector("#hello");
helloButton.addEventListener("click", () => {
  console.log("hello");
});

// goodbyeボタンがクリックされたときにはconsole.logに'goodbye'を出力してください
const goodbyeButton = document.querySelector("#goodbye");
goodbyeButton.addEventListener("click", () => {
  console.log("goodbye");
});
// addEventListenerを使ってください！
