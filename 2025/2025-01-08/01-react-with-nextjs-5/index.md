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

この配列にはいくつでも記述する事が可能

`[]`(空配列) の場合はコンポーネントのマウント時に1回だけ実行される
`useEffect` は `return` を記述することでアンマウント時に `return` 以降の処理が実行される
このアンマウント時の処理をクリーンアップ関数と呼んだりする
クリーンアップ関数の実行タイミングは

- コンポーネントのアンマウント時
- 依存配列(第二引数の`[]`)の値が変更される前

<details>
<summary>サンプルコード(クリックで開く)</summary>

第二引数の配列が空だとマウント時の一回のみアラートが表示される

```jsx
const [count, setCount] = useState(1);

const handleClick = useCallback(() => {
  setCount((count) => count + 1);
}, []);

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

const handleClick = useCallback(() => {
  setCount((count) => count + 1);
}, []);

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

`useCallback` の挙動

`useCallback` は不要な再レンダリングを防ぐために使用する

<details>
<summary>サンプルコード(クリックで開く)</summary>

第二引数の配列が空の場合マウント時の一回のみしかレンダリングされない
この場合、再生成されることがないので `count` が `1` のままとなり
必ず `if` の条件を通ってしまうことになる

```jsx
const [count, setCount] = useState(1);
const handleClick = useCallback(() => {
  if (count < 5) {
    setCount((count) => count + 1);
  }
}, []);
```

配列に `count` を追加することで `count` が更新されるたびに
再生成が行われ、正常に値が更新され意図した挙動となる

```jsx
const handleClick = useCallback(() => {
  if (count < 5) {
    setCount((count) => count + 1);
  }
}, [count]);
```

</details>

useState でいろんな値を扱う

文字列の扱い

<details>
<summary>サンプルコード(クリックで開く)</summary>

```jsx
import { useCallback, useEffect, useState } from 'react';
import Headline from 'src/components/Headline';
import Links from 'src/components/Links';
import styles from 'src/components/Main/Main.module.css';

export default function Main(props) {
  const [text, setText] = useState('');

  const handleChange = useCallback((e) => {
    if (e.target.value.length > 5) {
      alert('制限文字数を超えています、5文字以内にしてください');
    }
    setText(e.target.value.trim());
  }, []);

  return (
    <main className={styles.main}>
      <input type="text" value={text} onChange={handleChange} />d
    </main>
  );
}
```

</details>

真偽値の扱い

<details>
<summary>サンプルコード(クリックで開く)</summary>

```jsx
import { useCallback, useEffect, useState } from 'react';
import Headline from 'src/components/Headline';
import Links from 'src/components/Links';
import styles from 'src/components/Main/Main.module.css';

export default function Main(props) {
  const [isView, setIsView] = useState(true);
  const [count, setCount] = useState(1);

  const handleView = useCallback(() => {
    setIsView((isView) => !isView);
  }, []);

  return (
    <main className={styles.main}>
      {isView ? <h1>{count}</h1> : null}
      <button onClick={handleView}>{isView ? '非表示' : '表示'}</button>
    </main>
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
