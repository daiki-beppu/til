---
title: 01-create-template
date: 2024-08-01
update: 2024-08-01
---

# 2024/08/01 開発日誌

## Three.js プロジェクトを GitHub テンプレート化

作成したテンプレートはこちら [threejs-vite-vanila](https://github.com/daiki-beppu/threejs-vite-vanila)

[**Three.js Journey** での学習](https://github.com/daiki-beppu/til/blob/main/Three.js/22-code-structuring.md)を参考に
構造化された Three.js プロジェクトを github テンプレート化しました

以下のアーキテクチャを使用しています

- vite + vanillaJS
- Biome
- Three.js
  - lil-gui

### 採用理由

**vite + vanilaJS**

現時点では `Vanilla JS` (素の JavaScript) でのみ開発可能なため
vite の採用は学習で使用しているため少し慣れてきたのが採用の理由

**Biome**

`ESLint + Prittier` で運用していたが Biome を知ってから使ってみたかったため

設定も簡単で個人開発ならとくに問題なさそう
(そもそも、個人開発なら Biome の速さのメリットをあまり享受できないが...)

あと個人的には可能な限りミニマルな構成にしたい思いがある

## 学習時からの変更点

**シングルトンパターンの使用をやめた**

学習時はクラスのインスタンスをシングルトンパターンで実装していたが
今回のテンプレートではパラメータからアクセスする方法を採用

理由としては

- 記述をシンプルにしたかった
- Lint エラーをどうにかしたかった

**記述をシンプルにしたかった**

シングルトンパターンについての理解が足りていないため
Three.js 以外での実装で躓くことをなるべく避けたかった

**Lint エラーをどうにかしたかった**

`constractor` 内で `return` を記述すると Lint に怒られるため
基本的には設定は大きく変更せず運用したいので
比較的、簡単に怒られないようにするために採用

## まとめ

ソースコードはほぼ学習時のままだけど
自分で再度、プロジェクトを作成してみることでとても理解につながった

今後は、`TypeScript` でのテンプレートや
今後、学ぶ `React (R3F: React Three Fiber)` を使ったテンプレートも作成してみようと思う
