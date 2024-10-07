# 配列について

## 配列の作り方

```JavaScript

記述例
// 空の配列を作成
const array = []

// あらかじめデータを入れておくともできる
const array = [1, 2, 3]

// NumberでもStringでも入れれる
const array = [1, 2, 3, "one", "two", "three" ]

// もちろん、Booleanも入れれる
const array = [1, 2, 3, "one", "two", "three", true, false]

// 配列の中に配列も入れれる
const array = [
  [1, 2, 3],
  ["one", "two", "three"]
  ]

// 実はオブジェクトも入れれる
const array = [
  1, 2, 3,
  "one", "two", "three",
  true, false,
  { foo: "bar"
    hoge: "huga"
  }]

```

## 配列の中身を取り出す

```JavaScript

const array = [1, 2, 3];

array[0];
// 1

配列にないとインデックスを指定すると
array[99]
// エラーにならずにundefinedが返ってくる

配列の中に配列がある場合
const array = [
  [1, 2, 3],
  ["one", "two", "three"],
];

array[0][1]
// 1

array[1][2]
// "three"

```

## 要素の中身を上書き

```JavaScript

記述例

const array = [1, 2, 3];

array[0] = "one"
// ["one", 2, 3]

配列にないインデックスを指定すると
array[99] = 100
// エラーにはならずに間にemptyが入る
// [1, 2, 3, <96 empty items>, 100]

```

## 配列の操作

- 配列の要素(中身の数)を数える `length`

- 配列の｢最後｣に要素を追加 `push()`
- 配列の｢最後｣の要素を削除 `pop()`

- 配列の｢先頭｣に要素を追加 `unshift()`
- 配列の｢先頭｣の要素を削除 `shift()`

- 配列を切り取って取り出す
  `slice (開始インデックス, 終了インデックス(省略可))`

- 配列の要素を置き換える
  `splice (開始インデックス, 削除したいインデックス(省略可), 追加したい要素(省略可))`

```JavaScript

記述例

const array = [1, 2, 3, "one", "two"];

// 配列の要素を数える
array.length;
// 5

// 配列の｢最後｣に要素を追加
array.push("three");
// [1, 2, 3, "one", "two", "three"]

// 配列の｢最後｣の要素を削除
array.pop();
// [1, 2, 3, "one"]

// 配列の｢先頭｣に要素を追加
array.unshift(0);
// [0, 1, 2, 3, "one", "two"]

// 配列の先頭の要素を削除
array.shift();
// [1, 2, 3, "one", "two"]

// 配列を切り取って取り出す
array.slice(2, 4);
// [ 3, 'one' ]

// 配列の要素を置き換える
array.splice(2, 4);
//[ 3, 'one', 'two' ]

```
