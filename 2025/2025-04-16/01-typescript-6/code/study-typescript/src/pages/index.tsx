// オブジェクトについて

// JavaScript においてオブジェクトは2つある

// 1. プリミティブ型以外のオブジェクト
// 2. {} で定義するオブジェクト

// 2. は他のプログラミング言語では辞書型や連想配列に近いもの

// 空オブジェクトの定義方法
const obj1: {} = {};
const obj2: object = {};
const obj3: Record<string, unknown> = {};
const obj4: { [key: string]: unknown } = {};

// obj1, obj2 は使用するべきではない、理由としては連想配列のオブジェクトではないから

// obj1 は null と undefined 以外はすべて受け入れる
// obf2 は 非プリミティブ型のオブジェクトとしては使用できるが連想配列のオブジェクトとしては適していない

// プロパティを持ったオブジェクトの定義方法
const obj5: Record<string, unknown> = {
	a: 1,
	b: "foo",
};

// この場合 <string => key に対応 unknown => プロパティに対応している>
// string => number に変えると key は number じゃないのでエラーになる
// unknown => string に変えると 1 は string  じゃないのでエラーになる
// Record は標準ライブラリと呼ばれる TypeScript があらかじめもっているメソッド

const obj6: { a: number; b: string; foo?: number } = {
	a: 1,
	b: "foo",
	foo: 10,
};

// この場合は特定のプロパティを持っている場合に有用
// この場合 foo という key がないとエラーになる
// そもそもオブジェクトにどんなプロパティを持っているかはあらかじめわかっていることが多いので obj6 の書き方がいい
// 特定のプロパティがオプショナル(存在しないかもしれない)な場合も簡単に表現できる
// オブジェクトがネストした場合も扱いやすい
// [key: string] の部分はインデックスシグネチャーと呼ばれる

export default function Home() {
	return <div></div>;
}
