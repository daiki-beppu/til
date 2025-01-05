---
date: 2025-01-06
time: 07:04:20
title: react-with-nextjs-3
number: 01
labels: [react]
topics: [js/devtools]
---

## 💡 学んだことの要約

React / Next.js の続き

### 内容

`CSS Modules` を使うことで `CSS` の管理が楽になる
とくに命名の衝突を避けるのに有効

同じ名前を複数使用してもお互いに影響なく使い分ける事ができる
他にも解決する手法はいろいろある

- `CSS in JS` (ライブラリを用いる方法)
- `Tailwind CSS` (CSS フレームワークを用いる方法)

`CSS Modules` は `React` などで実装しようとするとけっこう大変らしい
だが Next.js には `built in` (備え付け)されているので非常に使いやすい

`React` では `class` ではなく `className` を使用する

`Home.module.css` は絶対にクラスセレクターでなければならない

`CSS Modules` も `React` と同様にコンポーネント思考で分けるほうがいい

<details>
<summary>リファクタリング(クリックで開く)</summary>

ディレクトリ構造とmodule.css をコンポーネントそれぞれに分割

```
.
├── README.md
├── jsconfig.json
├── next.config.mjs
├── package.json
├── public
│   ├── favicon.ico
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src
│   ├── components
│   │   ├── Footer
│   │   │   ├── Footer.module.css
│   │   │   └── index.jsx
│   │   ├── Header
│   │   │   ├── Header.module.css
│   │   │   └── index.jsx
│   │   ├── Headline
│   │   │   ├── Headline.module.css
│   │   │   └── index.jsx
│   │   ├── Links
│   │   │   ├── Links.module.css
│   │   │   └── index.jsx
│   │   └── Main
│   │       ├── Main.module.css
│   │       └── index.jsx
│   ├── pages
│   │   ├── _app.js
│   │   ├── _document.js
│   │   ├── about.jsx
│   │   ├── api
│   │   │   └── hello.js
│   │   └── index.jsx
│   └── styles
│       ├── Home.module.css
│       └── globals.css
└── yarn.lock
```

</details>

index.jsx を使用することでディレクトリ名を参照したとき
まずは index.jsx を探してくれるので無駄にパスが長くならなくてすむ

書いてみて思ったのは VSCode 上だとどのディレクトリの index.jsx なのかわかりにくいかもしれない
一応タブのところにパスが記述されているからわからなくはないが慣れの問題かもしれない

### ハマったポイント

## 🔍 気づき・感想

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
