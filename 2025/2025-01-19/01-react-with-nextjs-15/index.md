---
date: 2025-01-19 23:14
title: 01-react-with-nextjs-15
number: 01
labels: [react]
topics: [js/]
---

## 💡 学んだことの要約

## 📝 詳細

### 背景

### 内容

動的なルーティング

`[]` の中に任意の文字列を指定してあげることで可能

例えば
`pages/post/[id].jsx`とすることで `post/1` や `post/2` のように動的に変化する
`[id]` はディレクトリでも適用される

<details>
<summary>サンプルコード(クリックで開く)</summary>

```jsx
import { useRouter } from 'next/router';
import { Header } from 'src/components/Header';
import { usePosts } from 'src/hooks/usePosts';

const PostId = () => {
  const router = useRouter();
  const { data, error, isLoading, isEmpty } = usePosts();

  if (isLoading) {
    return <div>ローディング中</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isEmpty) {
    return <div>データは空です</div>;
  }

  return (
    <>
      <Header />
      <div>{data[router.query.id].body}</div>
    </>
  );
};

export default PostId;
```

ディレクトリ構造

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
│   │   ├── Main
│   │   │   ├── Main.module.css
│   │   │   └── index.jsx
│   │   └── Posts
│   │       └── index.jsx
│   ├── hooks
│   │   ├── useCounter.jsx
│   │   ├── useInput.jsx
│   │   ├── usePosts.jsx
│   │   └── useSetBgColor.jsx
│   ├── pages
│   │   ├── _app.js
│   │   ├── _document.js
│   │   ├── about.jsx
│   │   ├── api
│   │   │   └── hello.js
│   │   ├── index.jsx
│   │   └── post
│   │       └── [id].jsx
│   └── styles
│       ├── Home.module.css
│       └── globals.css
└── yarn.lock
```

</details>

### ハマったポイント

## 🔍 気づき・感想

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
