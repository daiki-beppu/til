# 非同期な JavaScript

非同期な JavaScript とは
読み込みやサーバー通信などの実行に時間がかかる処理が走った際に
その処理が完了するまで待たずに次の処理に移ることができるようにする仕組みのこと

イメージとしては、レストランでシェフが料理を作ってる間にスタッフが何もできないのがこれまでの同期的な JavaScript で、シェフが料理を作ってる間にお皿を用意したり、お客さんに配膳に行ったりできるのが非同期な JavaScript です

## コールスタック

> コールスタック (call stack) は、インタープリター (ウェブブラウザー内の JavaScript インタープリターなど) の仕組みの一つで、複数階層の関数を呼び出したスクリプト内の位置を追跡し続けることです。 — どの関数が現在実行されているのか、その関数の中でどの関数が呼び出されたか、などです。
> [_引用元 : MDN コールスタック_](https://developer.mozilla.org/ja/docs/Glossary/Call_stack)

### コールスタックの仕組み

- 関数が呼び出されたらコールスタックにスタックしそれから関数を実行する
- その関数から呼び出された関数もコールスタックにスタックされ呼び出し先を実行する
- 現在の関数の実行が終了するとスタックから外し最後のコールスタックに残ってる場所から実行を再開する

> [!TIP]コールスタックの確認方法
> デベロッパーツール から Sources の Call Stack で確認できる

## JavaScript はシングルスレッド

JavaScript は一度に 1 つの作業しかできない
ある瞬間において JavaScript では 1 行分のコードしか実行されていない
1 行に複数の命令が合ある場合でも 1 つの命令しか実行されていない

例えば setTimeout メソッドはタイマーの管理をしながら
処理しているように思えるが
実は裏側でタイマーの処理はブラウザに依頼して
JavaScript 自身は次の処理に移っている

そしてコールバック関数を使うことで特定のタイミングで
JavaScript はコールバック関数で帰ってきた処理を行うことで
シングルスレッドでも並列していろんな処理を行うことができる

## Promise オブジェクト

Promise オブジェクトは非同期処理の完了もしくは失敗の結果とその値を表す

Promise オブジェクトには 3 つの状態があり

- `pending` 待機状態 => 失敗も成功もしていない状態
- `fulfilled` 履行状態 => 処理が成功し完了した状態
- `rejected` 拒否状態 => 処理が失敗した状態

待機状態の Promise の最終状態は
fulfilled か rejected のどちらかになる

## async function

async function は 非同期関数を宣言しその中で await キーワードを使うことで非同期な JavaScript を書くことができる

- async は必ず Promise を返す
- 関数が値を返せば Promise その値で resolve する
- 関数がエラーを throw した場合 Promise はそのエラーで reject する
- resolve された値を変数に代入してデータを取り出すことができる

---

- async は必ず Promise を返す
- 関数が値を返せば Promise その値で resolve する

```JavaScript

記述例

async function greeting() {
  return "Hello,World!!";
}

greeting();
// Promise {<fulfilled>: 'Hello,World!!'}

// アロー関数でも async は使える
const greeting = async () => {
  return "Hello,World!";
};

greeting();
// Promise {<fulfilled>: 'Hello,World!'}

```

- 関数がエラーを throw した場合 Promise はそのエラーで reject する

```JavaScript

// throw を使うことでrejectになる
async function error() {
  throw new Error("エラーが発生しました");
}
//Promise {<rejected>: Error: エラーが発生しました
```

### await キーワード

- await は async 関数でしか使えない
- await は Promise が resolve または reject するまで async 関数の実行を一時停止する

```JavaScript

記述例

// スタートボタンをクリックすると1秒ごとに背景色がランダムで変わる
let intervalId; // タイマーのIDを保持する変数

const delayedColorChange = async () => {
  const randomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Promiseに関しては後ほど詳述
  await new Promise((resolve, reject) => {
    intervalId = setTimeout(() => {
      document.body.style.backgroundColor = randomColor();
      resolve();
    }, 1000);
  });
};

const rainbow = async () => {
  while (true) {
    await delayedColorChange();
  }
};

const start = document.querySelector("#start");

start.addEventListener("click", () => {
  rainbow();
});

// ストップをクリックすると止まる
const stop = document.querySelector("#stop");

stop.addEventListener("click", () => {
  clearInterval(intervalId); //
  document.body.style.backgroundColor = "";
});

```

### async await を使わない非同期処理

async await が使えるようになったのは ES2017 でそれ以前では別の方法で記述していた

`then` を用いて記述する
その方法はプロミスチェーンと呼ばれる

```JavaScript

記述例

//async await で記述したコード

// スタートボタンをクリックすると1秒ごとに背景色がランダムで変わる
let intervalId; // タイマーのIDを保持する変数

const randomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};

const delayedColorChange = async () => {
  await new Promise((resolve, reject) => {
    intervalId = setTimeout(() => {
      document.body.style.backgroundColor = randomColor();
      resolve();
    }, 2000);
  });
};

const rainbow = async () => {
  while (true) {
    const data = await delayedColorChange();
    console.log(data);
  }
};

const start = document.querySelector("#start");
start.addEventListener("click", () => {
  rainbow();
});

// ストップをクリックすると止まる
const stop = document.querySelector("#stop");
stop.addEventListener("click", () => {
  clearInterval(intervalId); //
  document.body.style.backgroundColor = "";
});

```

```JavaScript

// async await で記述したコードをthenを用いて記述する

let intervalId; // タイマーのIDを保持する変数

const randomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};

const delayedColorChange = () => {
  return new Promise((resolve, reject) => {
    intervalId = setTimeout(() => {
      document.body.style.backgroundColor = randomColor();
      resolve();
    }, 1000);
  });
};

const rainbow = () => {
  delayedColorChange().then(() => {
    rainbow();
  });
};

const start = document.querySelector("#start");

start.addEventListener("click", () => {
  rainbow();
});
// ストップをクリックすると止まる
const stop = document.querySelector("#stop");

stop.addEventListener("click", () => {
  clearInterval(intervalId); //
  document.body.style.backgroundColor = "";
});


```

### resolve reject された値の処理

resolve された値は変数に代入することができる

```JavaScript

記述例

const fakeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math, random() * 4500 + 500);
    setTimeout(() => {
      if (delay > 4000) {
        reject("コネクションタイムアウト");
      } else {
        resolve(`http://${url}`);
      }
    }, delay);
  });
};

const makeRequest = async () => {
  // resolve された値をdata変数に代入
  const data = await fakeRequest("google.com");
  console.log(data);
};

makeRequest()
// resolve したとき data 変数には http://google.com が入っている

```

reject したときの値は`try catch`で取得

```JavaScript

const makeRequest = async () => {
  try {
    const data = await fakeRequest("google.com");
    console.log(data);
  } catch (error) {
    console.log("エラーが発生しました");
  }
};

makeRequest();

```
