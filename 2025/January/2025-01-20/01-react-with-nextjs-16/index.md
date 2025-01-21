---
date: 2025-01-20 05:30
title: 01-react-with-nextjs-16
number: 01
labels: [react]
topics: [js/]
---

## 💡 学んだことの要約

## 📝 詳細

### 背景

動的なページでの非同期処理

SWR を使った連続 fetch の方法

<details>
<summary>サンプルコード(クリックで開く)</summary>

```jsx
import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('エラーが発生しました');
  }

  const json = await response.json();

  return json;
};

export const usePost = () => {
  const router = useRouter();
  const { data: post, error: postError } = useSWR(
    router.query.id
      ? `https://jsonplaceholder.typicode.com/posts/${router.query.id}`
      : null,
    fetcher
  );

  const { data: user, error: userError } = useSWR(
    post?.userId
      ? `https://jsonplaceholder.typicode.com/users/${post.userId}`
      : null,
    fetcher
  );

  return {
    post,
    user,
    error: postError || userError,
    isLoading: !user && !userError,
  };
};

export default usePost;
```

</details>

### 内容

### ハマったポイント

SWR で fetcher がないとデータが取得できなかった

## 🔍 気づき・感想

SWR で fetcher がないとデータが取得できなかったのを知らなかったので勉強になった
たしかにドキュメントには fetcher 関数を作成する必要があると書かれている

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
