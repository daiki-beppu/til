---
date: 2025-04-16 22:45
title: typescript-6
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

## 🔍 気づき・感想

## 📚 参考リンク
