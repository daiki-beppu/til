---
date: 2025-01-03
time: 8:34:50
title: eslint-flat-config-2
tags: []
categories: []
---

# eslint-flat-config-2

## 💡 学んだことの要約

[昨日の続き](https://github.com/daiki-beppu/til/tree/main/2025/2025-01-02-eslint-flat-config)

ESLint flat config ファイルの作成
React の設定を記述

### 内容

React の設定を記述

まず、必要なパッケージをインストール

```shell

yarn add -D eslint-plugin-react eslint-plugin-react-hooks

```

次に、インストールしたパッケージをインポート

```js
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
```

インストールしたパッケージを `plugins:` に追加し
それぞれの推奨設定を rules: に展開して記述

- `...react.configs.recommended.rules,`
- `...reactHooks.configs.recommended.rules,`

最終的な設定ファイル

```js
import js from '@eslint/js';
import globals from 'globals';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

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
      react: react,
      reactHooks: reactHooks,
      prettier: prettier,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
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
      parserOptions: {
        jsx: true,
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
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
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

ついでに next.js の設定も追加

まずはパッケージのインストール

```shell

yarn add -D @next/eslint-plugin-next

```

パッケージをインポート

```js
import next from '@next/eslint-plugin-next';
```

インストールしたパッケージを `plugins:` に追加し
それぞれの推奨設定を rules: に展開して記述

- `...react.configs.recommended.rules,`
- `...reactHooks.configs.recommended.rules,`

最終的な設定ファイル

```js
import js from '@eslint/js';
import globals from 'globals';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import next from '@next/eslint-plugin-next';

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

  // すべてのファイルに適用される基本設定
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    ...js.configs.recommended,
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
    files: ['**/*.{js,jsx}'],
    ...js.configs.recommended,
    plugins: {
      simpleImportSort: simpleImportSort,
      unusedImports: unusedImports,
      react: react,
      reactHooks: reactHooks,
      next: next,
      prettier: prettier,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...next.configs.recommended.plugins,
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
      parserOptions: {
        jsx: true,
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
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...next.configs.recommended.plugins,

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

## 🔍 気づき・感想

## 📚 参考リンク

## ⏭️ 次に学びたいこと

## 📌 関連する過去の学び

---
