// 論理演算子ANDの演習問題
// 条件文をあらかじめ用意し、mysteryという変数も用意してあります。
// この、mysteryの値を編集して、'正解！'がログに出力されるようにしてください。mysteryの値以外のコードは編集しないでください。

const mystery = 'Ppppp7'; //この値を編集して、条件がtrueになるようにしましょう

// 下のコードは編集しないでください
if(mystery[0] === 'P' && mystery.length > 5 && mystery.indexOf('7') !== -1){
    console.log("正解！");
}
