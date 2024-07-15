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
    - [クラスの継承](#クラスの継承)
  - [クラスとモジュールを組み合わせる](#クラスとモジュールを組み合わせる)
    - [コードの分割](#コードの分割)

## モジュールを使用した構造化

モジュールはコードを複数のファイルに分割し、必要なときにファイルをインポートする考え方です。

これまでも依存関係をインポートする際に、モジュールを使用しています。

```js
import * as THREE from 'three';
import gsap from 'gsap';
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
export default {
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
  test: '複数、エクスポートもできるよ';
};

const anotherThing = () => {
  console.log('test');
};

export { oneThing, anotherThing };
```

```js
// script.js に記述
import { oneThing, anotherThing } from './test.js';

console.log(oneThing); // () => {test: "複数、エクスポートもできるよ";}
anotherThing(); // test
```

コンソールの出力

[![Image from Gyazo](https://i.gyazo.com/c5e5acdd0c7fd85eb83d7e940b9a1d89.jpg)](https://gyazo.com/c5e5acdd0c7fd85eb83d7e940b9a1d89)

#### ライブラリから特定のクラスのみをインポート

```js
// これまではライブラリ全体をインポートしていた
import * as THREE from 'three';

// このように特定のクラスのみをインポートすることもできる
import { BoxGeometry } from 'three';
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
  }

  sayHi() {
    console.log(`Hello!! My name is ${this.name}`);
  }
}

const wallE = new Robot('Wall-E');
const ultron = new Robot('Ultron');
const astroBoy = new Robot('Astro Boy');

ultron.sayHi();
astroBoy.sayHi();
```

`constructor`メソッドを追加することでインスタンス化したときに`constructor`メソッドが自動で呼び出される

`this` を使用することで、各 Robot インスタンスは自身の `name` プロパティにアクセスできる。これにより、異なる名前を持つ複数の Robot インスタンスを作成し、それぞれが自分の名前を正しく参照できるようになります。

コンソールの出力

[![Image from Gyazo](https://i.gyazo.com/b46b353237224e45e934b364eabe3460.png)](https://gyazo.com/b46b353237224e45e934b364eabe3460)

### クラスの継承

クラスの継承は別のクラスに基づいて、新しいクラスを作成すること。
継承元クラスのすべてのメソッドは新しいクラスで使用することができる。

クラスの継承は `class クラス名(継承先) extends クラス名(継承元)`で行う。

```js
class FlyingRobot extends Robot {
  //
  constructor(name, legs) {
    // 親クラスのコンストラクタを呼び出すことで親クラスのプロパティを初期化
    super(name, legs);
  }
  // 継承先で親クラスと同じ名前のメソッドを再定義すると処理がオーバーライド(上書き)される
  sayHi() {
    console.log(`Hello!! My name is ${this.name} and I am flying robot`);
  }
  takeOff() {
    console.log(`Have a good flight ${this.name}`);
  }
  land() {
    console.log(`Welcome back ${this.name}`);
  }
}

const wallE = new Robot('Wall-E', 0);
const ultron = new FlyingRobot('Ultron', 2);
const astroBoy = new FlyingRobot('Astro Boy', 2);

astroBoy.sayHi(); // Hello!! My name is Astro Boy and I am flying robot
astroBoy.takeOff(); // Have a good flight Astro Boy
astroBoy.land(); // Welcome back Astro Boy
```

子クラスで`constructor`を明示的に定義しない場合、親クラスの`constructor`が自動的に継承されます。この場合、親クラスのコンストラクタを呼び出しすべての引数をそのまま渡す。

なので子クラス固有の初期化やプロパティの追加が必要な場合は、明示的にコンストラクタを定義する必要があります。

コンソールの出力

[![Image from Gyazo](https://i.gyazo.com/1303a5814ef93072fc0eaade48bbad14.png)](https://gyazo.com/1303a5814ef93072fc0eaade48bbad14)

継承を行うことで`constructor`と`sayHi`を継承した新しいクラスを作成できた。

## クラスとモジュールを組み合わせる

クラスとモジュールを組み合わせ、コードを分割することで以下のメリットがあります。

- コードの構造化: 関連する機能をまとめて管理しやすくなる。
- 再利用性の向上: 必要な部分のみを他のファイルやプロジェクトで使い回すことができる。
- 保守性の向上: 個別のコンポーネントを独立して修正や拡張ができる。
- 名前空間の管理: 変数や関数名の衝突を避けやすくなる。
- 依存関係の明確化: どのモジュールがどのモジュールに依存しているかが明確になる

### コードの分割

新しく`Robot.js`と`FlyingRobot.js`ファイルを作成します

[![Image from Gyazo](https://i.gyazo.com/a9271e23083cf80223bb183decddb6da.png)](https://gyazo.com/a9271e23083cf80223bb183decddb6da)

コードを各ファイルに分割し、各ファイルが異なるクラスをエクスポートする

```js
// Robot.jsに記述
export default class Robot {
  constructor(name, legs) {
    this.name = name;
    this.legs = legs;
    console.log(`I am ${this.name}. Thank you creator.`);
  }

  sayHi() {
    console.log(`Hello!! My name is ${this.name}`);
  }
}
```

```js
// FlyingRobot.jsに記述
import Robot from './Robot';

// Robotクラスを継承しているのでRobotクラスをインポートする必要がある

export default class FlyingRobot extends Robot {
  constructor(name, legs) {
    super(name, legs);
  }
  sayHi() {
    console.log(`Hello!! My name is ${this.name} and I am flying robot`);
  }
  takeOff() {
    console.log(`Have a good flight ${this.name}`);
  }
  land() {
    console.log(`Welcome back ${this.name}`);
  }
}
```

```js
// script.jsに記述
import Robot from './Robot';
import FlyingRobot from './FlyingRobot';

const wallE = new Robot('Wall-E', 0);
const ultron = new FlyingRobot('Ultron', 2);
const astroBoy = new FlyingRobot('Astro Boy', 2);

astroBoy.sayHi();
astroBoy.takeOff();
astroBoy.land();
```

**コードの分割前**

[![Image from Gyazo](https://i.gyazo.com/e83348170eda48cd90a24518e99c34be.jpg)](https://gyazo.com/e83348170eda48cd90a24518e99c34be)

**コードの分割後**

[![Image from Gyazo](https://i.gyazo.com/5c81ad5f9d8d4514ce8f2b3e0b9ab4c1.png)](https://gyazo.com/5c81ad5f9d8d4514ce8f2b3e0b9ab4c1)
