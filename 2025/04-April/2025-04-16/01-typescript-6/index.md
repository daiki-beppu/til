---
date: 2025-04-16 22:45
title: typescript-6
number: 01
labels: [typescript]
topics: [js/]
---

# TypeScript 入門 #6

## オブジェクトについて

JavaScript においてオブジェクトは2つある

1. プリミティブ型以外のオブジェクト
2. `{}` で定義するオブジェクト

`{}`は他のプログラミング言語では辞書型や連想配列に近いもの
ここでは`{}`を連想配列のオブジェクトとする

### 空オブジェクトの定義方法

```ts
const obj1: {} = {};
const obj2: object = {};
const obj3: Record<string, unknown> = {};
const obj4: { [key: string]: unknown } = {};
```

obj1 は null と undefined 以外はすべて受け入れる
obf2 は非プリミティブ型のオブジェクトとしては使用できるが連想配列のオブジェクトとしては適していない
obj3 は Record は標準ライブラリと呼ばれる TypeScript に標準搭載されているメソッドを使用
obj4 は インデックスシグネチャー `[key: string]` を使用する方法

obj1, obj2 は使用するべきではない、理由としては連想配列のオブジェクトではないから

### プロパティを持ったオブジェクトの定義方法

```ts
const obj5: Record<string, unknown> = {
	a: 1,
	b: "foo",
};

const obj6: { a: number; b: string; foo?: number } = {
	a: 1,
	b: "foo",
	foo: 10,
};
```

obj5 の <string => key に対応 unknown => プロパティに対応している>
string => number に変えると key は number じゃないのでエラーになる
unknown => string に変えると 1 は string  じゃないのでエラーになる

obj6 は特定のプロパティを持っている場合に有用
foo という key がないとエラーになる
そもそもオブジェクトにどんなプロパティを持っているかはあらかじめわかっていることが多いので obj6 の書き方がいい
特定のプロパティがオプショナル(存在しないかもしれない)な場合も簡単に表現できる
オブジェクトがネストした場合も扱いやすい

## 🔍 気づき・感想

Record は使ったことがないけどこんなのもあるだと知らないこともあったので
こういったことを知るのはやっぱり楽しい

## 📚 参考リンク