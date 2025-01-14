---
date: 2025-01-14 22:21
title: news-share
number: 01
labels: [news]
topics: [js/]
---

## 💡 学んだことの要約

React にこれから来る機能

## 📝 詳細

### 背景

### 内容

React にこれから来る機能

`createContext` は上級者じゃないと使いこなすのが難しい
不要な再レンダリングを走らせがち、現状の `createContext` には
再レンダリングさせないように適切な情報だけを選択するセレクター(Redux で言うところの)に該当する機能がない

セレクターを現状の API の組み合わせ(`use` と `useMemo`)でできるようになる

useMemo と use を使用してセレクター層を再現する

```jsx
import {createContext, useMemo, use } from 'react';

const MyContext = createContext({
  foo: '',
  bar: 0
})

const useFoo(() => {
  return useMemo(() => {
    const { foo } = use(MyContext)
    return foo
  })
},[])

```

このように定義した `useFoo` を使用することで
`foo` の値を使用しているコンポーネントで
`bar` の値が書き換わっても再レンダリングされることはなくなる

`foo` の値が書き換わらない限り再レンダリングされない

既存の API の組み合わせで実現することができるようになるので
新しい API を覚える必要がないところも 「React すげー！」といったポイントのひとつ

ただ、実装はまだ先の話になりそう

### ハマったポイント

## 🔍 気づき・感想

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
