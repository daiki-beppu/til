// * Stringメソッドの演習問題
// Stringのメソッドを使ってみましょう。index.jsにmessageという変数を用意しました。
// messageに定義されている値を変えることなく、messageの文字を小文字に変換した値をwhisperという変数に入れてください。
// また、このときに文字列の両端の空白はすべて取り除いてください。
// これを実現するためには、さきほど習ったばかりのメソッドを2つ使います。メソッドは繋げて書くことができるということもお忘れなく！

// * 用意された変数
const message = "    TASTE THE RAINBOW!  ";

// ここから書く
const whisper = message.toLowerCase().trim();
console.log(whisper);
