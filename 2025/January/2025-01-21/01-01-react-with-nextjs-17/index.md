---
date: 2025-01-21 22:37
title: 01-react-with-nextjs-17
number: 01
labels: [01]
topics: [js/]
---

## 💡 学んだことの要約

## 📝 詳細

### 背景

### 内容

fetcher 関数をモジュールとして切り出し

<details>
<summary>サンプルコード(クリックで開く)</summary>

```jsx
// /src/utils/fetcher.js

export const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('エラーが発生しました');
  }

  const json = await response.json();

  return json;
};
```

あとは fetcher をインポートするだけ！

</details>

### ハマったポイント

## 🔍 気づき・感想

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
