---
date: 2025-01-12 05:57
title: react-with-nextjs-9
number: 01
labels: [react]
topics: [js/]
---

### 内容

`useMemo`, `useRouter` について

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

### ハマったポイント

## 🔍 気づき・感想

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
