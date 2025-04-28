---
date: 2025-04-27 22:45
title: typescript-6
number: 01
labels: [typescript]
topics: [js/]
---

# TypeScript 入門 #7

## Intersection Types (交差型)

Intersection Types は複数の型を1つにまとめることができる

### Intersection Types の定義方法

型同士を `&(アンパサンド)` でつなげることで定義できる
プリミティブ型にも使用することはできるが型 Never になる

```ts
type Person = {
  age: number;
  name: string;
};

type Employee = {
  isFullTime: boolean;
};

// Person と Employee の型を合体させている
type EmployedPerson = Person & Employee;

// これだと isFullTime がないのでエラーとなる
const newHire: EmployedPerson = {
  age: 28,
  name: "田中",
};

// エラーを修正するには isFullTime を追加する
const correctHire: EmployedPerson = {
  age: 28,
  name: "田中",
  isFullTime: true,
};

type NumberType = number;
type StringType = string;
type ImpossibleType = NumberType & StringType; // こちらは never 型
```

## Union Types (共用体型)

Union Types は 複数の型のなかでいずれかの型に当てはまれば 0K
どちらか一方の型になるわけではない

### Union Types の定義方法

型同士を `|(パイプ)`でつなげることで定義できる
プリミティブ型、リテラル型でもよく使用される

```ts
type Person = {
  age: number;
  name: string;
};

type Company = {
  isListed: boolean;
};

// Person と Company の型を合体させている
type Entity = Person | Company;

// この場合 Person の型を満たすので OK
const student: Entity = {
  age: 22,
  name: "佐藤",
};

// この場合 Company の型を満たすので OK
const startup: Entity = {
  isListed: false,
};

// どちらか一方を満たせばいいのでこのような型も成立する
// これが成立するということはいずれかの型になるということではない
const founder: Entity = {
  age: 45,
  name: "鈴木",
  isListed: true,
};

type Customer = {
  id: number;
  email: string;
};

type Guest = {
  id: string;
  ipAddress: boolean;
};

type User = Customer | Guest;

// この場合 id は number | string となる
const visitor: User = {
  id: 1,
  email: "example@email.com",
  ipAddress: true,
};

// リテラル型でも使用できる

type Zero = 0;
type Greeting = "hello";
type LiteralUnion = Zero | Greeting; // 0 または "hello" のみ OK
```

## 🔍 気づき・感想

これらはよく実務でも使用するのでいい復習になった

## 📚 参考リンク
