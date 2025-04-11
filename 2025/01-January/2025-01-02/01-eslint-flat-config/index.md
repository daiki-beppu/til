---
date: 2025-01-02
title: eslint-flat-config
tags: [eslint]
categories: []
---

# `eslint`-flat-config

## 💡 学んだことの要約

`ESLint` の設定ファイルの作成(flat config)

## 📝 詳細

`ESLint` の新しい設定ファイルの形式 `flat config` での
設定ファイルの作成方法

### 背景

`ESlint` の設定ファイルを記述したこととがないので理解が弱い
2025 の初頭には `ESLint v10` で `eslintrc` が削除されるので
それまでに理解しておく必要性を感じた

### 内容

設定ファイルの記述方法

まずは、プロジェクトのルートに `eslint.config.mjs` を作成し最低限の記述を追加

最低限の記述

```js
export default [
  {
    // ここに設定が入る
  },
];
```

次に、必要な基本モジュールをインストールとインポート

モジュールのインストール

```shell
yarn add -D eslint @eslint/js globals

```

モジュールのインポート

```js
import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    // ここに設定が入る
  },
];
```

次に、無視するファイルを追加
`ignores` は ESLint によるチェックから除外したファイルやディレクトリを指定する

```js
import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['dist/*', 'node_modules/*'], // ビルドしたファイルやnode_modules はチェックから除外
  },
];
```

次に基本的な JavaScript ファイルの設定を追加する

- `files`: 設定を適用するファイル
- `...js.configs.recommended`: ESLint の推奨設定を展開
- `languageOptions`: 言語固有のオプション
  - `ecmaVersion: 2022` : 使用する JavaScript のバージョンを指定
  - `sourceType: 'module'`: ESモジュールの使用を指定
  - `globals`: 利用可能なグローバル変数を定義

```js
import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['dist/*", "node_modules/*'], // ビルドしたファイルやnode_modules はチェックから除外
  },

  {
    files: ['**/*.{js,jsx}'], // 対象とするファイル
    ...js.configs.recommended, // ESLint の推奨設定を展開

    languageOptions: {
      ecmaVersion: 2022, // 使用する JavaScript のバージョンを指定
      sourceType: 'module', // ES モジュールの使用を指定
      globals: {
        ...globals.browser, // ブラウザのグローバル変数
        ...globals.node, // Node.js のグローバル変数
      },
    },
  },
];
```

次は、TypeScript 対応の設定を追加していく

まず、TypeScript 関連のパッケージをインストール

```shell
yarn add -D typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

TypeScript 関連のパッケージをインポート

```js
import js from '@eslint/js';
import globals from 'globals';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
```

次に、TypeScript 固有の設定を追加

```js
  {
    files: ['**/*.{ts,tsx}'], // TypeScript ファイル限定の設定
    plugins: {
      typescript, // TypeScript 用のプラグイン
    },
    languageOptions: {
      parser: typescriptParser, // TypeScript パーサーを指定
      parserOptions: {
        project: './tsconfig.json', // プロジェクトの TypeScript 設定を参照
      },
    },
  },
```

次に、基本的なTypeScript のルールを設定

```js
{
  rules: {
      // TypeScript の推奨ルールを展開
      ...typescript.configs.recommended.rules,

      // 未使用変数の警告設定
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // _で始まる変数は警告しない
        },
      ],

      // any 型の使用を禁止
      '@typescript-eslint/no-explicit-any': 'error',
  },
}
```

ここまでの設定の全体像

```js
import js from '@eslint/js';
import globals from 'globals';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['dist/*", "node_modules/*'], // ビルドしたファイルやnode_modules はチェックから除外
  },

  {
    files: ['**/*.{js,jsx}'], // 対象とするファイル
    ...js.configs.recommended, // ESLint の推奨設定を展開

    languageOptions: {
      ecmaVersion: 2022, // 使用する JavaScript のバージョン
      sourceType: 'module', // ES モジュールの使用を指定
      globals: {
        ...globals.browser, // ブラウザのグローバル変数
        ...globals.node, // Node.js のグローバル変数
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'], // TypeScript ファイル限定の設定
    plugins: {
      typescript, // TypeScript 用のプラグイン
    },
    languageOptions: {
      parser: typescriptParser, // TypeScript パーサーを指定
      parserOptions: {
        project: './tsconfig.json', // プロジェクトの TypeScript 設定を参照
      },
    },
    rules: {
      // TypeScript の推奨ルールを展開
      ...typescript.configs.recommended.rules,

      // 未使用変数の警告設定
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // _で始まる変数は警告しない
        },
      ],

      // any 型の使用を禁止
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];
```

便利なESLint Plugin を紹介

- [eslint-plugin-simple-import-sort: インポートの並び替え](https://github.com/lydell/eslint-plugin-simple-import-sort/)
- [eslint-plugin-unused-imports: 不要なインポートの削除](https://github.com/sweepline/eslint-plugin-unused-imports)

AIの力を借りて少し整理や必要な設定を追加

```js
import js from '@eslint/js';
import globals from 'globals';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.next/**',
      '**/__snapshots__/**',
      '**/*.min.js',
    ],
  },

  {
    files: ['**/*.{js,jsx}'],
    ...js.configs.recommended,
    plugins: {
      simpleImportSort: simpleImportSort,
      unusedImports: unusedImports,
      prettier: prettier,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];
```

### ハマったポイント

エディターにエラーが表示されない

tsconfig.json をプロジェクトのルートに追加

```json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "esnext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node"
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", "dist"]
}
```

```shell
yarn dlx @yarnpkg/sdks vscode
```

を叩くことで解決

## 🔍 気づき・感想

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
