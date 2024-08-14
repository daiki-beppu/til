# ループ処理について

ループ処理は同じことを反復して実行したいときに使う

JavaScript では主に

- `for`
- `while`

この 2 つを使用する

## for 文にの使い方

for 文は 条件式が true の間
実行したい処理を繰り返す

```JavaScript

基本構文

for (変数の初期化; 条件式; どのように変数を増減するか) {
  // 繰り返し実行したい処理
}

```

```JavaScript

記述例

// 1〜10 までを繰り返し出力する
for (let i = 1; i <= 10; i+= 1) {
  console.log(i);
/*
1
2
3
4
5
6
7
8
9
10
*/
}

// ネストして書くこともできる
// 1~3 までを10回くり返す
for (let i = 1; i <= 10; i+= 1) {
  for (let j = 1; j <= 3; j += 1) {
    console.log(j)
  }
}

// for の中に while も書ける(逆も然り)
let count = 0;
for (let i = 1; i <= 10; i += 1) {
  while (count >= 3) {
    console.log(count);
    count += 1;
  }
}



```

配列の要素を取り出して出力

```JavaScript

記述例

const skills = ["HTML", "CSS", "JavaScript", "Ruby"];

// for of を使う場合
for (const e of skills) {
  console.log(`私は${e}ができます`);
}

/*
私はHTMLができます
私はCSSができます
私はJavaScriptができます
私はRubyができます
*/

// forEach を使う場合
word.forEach((e) => {
  console.log(`私は${e}ができます`);
});

/*
私はHTMLができます
私はCSSができます
私はJavaScriptができます
私はRubyができます
*/

```

## while 文の使い方

while 文は 条件式が true の間
処理を繰り返す

```JavaScript

基本構文

let 変数名 = 初期値

while (条件式) {
  // 繰り返し実行した処理
}

```

```JavaScript

記述例

// 1〜10 までを繰り返し出力する
let i = 1;

while (i <= 10) {
  console.log(i);
  i += 1;
}

```

## for と while の使い分け

繰り返す回数がわかっている場合は for を使うことが多い
繰り返す回数がわからない場合に while を使うことが多い
