---
date: 2025-01-08 07:31
title: react-with-nextjs-5
number: 01
labels: [react]
topics: [js/]
---

## 💡 学んだことの要約

2025/01/07 続き

### 内容

`useEffect` や `useCallback` の第二引数の `[]`(空配列)について

`useEffect` や `useCallback` の第二引数の `[]`(配列)
の中に変数やメソッドを記述した場合はその変数が変更されたりメソッドが実行された場合に
再度、`useEffect` や `useCallback`の処理が走るようになる

`[]`(空配列) の場合はコンポーネントのマウント時に1回だけ実行される
`useEffect` は `return` を記述することでアンマウント時に `return` 以降の処理が実行される
このアンマウント時の処理をクリーンアップ関数と呼んだりする

<details>
<summary>サンプルコード(クリックで開く)</summary>

第二引数の配列が空だとマウント時の一回のみアラートが表示される

```jsx
const [count, setCount] = useState(1);

const handleClick = () => {
  setCount((count) => count + 1);
};

useEffect(() => {
  alert('コンポーネントがマウントされました');
  // マウント時の処理
  document.body.style.backgroundColor = 'skyblue';

  // return 以降がアンマウント時の処理
  return () => {
    document.body.style.backgroundColor = '';
  };
}, []);
```

第二引数の中に変数 `count` を記述することで
`count` が更新されるたびにアラートが表示されるようになる

```jsx
const [count, setCount] = useState(1);

const handleClick = () => {
  setCount((count) => count + 1);
};

useEffect(() => {
  alert('コンポーネントがマウントされました');
  // マウント時の処理
  document.body.style.backgroundColor = 'skyblue';

  // return 以降がアンマウント時の処理
  return () => {
    document.body.style.backgroundColor = '';
  };
}, [count]);
```

この場合もちゃんとクリーンアップ関数は実行されていて順番としては
クリーンアップ関数 → マウント時の処理となる

</details>

### ハマったポイント

## 🔍 気づき・感想

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
