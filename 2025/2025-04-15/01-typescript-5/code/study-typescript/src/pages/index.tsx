// Array
// number の Array
const array1: number[] = [1, 2, 3]; // こちらのほうが多い印象
const array2: Array<number> = [1, 2, 3];

const array3: (number | string)[] = [1, "2", 3];
// こうすることで 文字列と数値の配列とすることができる
// Union Type というが後日詳しく学習

// Tuple
// 配列の要素ごとに型を指定かつ要素の数が決まっている

const tuple: [string, number] = ["a", 12];
// この場合 １つ目の要素は文字列、２つ目の要素は数値でないとエラー
// また要素が 2つでないとエラーになる

// さらに要素が持っている型のメソッドを補完できたりもする
// tuple[0].toFixed(2); // tuple[0]は string なのでtoFixed はエラーになる

// any
// 基本的には使用しない

const any: any = "";

// なんでも受け付ける
// 利用時も型安全でないため基本的には使用を避ける

// Unknown
// any と似ているがなるべく型安全にしたいときに用いる
// unknown は利用のときに型安全となる

const unknown: unknown = "";

// unknown.toFixed(2) // この場合エラーになる

// Void
// 返り値がない関数を明示的に示す

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

// Never
// 発生し得ない値の型を Never にする

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

export default function Home() {
	return <div></div>;
}
