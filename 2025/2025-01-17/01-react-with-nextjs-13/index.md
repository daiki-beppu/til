---
date: 2025-01-17 20:18
title: react-with-nextjs-13
number: 01
labels: [react]
topics: [js/]
---

### 内容

外部パッケージである `SWR` を使用した非同期処理

まずはインストール

```shell
yarn add swr

```

<details>
<summary>サンプルコード(クリックで開く)</summary>

これまでの非同期処理を `SWR` を用いてリプレイス

```jsx
// useReducer 用いた非同期処理

import { useCallback, useEffect, useReducer } from 'react';

const initialState = {
  posts: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'end':
      return {
        ...state,
        posts: action.posts,
        loading: false,
      };

    case 'error':
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      throw new Error('no such action type');
  }
};

const Posts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );

      if (!response.ok) {
        throw new Error('エラーが発生しました');
      }

      const json = await response.json();
      dispatch({ type: 'end', posts: json });
    } catch (error) {
      dispatch({ type: 'error', error });
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (state.loading) {
    return <div>ローディング中</div>;
  }

  if (state.error) {
    return <div>{state.error.message}</div>;
  }

  if (state.posts.length === 0) {
    return <div>データは空です</div>;
  }

  return (
    <ol>
      {state.posts.map((post) => {
        return <li key={post.id}>{post.title}</li>;
      })}
    </ol>
  );
};

export default Posts;
```

`SWR` を用いてリプレイス

```jsx
import { usePosts } from 'src/hooks/usePosts';

const Posts = () => {
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
    <ol>
      {data.map((post) => {
        return <li key={post.id}>{post.title}</li>;
      })}
    </ol>
  );
};

export default Posts;
```

今回はロジックをカスタムフックスに切り出した

```jsx
import useSWR from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('エラーが発生しました');
  }

  const json = await response.json();

  return json;
};

export const usePosts = () => {
  const { data, error } = useSWR(
    'https://jsonplaceholder.typicode.com/posts',
    fetcher
  );

  return {
    data,
    error,
    isLoading: !error && !data,
    isEmpty: data && data.length === 0,
  };
};
```

めちゃくちゃ記述量が減りスッキリ！

</details>

### ハマったポイント

## 🔍 気づき・感想

外部のライブラリを使うことで記述量も減りとても見通しが良くなった
実務でも使えないか相談してみようと思う！

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
