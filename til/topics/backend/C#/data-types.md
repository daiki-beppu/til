---
title: data-types
date: 2024/10/12
updated: 2024/10/29
---

# データ型について

- [数値のデータ型](#数値のデータ型)
- [文字、文字列のデータ型](#文字文字列のデータ型)
- [真偽値のデータ型](#真偽値のデータ型)

## 数値のデータ型

数値のデータ型は以下の通り()内は有効範囲

> [!NOTE]
>
> すべてのデータ型を記述しているわけではない

**整数値**

- byte: 8bit 符号なし整数 (`0 から 255`)
- sbyte: 8bit 符号付き整数 (`-128 から 127`)
- short: 16bit 符号付き整数 (`-32,768 から 32,767`)
- ushort: 16bit 符号なし整数 (`0 から 65,535`)
- int: 32bit 符号付き整数 (`-2,147,483,648 から 2,147,483,647`)
- uint: 32bit 符号なし整数 (`0 から 4,294,967,295`)
- long: 64bit 符号付き整数 (`-9,223,372,036,854,775,808 から 9,223,372,036,854,775,807`)
- ulong 64bit 符号なし整数 (`0 から 18,446,744,073,709,551,615`)

```csharp
// byte
byte goodNum = 250; // OK
byte errorNum = -100; // コンパイルエラー: 負の値は使用できません

// sbyte
sbyte goodNum = -100; // OK
sbyte errorNum = 250; // コンパイルエラー: 値が大きすぎます

// short
short goodNum = 250; // OK
short errorNum = 70_000; // コンパイルエラー: 値が大きすぎます

// ushort
ushort goodNum = 30_000; // OK（原文の-30_000は負の値なのでエラーです）
ushort errorNum = 70_000; // コンパイルエラー: 値が大きすぎます

// int
int goodNum = 400_000; // OK
int errorNum = 4_000_000_000; // コンパイルエラー: 値が大きすぎます

// uint
uint goodNum = 4_000_000_000; // OK
uint errorNum = -1; // コンパイルエラー: 負の値は使用できません

// long
long goodNum = 8_000_000_000_000_000; // OK
long errorNum = 10_000_000_000_000_000; // OK（この値はlong型の範囲内です）

// ulong
ulong goodNum = 10_000_000_000_000_000; // OK
ulong errorNum = -1; // コンパイルエラー: 負の値は使用できません
```

**浮動小数点数値**

- float: 32bit 単精度浮動小数点数 (有効桁数 7 桁)
- double 64bit 倍精度浮動小数点数 (有効桁数 15 桁)
- decimal: 28 ~ 29 桁の有効桁数を持ち 128bit の正確な 10 進数

```csharp
float piApprox = 3.14f; // fサフィックスを使用
double piMorePrecise = 3.14159265359; // デフォルトでdouble型
decimal preciseDecimal = 3.14159265359m; // mサフィックスを使用

// 使用例
float circleArea = piApprox * radius * radius;
double moreAccurateArea = piMorePrecise * radius * radius;
decimal financialCalculation = preciseDecimal * (decimal)amount;
```

## 文字、文字列のデータ型

文字、文字列のデータ型は以下の通り

- char
- string

```csharp
char firstLetter = 'A'; // 単一の文字（シングルクォートで囲む）
string greeting = "Hello, World!"; // 文字列（ダブルクォートで囲む）

// 使用例
char initial = firstName[0];
string fullName = firstName + " " + lastName;
```

## 真偽値のデータ型

- bool: true(真) または false(偽)

```csharp
bool isUserLoggedIn = true;
bool isConnectionSecure = false;

// 使用例
if (isUserLoggedIn && isConnectionSecure)
{
    // セキュアな操作を実行
}
```
