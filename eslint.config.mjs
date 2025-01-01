import js from '@eslint/js';
import globals from 'globals';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      'dist/*',
      'node_modules/*',
      // ビルド出力
      'build/*',
      '.next/*',
      'out/*',
      // キャッシュ
      '.cache/*',
      '.eslintcache',
      // カバレッジレポート
      'coverage/*',
      // ログファイル
      'logs/*',
      '*.log',
      // 環境変数
      '.env*',
      // エディタ設定
      '.vscode/*',
      '.idea/*',
      // テスト生成ファイル
      '**/__snapshots__/*',
      '**/*.spec.{js,ts}',
      '**/*.test.{js,ts}',
      // その他
      '*.min.js',
      '*.bundle.js',
      'public/static/*',
    ],
  },

  {
    files: ['**/*.{js,jsx}'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
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
