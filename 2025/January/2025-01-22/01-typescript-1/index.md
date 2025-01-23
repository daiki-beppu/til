---
date: 2025-01-22 20:50
title: typescript-01
number: 01
labels: [typescript]
topics: [ts]
---

## 💡 学んだことの要約

## 📝 詳細

### 背景

React の基礎はある程度学んだので次は `TypeScript` を学んでいく
仕事でももちろん使っているし `TypeScript` の理解を深めてもいいのではないかと言われたのもある

### 内容

なぜ `TypeScript` が必要なのか？

型を明示的に記述することで

- バグが発生しにくいコードになる
- エディターの補完が強力なものになる
- ホバーすることでドキュメント的な役割も果たしてくれる

`TypeScript` を実際に使えるようにする設定について

設定が必要な理由
ブラウザ側では `TypeScript` を実行するための環境がない
なので `TypeScript` を `JavaScript` に変換する必要がある

まずは `TypeScript` をインストールする

```shell
yarn add -D typescript

-- -D は --dev と同じ
-- devDependencies に追加するという意味
```

`tsconfig.json` を作成する

```shell
./node_modules/.bin/tsc --init

```

`.ts` ファイルをコンパイルする

```shell
./node_modules/.bin/tsc ファイル名

```

次は `Next.js` で `TypeScript` を用いた開発の準備

```shell
yarn create next-app --typescript
```

### ハマったポイント

## 🔍 気づき・感想

React, Next.js が一段落して
いよいよ本格的に TypeScript を学ぶ事ができる！

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
