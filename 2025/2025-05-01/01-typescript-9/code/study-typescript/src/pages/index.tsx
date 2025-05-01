// Type Alias
type Foo = {
	a: number;
};

// Interface
interface IFoo {
	a: number;
}

const foo: Foo = {
	a: 1,
};
const foo2: IFoo = {
	a: 1,
};

// Type Alias と Interface の違い

// 1. 宣言できる型に違いがある
// Interface が定義できるのは連想型のオブジェクトのみ
// Type Alias はなんでも宣言できる

// 2. open-ended に準拠しているかどうか
// open-ended とは同じ命名で宣言があった場合に自動でマージすること

interface Ifoo2 {
	a: number;
}

interface Ifoo2 {
	b: string;
}

// Interface は open-ended に準拠しているため型がマージされる
const foo3: Ifoo2 = {
	a: 1,
	b: "test",
};

type foo2 = {
	a: number;
};

// type Alias は open-ended に準拠していないためエラーとなる
type foo2 = {
	b: string;
};

// 3. 継承方法が違う

// Ifoo2 を継承して新しい型を定義

// Interface の場合
interface IBar extends Ifoo2 {
	c: boolean;
}

const Foo4: IBar = {
	a: 1,
	b: "test",
	c: true,
};

// Type Alias の場合は intersection type を使用することで継承できる
type Foo3 = Ifoo2 & {
	c: boolean;
};

// 4. プロパティをオーバライドしたときの違い
// Type Alias の場合
type Foo4 = {
	a: number;
};

type Foo5 = Foo4 & {
	a: string;
};

// number & string は成立しないため a は never 型になる
const foo4: Foo5 = {
	a: "test", // a は never型になるので string 型はエラーになる
};

// Interface の場合
interface IFoo3 {
	a: number;
}

// 宣言時にエラーが発生する
interface IBar2 extends IFoo3 {
	a: string;
}

// 5. Maped Types の使用
// Maped Types は他の型をもとに新しい型を作成する方法
// Type Alias は使用できる
// Interface は使用できない

type animals = "dog" | "cat";
type Foo6 = {
	[kye in animals]: number;
};

const animalNumber: Foo6 = {
	dog: 1,
	cat: 2,
};

// どちらを使用するべきか
// どちらでもいいが Type Alias をおすすめ
// 好みで選んでいいが一貫性があることが大事

// 個人的には Type Alias が好き
// Interface

export default function Home() {
	return <div></div>;
}
