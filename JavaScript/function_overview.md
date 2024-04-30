# 関数について

関数とは自分で作るメソッドのこと
関数は再利用可能であり、必要なときに呼び出すことができる

```JavaScript

基本構文

// 関数の定義
function 関数名(パラメーター) {
  // 実行したい処理
}

// 関数の呼び出し
関数名();

```

> [!IMPORTANT]
> パラメーターとは引数から受け取る値のことで引数ではない

```JavaScript

記述例

// 関数の定義
function callHelloWorld() {
  console.log("Hello World");
}

// 関数の呼び出し
callHelloWorld();

```

```JavaScript

記述例

// 引数がある場合

// 引数で受け取った文字列の長さを調べる関数
// 関数の定義
function calcLength(str) {
  console.log(str.length);
}
// 10

// 関数の呼び出し
calcLength("JavaScript");

// パラメーターは1つじゃなくてもいい
function sum(x, y) {
  console.log(x + y);
}

sum(3,4);
// 7
sum(12345, 6789);
// 19134

```
