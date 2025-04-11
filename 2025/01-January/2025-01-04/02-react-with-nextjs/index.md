---
date: 2025-01-04
time: 19:28:17
title: react
number: 02
labels: [react]
topics: [js/devtools]
---

## 💡 学んだことの要約

## 📝 詳細

### 背景

`React`, `Next.js(pages router)` を基礎から再度、理解したいと思った

`pages router` の理由は仕事で使用しているのが `pages router` だから
今後、改めて `app router` については学習したい

### 内容

なぜ `React` を学ぶのに `Next.js` から入るのか？

- `zero config`: 設定が不要
- `file-system routing`: `React` 単体だとルーティングが複雑
- `built-in CSS support`: `React` 単体だとやや複雑

`dev`,`build`,`start` の違い

- `dev`: 開発サーバーを起動して、開発モードでアプリケーションをコンパイルする
- `build`: アプリケーションを本番用にビルドする
  - 最適化された静的ファイルとサーバーサイドのスクリプトが `.next`ディレクトリに生成
  - このときコードの圧縮、不要なコードの削除、画像の最適化、CSSの最適化などが行われる
- `start`: `build`で生成されたビルドを本番環境で実行
  - Next.js サーバーが起動しビルドされたアプリケーションをサーブする
  - 本番環境でのテストや実際にデプロイする際に使用

各ディレクトリの説明

- `pages`: ファイルシステムルーティングの根幹となるディレクトリ
  - `about.js` の場合 `localhost:3000/about` となる
- `public`: 静的ファイルを保管しておくディレクトリ
  - 画像やアイコンなど

`pages` と `public` は`Next.js` が定めているものなので変更すると動かなくなる

React の特徴

- 宣言的な View
- コンポーネントベース
- 一度学習すれば、どこでも使える

宣言的な View は理解が難しいので
まずはコンポーネントベースから

コンポーネントベースについて

コンポーネントベースのメリット

- コンポーネントを使い回す事ができる
  - 従来は、同じ記述があってもそれぞれのページで記述が必要だった
  - React ではコンポーネント化することで呼び出すだけで簡単に使い回せる
  - このおかげで、記述量も減り変更の対応も楽になった
- 親からコンポーネントを呼び出す際にデータだけ変更してコンポーネントを呼び出す事もできる
- 状態を閉じ込めることでユーザーのアクションを作れたり他への影響を最小限にしてUIを作成することができる
- コンポーネントの再レンダリングをうまく管理することでパフォーマンスの高いサイトの制作ができる

ファイルルーティングシステムについて

`pages` 配下のにあるファイル名が `url` と対応している

`index` とすることでルートを意味する
`index` を `about` に変更するとルートは `404 エラー`となって `/about` に行くと表示される

便利なキーボードショートカット
開始タグから閉じタグを選択する: `⌘ + ⇧ + A`

ショートカットの設定方法
`⌘ + K` => `⌘ + S`

検索窓に `editor.emmet.action.balanceOut` と入力
`+` ボタンをクリック => 設定したいコマンドを入力

コンポーネントを作って、同じ記述をコンポーネント化してみる
フッターとリンク群をコンポーネント化する

まずはプロジェクトのルートに `components` ディレクトリを作成
その中に `Footer.jsx` と `Links.jsx` を作成

それぞれ共通部分を切り出す

<details>
<summary>Footer.jsx(クリックで開く)</summary>

```jsx
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/file.svg"
          alt="File icon"
          width={16}
          height={16}
        />
        Learn
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/window.svg"
          alt="Window icon"
          width={16}
          height={16}
        />
        Examples
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/globe.svg"
          alt="Globe icon"
          width={16}
          height={16}
        />
        Go to nextjs.org →
      </a>
    </footer>
  );
}
```

</details>

<details>
<summary>Links.jsx(クリックで開く)</summary>

```jsx
import Image from 'next/image';

export function Links() {
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <a
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className="dark:invert"
          src="/vercel.svg"
          alt="Vercel logomark"
          width={20}
          height={20}
        />
        Deploy now
      </a>
      <a
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read our docs
      </a>
    </div>
  );
}
```

</details>

<details>
<summary>コンポーネント化前のindex.jsx(クリックで開く)</summary>

```jsx
import { Geist, Geist_Mono } from 'next/font/google';
import Image from 'next/image';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl"> index Page</h1>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Hello Get started by editing{' '}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/pages/index.js
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

}
```

</details>

<details>
<summary>コンポーネント化したindex.jsx(クリックで開く)</summary>

```jsx
import { Geist, Geist_Mono } from 'next/font/google';
import Image from 'next/image';

import { Footer } from '../../components/Footer';
import { Links } from '../../components/Links';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl"> index Page</h1>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Hello Get started by editing{' '}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/pages/index.js
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <Links />
      </main>
      <Footer />
    </div>
  );
}
```

