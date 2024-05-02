# デフォルトパラメーターについて

関数のパラメーターにはデフォルトの値をあらかじめ設定しておくことができる

```JavaScript

記述例

const happyBirthDay = (person, birthday = "12月28日") => {
  return `${birthday}: ${person}！ 誕生日おめでとう！`;
};

// パラメーターにpersonしか指定してなくてもデフォルトの値が出力される
console.log(happyBirthDay("大貴"));
// 12月28日: 大貴！ 誕生日おめでとう！

// 複数のデフォルトを設定することもできる

const happyBirthDay = (person = "大貴", birthday = "12月28日") => {
  return `${birthday}: ${person}！ 誕生日おめでとう！`;
};

// 引数に何もなくてもデフォルトの値が出力される
console.log(happyBirthDay());

```
