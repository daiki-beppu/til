// * 続・Stringメソッドの演習問題
// wordという変数を用意して、値には'skateboard'という文字列を代入しています。
// この問題のゴールは、最終的にwordの文字列を'beard'に変換することです。

// Stringのメソッドを使って'skateboard'から'board'を抽出しましょう（sliceメソッドが使えます）
// 'board'の中の'o'を'e'に置換しましょう（replaceメソッドが使えます）

// 結果をfacialHairという変数に代入してください

// 【注意】facialHairという変数に直接'beard'を代入するようなインチキはしないでください！

// * 用意された変数
const word = "skateboard";

// ここから書く
const facialHair = word.slice(5).replace("o", "e");
console.log(facialHair);
