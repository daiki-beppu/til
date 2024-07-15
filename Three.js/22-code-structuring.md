# コードの構造化

- [コードの構造化](#コードの構造化)
  - [モジュールを使用した構造化](#モジュールを使用した構造化)
    - [モジュールの互換性](#モジュールの互換性)
    - [モジュールの構文](#モジュールの構文)
      - [関数のエクスポート](#関数のエクスポート)
      - [オブジェクトのエクスポート](#オブジェクトのエクスポート)
      - [複数のエクスポート](#複数のエクスポート)
      - [ライブラリから特定のクラスのみをインポート](#ライブラリから特定のクラスのみをインポート)
  - [クラスを使用した構造化](#クラスを使用した構造化)
    - [クラスの互換性](#クラスの互換性)
    - [クラスの作成](#クラスの作成)
    - [クラスのインスタンス化](#クラスのインスタンス化)
    - [クラスのメソッド](#クラスのメソッド)

## モジュールを使用した構造化

モジュールはコードを複数のファイルに分割し、必要なときにファイルをインポートする考え方です。

これまでも依存関係をインポートする際に、モジュールを使用しています。

```js
import * as THREE from "three";
import gsap from "gsap";
```

### モジュールの互換性

`Vite` を使用するとすべてのインポートが 1 つのファイルにマージされ、ほとんどのブラウザで動作します。なのでモジュールの互換性についてとくに考える必要がありません。

モジュールは現在、`Vite` や `Webpack` といったバンドラーを使用せず最新のブラウザではネイティブでサポートされています。
ただ、以下の理由からネイティブサポートではなく `Vite` を使用します。

- すべてのブラウザで互換性があるわけではない
- npm 依存関係、シェーダーファイルの統合、ローカルサーバーなど他の理由

また、モジュールは Vite にようってネイティブでサポートされている。

### モジュールの構文

`src/`ファイルを作成しファイル内に`test.js`を作成

```js:test.js
// test.js に記述
export default "test"
```

```js:script.js
// script.js に記述
import test from "./test.js";
console.log(test); // test
```

コンソールの出力

[![Image from Gyazo](https://i.gyazo.com/4d98b8f3ac3f428520581ee39d6f6d24.png)](https://gyazo.com/4d98b8f3ac3f428520581ee39d6f6d24)

重要なポイントはバスが `./`で始まることです。
そうしないとビルドツールは `node_modules`内でファイルを探そうとします。

#### 関数のエクスポート

関数もエクスポートすることができます。

```js:test.js
// test.js に記述
export default () => {
  console.log("関数もエクスポートできるよ！");
}
```

```js:script.js
// script.js に記述
test() // 関数のエクスポートもエクスポートできるよ！
```

コンソールの出力

[![Image from Gyazo](https://i.gyazo.com/29318403d211585c91edeef854d1f836.png)](https://gyazo.com/29318403d211585c91edeef854d1f836)

#### オブジェクトのエクスポート

オブジェクトもエクスポートすることができます。

```js:test.js
// test.js に記述
export default () => {
  test: "オブジェクトもエクスポートできるよ！";
}
```

```js:script.js
// script.js に記述
import test from "./test.js";
console.log(test); // () => { test: "オブジェクトもエクスポートできるよ！";}
```

コンソールの出力

[![Image from Gyazo](https://i.gyazo.com/aa472a9030bf007f3c5d38fbfe6ca663.png)](https://gyazo.com/aa472a9030bf007f3c5d38fbfe6ca663)

#### 複数のエクスポート

```js
// test.js に記述
const oneThing = () => {
  test: "複数、エクスポートもできるよ";
};

const anotherThing = () => {
  console.log("test");
};

export { oneThing, anotherThing };
```

```js
// script.js に記述
import { oneThing, anotherThing } from "./test.js";

console.log(oneThing); // () => {test: "複数、エクスポートもできるよ";}
anotherThing(); // test
```

コンソールの出力

[![Image from Gyazo](https://i.gyazo.com/c5e5acdd0c7fd85eb83d7e940b9a1d89.jpg)](https://gyazo.com/c5e5acdd0c7fd85eb83d7e940b9a1d89)

#### ライブラリから特定のクラスのみをインポート

```js
// これまではライブラリ全体をインポートしていた
import * as THREE from "three";

// このように特定のクラスのみをインポートすることもできる
import { BoxGeometry } from "three";
```

## クラスを使用した構造化

クラスを使用すると、 JavaScript で**オブジェクト指向プログラミング**を行うことができます。

### クラスの互換性

クラスはほとんどのブラウザでサポートされているので問題なく使用できます。

### クラスの作成

`class クラス名 { 処理を記述 }`

クラス名は慣習として各単語の最初の文字が大文字になるパスカルケース(PascalCase)で記述

```js
class SuperSaiyan {}
```

### クラスのインスタンス化

`const クラスのインスタンス = new クラス名`
ここでの変数はクラスのインスタンスと呼ばれます

```js
const Goku = new SuperSaiyan();
const Vegeta = new SuperSaiyan();
const Broly = new SuperSaiyan();
```

### クラスのメソッド

クラスのインスタンス化時に、名前と感謝を告げるメソッド

```js
class Robot {
  constructor(name) {
    this.name = name;
    console.log(`I am ${this.name}. Thank you creator.`);

    this.sayHi();
  }

  sayHi() {
    console.log(`Hello!! My name is ${this.name}`);
  }
}
```

`constructor`メソッドを追加することでインスタンス化したときに`constructor`メソッドが自動で呼び出される

コンソールの出力

[![Image from Gyazo](https://i.gyazo.com/b46b353237224e45e934b364eabe3460.png)](https://gyazo.com/b46b353237224e45e934b364eabe3460)
