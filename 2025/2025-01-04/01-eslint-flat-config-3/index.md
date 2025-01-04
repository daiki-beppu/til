---
date: 2025-01-04
title: eslint-flat-config-3
tags: ['eslint']
categories: ['js/devtools']
---

# eslint-flat-config-3

## 💡 学んだことの要約

ESLint flat config の続き

## 📝 詳細

```shell
yarn create @eslint/config
```

を使ってconfig ファイルを作成

### 背景

このようなコマンドがあることを知らなかった
これで行えば簡単に設定できそうだった

### 内容

デフォルトの状態からいろいろ設定してみて最終的にはこんな感じになった

追加した設定のは以下の通り

- `jsxA11y`: アクセシビリティ
- `pluginHooks`: React Hooks
- `simpleImportSort`: インポートの並び替え
- `unusedImports`: 不要なインポートの削除
- `eslintConfigPrettier`: Prettier

```js
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import pluginHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['*.config.js'],
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  pluginReact.configs.flat.recommended,

  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      'react-hooks': pluginHooks,
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
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      ...pluginHooks.configs.recommended.rules,
    },
  },

  eslintConfigPrettier,
];
```

### ハマったポイント

設定の順序で詰まった

`flat config` では設定はあと勝ちになるので記述する順序もある程度大事

このあたりの設定を最後に記述していたので
`rules` で記述した設定をあとから打ち消してしまっていた

```js
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  pluginReact.configs.flat.recommended,
```

## 🔍 気づき・感想

もっと踏み込んだ部分はいずれやるとして最低限の設定は理解できたと思う
それにしても `ESLint flat config` 普通にむずかった

## 📚 参考リンク

## ⏭️ 次に学びたいこと

React 関連

## 📌 関連する過去の学び

---
