---
title: output-literal-values
date: 2024/09/07
updated: 2024/09/12
---

# リテラル値の出力

- [リテラル値とは](#リテラル値とは)
- [さまざまなリテラル データ型の出力](#さまざまなリテラル-データ型の出力)
  - [文字リテラル (char 型)](#文字リテラル-char-型)
  - [文字列リテラル (string 型)](#文字列リテラル-string-型)
  - [整数リテラル (int 型)](#整数リテラル-int-型)
  - [浮動小数リテラル (float, double, decimal 型)](#浮動小数リテラル-float-double-decimal-型)

## リテラル値とは

リテラル値とは、決して変わることのない定数値のこと。

## さまざまなリテラル データ型の出力

- 文字リテラル (char 型)
- 文字列リテラル (string 型)
- 整数リテラル (int 型)
- 浮動小数リテラル (float, double, decimal 型)
- Boolean リテラル (bool 型)

### 文字リテラル (char 型)

単一の英数字のみを出力する場合は 1 つの英数字を`''(シングルクォーテーション)`で囲むことで文字リテラルを作成できる

```csharp
Console.WriteLine('b');
```

```text
// 出力結果
b
```

次の場合、エラーが発生

```csharp
Console.WriteLine('Hello World');
```

```text
// 出力結果
error CS1012: 文字リテラルに文字が多すぎます
```

### 文字列リテラル (string 型)

複数の文字(文字列として)出力する場合は、`""(ダブルクォーテーション)`で囲むことで文字列リテラルを作成できる

```csharp
Console.WriteLine("Hello World");
```

```text
// 出力結果
Hello World
```

### 整数リテラル (int 型)

数値の整数(小数点を含まない)値にはなにもつけないで記述する

```csharp
Console.WriteLine(123);
```

```text
// 出力結果
123
```

### 浮動小数リテラル (float, double, decimal 型)

浮動小数点数を表すデータ型は 3 つあります。

- float 型 (有効桁数 6-9桁)
- double 型 (有効桁数 15-17桁)
- decimal 型 (有効桁数 28-29桁)

`decimal > double > float`の順で正確

`float`リテラル は数値の後に`F`を追加し記述する
この`F`はリテラルサフィックスと呼ばれ、 `float`型の値を使用することをコンパイラに指示する役割を持つ。

`float`の場合は 小文字の`f`または大文字の`F`のいずれかを使用することができる。

```csharp
Console.WriteLine(0.25F);
```

```text
0.25
```

予期しない計算エラーを回避する場合に、固定少数部の値は `float` 使用することがおすすめ
