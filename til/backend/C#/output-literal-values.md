---
title: output-literal-values
date: 2024/09/07
updated: 2024/09/07
---

# リテラル値の出力

- [リテラル値とは](#リテラル値とは)
- [さまざまなリテラル データ型の出力](#さまざまなリテラル-データ型の出力)
  - [文字リテラル (char 型)](#文字リテラル-char-型)
  - [文字列リテラル (string 型)](#文字列リテラル-string-型)
  - [整数リテラル (int 型)](#整数リテラル-int-型)

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
