---
date: 2025-01-16 23:47
title: react-with-nextjs-12
number: 01
labels: [react]
topics: [js/]
---

### 内容

複数の `useState` を一つにまとめる

useState を一つにまとめることで不要なレンダリングを減らしパフォーマンスが良くなる

<details>
<summary>サンプルコード(クリックで開く)</summary>

```jsx
import { useCallback, useEffect, useState } from 'react';

const Posts = () => {
  const [state, setState] = useState({
    posts: [],
    loading: true,
    error: null,
  });

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/postsa'
      );

      if (!response.ok) {
        throw new Error('エラーが発生しました');
      }

      const json = await response.json();
      setState((prevState) => {
        return {
          ...prevState,
          data: json,
          loading: false,
        };
      });
    } catch (error) {
      setState((prevState) => {
        return {
          ...prevState,
          loading: false,
          error,
        };
      });
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

  if (state.post.length === 0) {
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

</details>

`useReducer` について

`useReducer` を使わなくても
`useState` で同様の要件は実現することができる

`useReducer` が活きる場面としては

- たくさんのイベントハンドラが同じ方法で `state` を変更している場合、コードの記述量が減る
- コンポーネントのコードが肥大化した場合、「どう更新するのか」と「何が起きたのか」をきれいに分離する事ができる

<details>
<summary>サンプルコード(クリックで開く)</summary>

```jsx
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

</details>

### ハマったポイント

## 🔍 気づき・感想

複数の state を一つにまとめるのは実務でも使えるなと感じた
useReducer の使いどころは難しいが知っていて損はない知識だと思う

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
