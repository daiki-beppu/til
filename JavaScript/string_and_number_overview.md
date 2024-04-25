# JavaScript における文字列と数値について

文字列 + 文字列で連結することができる

```javascript
console.log("ゴムゴムの" + "バズーカ！");
// 出力は ゴムゴムのバズーカ！
```

数値 + 数値で計算することができる

```javascript
足し算 + console.log(100 + 10);
// 110

引き算 - console.log(100 - 10);
// 90

掛け算 * console.log(10 * 10);
// 100

割り算 / console.log(100 / 10);
// 10

あまりの計算 % console.log(10 % 3);
// 1
```

文字列と数値を + しようとした場合は？
**数値が文字列と認識される**

```javascript
例;
console.log(100 + "10");
//出力は10010となる
```
