# 条件分岐について

条件分岐の方法

- if 文
- switch 文

## if 文の書き方

生年月日が一致していたら"Happy Birth Day!!"を出力
一致しなかったら"Your not Birth Day"と出力

```JavaScript

"基本構文"

if (条件式) {
  // 条件式がtrueのときに実行される
  実行したい文
}

```

```JavaScript

"記述例"

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

また、複数の条件がある場合は `else if` を使う

先程のコードに 12 月生まれの場合 "your birthday month same !"と出力する記述を追加してみる

```javascript
"記述例";

const birthdayYear = 1996;
const birthdayMonth = 12;
vv;
const birthday = 28;

if (birthdayYear === 1996 && birthdayMonth === 12 && birthday === 28) {
  console.log("Happy Birth Day!!");

  //ここから
} else if (birthdayYear === 1996 && birthdayMonth === 12) {
  console.log("your birthday month same !");
  //ここまでが追加したコード
} else {
  console.log("Your not Birth Day");
}
```

## switch 文の書き方

```JavaScript

"基本構文"

switch (式) {
  case 値1 :
  // 値1 === 式 の場合に実行
    実行したい文
  // break がない場合 これ以降の文をすべて実行
    break;

  case 値2 :
    // 値2 === 式 の場合に実行
    実行したい文
    break;
}

```

```JavaScript

"記述例"

switch ((birthdayYear, birthdayMonth, birthday)) {
  case 1996 && 12 && 28:
    console.log("Happy Birth Day!!");
    break;
  case 1996 && 12:
    console.log("your birthday month same !");
    break;
  default:
    console.log("Your not Birth Day");
    break;
}

```
