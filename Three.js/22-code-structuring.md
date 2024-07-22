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
  - [実際のプロジェクトを構造化する](#実際のプロジェクトを構造化する)
    - [クラスを作成してインスタンス化](#クラスを作成してインスタンス化)
    - [canvas 要素の設定](#canvas-要素の設定)
    - [Experience のサイズを処理するクラスを作成](#experience-のサイズを処理するクラスを作成)
    - [イベントをトリガーできるクラスを作成](#イベントをトリガーできるクラスを作成)
    - [時間を処理するクラスを作成](#時間を処理するクラスを作成)
    - [シーンのセットアップ](#シーンのセットアップ)
    - [カメラのセットアップ](#カメラのセットアップ)
    - [レンダラーのセットアップ](#レンダラーのセットアップ)
    - [ワールドをセットアップ](#ワールドをセットアップ)
      - [環境マップの作成](#環境マップの作成)
      - [床の作成](#床の作成)
      - [モデルの作成](#モデルの作成)
    - [デバッグ UI のセットアップ](#デバッグ-ui-のセットアップ)
    - [クリーンアップ(不要なリソースの開放)](#クリーンアップ不要なリソースの開放)

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

## 実際のプロジェクトを構造化する

良い慣習としてメインクラス内にすべての機能を集約することです。
こうすることで、メインクラスが他のすべての要素を管理し生成する。
特に HTML コンテンツや他のページ要素と共存する場合に効果的です。

Three.js の体験に関連するコードを他のコードから明確に分離することができる
また、クラスが提供するメソッドやプロパティを通じて必要な機能に簡単にアクセスできます。

今回はクラスの命名については `Experience` としてますが
プロジェクトに応じて適切なクラス名に変更してください。

### クラスを作成してインスタンス化

```js
// Experience.js に記述

export default class Experience {
  constructor() {
    // コンソールから直接、Experience クラスにアクセスできるようにする
    window.experience = this;
  }
}
```

### canvas 要素の設定

```js
// script.js に記述
const experience = new Experience(document.querySelector('canvas.Webgl'));
```

```js
export default class Experience {
  constructor(canvas) {
    // ...

    // レンダリングする HTML canvas 要素を保持
    this.canvas = canvas;
  }
}
```

### Experience のサイズを処理するクラスを作成

```js
// Sizes クラスに記述
import EventEmitter from './EventEmitter.js';
export default class Sizes extends EventEmitter {
  constructor() {
    super();
    // セットアップ
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // リサイズイベント
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      this.trigger('resize');
    });
  }
}
```

### イベントをトリガーできるクラスを作成

> [TIP]
> Three.js Jouney の Bruno Simon さんが作成したクラスです。

```js
export default class EventEmitter {
  constructor() {
    this.callbacks = {};
    this.callbacks.base = {};
  }

  on(_names, callback) {
    // Errors
    if (typeof _names === 'undefined' || _names === '') {
      console.warn('wrong names');
      return false;
    }

    if (typeof callback === 'undefined') {
      console.warn('wrong callback');
      return false;
    }

    // Resolve names
    const names = this.resolveNames(_names);

    // Each name
    names.forEach((_name) => {
      // Resolve name
      const name = this.resolveName(_name);

      // Create namespace if not exist
      if (!(this.callbacks[name.namespace] instanceof Object)) this.callbacks[name.namespace] = {};

      // Create callback if not exist
      if (!(this.callbacks[name.namespace][name.value] instanceof Array))
        this.callbacks[name.namespace][name.value] = [];

      // Add callback
      this.callbacks[name.namespace][name.value].push(callback);
    });

    return this;
  }

  off(_names) {
    // Errors
    if (typeof _names === 'undefined' || _names === '') {
      console.warn('wrong name');
      return false;
    }

    // Resolve names
    const names = this.resolveNames(_names);

    // Each name
    names.forEach((_name) => {
      // Resolve name
      const name = this.resolveName(_name);

      // Remove namespace
      if (name.namespace !== 'base' && name.value === '') {
        delete this.callbacks[name.namespace];
      }

      // Remove specific callback in namespace
      else {
        // Default
        if (name.namespace === 'base') {
          // Try to remove from each namespace
          for (const namespace in this.callbacks) {
            if (
              this.callbacks[namespace] instanceof Object &&
              this.callbacks[namespace][name.value] instanceof Array
            ) {
              delete this.callbacks[namespace][name.value];

              // Remove namespace if empty
              if (Object.keys(this.callbacks[namespace]).length === 0)
                delete this.callbacks[namespace];
            }
          }
        }

        // Specified namespace
        else if (
          this.callbacks[name.namespace] instanceof Object &&
          this.callbacks[name.namespace][name.value] instanceof Array
        ) {
          delete this.callbacks[name.namespace][name.value];

          // Remove namespace if empty
          if (Object.keys(this.callbacks[name.namespace]).length === 0)
            delete this.callbacks[name.namespace];
        }
      }
    });

    return this;
  }

  trigger(_name, _args) {
    // Errors
    if (typeof _name === 'undefined' || _name === '') {
      console.warn('wrong name');
      return false;
    }

    let finalResult = null;
    let result = null;

    // Default args
    const args = !(_args instanceof Array) ? [] : _args;

    // Resolve names (should on have one event)
    let name = this.resolveNames(_name);

    // Resolve name
    name = this.resolveName(name[0]);

    // Default namespace
    if (name.namespace === 'base') {
      // Try to find callback in each namespace
      for (const namespace in this.callbacks) {
        if (
          this.callbacks[namespace] instanceof Object &&
          this.callbacks[namespace][name.value] instanceof Array
        ) {
          this.callbacks[namespace][name.value].forEach(function (callback) {
            result = callback.apply(this, args);

            if (typeof finalResult === 'undefined') {
              finalResult = result;
            }
          });
        }
      }
    }

    // Specified namespace
    else if (this.callbacks[name.namespace] instanceof Object) {
      if (name.value === '') {
        console.warn('wrong name');
        return this;
      }

      this.callbacks[name.namespace][name.value].forEach(function (callback) {
        result = callback.apply(this, args);

        if (typeof finalResult === 'undefined') finalResult = result;
      });
    }

    return finalResult;
  }

  resolveNames(_names) {
    let names = _names;
    names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '');
    names = names.replace(/[,/]+/g, ' ');
    names = names.split(' ');

    return names;
  }

  resolveName(name) {
    const newName = {};
    const parts = name.split('.');

    newName.original = name;
    newName.value = parts[0];
    newName.namespace = 'base'; // Base namespace

    // Specified namespace
    if (parts.length > 1 && parts[1] !== '') {
      newName.namespace = parts[1];
    }

    return newName;
  }
}
```

### 時間を処理するクラスを作成

このクラスで以下の情報を更新できるようにする
`clock`: 現在の時間
`elapsedTime`: 経過時間
`deltaTime`: 現在のフレームと前のフレームとの差分時間

```js
// Time.js に記述
import EventEmitter from './EventEmitter.js';

export default class Time extends EventEmitter {
  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16; // 1 フレームが約 16 ms

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger('tick');

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
```

### シーンのセットアップ

```js
//  Experience.js に記述

import * as THREE from 'three';

export default class Experience {
  constructor(canvas) {
    // ...

    // セットアップ
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();

    // ...
  }
  // ...
}
```

### カメラのセットアップ

```js
// Camera.js で記述
export default class Camera {
  constructor() {}
}
```

```js
// Experience.js で記述
import Camera from './Camera.js';

export default class Experience {
  constructor(canvas) {
    // ...

    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();

    // ...
  }

  // ...
}
```

ここで問題が発生。
`width`, `height`, `<canvas>`などの情報が必要になり
`Experience`クラス内にあるプロパティにアクセスする必要があります。

`Camera`クラスから`Experience`クラスにアクセスする方法は 3 つあります。

- グローバル変数からアクセスする
- パラメータからアクセスする
- シングルトンを使用してアクセスする

**グローバル変数からアクセスする方法**

```js
// Camera.js に記述
export default class Camera {
  constructor() {
    this.experience = window.experience;
  }
}
```

>[!WARNING]
>
> - experience プロパティを更新するコードがないことが前提になる
> - window にグローバルプロパティを追加することは非推奨

**パラメータからアクセスする方法**

```js
// パラメータからアクセスする方法

// Experience.js に記述
export default class Experience {
  constructor(canvas) {
    // ...

    this.camera = new Camera(this);

    // ...
  }

  // ...
}
```

```js
// Camera.js に記述
export default class Camera {
  constructor(experience) {
    this.experience = experience;
  }
}
```

> [!WARNING]
>
> - 各クラスが Experience クラスにアクセスできるうにする必要がある
> - 階層構造を保つ場合、子クラスだけでなくその親クラスも Experience クラスにアクセうできるようにする必要がある

**シングルトンを使用してアクセスする方法(今回はこちらで記述)**

シングルトンとは、初めてインスタンス化されるときに通常通りインスタンス化されるクラス。
ただし、2 回目以降のインスタンス化は最初のインスタンスが返される

インスタンス化は複数実行できるが、実際のインスタンスとなるのは最初のインスタンス化だけ。

クラスの外に`instance`変数を定義して`null`を設定する
`construcuter`でその変数に何があるかをテストする
`ture`なら`instance`の中身を返し関数は処理を終える
`false`なら`this(インスタンス)`を変数に保存して、関数の続きを実行する

```js
// Experience.js に記述
let instance = null;

export default class Experience {
  constructor(canvas) {
    // シングルトン
    if (instance) {
      return instance;
    }
    instance = this;

    // ...
  }

  // ...
}
```

```js
// Camera.js に記述
import Experience from './Experience.js';

export default class Camera {
  constructor() {
    this.experience = new Experience();
  }
}
```

これで`experinece`のプロパティにアクセスできるようになったので
カメラのインスタンスを作成していく

```js
// Camera.js に記述
import Experience from './Experience.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
  constructor() {
    this.experience = experience;
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.cameraParams = {
      fov: 35,
      aspect: this.sizes.width / this.sizes.height,
      near: 0.1,
      far: 100,
      position: { x: 6, y: 4, z: 8 },
    };

    this.setInstance();
    this.setControls();

    this.sizes.on('resize', () => {
      console.log('test');
    });
  }

  // カメラのインスタンスを作成し、シーンに追加
  setInstance() {
    const { fov, aspect, near, far, position } = this.cameraParams;
    this.instance = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.instance.position.set(position.x, position.y, position.z);
    this.scene.add(this.instance);
  }

  // カメラの制御の設定(オービットコントロール)
  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  // ウィンドウのリサイズ時にカメラパラメータを更新
  resize() {
    this.instance.aspect = this.cameraParams.aspect;
    this.instance.updateMatrix();
  }

  // フレームごとのカメラ制御の更新
  update() {
    this.controls.update();
  }
}
```

```js
// Experience.js に記述
import * as THREE from 'three';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Camera from './Camera.js';

let instance = null;

export default class Experience {
  constructor(canvas) {
    // シングルトン
    if (instance) {
      return instance;
    }
    instance = this;
    // グローバルアクセスを設定
    window.experience = this;

    // レンダリングする HTML canvas 要素を保持
    this.canvas = canvas;

    // 基本コンポーネントのセットアップ
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera(this);

    // リサイズのイベントリスナーを設定
    this.sizes.on('resize', () => {
      this.resize();
    });

    // アニメーションループのためのイベントリスナーを設定
    this.time.on('tick', () => {
      this.update();
    });
  }
  // リサイズ時の処理
  resize() {
    this.camera.resize();
  }

  // 毎フレームの更新処理
  update() {
    this.camera.update();
  }
}
```

### レンダラーのセットアップ

```js
// Renderer.js に記述
import Experience from './Experience.js';
import * as THREE from 'three';

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scean = this.experience.scene;
    this.camera = this.experience.camera;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor('#211d20');
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.devicePixelRatio);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.devicePixelRatio);
  }
  update() {
    this.instance.render(this.scean, this.camera.instance);
  }
}
```

```js
// Experience.js に記述
export default class Experience {
  // ...

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
```

### ワールドをセットアップ

シーン内に表示するオブジェクトを追加する

`World`フォルダを作成して、その中に`World.js`ファイルを作成し`World.js`ファイル内に`World`クラスを作成

```js
// World.js に記述
import * as THREE from 'three';
import Environment from './Environment.js';
import Experience from '../Experience.js';

export default class World {
  constructor() {
    this.expreience = new Experience();
    this.scene = this.expreience.scene;

    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({})
    );
    this.scene.add(testMesh);
  }
}
```

[![Image from Gyazo](https://i.gyazo.com/3aba275357e68b13def97de682397ac6.png)](https://gyazo.com/3aba275357e68b13def97de682397ac6)

ライトがないので真っ黒なのでライトを追加していく

`World`フォルダに`Environment.js`ファイルを作成しファイル内に`Environment`クラスを作成する

```js
// Environment.js に記述
import Experience from '../Experience.js';
import * as THREE from 'three';

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scean = this.experience.scene;

    this.setSunLight();
  }

  setSunLight() {
    this.sunLightPrams = {
      color: 0xffffff,
      intensity: 4,
      position: { x: 3.5, y: 2, z: -1.25 },
      shadowCamera: { far: 15 },
      shadowMapSize: 1024,
      shadowNormalBias: 0.05,
    };

    const { intensity, color, position, shadowCamera, shadowMapSize, shadowNormalBias } =
      this.sunLightPrams;

    const sunLight = new THREE.DirectionalLight(color, intensity);

    sunLight.castShadow = true;
    sunLight.shadow.camera.far = shadowCamera.far;
    sunLight.shadow.mapSize.setScalar(shadowMapSize);
    sunLight.shadow.normalBias = shadowNormalBias;

    sunLight.position.set(position.x, position.y, position.z);
    this.scean.add(sunLight);
  }
}
```

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/b1fb3e135ba90ac39a8a6a87ce78e4c6.png)](https://gyazo.com/b1fb3e135ba90ac39a8a6a87ce78e4c6)

次にアセットの読み込みを専用のクラスに集中させるため

`Utils`フォルダ内に`Resources.js`をファイルを作成し`Resources.js`ファイル内に`Resources`クラスを作成する

```js
// Resources.js に記述
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import EventEmitter from './EventEmitter.js';

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    // アセットの情報を保持
    this.sources = sources;

    // ロードしたアセットを保持するオブジェクト
    this.items = {};

    // ロードするべきアセットの総数
    this.toLoad = this.sources.length;

    // ロード済みのアセット数
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  // 各ローダーの設定
  setLoaders() {
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textuerLoader: new THREE.TextureLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader(),
    };
  }

  // アセットのロード処理を開始
  startLoading() {
    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === 'texture') {
        this.loaders.textuerLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === 'cubeTexture') {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  // 単一のアセットがロードされたときの処理
  sourceLoaded(source, file) {
    // ロードされたアセットを保持
    this.items[source.name] = file;

    // ロード済みのカウントを増やす
    this.loaded++;

    // すべてのロードが完了したかをチェック
    if (this.loaded === this.toLoad) {
      this.trigger('ready');
    }
  }
}
```

読み込むアセットは配列で保持する、配列が大きなることを想定して別ファイルに切り出して記述する

`Expreiensce`フォルダに`sources.js`を作成

```js
export default [
  {
    name: 'environmentMapTexture',
    type: 'cubeTexture',
    path: [
      'textures/environmentMap/px.jpg',
      'textures/environmentMap/nx.jpg',
      'textures/environmentMap/py.jpg',
      'textures/environmentMap/ny.jpg',
      'textures/environmentMap/pz.jpg',
      'textures/environmentMap/nz.jpg',
    ],
  },
];
```

```js
import sources from './sources.js';

// ...

export default class Experience {
  constructor(canvas) {
    // ...

    this.resources = new Resources(sources);

    // ...
  }

  // ...
}
```

#### 環境マップの作成

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/a412abe5da4dce4f1b2a87929e04ca05.png)](https://gyazo.com/a412abe5da4dce4f1b2a87929e04ca05)

```js
// Environment.js に記述

export default class Environment {
  constructor() {
    // ...

    this.resources.on('ready', () => {
      // ...
      this.setEnvironmentMap();
    });
  }
  // ...

  setEnvironmentMap() {
    this.environmentMap = {
      intensity: 0.4,
      texture: this.resources.items.environmentMapTexture,
      colorSpace: THREE.SRGBColorSpace,
    };

    const { texture, colorSpace } = this.environmentMap;
    texture.colorSpace = colorSpace;

    this.scene.environment = texture;
  }
}
```

これだけだと環境マップがテストメッシュのあとに追加され、キューブマテリアルに更新が必要です。

シーンを走査して必要に応じてマテリアルを更新する`updateMaterials`メソッドを追加して
シーンに追加した直後に呼び出します

```js

setEnvironmentMap() {

// ...

 this.environmentMap.updateMaterials = () => {
      // シーン内のすべてのオブジェクトを走査
      this.scene.traverse((child) => {

        // オブジェクトが THREE.Mesh かつ THREE.MeshStandardMaterial の場合に以下の処理
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {

          // 環境マップをメッシュのマテリアルに設定
          child.material.envMap = this.environmentMap.texture;

          // 環境マップの明るさを設定
          child.material.envMapIntensity = this.environmentMap.intensity;

          // マテリアルプロパティの変更をThree.jsに通知
          child.material.needsUpdate = true;
        }
      });
    };
    this.environmentMap.updateMaterials();
  }

```

#### 床の作成

```js
// sources.js 記述

// アルベド(カラー)テクスチャ
 {
    name: 'grassColorTexture',
    type: 'texture',
    path: 'textures/dirt/color.jpg',
  },
 // ノーマルテクスチャ
  {
    name: 'grassNormalTexture',
    type: 'texture',
    path: 'textures/dirt/normal.jpg',
  },
```

`World` フォルダ内に`Floor.js`ファイルを作成し`Floor.js`ファイル内に`Fox`クラスを作成

```js
// Floor.js に記述
import * as THREE from 'three';
import Experience from '../Experience.js';

// 設定を一元管理するためのオブジェクト
const floorParams = {
  geometry: { radius: 5, segments: 64 },
  texture: {
    colorTexture: 'grassColorTexture',
    normalTexture: 'grassNormalTexture',
    repeat: { u: 1.5, v: 1.5 },
    wrapS: THREE.RepeatWrapping,
    wrapT: THREE.RepeatWrapping,
    colorSpace: THREE.SRGBColorSpace,
  },
  mesh: { rotation: { x: -Math.PI / 2 } },
};

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }
  setGeometry() {
    const { radius, segments } = floorParams.geometry;
    this.geometry = new THREE.CircleGeometry(radius, segments);
  }

  setTextures() {
    const { colorTexture, normalTexture, repeat, wrapS, wrapT, colorSpace } = floorParams.texture;

    // テクスチャのプロパティと変数名を一致させるため
    this.textures = {
      map: this.resources.items[colorTexture],
      normalMap: this.resources.items[normalTexture],
    };

    const { map, normalMap } = this.textures;

    map.colorSpace = colorSpace;
    map.repeat.set(repeat.u, repeat.v);
    map.wrapS = wrapS;
    map.wrapT = wrapT;

    normalMap.repeat.set(repeat.u, repeat.v);
    normalMap.wrapS = wrapS;
    normalMap.wrapT = wrapT;
  }
  setMaterial() {
    const { map, normalMap } = this.textures;
    this.material = new THREE.MeshStandardMaterial({
      map: map,
      normalMap: normalMap,
    });
  }
  setMesh() {
    const { rotation } = floorParams.mesh;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = rotation.x;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
```

#### モデルの作成

```js
// sources.js に記述

export default [
  // ...
  // モデルのアセットを追加
  {
    name: 'foxModel',
    type: 'gltfModel',
    path: 'models/Fox/glTF/Fox.gltf',
  },
];
```

`World` フォルダ内に`Fox.js`ファイルを作成し`Fox.js`内に`Fox`クラスを作成

```js
// Fox.js に記述
import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Fox {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resource = this.resources.items.foxModel;

    this.time = this.experience.time;

    this.setModel();
    this.setAnimation();
  }
  setModel() {
    this.model = this.resource.scene;

    const modelScale = 0.02;
    this.model.scale.setScalar(modelScale);
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }
  setAnimation() {
    this.animation = {};
    (this.animation.mixer = new THREE.AnimationMixer(this.model)),
      (this.animation.action = this.animation.mixer.clipAction(this.resource.animations[0]));
    this.animation.action.play();
  }
  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
```

```js
// World.js に記述
import * as THREE from 'three';
import Environment from './Environment.js';
import Experience from '../Experience.js';
import Floor from './Floor.js';
import Fox from './Fox.js';

export default class World {
  constructor() {
    this.expreience = new Experience();
    this.scene = this.expreience.scene;
    this.resorces = this.expreience.resources;

    this.resorces.on('ready', () => {
      this.floor = new Floor();
      this.fox = new Fox(); // Foxクラスのインスタンス化を追加
      this.environment = new Environment();
    });
  }

  // updateメソッドを追加
  update() {
    if (this.fox) {
      this.fox.update();
    }
  }
}
```

```js
// Experience.js に記述
export default class Experience {
  update() {
    this.camera.update();
    this.world.update(); // ワールドの更新を追加
    this.renderer.update();
  }
}
```

### デバッグ UI のセットアップ

`Utils` フォルダ内に`Debug.js`ファイルを作成し`Debug.js`内に`Debug`クラスを作成

```js
// Debug.js に記述
import GUI from 'lil-gui';

export default class Debug {
  constructor() {
    // URL/#debug のときにデバック UI を表示
    this.active = window.location.hash === '#debug';

    if (this.active) {
      this.ui = new GUI();
    }
  }
}
```

```js
// Environment.js に記述
export default class Environment {
  constructor() {
    // ...
    this.debug = this.experience.debug;

    // デバッグ UI の追加
    if (this.debug.active) {
      console.log(this.debug.active);
      this.debugFolder = this.debug.ui.addFolder('environment');
    }

    // ...
  }

  etSunLight() {
    // ...

    // デバック UI
    if (this.debug.active) {
      this.debugFolder.add(sunLight, 'intensity').min(0).max(4).step(0.001);
      this.debugFolder.add(sunLight.position, 'x').min(-5).max(5).step(0.01);
      this.debugFolder.add(sunLight.position, 'y').min(-5).max(5).step(0.01);
      this.debugFolder.add(sunLight.position, 'z').min(-5).max(5).step(0.01);
    }
  }

  etEnvironmentMap() {
    // ...

    // デバッグ UI
    if (this.debug.active) {
      this.debugFolder
        .add(this.environmentMap, 'intensity')
        .name('envMapItensity')
        .min(0)
        .max(4)
        .step(0.001)
        .onChange(() => {
          this.environmentMap.updateMaterials();
        });
    }
  }
}
```

### クリーンアップ(不要なリソースの開放)

`Experience`クラスに`destroy`メソッドを追加

```js
// Experience.js に記述
export default class Experience {
  // ...

  destroy() {
    this.sizes.off('resize'); // リサイズイベントの停止
    this.time.off('tick'); // tickイベントの停止

    // シーン全体を走査してリソースを開放する
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        for (const key in child.material) {
          const value = child.material[key];
          if (value && typeof value.despose === 'function') {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) {
      this.debug.ui.destroy();
    }
  }
}
```
