# 分割代入について

分割代入とは配列の値やオブジェクトのプロパティを
個別に変数に代入することができる

```JavaScript

基本構文

// 配列の分割代入
[変数名] = 配列名

// オブジェクトの分割代入
{変数名} = オブジェクト名



```

```JavaScript

記述例

// 配列の分割代入

const array = [1, 2, 3];

// 分割代入を使わない場合
const x = array[0];
const y = array[1];
const z = array[2];

console.log(x, y, z);
// 1 2 3

// 分割代入を使うとかなりスッキリ書ける
const [x, y, z] = array;

// 分割代入の場合、左から順に代入される
console.log(x, y, z);
// 1 2 3

// x, y, その他 のようにに代入する事もできる
const array = [100, 200, 300, 400, 500, 600, 700, 800];

const [x, y, ...num] = array;

console.log(x, y, num);
// ...num の部分は配列になる
// 100 200 [ 300, 400, 500, 600, 700, 800 ]

// 値が一つでも配列になる
const array = [100, 200, 300,];

const [x, y, ...num] = array;

console.log(x, y, num);
// 100 200 [ 300 ]

```

```JavaScript

記述例

// オブジェクトの分割代入

const myCat = {
  name: "ももちゃん",
  color: "茶トラ",
  attribute: "very cute",
};

const { color, attribute } = myCat;

console.log(color, attribute);
// 茶トラ very cute

```

```JavaScript

記述例

// パラメーターの分割代入
const introduction = ({ name, color, attribute }) => {
  return `私の愛猫は${name}という名前で${color}ですそして${attribute}です`;
};

const myCat = {
  name: "ももちゃん",
  color: "茶トラ",
  attribute: "very cute",
};

console.log(introduction(myCat));
// 私の愛猫はももちゃんという名前で茶トラです。そしてvery cuteです

```
