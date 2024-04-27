# if 文について

if 文は条件を分岐させたいときに使う
例えば
生年月日が一致していたら"Happy Birth Day!!"を出力
一致しなかったら"Your not Birth Day"と出力

```JavaScript

記述例

const birthdayYear = 1996;
const birthdayMonth = 12;
const birthday = 28;

if (birthdayYear == 1996 && birthdayMonth == 12 && birthday == 28) {
  console.log("Happy Birth Day!!");
} else {
  console.log("Your not Birth Day");
}


```

この場合、生年月日は一致しているので
Happy Birth Day!!と出力される

また、複数の条件がある場合は else if を使う

先程のコードに 12 月生まれの場合 "your birthday month same !"と出力する記述を追加してみる

```javascript

記述例

const birthdayYear = 1996;
const birthdayMonth = 12;
const birthday = 28;

if (birthdayYear == 1996 && birthdayMonth == 12 && birthday == 28) {
  console.log("Happy Birth Day!!");

//ここから
} else if (birthdayYear == 1996 && birthdayMonth == 12) {
  console.log("your birthday month same !");

//ここまでが追加したコード
} else {
  console.log("Your not Birth Day");
}

```
