// * for...ofの演習問題
// for...ofを実際に使ってみましょう。numbersという配列を用意しています。for...ofループを使って、それぞれの数字を2乗した値（その数字自身を乗算）をconsole.logで出力してください。

// 注意：

// Udemyの演習問題ではべき乗で使う**演算子は使えません

// whileやforループでも実装できますが、この演習問題ではfor...ofを使うようにしましょう

// 出力結果は下のようになります：

// 1
// 4
// 9
// 16
// 25
// 36
// 49
// 64
// 81

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //この行は編集しないでください

// ここから下にコードを書いてください
for (let num of numbers) {
  let exponentiation = num * num;
  console.log(exponentiation);
}
