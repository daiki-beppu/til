// Code implementation

// "trailingComma"
// es5
const object = {
  a: 1,
  b: 2, // ← 最後のカンマ
};

function method(
  param1,
  param2 // 関数パラメータにはつけない
) {
  // ...
}

// none
const object1 = {
  key1: "value1",
  key2: "value2", // カンマなし
};

const array = [
  "item1",
  "item2", // カンマなし
];

// all
const object2 = {
  key1: "value1",
  key2: "value2", // すべての末尾にカンマ
};

function method(
  param1,
  param2 // 関数パラメータにもカンマ（ES5では非対応）
) {
  // ...
}

// "singleQuote": true
const text = "hello world"; // シングルクォートを使用

// "semi": true

const value = 28; // セミコロンあり

// printWidth = 80

// 80文字を超える行は自動的に改行されます
// 改行前（長い1行）
const obj1 = {
  name: "John",
  age: 30,
  description: "これは非常に長い説明文で、80文字を超えると自動的に改行されます",
};

// 改行後（Prettierによる整形）
const obj2 = {
  name: "John",
  age: 30,
  description: "これは非常に長い説明文で、80文字を超えると自動的に改行されます",
};
