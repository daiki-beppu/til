---
date: 2025-01-07 20:26:42
title: react-with-nextjs-4
number: 01
labels: [react, next.js]
topics: [js/]
---

## 💡 学んだことの要約

2025/01/06 の続き

### 内容

イベント処理について(続き)

大きく分けると2つ

- ユーザーのアクションによるイベント
  - クリックイベント
  - キーボード入力など
- 特定のタイミングで発生させたいイベント
  - ローディングなど

コンポーネントのライフサイクルについて

ライフサイクルとは生まれてから消えるまでの一連の流れ
`React` のコンポーネントにもライフサイクルの考え方がある

`jsx` がブラウザで動くときは `DOM` になっている
この `DOM` になるときのことをマウントと呼ぶ

反対にコンポーネントが消えてしまうことをアンマウントと呼ぶ

マウントとアンマウントについて

`useEffect` を使用することでマウント時とアンマウント時に行いたい処理を記述することができる
`pages` と同様にコンポーネントに記述することもできる

```jsx
useEffect(() => {
  // マウント時の処理
  document.body.style.backgroundColor = 'skyblue';

  // return 以降がアンマウント時の処理
  return () => {
    document.body.style.backgroundColor = '';
  };
}, []);
```

ただしこちらのように直接 `DOM` を操作するのは絶対厳禁なので注意

state について

カウンターの実装

```jsx
/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import Headline from 'src/components/Headline';
import Links from 'src/components/Links';
import styles from 'src/components/Main/Main.module.css';

export default function Main(props) {
  const [count, setCount] = useState(1);

  const handleClick = (e) => {
    setCount((count) => count + 1);
  };

  return (
    <main className={styles.main}>
      <h1>{count}</h1>
      <button onClick={handleClick}>イベント処理</button>
      <Headline title={props.title} />
      <Links />
    </main>
  );
}
```

`setCount(count + 1)` だと問題発生するがある

例えば

```jsx
setCount(count + 1);
setCount(count + 1);
```

の場合 カウンターは 1ずつカウントされる
理由としては `count` の初期値は `1` で それに プラス `1` されるから

```jsx
setCount(1 + 1); // 2
setCount(1 + 1); // 2
```

となり 1 ずつカウントされることになる

関数で記述するとちゃんと前の状態を受け取って計算されるので

```jsx
setCount((1) => 1 + 1); // 2
setCount((2) => 2 + 1); // 3
```

このようになるなので
前の状態を使用して何かをしたい場合はちゃんと関数で記述する必要がある！

`useState` の命名について
基本的にはどんな名前でも動く
2 つ目の配列は分割代入の 1 つ目で命名したものに `set`をつけて使用することが多い

### ハマったポイント

## 🔍 気づき・感想

React でよく出てくる `useEffect` ,`useState`の理解が深まった
なんとなくでしかわかっていなかったので今後、使用するにあたってとても有用だ

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
