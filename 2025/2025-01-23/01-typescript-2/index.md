---
date: 2025-01-23 21:19
title: typescript-2
number: 01
labels: [typescript]
topics: [ts/]
---

## 💡 学んだことの要約

## 📝 詳細

### 背景

### 内容

`TypeScript` の方の付け方について

型推論
`TypeScript` 側で自動で型を推論してくれる

```ts
const name = 'momochan';

// const name: "momochan"
```

型アノテーション
プログラマーが明示的に型を指定する

```ts
// string 以外はエラーになる
const age: number = 10;
```

型アサーション
`as 〇〇` で型を上書きする

あとから型が変わってしまうのは嬉しくないので基本的には使用しないのが吉

```ts
const animal: { type: string } = {};

// これだとエラー
// プロパティ 'name' は型 '{}' にありませんが、型 '{ name: string; }' では必須です。

const cat: { name: string } = {} as { name: string };
```

それぞれの使い分け
基本はチームの方針によるところだが、個人的な型アノテーションでゴリゴリ書いていくのがいいと思う
理由は補完が効き、タイポなどの間違いが減るから
せっかく `TypeScript` 使ってんだから明示的に書くでしょって感じかな

### ハマったポイント

## 🔍 気づき・感想

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
