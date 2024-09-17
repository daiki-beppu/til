---
title: 54-first-react-app
date: 2024/09/15
updated: 2024/09/17
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
- [ホットモジュールリプレイスメント(HMR)について](#ホットモジュールリプレイスメントhmrについて)
- [クリッカーコンポーネントの作成](#クリッカーコンポーネントの作成)

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

JSX では、`render`メソッドや関数コンポーネントの返り値は 1 つの親要素で包まれている必要があり`render`には 1 つの要素しか含めることができない

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

[![Image from Gyazo](https://i.gyazo.com/cadf77664e38a18d1ce01981a78bdaf7.jpg)](https://gyazo.com/cadf77664e38a18d1ce01981a78bdaf7)

## ホットモジュールリプレイスメント(HMR)について

ホットモジュールリプレイスメントはアプリケーション実行中に
モジュールを交換、追加、削除できる機能。

これによりフルリロードすることなくアプリケーションの状態を保持したまま更新することができる

## クリッカーコンポーネントの作成