</details>

React は 必ず1つの親要素が必要

<details>
<summary>問題のあるコード(クリックで開く)</summary>

```jsx
import Image from 'next/image';

export default function Home() {
  return (
    <h1 className="text-2xl"> index Page</h1>
    <Image
      className="dark:invert"
      src="/next.svg"
      alt="Next.js logo"
      width={180}
      height={38}
      priority
    />

    <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
      <li className="mb-2">
        Hello Get started by editing{' '}
        <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
          src/pages/index.js
        </code>
        .
      </li>
      <li>Save and see your changes instantly.</li>
    </ol>
  );
}
```

</details>

この場合 `div` タグで囲むかフラグメントを使用する

<details>
<summary>問題を解消したコード(クリックで開く)</summary>

```jsx
// div タグで囲んで問題を解消
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl"> index Page</h1>
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />

      <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2">
          Hello Get started by editing{' '}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            src/pages/index.js
          </code>
          .
        </li>
        <li>Save and see your changes instantly.</li>
      </ol>
    </div>
  );
}
```

```jsx
// フラグメントを使用して問題を解消
import Image from 'next/image';

export default function Home() {
  return (
    // React.Fragment は省略可能で <> でもいい
    <React.Fragment>
      <h1 className="text-2xl"> index Page</h1>
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />

      <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2">
          Hello Get started by editing{' '}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            src/pages/index.js
          </code>
          .
        </li>
        <li>Save and see your changes instantly.</li>
      </ol>
    </React.Fragment>
  );
}
```

</details>

`div` タグ とフラグメントどちらがいいのか？

結論: チームによって様々だが `div` タグを推奨

親コンポーネントからみて子コンポーネントが一つの要素を返すと決めておいたほうが
不要な混乱を避けられるから

props について

props を使用することで異なる子コンポーネントに動的にデータを出し分ける事ができる

子コンポーネントの引数に `props` を渡す
親のコンポーネントに `props` を設定する
`jsx` 内で `js` の構文を使うには `{}` で囲む必要がある
`props` はいくつでも渡すことができる(可読性を考えると少なくできるなら少ないほうがいい)

ちなみに `props` は `Properties` の略

<details>
<summary>props を使ってタイトルを動的に出し分ける(クリックで開く)</summary>

```jsx
// index.jsx

// ... 必要な部分だけを抜粋

export default function Home() {
  return (
    { // ...}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Headline title="Index Page" /> {// ここで props を指定}
        <Links />
      </main>
      <Footer />
    </div>
  );
}

```

```jsx
// about.jsx
import { Geist, Geist_Mono } from 'next/font/google';

// ... 必要な部分だけを抜粋

export default function Home() {
  return (
      { // ...}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Headline title="About Page" /> {// ここで props を指定}
        <Links />
      </main>
      <Footer />
    </div>
  );
}

```

```jsx
// Headline.jsx

/* eslint-disable react/prop-types */
import Image from 'next/image';


export default function Headline(props // 引数で props を受け取る) {
  return (
    <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="text-2xl">{props.title}</h1>
      {
        /* 親コンポーネントで title と設定していたので props.title となる
           foo と設定していたら props.foo となる
           jsx ではドット記法(js の構文)で呼び出すことはできない
           js の構文を使用するときは {} で囲む必要がある
           ちなみにコメントアウトも同様
        */
      }
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <ol className="list-inside list-decimal text-sm text-c enter sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2">
          Hello Get started by editing{' '}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            src/pages/index.js
          </code>
          .
        </li>
        <li>Save and see your changes instantly.</li>
      </ol>
    </div>
  );
}
```

</details>

pages 配下のファイルは `export default` である必要がある

props を使ったいろんなデータの渡し方

<details>
<summary>こんな感じの記述になる(クリックで開く)</summary>

```jsx
export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Headline
          title="About Page"
          number={1234}
          array={[1, 2, 3, 4]}
          obj={{ learn: 'react', difficulty: 'difficult' }}
          bool
          img={
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            />
          }
        />

        {/* bool={true} の場合は bool と省略可能*/}

        {// ...}
  );
}
```

</details>

コンポーネントで囲まれたものはすべて children として扱われる
1 つのコンポーネントを渡すときは children を使用することが多い

<details>
<summary>children の場合(クリックで開く)</summary>

```jsx
export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Headline title="Index Page" onClick={() => alert('ほら！呼べた！！')}>
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </Headline>

        {// Headline で囲まれているものは children として扱われる}

        {// ...}
    </div>
  );
}

```

### ハマったポイント

## 🔍 気づき・感想

props, children あたりはちゃんと覚えていた
tailwind は一旦無効で良かったなと反省

## 📚 参考リンク

[Next.jsのビルドプロセスに関するメモ](https://zenn.dev/watarunakayama/articles/2e1e1d89359010)

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
