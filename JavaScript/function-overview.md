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

## 関数式について

関数式とは変数に代入する関数のこと

```JavaScript

基本構文

const 変数名 = function (パラメーター) {
  // 実行したい処理
};

// 関数式は関数名を省略することができる

```

```JavaScript

記述例

// 変数を宣言して関数を代入している
const multiplication = function (x, y) {
  console.log(x * y);
};

// 変数を呼び出し
multiplication(12, 28);
// 336

```

## アロー関数について

アロー関数とは関数式を省略した記法のこと

```JavaScript

基本構文

const 変数名 = (パラメーター) => {
  // 実行したい処理
};

// 関数式で記述した場合
const 変数名 = function (パラメーター) {
  // 実行したい処理
};

// 基本は function を => に変えているだけ
```

> [!TIP]
> アロー関数のアローとは `=>` が矢印(arrow)に見えることが由来

```JavaScript

記述例

// 関数式をアロー関数で記述
const remainder = (x, y) => {
  console.log(x % y);
};

// 変数の呼び出し
remainder(123, 45);
// 33

// 関数式で記述した場合
const remainder = function(x, y) {
  console.log(x % y);
};

```

## 高階関数について

高階関数とは関数を操作するための関数
関数を引数として受け取るか関数を戻り値として返す関数のこと

```JavaScript

記述例

// 関数を実行する関数
function executeFunction(f) {
  f();
}

// 関数を返す関数
function returnFunction() {
  return function greet () {
    console.log("Hello")
  }
}

```

## コールバック関数について

コールバック関数とは他の関数に引数として関数を渡す関数

```JavaScript

記述例

function callBackFunction() {
  return () => {
    console.log("callBack!");
  };
}

```

### コールバック関数を用いたメソッド

- 配列の要素を取り出して新しい配列を返す `map`
- 配列の要素を順番に取り出す `forEach`
- 配列の要素で条件に合うものだけを取り出し新しい配列を返す `filter`
- 配列の要素を使い最終的な 1 つの値を計算する `reduce`
- 配列の要素が｢すべて｣が条件に合うものか調べる `every`
- 配列の要素が｢1 つでも｣条件に合うものがあるか調べる `some`
- 指定した時間(ミリ秒)後に実行する `setTimeout`
- 指定した時間(ミリ秒)後に繰り返実行する `setInterval`

---

配列の要素を取り出して新しい配列を返す `map`

```JavaScript

記述例 // mapメソッド

const array = [123, 456, 789];

// 配列の要素をすべて2倍にする関数
const double = array.map((num) => {
  return num * 2;
});

console.log(double);
// [ 246, 912, 1578 ]

```

配列の要素で条件に合うものだけを取り出し新しい配列を返す `filter`

```JavaScript

記述例 // filterメソッド

const array = [123, 456, 789];

// 500以下の数値だけの配列を作る関数
const lessThan500 = array.filter((num) => {
  return num < 500;
});

console.log(lessThan500);
// [ 123, 456 ]

```

配列の要素を使い最終的な 1 つの値を計算する `reduce`

```JavaScript

記述例 // reduceメソッド

const array = [123, 456, 789];

// 配列内の最小値を求める関数
const min = array.reduce((min, num) => {
  if (num > min) {
    return min;
  } else {
    return num;
  }
});

console.log(min);
// 123

```

配列の要素が｢すべて｣が条件に合うものか調べる `every`

```JavaScript

記述例 // everyメソッド

const array = [123, 456, 789];

// 値がすべて100以上か調べる関数
const allOver100 = array.every((num) => {
  return num >= 100;
});

console.log(allOver100);
// true
```

配列の要素が｢1 つでも｣条件に合うものがあるか調べる `some`

```JavaScript

記述例 // someメソッド

const array = [123, 456, 789];

// 値が1000以上の要素があるか調べる関数
const checkOver1000 = array.some((num) => {
  return num >= 1000;
});

console.log(checkOver1000);
// false
```

指定した時間(ミリ秒)後に実行する `setTimeout`

```JavaScript

記述例 // setTimeoutメソッド

const greet = "Hello";
// 3秒後にHelloを出力する関数
const late3second = greet.setTimeout(() => {
  console.log("Hello");
}, 3000);

```

指定した時間(ミリ秒)後に繰り返実行する `setInterval`

```JavaScript

記述例 // setTimeoutメソッド

const greet = "Hello";
// 5秒後にHelloを繰り返し出力する関数
const late3second = greet.setTimeout(() => {
  console.log("Hello");
}, 5000);

```
