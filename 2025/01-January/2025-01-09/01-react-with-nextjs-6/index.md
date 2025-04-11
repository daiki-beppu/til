---
date: 2025-01-09 08:50
title: react-with-nextjs-6
number: 01
labels: [react]
topics: [js/]
---

## 💡 学んだことの要約

2025/01/08 の続き

### 内容

スプレッド構文について

`...` とすることで配列やオブジェクトを展開するという記述

最近の JavaScript では主に破壊的メソッドを避ける目的で使用される

<details>
<summary>サンプルコード(クリックで開く)</summary>

```js
const array = [1, 2, 3];
const newArray = [...array, 4, 5];

console.log(newArray); // [1,2,3,4,5]
```

</details>

配列の破壊的メソッドについて

破壊的メソッドとは元のデータを変更してしまうメソッドのこと

以下のメソッドは配列の破壊的メソッドなので `React` においては使用してはいけない

- `pop`: 最後の値をを削除
- `push`: 最後に値を追加
- `splice`: 指定した要素の書き換えや除去
- `reverse`: 順序を反転
- `sort`: 降順で並び替え
- `unshift`: 指定した要素を先頭に追加し新しい配列の長さを返す
- `copyWithin`: 一部の要素を他の場所にシャローコピーし配列の長さを変更せずに返す
- `fill`: 指定した範囲の要素を一定の値に変更

シャローコピーとは
コピーがコピー元のオブジェクトとプロパティにおいて同じ参照を共有する（同じ基礎値を指す）コピーのこと

ミュータブルとイミュータブルについて

ミュータブルとは
一度値を作成したあとに変更できるもの
JavaScript においては配列やオブジェクトが該当する

イミュータブルとは
一度値を作成したあとに変更できないもの
JavaScript においては文字列や数値が該当する

最近の JavaScript ではミュータブルは悪とされ
すべてイミュータブルとして扱おうという動きがあり
破壊的メソッドを使用してしまうとミュータブルなものとして扱ってしまうので
破壊的メソッドを避ける→スプレッド構文を使用するという流れになっている

useState で配列を扱う

<details>
<summary>サンプルコード(クリックで開く)</summary>

```jsx
/* eslint-disable react/prop-types */

import { useCallback, useEffect, useState } from 'react';
import Headline from 'src/components/Headline';
import Links from 'src/components/Links';
import styles from 'src/components/Main/Main.module.css';

export default function Main(props) {
  const [count, setCount] = useState(1);
  const [text, setText] = useState('');
  const [isView, setIsView] = useState(true);
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

  return (
    <main className={styles.main}>
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={handleAdd}>追加</button>
      <ul>
        {array.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </main>
  );
}
```

</details>

## 🔍 気づき・感想

ミュータブル、イミュータブル
破壊的メソッドについての曖昧だった部分の理解が深まった！

破壊的メソッドのなかにも知らないメソッドがあって勉強になった！

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
