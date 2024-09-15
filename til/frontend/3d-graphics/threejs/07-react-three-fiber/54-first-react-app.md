---
title: 54-first-react-app
date: 2024/09/15
updated: 2024/09/16
---

# 初めての React アプリケーション制作

- [下準備](#下準備)
- [JSX について](#jsx-について)
  - [JSX の特徴](#jsx-の特徴)

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

- インデントを無視する
- 1 つの要素を含める必要がある
- 自動でタグが閉じられない
- 予約語は使用できない
