---
title: 54-first-react-app
date: 2024/09/15
updated: 2024/09/21
---

# 初めての React アプリケーション制作

- [下準備](#下準備)
- [JSX について](#jsx-について)
  - [JSX の特徴](#jsx-の特徴)
    - [1 つの要素を含める必要がある](#1-つの要素を含める必要がある)
    - [すべてのタグを閉じる必要がある](#すべてのタグを閉じる必要がある)
    - [予約語は使用できない](#予約語は使用できない)
    - [JavaScript 式の埋め込み](#javascript-式の埋め込み)
    - [JSX と HTML の比較](#jsx-と-html-の比較)
  - [JSX と HTML の主な違い](#jsx-と-html-の主な違い)
- [コンポーネントの作成](#コンポーネントの作成)
  - [コンポーネントを作成するメリット](#コンポーネントを作成するメリット)
  - [コンポーネントの利用方法](#コンポーネントの利用方法)
- [HMR(ホットモジュールリプレイスメント)について](#hmrホットモジュールリプレイスメントについて)
  - [HMR のメリット](#hmr-のメリット)
- [カウンターの作成](#カウンターの作成)
  - [クリッカーコンポーネントの作成](#クリッカーコンポーネントの作成)
  - [useState フック を使用してカウンターを更新](#usestate-フック-を使用してカウンターを更新)
  - [useState フックの使い方](#usestate-フックの使い方)
  - [useEffect フックを使用してローカルストレージに値を保存する](#useeffect-フックを使用してローカルストレージに値を保存する)
  - [カウントの値をローカルストレージに保存](#カウントの値をローカルストレージに保存)
- [クリッカーの表示、非表示の切り替え](#クリッカーの表示非表示の切り替え)
- [ローカルストレージのデータを削除する](#ローカルストレージのデータを削除する)
- [props について](#props-について)
  - [異なるテキストカラーを props から設定する](#異なるテキストカラーを-props-から設定する)
  - [children を使用して App.jsx の props を取得する](#children-を使用して-appjsx-の-props-を取得する)
- [children が持つデータを親に移動させる](#children-が持つデータを親に移動させる)
  - [children から状態を更新する](#children-から状態を更新する)
- [map メソッドを使用したループ処理](#map-メソッドを使用したループ処理)
- [useMemo で値を保存する](#usememo-で値を保存する)
- [useRef で特定の要素にアクセスする](#useref-で特定の要素にアクセスする)
- [People コンポーネントを作成する](#people-コンポーネントを作成する)
  - [map メソッドでデータ表示](#map-メソッドでデータ表示)
  - [API からデータを取得](#api-からデータを取得)

## 下準備

以下の状態から始めます

<details>
<summary>. jsxファイル(クリックして展開)</summary>

```jsx
import { createRoot } from "react-dom/client";
import "./style.css";

const root = createRoot(document.querySelector("#root"));

root.render(<h1>Hello React</h1>);
```

</details>

[![Image from Gyazo](https://i.gyazo.com/88c2ac769e7290c3d878377194a1a21c.png)](https://gyazo.com/88c2ac769e7290c3d878377194a1a21c)

## JSX について

`render()`の中に`<h1>`タグがあり `HTML` だと思うかもしれませんが
`HTML` ではありません。これが `JSX` です。

JSX はタグベースの言語であり、HTML とよく似たものです。

### JSX の特徴

- コンポーネントのルート要素は 1 つだけ(1 つの要素を含める必要がある)
- すべてのタグを閉じる必要がある
- 予約語は使用できない
- JavaScript 式の埋め込み

#### 1 つの要素を含める必要がある

JSX では、`render`メソッドや関数コンポーネントの返り値は 1 つの親要素で包まれている必要があります。

```jsx
// bad: 要素が 2 つ以上ある

root.render(
  <h1>Hello</h1>
  <p>
      Lorem ipsumLorem ipsum dolor sit amet consectetur adipisicing elit. Est sint veritatis magnam quidem?
      Aperiam similique qui quisquam! Quae tempore distinctio eius, blanditiis ipsam
      doloribus eos magni accusamus non! Reprehenderit, molestiae.
  </p>
);
```

```jsx
// good: 要素が 1 つしかない
root.render(
  <div>
    <h1>Hello</h1>
    <p>
      Lorem ipsumLorem ipsum dolor sit amet consectetur adipisicing elit. Est
      sint veritatis magnam quidem? Aperiam similique qui quisquam! Quae tempore
      distinctio eius, blanditiis ipsam doloribus eos magni accusamus non!
      Reprehenderit, molestiae.
    </p>
  </div>
);
```

```jsx
// <> (フラグメント)の使用
root.render(
  <>
    <h1>Hello</h1>
    <p>
      Lorem ipsumLorem ipsum dolor sit amet consectetur adipisicing elit. Est
      sint veritatis magnam quidem? Aperiam similique qui quisquam! Quae tempore
      distinctio eius, blanditiis ipsam doloribus eos magni accusamus non!
      Reprehenderit, molestiae.
    </p>
);
```

> [!NOTE]
>
> 📝 **Memo**
>
> `<>(フラグメント)`は DOM 要素としてレンダリングされない単なるコンテナーで不要な DOM 要素を追加せず複数の要素をグループ化できる

#### すべてのタグを閉じる必要がある

- `<br>`
- `<img>`

など HTML では閉じタグが必要ないものでも JSX では閉じタグが必要
閉じタグの代わりに`<br />`でも可能

```jsx
root.render(
  <>
    <h1 className="title">Hello {myName}</h1>
    <p>
      Lorem ipsum dolo
      <br />r sit amet consectetur adipisicing elit. Est sint veritatis magnam
    </p>
  </>
);
```

#### 予約語は使用できない

`class`や`for`といった予約語は使用できません

`clsss` => `className`
`for` => `htmlFor`

に置き換えて使用する

```jsx
root.render(
  // bad: 予約語が使用されている
  <>
    <h1 class="title">Hello {myName}</h1>
    <p>
      Lorem <strong>ipsum</strong>Lorem ipsum dolo
      <br />r sit amet consectetur adipisicing elit. Est sint veritatis magnam quidem?
      Aperiam similique qui quisquam! Quae tempore distinctio eius, blanditiis ipsam
      doloribus eos magni accusamus non! Reprehenderit, molestiae.
    </p>
    <input type="checkbox" id="the-checkbox" />
    <label for="the-checkbox">checkbox</label>
  </>
);
```

```jsx
root.render(
  // good: 予約語を使用していない
  <>
    <h1 className="title">Hello {myName}</h1>
    <p>
      Lorem <strong>ipsum</strong>Lorem ipsum dolo
      <br />r sit amet consectetur adipisicing elit. Est sint veritatis magnam quidem?
      Aperiam similique qui quisquam! Quae tempore distinctio eius, blanditiis ipsam
      doloribus eos magni accusamus non! Reprehenderit, molestiae.
    </p>
    <input type="checkbox" id="the-checkbox" />
    <label htmlFor="the-checkbox">checkbox</label>
  </>
);
```

#### JavaScript 式の埋め込み

`{  }`の中に JavaScript 式 を記述することで JavaScript を実行することができる

できること

- `{ myName }`: 変数の呼び出し
- `{ 1 + 1 }` : 数学演算
- `{ Date.now }`: JavaScript オブジェクトから何かを返すメソッド
- `{ myFunction()}` 何かを返す独自の関数
- `{ myFunction}`: 関数の送信(関数は呼び出されず、送信するだけ)
- `{ () => {} }`: アロー関数など作成した関数をその場で送信
- `{myArray.map()}`: 配列を調べて結果を返すメソッドを呼び出す
- `{"random number" + Math.random()}`: 文字や数値の連結
- `` {`random number ${Math.random()}`} ``:テンプレートリテラルでの連結
- `{<h1> title </h1>}`:HTML タグを返す

```jsx
root.render(
  <div>
    <h1> こんにちは、私は {myName} です</h1>
    <p> 現在時刻: {new Date().toLocaleTimeString()}</p>
    <h2> 私のスキル</h2>
    <ul>
      {skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  </div>
);
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/8d8c414f8892d4ffcc92a2c28aa11ede.png)](https://gyazo.com/8d8c414f8892d4ffcc92a2c28aa11ede)

出来ないこと

- `条件分岐(if文)`
- `反復処理(for, while)`

> [!NOTE]
>
> 📝 **Memo**
>
> `条件分岐(if文)`は三項演算子`terms ? "OK" : "NG"`,
> `反復処理(for, while)`は配列の map 関数などで代用できる

#### JSX と HTML の比較

### JSX と HTML の主な違い

| 特徴                    | JSX                                 | HTML                             |
| ----------------------- | ----------------------------------- | -------------------------------- |
| タグの閉じ方            | すべてのタグを閉じる必要がある      | 一部のタグは閉じなくてもよい     |
| 属性名                  | camelCase（例：className, onClick） | kebab-case（例：class, onclick） |
| ルート要素              | 単一のルート要素が必要              | 複数のルート要素可能             |
| JavaScript 式の埋め込み | 中括弧 `{}` で可能                  | 不可能                           |
| コメント                | `{/* コメント */}`                  | `<!-- コメント -->`              |

## コンポーネントの作成

React のコンポーネントは独立した UI の再利用可能な部品のこと

### コンポーネントを作成するメリット

- コードが再利用しやすくなる
- アプリケーションの構造を整理しやすくなる
- 開発の効率が向上する

### コンポーネントの利用方法

`/src`フォルダ内に`App.jsx`ファイルを作成

```jsx
// App.jsx に記述

export default function App() {
  return <h1>My App</h1>;
}
```

```jsx
// index.jsx に記述

import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./style.css";

const root = createRoot(document.querySelector("#root"));

root.render(
  <div>
    <App />
  </div>
);
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/e90da4c510ce9716bdd75c0bb5f4955d.jpg)](https://gyazo.com/e90da4c510ce9716bdd75c0bb5f4955d)

コンポーネントを作成することで何度も再利用することができる

```jsx
// index.jsx に記述

import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./style.css";

const root = createRoot(document.querySelector("#root"));

root.render(
  <div>
    <App />
    <App />
    <App />
    <App />
    <App />
  </div>
);
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/cadf77664e38a18d1ce01981a78bdaf7.jpg)](https://gyazo.com/cadf77664e38a18d1ce01981a78bdaf7)

## HMR(ホットモジュールリプレイスメント)について

ホットモジュールリプレイスメントはアプリケーション実行中に
モジュールを交換、追加、削除できる機能。

これによりフルリロードすることなくアプリケーションの状態を保持したまま更新することができる

### HMR のメリット

- 開発速度の向上: 変更が即座に反映される
- 状態の保持: ページ全体をリロードすることなく更新するのでアプリケーションの状態が保持される
- 開発体験の向上: 頻繁なリロードが不要

## カウンターの作成

ボタンをクリックするとカウントが増える機能を作成します

### クリッカーコンポーネントの作成

`/src`ファイル内に`Clicker.jsx`ファイルを作成

```jsx
export default function Clicker() {
  return (
    <div>
      <div>Clicks count: 0</div>
      <button type="button">add count</button>
    </div>
  );
}
```

`App`コンポーネントで`Clicker`コンポーネントを呼び出す

```jsx
export default function App() {
  return <Clicker />;
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/f20a104249c03145073b1ebe0824c006.jpg)](https://gyazo.com/f20a104249c03145073b1ebe0824c006)

### useState フック を使用してカウンターを更新

`useState`は状態変数とその更新関数を提供する。
状態を更新する際は、直接変数を変更するのではなく、更新関数を使用する。

`useState` フックは、コンポーネントに状態を追加するための React の機能です。以下の特徴があります：

- 状態変数と、その変数を更新するための関数を提供します。
- コンポーネントの再レンダリングをトリガーします。
- 直接変数を変更せずに更新関数を使用することで、React が状態の変更を正確に追跡し、必要な時にのみ再レンダリングを行うことができます。

### useState フックの使い方

```jsx
import { useEffect, useState } from "react";

export default function Clicker() {
  // count: 現在のカウント値, setCount: カウントを更新する関数
  const [count, setCount] = useState(0); // 0 は初期値

  // ボタンクリックのイベントハンドラー
  const handleButtonClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <div>Clicks count: {count}</div>
      <button type="button" onClick={handleButtonClick}>
        add count
      </button>
    </div>
  );
}
```

**出力結果**

<a href="https://gyazo.com/bb96d6435e2ec07d1f5ef8f1f4d83884"><img src="https://i.gyazo.com/bb96d6435e2ec07d1f5ef8f1f4d83884.gif" alt="Image from Gyazo" width="302"/></a>

### useEffect フックを使用してローカルストレージに値を保存する

`useEffect`フックの役割はコンポーネントのレンダリング後に実行される副作用を定義すること

useEffect の依存配列について

- 空の配列 `[]` を渡した場合：コンポーネントのマウント時とアンマウント時にのみ実行されます。
- 依存値がある場合（例：`[count]`）：その値が変更されるたびに実行されます。
- 依存配列を省略した場合：コンポーネントの毎回のレンダリング後に実行されます。

useEffect の第二引数（`[count]`）は依存配列と呼ばれます。この配列に含まれる値が変更されたときのみ、effect が再実行されます。空の配列（`[]`）を渡すと、コンポーネントのマウント時とアンマウント時にのみ実行される。

> [!NOTE]
>
> 📝 **Memo**
>
> **マウントとアンマウント**
>
> マウント：コンポーネントが DOM に挿入され、画面に表示されること。
> アンマウント：コンポーネントが DOM から削除されること。

### カウントの値をローカルストレージに保存

ローカルストレージに保存される値は文字列になるので数値(`number` 型)に変換する必要がある

また`useState`の初期値に `?? (null 合体演算子)`を使用することで不要な`useState`を減らし、最適化することができる

`?? (null 合体演算子)`は `getItem("count")` が `null` または`undined`のとき`0`を返す

```jsx
import { useEffect, useState } from "react";

export default function Clicker() {
  const [count, setCount] = useState(
    Number.parseInt(localStorage.getItem("count") ?? 0)
  );

  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  const buttonClick = () => {
    setCount((prevCount) => prevCount + 1);
  };
  return (
    <div>
      <div>Clicks count: {count}</div>
      <button type="button" onClick={buttonClick}>
        add count
      </button>
    </div>
  );
}
```

**出力結果**

<a href="https://gyazo.com/6cdff72a10536702198c4eb1802551ca"><img src="https://i.gyazo.com/6cdff72a10536702198c4eb1802551ca.gif" alt="Image from Gyazo" width="1000"/></a>

## クリッカーの表示、非表示の切り替え

`useState`を使用して`hasClicker`という状態変数を定義して

`setHasClicker(!hasClicker)`をでの値を反転させることで状態を切り替える

```jsx
import { useState } from "react";
import Clicker from "./Clicker";

export default function App() {
  const [hasClicker, setHasClicker] = useState(true);

  const toggleClickerClick = () => {
    setHasClicker(!hasClicker);
  };
  return (
    <>
      <button type="button" onClick={toggleClickerClick}>
        {hasClicker ? "Hide" : "Show "} Clicker
      </button>
      {hasClicker && <Clicker />}
    </>
  );
}
```

**出力結果**

<a href="https://gyazo.com/3440382263181b6222f0b3afb1fcf660"><img src="https://i.gyazo.com/3440382263181b6222f0b3afb1fcf660.gif" alt="Image from Gyazo" width="428"/></a>

## ローカルストレージのデータを削除する

`clicker`コンポーネントがアンマウントされたときに`localStorage`のデータを削除する

useEffect の return 文で定義される関数は「クリーンアップ関数」と呼ばれ、
この関数は以下の時に実行される

- コンポーネントがアンマウントされる時
- 次の効果が実行される直前（依存配列の値が変更された場合）

これにより、メモリリークやその他の問題を防ぐことができる

```jsx
import { useEffect, useState } from "react";

  // ...

  useEffect(() => {
    return () => {
      localStorage.removeItem("count");
    };
  }, []);

 // ...
}
```

## props について

props（プロパティの略）は、React コンポーネントに渡されるデータです。

これにより

- 親コンポーネントから子コンポーネントにデータを渡すことができます。
- コンポーネントをより再利用可能にし、動的にします。
- コンポーネント間のデータフローを管理します。

まずは`Clicker`コンポーネントをいくつか複製します

```jsx
// ...
export default function App({ children }) {
  // ...

  return (
    <>
      {children}
      <button type="button" onClick={toggleClickerClick}>
        {hasClicker ? "Hide" : "Show "} Clicker
      </button>
      {hasClicker && (<Clicker/>)}
      {hasClicker && (<Clicker/>)}
      {hasClicker && (<Clicker/>)}
  )
}
```

このように記述することもできる

```jsx
// ...

export default function App({ children }) {
  //...
  return (
    <>
      <button type="button" onClick={toggleClickerClick}>
        {hasClicker ? "Hide" : "Show "} Clicker
      </button>
      {hasClicker && (
        <>
          <Clicker />
          <Clicker />
          <Clicker />
        </>
      )}
    </>
  );
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/8d98333345cb341185363ae03988a62b.jpg)](https://gyazo.com/8d98333345cb341185363ae03988a62b)

このままだとすべて同じ`count`という`Key`で保存しているため
それぞれに異なる`Key`を送信します

```jsx
// ...

export default function App({ children }) {
  //...
  return (
    <>
      <button type="button" onClick={toggleClickerClick}>
        {hasClicker ? "Hide" : "Show "} Clicker
      </button>
      {hasClicker && (
        <>
          <Clicker keyName="countA" />
          <Clicker keyName="countB" />
          <Clicker keyName="countC" />
        </>
      )}
    </>
  );
}
```

props はオブジェクトで送信されるので分割代入を利用して`{keyName}`と記述することができる

```jsx
import { useEffect, useState } from "react";

export default function Clicker({ keyName, color }) {
  const [count, setCount] = useState(
    Number.parseInt(localStorage.getItem(keyName) ?? 0)
  );

  useEffect(() => {
    return () => {
      localStorage.removeItem(keyName);
    };
  }, [keyName]);

  useEffect(() => {
    Number.parseInt(localStorage.setItem(keyName, count));
  }, [count, keyName]);

  const buttonClick = () => {
    setCount((prevCount) => prevCount + 1);
  };
  return (
    <div>
      <div>Clicks count: {count}</div>
      <button type="button" onClick={buttonClick}>
        add count
      </button>
    </div>
  );
}
```

### 異なるテキストカラーを props から設定する

`HSL` を使用してランダムなテキストカラーを `props` に送信します

HSL は

- `H(色相)`: 0 から 360 deg で色を表現 (0 => 赤, 360 => 赤)
- `S(彩度)`: 0% から 100 % で色の彩度を表現
- `L(明度)`: 0% から 100% で色の明度を表現 (0% => 黒 100% => 白)

```jsx
import { useState } from "react";
import Clicker from "./Clicker";

export default function App({ children }) {
  const [hasClicker, setHasClicker] = useState(true);

  const toggleClickerClick = () => {
    setHasClicker(!hasClicker);
  };

  return (
    <>
      <button type="button" onClick={toggleClickerClick}>
        {hasClicker ? "Hide" : "Show "} Clicker
      </button>
      {hasClicker && (
        <>
          <Clicker
            keyName="countA"
            color={`hsl(${Math.random() * 360}deg, 100%, 70%)`}
          />
          <Clicker
            keyName="countB"
            color={`hsl(${Math.random() * 360}deg, 100%, 70%)`}
          />
          <Clicker
            keyName="countC"
            color={`hsl(${Math.random() * 360}deg, 100%, 70%)`}
          />
        </>
      )}
    </>
  );
}
```

```jsx
import { useEffect, useState } from "react";

export default function Clicker({ keyName, color }) {
  // ...
  return (
    <div>
      <div style={{ color: color }}>Clicks count: {count}</div>
      <button type="button" onClick={buttonClick}>
        add count
      </button>
    </div>
  );
}
```

**出力結果**

<a href="https://gyazo.com/2e452d63c39461a93b749d142e273eeb"><img src="https://i.gyazo.com/2e452d63c39461a93b749d142e273eeb.gif" alt="Image from Gyazo" width="504"/></a>

### children を使用して App.jsx の props を取得する

`children`という特別な`props`があります。
`children`は、React が提供する特別な prop です。コンポーネントのタグで囲まれた要素を自動的に受け取ります。これにより、コンポーネントの再利用性と柔軟性が向上します。

children を使用する利点：

1. コンポーネントの再利用性の向上: 同じコンポーネントを異なる内容で使用できます。
2. コンポーネントの柔軟性: 親コンポーネントが子要素の構造を制御できます。
3. コードの可読性: JSX の階層構造が明確になります。

```jsx
例
<MyComponent>

  <h1>これが children として渡されます</h1>
</MyComponent>
```

`App`コンポーネントで囲まれたタグなどを`children`を使用して取得します

```jsx
// index.jsx に記述

import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./style.css";

const root = createRoot(document.querySelector("#root"));

root.render(
  <div>
    <App>
      <h1>My First React App</h1>
      <h2>this is counter</h2>
    </App>
  </div>
);
```

```jsx
// App.jsx に記述

import { useState } from "react";
import Clicker from "./Clicker";

export default function App({ children }) {
  // ...

  return (
    <>
      {children}
      // ...
    </>
  );
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/f46ac2d6bdfe99e8f05824a40b38cc09.jpg)](https://gyazo.com/f46ac2d6bdfe99e8f05824a40b38cc09)

## children が持つデータを親に移動させる

すべての`clicker`のトータルをカウントする`counter`を作成する

```jsx
// App.jsx に記述

export default function App({ children }) {
  const [hasClicker, setHasClicker] = useState(true);
  const [count, setCount] = useState(0);

  // ...
}
```

```jsx
import { useMemo, useState } from "react";
import Clicker from "./Clicker";

export default function App({ clickersCount, children }) {
  const [hasClicker, setHasClicker] = useState(true);
  const [count, setCount] = useState(0);

  // ...
  return (
    <>
      {children}
      <div>Total count: {count}</div>
      <button type="button" onClick={toggleClickerClick}>
        {hasClicker ? "Hide" : "Show "} Clicker
      </button>
      {/* ... */}
    </>
  );
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/dd81bf289ab54b6dafaa8db6cd4a0f1a.jpg)](https://gyazo.com/dd81bf289ab54b6dafaa8db6cd4a0f1a)

### children から状態を更新する

`App`コンポーネントで count を増加させる関数を作成しその関数を`clicker`に提供する

```jsx
export default function App({ children }) {
  // ...

  const incrementCount = () => {
    setCount(count + 1);
  };

  // ...
}
```

次に、この関数をすべての`ckicker`の属性に送信する

```jsx
{
  hasClicker && (
    <>
      <Clicker
        increment={increment}
        keyName="countA"
        color={`hsl(${Math.random() * 360}deg, 100%, 75%)`}
      />
      <Clicker
        increment={increment}
        keyName="countB"
        color={`hsl(${Math.random() * 360}deg, 100%, 75%)`}
      />
      <Clicker
        increment={increment}
        keyName="countC"
        color={`hsl(${Math.random() * 360}deg, 100%, 75%)`}
      />
    </>
  );
}
```

**出力結果**

<a href="https://gyazo.com/793ee58d9a2c66165d54af0006aff5ef"><img src="https://i.gyazo.com/793ee58d9a2c66165d54af0006aff5ef.gif" alt="Image from Gyazo" width="654"/></a>

## map メソッドを使用したループ処理

`map`メソッドを使用して`Clicker`コンポーネントを複数回呼び出します

`App`コンポーネントにクリッカーの数を管理する属性を追加します

```jsx
// index.jsx に記述

import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./style.css";

const root = createRoot(document.querySelector("#root"));

root.render(
  <div>
    <App clickersCount={3}>
      <h1>My First React App</h1>
      <h2>Click Counter</h2>
    </App>
  </div>
);
```

`App.jsx` で `clickersCount`の `props` を取得する

```jsx
export default function App({ clickersCount, children }) {
  // ...
}
```

`... (スプレッド構文)`と`Array`メソッドを使用して`clickersCount`の要素数をもった配列を作成し`map`メソッドでループ処理を行う

> [!NOTE]
>
> 📝 **Memo**
>
> **なぜ ...(スプレッド構文)を使用する必要がある？**
>
> `... (スプレッド構文)`を使用しない場合、配列の要素が`empty`となり空の配列と認識されるので`map`メソッドが使用できない
>
> `... (スプレッド構文)`を使用することで配列の要素が
> `empty`から`undefined`になり`map`メソッドが使用できる

```jsx
export default function App({ clickersCount, children }) {
      <div>
      {hasClicker &&
        [...Array(clickersCount)].map((item, index) => (
          <Clicker
            key={index}
            incrementCount={incrementCount}
            keyName={`count${index}`}
            color={ `hsl(${ Math.random() * 360 }deg, 100%, 75%)` }
          />
        ))}
      </div>
   }
}
```

> [!CAUTION]
>
> key に index を割り当てるのはアンチパターンなので注意
>
> 理由は要素の追加、削除、並び替えが発生した場合に
> パフォーマンスの低下、予期せぬバグ、コンポーネントの状態の不整合が起こるため

## useMemo で値を保存する

このままだと、`add count` が押されるたびに再レンダリングが発生し
毎回、文字の色が変わってしまう

`useMemo`フックを使用して 1 度作成した色を保存しておく

`useMemo` は React のフックの一つで、計算コストの高い処理の結果をメモ化（キャッシュ）します。

基本的な概念：

- 指定した依存配列の値が変更されない限り、前回の計算結果を再利用します。
- パフォーマンスの最適化に役立ちます。

useMemo を使用する主な理由：

1. 不要な再計算を避け、アプリケーションのパフォーマンスを向上させる。
2. 参照の安定性を保証し、不要な再レンダリングを防ぐ。

`for` ループで `clickersCount` の値の数色を作成し
`map` メソッドでそれを呼び出している

```jsx
// App.jsx に記述
export default function App({ clickersCount, children }) {
  // ...

  const colors = useMemo(() => {
    const colors = [];
    for (let i = 0; i < clickersCount; i++) {
      colors.push(`hsl(${Math.random() * 360}deg, 100%, 70%)`);
    }
    return colors;
  }, [clickersCount]);
  return (
    <>
      {/* ... */}
      <div>
        {hasClicker &&
          [...Array(clickersCount)].map((item, index) => (
            <Clicker
              key={index}
              incrementCount={incrementCount}
              keyName={`count${index}`}
              color={colors[index]}
            />
          ))}
      </div>
    </>
  );
}
```

## useRef で特定の要素にアクセスする

`useRef` フックは レンダー時には不要な値を参照するための React フック

今回は`useRef` で`button`の DOM 要素にアクセスして色を変更してみる

`buttonRef`変数に `useRef` を作成
`button`タグに`ref`属性を追加することで参照することができる

`ref.current`で特定の要素にアクセスできる

> [!NOTE]
>
> 📝 **Memo**
>
> **useRef のアンチパターン**
>
> レンダー中に `useRef`の内容を読み書きするのはアンチパターン
> 代わりにイベントハンドラや `useEffect`から読み書きすることが推奨されている
>
> 理由としては React のコンポーネントは純関数として振る舞うことを期待しているため
>
> 純関数とは:
>
> - 入力値(`props`, `state`など)が同じなら常に同じ`JSX`を返す
> - 呼び出す順番が変わったり引数が変わっても、他の呼び出し結果に影響を与えない

```jsx
// Clickier.jsx に記述

import { useEffect, useRef, useState } from "react";

export default function Clicker({ incrementCount, keyName, color }) {
  const [count, setCount] = useState(
    Number.parseInt(localStorage.getItem(keyName) ?? 0)
  );
  const buttonRef = useRef();
  useEffect(() => {
    buttonRef.current.style.backgroundColor = "skyblue";
    buttonRef.current.style.color = "orange";

    return () => {
      localStorage.removeItem(keyName);
    };
  }, [keyName]);

  useEffect(() => {
    localStorage.setItem(keyName, count);
  }, [count, keyName]);

  const buttonClick = () => {
    setCount((prevCount) => prevCount + 1);
    incrementCount();
  };
  return (
    <div>
      <div style={{ color: color }}>Clicks count: {count}</div>
      <button type="button" ref={buttonRef} onClick={buttonClick}>
        add count
      </button>
    </div>
  );
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/11845da3bbb7f5742181cf4585d75b74.jpg)](https://gyazo.com/11845da3bbb7f5742181cf4585d75b74)

## People コンポーネントを作成する

API から取得したランダムな名前を表示する
`People`コンポーネントを作成します

### map メソッドでデータ表示

まずはテストとして
自分で定義した固定配列をレンダリングします

```jsx
// People.jsx に記述

import { useState } from "react";

export default function People() {
  const [people, setPeople] = useState([
    { id: 1, name: "daiki" },
    { id: 2, name: "beppu" },
    { id: 3, name: "momo-chan" },
    { id: 4, name: "chi-chan" },
    { id: 5, name: "ko-chan" },
  ]);
  return (
    <>
      <h2> People </h2>
      <ul>
        {people.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
    </>
  );
}
```

```jsx
// App.jsx に記述

import { useMemo, useState } from "react";
import Clicker from "./Clicker";
import People from "./People";

export default function App({ clickersCount, children }) {
  // ...
  return (
    <>
      {children}
      <div>Total count: {count}</div>
      <button type="button" onClick={toggleClickerClick}>
        {hasClicker ? "Hide" : "Show "} Clicker
      </button>
      <div>
        {hasClicker &&
          [...Array(clickersCount)].map((item, index) => (
            <Clicker
              key={index}
              incrementCount={incrementCount}
              keyName={`count${index}`}
              color={colors[index]}
            />
          ))}
      </div>

      <People />
    </>
  );
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/233e814b0ea7665084d5bcf16fc82644.png)](https://gyazo.com/233e814b0ea7665084d5bcf16fc82644)

### API からデータを取得

`fetch`を使用して API からデータを取得します

今回使用する API は [JSONPlaceholder](https://jsonplaceholder.typicode.com/)の`/user`のデータを使用します

`getPeople`関数を作成し`async`関数にします
`fetch`で`API`からデータを取得して`.json()`で JSON 形式に`parse`(変換)し
`setPeople`で表示する配列のデータを更新するという流れです

```jsx
import { useEffect, useState } from "react";

export default function People() {
  const [people, setPeople] = useState([]);

  const getPeople = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const result = await response.json();
    setPeople(result);
  };

  useEffect(() => {
    getPeople();
  }, []);
  return (
    <>
      <h2> People </h2>
      <ul>
        {people.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
    </>
  );
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/7b881fc75020a05b5437fd6906eff54b.png)](https://gyazo.com/7b881fc75020a05b5437fd6906eff54b)
