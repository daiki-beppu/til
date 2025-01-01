---
date: 2024-12-29
time: 16:05:43
title: Prettier-configuration-file-creation
tags: []
categories: []
---

# Prettier-configuration-file-creation Prettier の設定ファイル作成

## 💡 学んだことの要約

Prettier の設定ファイルの作成方法

## 📝 詳細

他の有名なプロジェクトの設定を参考に Prettier の設定ファイルの作成する

### 背景

- Prettier の設定ファイルを自分で作成したことがない
- 設定ファイルの理解
- 有名なプロジェクトの設定を知りたい

### 内容

まずはプロジェクトルートに `.prettierrc.json`ファイルを作成
こちらのファイルに記述していく

今回設定した項目

```json
{
  "trailingComma": "es5",
  "singleQuote": false,
  "semi": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto",
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "jsxSingleQuote": false
}
```

` "trailingComma": "es5"`(es5 に準拠)
末尾のコンマの設定
他には `none`(すべてなし), `all`(すべてあり) がある

```js
// es5

const object = {
  a: 1,
  b: 2, // ← 最後のカンマ
};

function method(
  param1,
  param2 // 関数パラメータにはつけない
) {
  // ...
}
```

```js
// none
const object = {
  key1: "value1",
  key2: "value2", // カンマなし
};

const array = [
  "item1",
  "item2" // カンマなし
];
```

```js
// all
const object = {
  key1: "value1",
  key2: "value2", // すべての末尾にカンマ
};

function method(
  param1,
  param2 // 関数パラメータにもカンマ（ES5では非対応）
) {
  // ...
}
```

`"singleQuote": true`(デフォルトは false)
シングルクォートの使用設定

```js
const text = "hello world"; // シングルクォートを使用
```

`"semi": true`(デフォルトは false)
セミコロン(;)の使用設定

```js
const value = 28; // セミコロンあり
```

`"printWidth": 80`
公式から 80 を超える設定は推奨されていないので注意

> _公式の日本語訳_
>
> 読みやすさを考慮して、80 文字を超える文字の使用はお勧めしません。
> コード スタイル ガイドでは、行の最大長のルールは 100 または 120 に設定されていることがよくあります。ただし、人間がコードを書くとき、すべての行で最大列数に達するように努めることはありません。開発者は、読みやすくするために、長い行を区切るために空白を使用することがよくあります。実際には、平均的な行の長さは、最大値を大幅に下回ることがよくあります。
>
> Prettier の printWidth オプションは同じようには動作しません。これは、許容される行の長さの上限を厳密に制限するものではありません。これは、Prettier に行をどのくらいの長さにしたいかを大まかに伝える方法です。Prettier は行を短くすることも長くすることもできますが、通常は指定された printWidth を満たすように努めます。
>
> 覚えておいてください、コンピューターは愚かです。コンピューターには何をすべきか明示的に指示する必要がありますが、人間は、たとえばいつ行を区切るかなど、独自の（暗黙の）判断を下すことができます。
>
> 言い換えると、printWidth を ESLint の max-len のように使用しないでください。これらは同じではありません。max-len は、許可される最大行長を指定しますが、一般的に推奨される長さ (printWidth で指定されるもの) は指定しません。
>
> [原文はこちら](https://prettier.io/docs/en/options#print-width)

```js
// 80文字を超える行は自動的に改行されます
// 改行前（長い1行）
const obj = {
  name: "John",
  age: 30,
  description: "これは非常に長い説明文で、80文字を超えると自動的に改行されます",
};

// 改行後（Prettierによる整形）
const obj = {
  name: "John",
  age: 30,
  description: "これは非常に長い説明文で、80文字を超えると自動的に改行されます",
};
```

`"tabWidth": 2`
タブサイズの設定

```js
function example() {
  // 2スペースでインデント
  const value = {
    prop: true,
  };
}
```

`"useTabs": false`

```js
// スペースを使用してインデント（タブ文字は使用しない）
function example() {
∙∙const value = true  // ∙はスペースを表します
}
```

`"bracketSpacing": true`
{}の内側にスペースを入れる

```js
// オブジェクトリテラルの括弧の内側にスペースを入れる
const obj = { key: value }; // スペースあり
const obj = { key: value }; // スペースなしの場合
```

`"bracketSameLine": false`
<>の最後を改行で表示する

```js
// false（デフォルト）の場合：
<button
  className="primary"
  onClick={onClick}
>
  Click me
</button>

// true の場合：
<button
  className="primary"
  onClick={onClick}>
  Click me
</button>
```

`"arrowParens": "always"`
アロー関数の () の使用設定

```js
// "always"（デフォルト）の場合：
const func = (x) => x;
const singleParam = (a) => a * 2;

// "avoid" の場合：
const func = (x) => x;
const singleParam = (a) => a * 2;
```

`"endOfLine": "lf"`
改行コードの設定

- lf: Unix系の改行コード（\n）
- Windows でも lf が推奨されている

`"embeddedLanguageFormatting": "auto"`

```js
// テンプレートリテラル内のCSSやSQLなども自動的にフォーマット
const query = `
  SELECT *
  FROM users
  WHERE id = 1
`;
```

`"quoteProps": "as-needed"`

```js
// "as-needed"（デフォルト）の場合：
const obj = {
  name: "value", // 通常のプロパティ名はクォートなし
  "special-key": 1, // 特殊な文字を含む場合のみクォート付き
};
```

`"jsxSingleQuote": false`

```js
// false（デフォルト）の場合：
const element = <div className="container">Text</div>;

// true の場合：
const element = <div className="container">Text</div>;
```

### ハマったポイント

今回は特になかった！

## 🔍 気づき・感想

今まで設定とかよくわからず Prettier 使用していたので理解が進んだ

## 📚 参考リンク

[Next.js (.prettierrc.json)](https://github.com/vercel/next.js/blob/canary/.prettierrc.json)
[React (.prettierrc.js)](https://github.com/facebook/react/blob/main/.prettierrc.js)

## ⏭️ 次に学びたいこと

- ESLint の設定ファイル(flat config)
- ESLint, Prettier のベストプラクティス

## 📌 関連する過去の学び

---
