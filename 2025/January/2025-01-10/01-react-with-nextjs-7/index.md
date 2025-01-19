---
date: 2025-01-10 20:28
title: react-with-nextjs-7
number: 01
labels: [react]
topics: [js/]
---

### 内容

カスタムフックスについて

カスタムフックスの名前はフックスだと明示的わかるように`use〇〇`をと名前をつけるのが慣習
コンポーネントとして再利用することも可能だが
カスタムフックスとして再利用する利点はデザインを柔軟に設定することが可能

個人的には以下の方法で共通化しようと考えている
ロジック部分だけ共通化したい場合は`カスタムフックス`
デザインとロジックまとめて共通化したい場合は`コンポーネント`

<details>
<summary>サンプルコード(クリックで開く)</summary>

こちらの`main.jsx`をカスタムフックスを使用してリファクタリング

```jsx
// Main/index.jsx

import { useCallback, useEffect, useState } from 'react';
import Headline from 'src/components/Headline';
import Links from 'src/components/Links';
import styles from 'src/components/Main/Main.module.css';

export default function Main(props) {
  const [count, setCount] = useState(1);
  const [text, setText] = useState('');
  const [isView, setIsView] = useState(true);
  const [array, setArray] = useState([]);

  const handleClick = useCallback(() => {
    if (count < 5) {
      setCount((prevCount) => prevCount + 1);
    }
  }, [count]);

  const handleChange = useCallback((e) => {
    if (e.target.value.length > 5) {
      alert('制限文字数を超えています、5文字以内にしてください');
    }
    setText(e.target.value.trim());
  }, []);

  const handleView = useCallback(() => {
    setIsView((prevIsView) => !prevIsView);
  }, []);

  const handleAdd = useCallback(() => {
    setArray((prevArray) => {
      if (prevArray.some((item) => item === text)) {
        alert('おんなじ要素がすでにあるよ！');
        return prevArray;
      }
      return [...prevArray, text];
    });
  }, [text]);

  useEffect(() => {
    // alert('コンポーネントがマウントされました');
    // マウント時の処理
    document.body.style.backgroundColor = 'skyblue';

    // return 以降がアンマウント時の処理
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <main className={styles.main}>
      {isView ? <h1>{count}</h1> : null}
      <button onClick={handleView}>{isView ? '非表示' : '表示'}</button>

      <button onClick={handleClick}>イベント処理</button>
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={handleAdd}>追加</button>
      <ul>
        {array.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
      <Headline title={props.title} />
      <Links />
    </main>
  );
}
```

以下のようにフックスとして切り出す
カウンターの部分を `useCounter`
インプット部分を `useInput`
背景の設定を `useSetBgColor`

今回は `Main.jsx` 内でしか使用していないカスタムフックスなので
`src/components/hooks/カスタムフックス` としてディレクトリを構成

```shell

# ディレクトリ構成

src
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
│   │   └── Main
│   │       ├── Main.module.css
│   │       ├── hooks # ここに新しくディレクトリを作成
│   │       │   ├── useCounter.jsx
│   │       │   ├── useInput.jsx
│   │       │   └── useSetBgColor.jsx
│   │       └── index.jsx
```

```jsx
// useCounter.jsx

import { useCallback, useState } from 'react';

export const useCounter = () => {
  const [count, setCount] = useState(1);
  const [isView, setIsView] = useState(true);

  const handleClick = useCallback(() => {
    if (count < 5) {
      setCount((prevCount) => prevCount + 1);
    }
  }, [count]);

  const handleView = useCallback(() => {
    setIsView((prevIsView) => !prevIsView);
  }, []);

  return { count, isView, handleClick, handleView };
};
```

```jsx
// useInput.jsx

import { useCallback, useState } from 'react';

export const useInput = () => {
  const [text, setText] = useState('');
  const [array, setArray] = useState([]);

  const handleChange = useCallback((e) => {
    if (e.target.value.length > 5) {
      alert('制限文字数を超えています、5文字以内にしてください');
    }
    setText(e.target.value.trim());
  }, []);

  const handleAdd = useCallback(() => {
    setArray((prevArray) => {
      if (prevArray.some((item) => item === text)) {
        alert('おんなじ要素がすでにあるよ！');
        return prevArray;
      }
      return [...prevArray, text];
    });
  }, [text]);
  return { text, array, handleChange, handleAdd };
};
```

```jsx
// useSetBgColor.jsx
import { useEffect } from 'react';

export const useSetBgColor = () => {
  useEffect(() => {
    // alert('コンポーネントがマウントされました');
    // マウント時の処理
    document.body.style.backgroundColor = 'skyblue';

    // return 以降がアンマウント時の処理
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);
};
```

カスタムフックスを使用することでこんなに簡潔になる！

```jsx
// Main/index.jsx

import Headline from 'src/components/Headline';
import Links from 'src/components/Links';
import { useCounter } from 'src/components/Main/hooks/useCounter';
import { useInput } from 'src/components/Main/hooks/useInput';
import { useSetBgColor } from 'src/components/Main/hooks/useSetBgColor';
import styles from 'src/components/Main/Main.module.css';

export default function Main(props) {
  const { count, isView, handleClick, handleView } = useCounter();
  const { text, array, handleChange, handleAdd } = useInput();
  useSetBgColor();

  return (
    <main className={styles.main}>
      {isView ? <h1>{count}</h1> : null}
      <button onClick={handleView}>{isView ? '非表示' : '表示'}</button>
      <button onClick={handleClick}>イベント処理</button>

      <input type="text" value={text} onChange={handleChange} />
      <button onClick={handleAdd}>追加</button>
      <ul>
        {array.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
      <Headline title={props.title} />
      <Links />
    </main>
  );
}
```

</details>

### ハマったポイント

## 🔍 気づき・感想

カスタムフックスを使いこなすことで一つ一つのかなりシンプルな

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
