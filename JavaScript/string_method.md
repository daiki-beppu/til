# String のメソッドについて

詳しくは[MDN JavaScript String を参照](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String)

## メソッドの呼び出し方法

String`.メソッド名(引数)`で呼び出す
メソッドによっては引数は省略することもできる

**引数が必要ないメソッド**

- 文字列の長さを返す `length`
- 大文字にして返す `toUpperCase()`
- 小文字にして返す `toLowerCase()`
- 文字列の両端から空白を取り除いて返す `trim()`

```JavaScript

記述例

// lengthメソッド
console.log("JavaScript".length);
// 10

//変数に対しても使える(以下も同様)
const color = "red"
console.log(color.length);
// 3

// toUpperCaseメソッド
console.log("hello world".toUpperCase());
// HELLO WORLD

// toLowerCaseメソッド
console.log("HELLO WORLD".toLowerCase());
// hello world

// trimメソッド
console.log("     JavaScript     ".trim());
// JavaScript

```

**引数が必要なメソッド**

- 文字列を検索して true か false を返す
  `includes(検索したい文字列)`
- 文字列を検索して 一致したインデックスを返す
  `indexOf(検索したい文字または文字列)`

> [!WARNING]
> indexOf は大文字の O で 0 ではない

```JavaScript

記述例

// includesメソッド
console.log("apple".includes("app"));
// true

console.log("JavaScript".includes("java"));
// false (大文字と小文字を区別しているため)

// indexOfメソッド
console.log("JavaScript".indexOf("J"));
// 0 (インデックスは0からなので1文字目は0)

console.log("JavaScript".indexOf("a"));
// 1 (最初に一致したインデックスのみが返ってくる)

console.log("JavaScript".indexOf("java"));
// -1 (一致しない場合は -1 がが返ってくる)



```
