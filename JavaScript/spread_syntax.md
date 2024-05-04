# スプレッド構文について

スプレッド構文とは配列やオブジェクトなどの列挙可能なオブジェクトを展開するときに使う
展開したい列挙可能なオブジェクトの前に `...` を記述する

```JavaScript

記述例

// 配列のコピーを作成
const array = [1, 2, 3, 4];

console.log(...array);
// 1 2 3 4

// 配列を展開した値を配列に入れている
const newArray = [...array];

console.log(newArray);
// [ 1, 2, 3, 4 ]

// concatを使わない配列の連結
const numArray = [1, 2, 3, 4];
const strArray = ["one", "two", "three", "four"];

const newArray = [...numArray, ...strArray];
console.log(newArray);
// [ 1, 2, 3, 4, 'one', 'two', 'three', 'four' ]

```

オブジェクトの要素を複製するときにも使える

```JavaScript

記述例

// オブジェクトの要素を複製
const lastYearProfile = {
  name: "daiki",
  birthday: "12月28日",
  skills: ["HTML", "CSS",],
};

const twoYearAgoProfile = {
  name: "daiki",
  birthday: "12月28日",
  skills: ["HTML5", "CSS3", "JavaScript", "Ruby"],
  target: "webエンジニア",
};

const currentProfile = {
  ...lastYearProfile,
  ...twoYearAgoProfile,
};

console.log(currentProfile);
/*
{
  name: 'daiki',
  birthday: '12月28日',
  skills: [ 'HTML', 'CSS', 'JavaScript', 'Ruby' ],
  target: 'webエンジニア'
}
*/


```

> [!TIP]
> 破壊的メソッド:`push` `pop` などを
> 使いたくない場合などにも使用する

## レスト構文について

レスト構文とは引数をまとめて渡すための構文

> [!WARNING] > `...パラメーター`
> スプレッド構文と同じ記述に見えるが逆の動きをするので注意！
