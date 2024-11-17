---
title: number-representation-Errors
date: 2024/11/17
updated: 2024/11/17
---

# 数の表現と誤差

- [浮動小数点数による数の表現](#浮動小数点数による数の表現)
- [固定小数点数による数の表現](#固定小数点数による数の表現)
- [誤差の表現](#誤差の表現)
  - [桁あふれ誤差 (Overflew Error)](#桁あふれ誤差-overflew-error)
  - [情報落ち (Loss of Significance)](#情報落ち-loss-of-significance)
  - [打切り誤差 (Truncation Error)](#打切り誤差-truncation-error)
  - [桁落ち (Cancellation Error)](#桁落ち-cancellation-error)
  - [丸め誤差 (Rounding Error)](#丸め誤差-rounding-error)

## 浮動小数点数による数の表現

浮動小数点数は以下の 3 つの部分で構成されます：
IEEE754 32bit で表示する場合

- 符号部 (1 ビット)
- 指数部 (8 ビット)
- 仮数部 (23 ビット)

例:

```js
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false

// 適切な比較方法
function nearlyEqual(a, b, epsilon = Number.EPSILON) {
  return Math.abs(a - b) < epsilon;
}
console.log(nearlyEqual(0.1 + 0.2, 0.3)); // true

// 特殊な値;
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
console.log(Number.MIN_VALUE); // 5e-324
console.log(Number.POSITIVE_INFINITY); // Infinity
console.log(Number.NEGATIVE_INFINITY); // -Infinity
console.log(Number.NaN); // NaN
```

## 固定小数点数による数の表現

固定小数点数の特徴

- 小数点の位置が固定
- 整数部と小数部のビット数が決まっている
- 表現できる範囲は限られるが、計算が高速

```js
class FixedPoint {
  constructor(value, scale = 2) {
    this.scale = scale;
    this.value = Math.round(value * Math.pow(10, scale));
  }

  add(other) {
    return new FixedPoint(
      (this.value + other.value) / Math.pow(10, this.scale),
      this.scale
    );
  }

  toString() {
    return (this.value / Math.pow(10, this.scale)).toFixed(this.scale);
  }
}

const a = new FixedPoint(1.23);
const b = new FixedPoint(4.56);
console.log(a.add(b).toString()); // "5.79"
```

## 誤差の表現

- 桁あふれ誤差: コンピューターが扱える最大値または最小値を超えること
- 情報落ち: 絶対値の大きい値と小さい値の加算または減算で絶対値の小さい値の計算が反映されないこと
- 打切り誤差: 計算処理を途中で打ち切ることで生じる誤差
- 桁落ち: 絶対値の近い数値で差を求めたときに有効桁数が減ること
- 丸め誤差: 切り上げ、切り捨て、四捨五入によって生じる誤差

### 桁あふれ誤差 (Overflew Error)

```js
let max = Number.MAX_SAFE_INTEGER; //9007199254740991
console.log(max + 1 === max + 2); // true（桁あふれ誤差発生）

// 対策：BigIntの使用
let bigNum = BigInt(Number.MAX_SAFE_INTEGER);
console.log(bigNum + 1n === bigNum + 2n); // false
```

### 情報落ち (Loss of Significance)

```js
let large = 1e15;
let small = 1;
console.log(large + small - large); // 0（smallの情報が失われる）

// 対策：同じオーダーの数値をまとめて計算
let numbers = [1e15, 1e15, 1, 2, 3];
let sum = numbers
  .sort((a, b) => Math.abs(a) - Math.abs(b))
  .reduce((acc, val) => acc + val, 0);
```

### 打切り誤差 (Truncation Error)

```js
// 無限級数の近似計算例
function calculateE(terms) {
  let e = 1;
  let factorial = 1;
  for (let i = 1; i < terms; i++) {
    factorial *= i;
    e += 1 / factorial;
  }
  return e;
}
console.log(calculateE(10)); // 2.7182818011463845
```

### 桁落ち (Cancellation Error)

```js
// 問題のある実装
function badQuadratic(a, b, c, x) {
  return (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
}

// 改善された実装（数値的に安定）
function betterQuadratic(a, b, c, x) {
  let q = -(b + Math.sign(b) * Math.sqrt(b * b - 4 * a * c)) / 2;
  return q / a;
}
```

### 丸め誤差 (Rounding Error)

```js
// 金額計算での例
function badMoneyCalc(amount) {
  return amount * 0.1; // 税率10%
}

// より適切な実装
function betterMoneyCalc(amount) {
  return Math.round(amount * 0.1); // 整数に丸める
}
```
