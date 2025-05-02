---
date: 2025-04-29 20:47
title: typescript-8
number: 01
labels: [typescript]
topics: [js/]
---

# TypeScript 入門 #8

## Type Alias と Interface

どちらも型定義に使用する

### Type Alias での型の定義方法

```ts
type Foo = {
  a: number;
};
```

### Interface での型の定義方法

```ts
// Interface
interface IFoo {
  a: number;
}
```

### Type Alias と Interface の違い

1. 宣言できる型に違いがある
2. open-ended に準拠しているかどうか
3. 継承方法の違い
4. プロパティをオーバライドしたときの違い
5. Maped Types の使用ができるかどうか

#### 宣言できる型に違いがある

Type Alias はなんでも宣言できるの対して
Interface は連想型のオブジェクトのみ宣言できる

#### open-ended に準拠しているかどうか

open-ended とは同じ命名で宣言があった場合に自動でマージすること

Type Alias は open-ended に準拠していない
Interface は open-ended に準拠

```ts
type foo2 = {
  a: number;
};

// type Alias は open-ended に準拠していないためエラーとなる
type foo2 = {
  b: string;
};
```

```ts
// Interface の場合
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
```

#### 継承方法の違い

Type Alias は Intersection types を使用することで継承できる(厳密には継承というかは微妙)
Interface は extends を使用することで継承できる

```ts
// Type Alias の場合は intersection type を使用することで継承できる
type;

type Foo3 = Foo2 & {
  c: boolean;
};
```

```ts
// Interface の場合
interface IBar extends Ifoo2 {
  c: boolean;
}

const Foo4: IBar = {
  a: 1,
  b: "test",
  c: true,
};
```

#### プロパティをオーバライドしたときの違い

Type Alias は オーバライドしたプロパティが never 型になるにのでエラーになる
Interface は型定義の宣言時にエラーになる

```ts
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
```

```ts
// Interface の場合
interface IFoo3 {
  a: number;
}

// 宣言時にエラーが発生する
interface IBar2 extends IFoo3 {
  a: string;
}
```

#### Maped Types の使用

Maped Types は他の型をもとに新しい型を作成する方法
Type Alias は使用できる
Interface は使用できない

```ts
type animals = "dog" | "cat";
type Foo6 = {
  [kye in animals]: number;
};

const animalNumber: Foo6 = {
  dog: 1,
  cat: 2,
};
```

## Type Alias と Interface はどちらを使用するべきか？

どちらでもいいが Type Alias をおすすめ
好みで選んでいいが一貫性があることが大事

個人的には Type Alias が好き
Interface はオブジェクトしか定義できない

## 🔍 気づき・感想

こちらも実務でよく使うので良い復習になった

## 📚 参考リンク
