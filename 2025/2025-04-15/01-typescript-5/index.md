---
date: 2025-04-15 19:40
title: typescript-5
number: 01
labels: [typescript]
topics: [js/]
---

# TypeScript 入門

## TypeScript のいろんな型

- Array
- Tuple
- Any
- Unknown
- Void
- Never

### Array

配列型

```ts

const array1: number[] = [1, 2, 3]; // こちらのほうが多い印象
const array2: Array<number> = [1, 2, 3];

const array3: (number | string)[] = [1, "2", 3];
// こうすることで 文字列と数値の配列とすることができる
// Union Type というが後日詳しく学習

```

### Tuple

配列の要素ごとに型を指定し要素の数も決まっている

```ts
const tuple: [string, number] = ["a", 12];
// この場合 １つ目の要素は文字列、２つ目の要素は数値でないとエラー
// また要素が 2つでないとエラーになる

// さらに要素が持っている型のメソッドを補完できたりもする
tuple[0].toFixed(2); // tuple[0]は string なのでtoFixed はエラーになる
```

### Array と Tuple の違い

Tuple は Array をより厳密に指定しているイメージ
可能な限り Tuple を使うとより堅牢なコードが書ける

### Any

基本的には使用を避ける
本当にどうしても型がわからない場合や
JavaScript から TypeScript に移行する際など
段階的に型を使用する場合に用いられたりする

```ts

const any: any = "";

// なんでも受け付ける
// 利用時も型安全でないため基本的には使用を避ける
```

### Unknown

Any と似ているがなるべく型安全で実装したいときは Unknown を使用

```ts
const unknown: unknown = "";

// unknown は利用のときに型安全となる

unknown.toFixed(2) // この場合エラーになる

```

### Any と Unknown の違い

Any は利用時も型安全でないので

```ts
const any: any = "";
any.toFixed(2) // この場合エラーにならない
```

Unknown は利用時には型安全になるので
```ts
const unknown: unknown = "";
unknown.toFixed(2) // この場合エラーになる
```

### Void 

戻り値がない関数の型に使用する

```ts
function foo(): void {
	console.log("test");
}

// アロー関数の場合

const foo2 = (): void => {
	console.log("test");
};

// こちらは型を外出しするときによく見る書き方
const foo3: () => void = () => {
	console.log("test");
};

// JavaScript においてなにも返さないというのは return undefined と同じ意味なるので
// こちらはエラーにならない
function bar(): void {
	console.log("test");
	return;
}

function bar2(): void {
	console.log("test");
	return undefined;
}
```

### Never

発生し得ない値の型を Never にする

```ts

// この場合 default には到達しないので default の bar は Never 型になる
const never = (bar: "a" | 1) => {
	switch (bar) {
		case "a":
			bar;
			return;
		case 1:
			bar;
		default:
			bar;
			break;
	}
};

```


## 🔍 気づき・感想

普段から仕事で何気なくTypeScriptを使用しているが
型をちゃんと学んで実装すればより堅牢なコードが書けるようになれる気がする

## 📚 参考リンク