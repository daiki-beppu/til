---
date: 2025-01-01
time: 17:46:13
title: configuration-for-using-prettier
tags: [prettier]
categories: [js/devtools]
---

# configuration-for-using-prettier

## 💡 学んだことの要約

yarn の使用者向け Prettier の保存時実行の設定方法

## 📝 詳細

yarn でPrettier をインストールして
`⌘ + S` で保存したときに実行する方法

### 背景

Prettier の設定ファイルを作成したものの
`format on save` や `default formatter` の設定だけでは不十分だったので記述

### 内容

`setting.json` で以下の記述を追加

```json
{
  // コードフォーマット設定
  // ----------------
  // ファイル保存時のフォーマット有効化
  "editor.formatOnSave": true,

  // Prettier設定を必須に
  "prettier.requireConfig": true,

  // 各言語のデフォルトフォーマッタをPrettierに設定
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

ターミナルで以下のコマンドを実行

```shell
yarn dlx @yarnpkg/sdks vscode
```

これで保存時にフォーマットがかかる

### ハマったポイント

yarn の新しいパッケージ解決システムについて知らなかった

## 🔍 気づき・感想

yarn はあまり触ってこなかったので
こういう新しいことをしているんだなと思った

## 📚 参考リンク

[yarn Plug'n'Play](https://yarnpkg.com/features/pnp)

## ⏭️ 次に学びたいこと

- ESlint の設定ファイル作成(flat config)
- より詳細な yarn の新しいパッケージ解決システムについて

## 📌 関連する過去の学び

[Prettier の設定ファイルの作成](https://github.com/daiki-beppu/til/tree/main/2024/2024-12-29-prettier-configuration-file-creation)

---
