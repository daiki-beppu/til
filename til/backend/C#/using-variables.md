---
title: using-variables
date: 2024/09/12
updated: 2024/10/03
---

# 変数の使用方法

こちらの記事は`C#`を`JavaScript`を触ったことがある人向けにまとめた内容となっています。

- [変数の宣言](#変数の宣言)
  - [JavaScript との違い](#javascript-との違い)
- [変数の呼び出し](#変数の呼び出し)
  - [JavaScript との違い](#javascript-との違い-1)
- [変数の上書き(再代入)](#変数の上書き再代入)
  - [JavaScript との違い](#javascript-との違い-2)

## 変数の宣言

`C#`の変数宣言は以下のように行います。

```text
データ型 変数名 = 値;
```

```csharp
// C# での記述
string myName = "Daiki Beppu"; // 同じデータ型のみ再代入可
```

```csharp
string myName; // 初期化なしの宣言も可能
myName = "Daiki Beppu"; // 後から値を代入することができる
```

### JavaScript との違い

`JavaScript`は動的型付け言語なのでデータ型の指定を行こなわず
変数名の前に`const`や`let`といった宣言ステートメントを記述します。

※ `var` については基本的に不使用が推奨されているので以後、記述しません

```js
// JavaScript での記述
const myName = "Daiki Beppu"; // データに関係なく再宣言、再代入不可
let myName = "Daiki Beppu"; // データに関係なく再宣言不可、再代入可
```

> [!NOTE]
>
> 📝 **Memo**
>
> 変数の命名規則について
>
> 命名規則は`C#` も `JavaScript`も同様`キャメルケース(camelCase)`

## 変数の呼び出し

変数の呼び出しは以下のように行います。

```csharp
string myName = "Daiki Beppu";

Console.WriteLine(myName);
```

```text
// 出力結果
Daiki Beppu
```

### JavaScript との違い

特になし

## 変数の上書き(再代入)

変数の上書き(再代入)は以下のように行う

```csharp
string myName = "Daiki Beppu";
myName = "momochico";

myName = 27; //

Console.WriteLine(myName);
```

```text
// 出力結果
momochico
```

```csharp
string myName = "Daiki Beppu";
myName = 27; // データ型が違うのでエラーが発生

Console.WriteLine(myName);
```

```text
error CS0029: 型 'int' を 'string' に暗黙的に変換できません

ビルドに失敗しました。ビルド エラーを修正して、もう一度実行してください。
```

### JavaScript との違い

`JavaScript`はデータ型が異なる場合でも再代入可能です。
また`let`を使用する場合のみ再代入可能となります。(`const`は不可)

```js
let myName = "Daiki Beppu";
myName = 27; // JavaScript ではエラーにならない
```
