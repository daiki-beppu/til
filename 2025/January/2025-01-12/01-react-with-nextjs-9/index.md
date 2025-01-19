---
date: 2025-01-12 05:57
title: react-with-nextjs-9
number: 01
labels: [react]
topics: [js/]
---

### 内容

`useMemo`, `useRouter` について

`useMemo` は `React` の機能
`useMemo` は計算結果をキャッシュして不要な再計算を避ける目的で使用
パフォーマンス向上目的で使用するフックスなので `useMemo` を使用しないと
実現できない要件は存在しない

<details>
<summary>サンプルコード(クリックで開く)</summary>

`useMemo` を使用して `about` ページではカウントの値を二倍する
`useCounter` というカスタムフックスで `doubleCount` を定義

```jsx
import { useCallback, useMemo, useState } from 'react';

export const useCounter = () => {
  const [count, setCount] = useState(1);
  const [isView, setIsView] = useState(true);

  const doubleCount = useMemo(() => {
    return count * 2;
  }, [count]);

  const handleClick = useCallback(() => {
    if (count < 5) {
      setCount((prevCount) => prevCount + 1);
    }
  }, [count]);

  const handleView = useCallback(() => {
    setIsView((prevIsView) => !prevIsView);
  }, []);

  return { count, doubleCount, isView, handleClick, handleView };
};
```

あとは `about` ページで使用するだけ

```jsx
/* eslint-disable react/prop-types */
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import Main from 'src/components/Main';
import styles from 'src/components/Main/Main.module.css';

export default function Home(props) {
  const {
    doubleCount,
    isView,
    handleClick,
    handleView,
    text,
    array,
    handleChange,
    handleAdd,
  } = props;
  return (
    <>
      <Header />
      <main className={styles.main}>
        {isView ? <h1>{doubleCount}</h1> : null}
        <button onClick={handleView}>{isView ? '非表示' : '表示'}</button>
        <button onClick={handleClick}>カウントアップ</button>

        <input type="text" value={text} onChange={handleChange} />
        <button onClick={handleAdd}>追加</button>
        <ul>
          {array.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
        <Main title="index" />
      </main>
      <Footer />
    </>
  );
}
```

</details>

`useRouter` について

`useRouter` は `Next.js` の機能

<details>
<summary>(クリックで開く)</summary>

`useRouter` を使用してパスに応じて背景色を切り替える

```jsx
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

export const useSetBgColor = () => {
  const router = useRouter();

  const bgColor = useMemo(() => {
    return router.pathname === '/' ? 'skyblue' : 'orange';
  }, [router.pathname]);

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [bgColor]);
};
```

さっきのは三項演算子だけど switch 文でも実現可能

```jsx
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

export const useSetBgColor = () => {
  const router = useRouter();

  const bgColor = useMemo(() => {
    switch (router.pathname) {
      case '/': {
        return 'skyblue';
      }

      case '/about': {
        return 'orange';
      }

      default:
        return '';
    }
  }, [router.pathname]);

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [bgColor]);
};
```

</details>

`export` と `export default` の使い分け

`export`:

- 複数のものを export できる
- インポート時に元の名前を使用する必要がある

`export default`:

- ファイルごとに1つだけ定義できる
- インポート時に任意の名前をつけられる

今後は基本的に `export` を使用するようにする

理由はインポート時に命名を変更したくない
任意に命名できるため最終的にどのコンポーネントを呼び出しているのかわからなくなるのを防ぐ

### ハマったポイント

## 🔍 気づき・感想

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
