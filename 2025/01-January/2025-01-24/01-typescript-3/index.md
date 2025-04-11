---
date: 2025-01-24 22:02
title: typescript-3
number: 01
labels: [typescript]
topics: [js/]
---

## 💡 学んだことの要約

- JavaScriptのプリミティブ型と各型の特徴
- TypeScriptでのプリミティブ型の実装方法
- nullとundefinedの使い分け

## 📝 詳細

### 背景

### 内容

プリミティブ型について

JavaScript にはプリミティブ型とオブジェクト型(複合型)がある

> プリミティブとは
>
> JavaScript において、プリミティブ (primitive、プリミティブ値、プリミティブデータ型) はオブジェクトでなく、メソッドを持たないデータのことです。 7 種類のプリミティブデータ型があります。
>
> [_引用元: MDN Web Docs 用語集 > Primitive_](https://developer.mozilla.org/ja/docs/Glossary/Primitive)

プリミティブ型は以下の 7 つのものを指す

- string: 文字列
- number: 数値
- boolean: 真偽値
- null: 存在しないもの
- undefined: 未定義
- bigint: 非常に大きい数値
- symbol: 一意のプロパティキーをオブジェクトに追加するためによく使用される

bigint と symbol は使ったことないしまだ使ってるのを見たこともない

オブジェクト型はプリミティブ型以外のすべてをオブジェクト型

<details>
<summary>サンプルコード(クリックで開く)</summary>

```ts
// プリミティブ型: boolean
const isCat: boolean = true; // 真偽値 (true または false) のみ

// プリミティブ型: string
const text: string = '可愛い'; // 文字列のみ

// プリミティブ型: number
const legsCount: number = 4; // 数値のみ

// プリミティブ型: null
const foo: null = null; // null のみ

// プリミティブ型: undefined
const bar: undefined = undefined; // undefined のみ
```

</details>

null 型と undefined 型の使い分け

null 型: 現在利用できない状態を表す型
undefined 型: 初期化されていない状態の型

null は目地的に使えない状態を強く表したいときに使用
undefined は 暗黙的な状態を示すときに使用

TypeScript 公式では `Do not use null`
null を使ってはいけないとなっている

自分もこれに習って null 派で行いこうと思う

ただ null のほうが便利なときや null じゃないといけない場面もあるので臨機応変に
特に API で json を返すときは null が使われる

基本は null でも undefined でも大丈夫なように知識をつけておくのが重要

### ハマったポイント

## 🔍 気づき・感想

プリミティブ型 については C# の学習時にある程度学んだ記憶があるので
復習になって良かった

null と undefined の使い分けについてはよくわかってなかったので
公式が null を使うなとしているなど勉強になった
ただ、実務で見るコードは null がほとんどだった印象

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
