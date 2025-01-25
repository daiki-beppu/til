---
date: 2025-01-25 12:38
title: typescript-4
number: 01
labels: [typescript]
topics: [js/]
---

## 💡 学んだことの要約

## 📝 詳細

- TypeScriptのリテラル型について理解した。
- `const`宣言時にはリテラル型が推論されるが、`let`宣言時にはそうならない。

### 背景

### 内容

`Literal Types` (リテラル型) について

プリミティブ型の特定の値だけを指定するのを `Literal Types` (リテラル型 ) という

変数宣言時の型推論について

const で 定義すると自動で `Literal Types` として推論される
let の場合は 対応するプリミティブ型が推論される

<details>
<summary>サンプルコード(クリックで開く)</summary>

```ts
// リテラル型: boolean
const bool: true = true; // true のみ

//  リテラル型: string
const gender: male | female = 'male'; // male か female のみ

// リテラル型: number
const num: 1 = 1; // 1 のみ
```

</details>

`Literal Types` (リテラル型) を使用するメリットは
エディター(VSCode)の補完が効くようになりタイポをなくしたり、意図しない入力などを制限する事ができる

```ts
const gender: 'male' | 'female' = 'male';
```

### ハマったポイント

## 🔍 気づき・感想

この書き方はよく使のでちゃんと理解できたのが良かった

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
