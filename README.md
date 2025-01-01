# TIL - Today I Learned

日々の学びを記録するリポジトリです。

## 📁 ディレクトリ構造

```
📦 TIL
├── 📁 YYYY              # 年単位のディレクトリ
│   ├── 📁 YYYY-MM-DD-title  # 日付とタイトルごとのディレクトリ
│   │   ├── index.md    # その日の学びの記録
│   │   └── 📁 code     # 関連するコード
│   │       ├── sample.js
│   │       └── README.md
│   └── ...
├── 📁 scripts          # ユーティリティスクリプト
│   └── create-til.js   # 新規エントリ作成スクリプト
└── README.md           # このファイル
```

## 🚀 使用方法

### 新規エントリーの作成

1. VSCode Command Palette（Cmd/Ctrl + Shift + P）を開く
2. "Tasks: Run Task" を選択
3. "Create New TIL Entry" を選択
4. タイトルを入力

### 記事の構成

各記事（index.md）は以下の構成で書かれています：

- 学んだことの要約
- 詳細（背景・内容・ハマったポイント）
- 気づき・感想
- 参考リンク
- 次に学びたいこと
- 関連する過去の学び

### コードの管理

実装サンプルやコード例は各エントリーの`code`ディレクトリで管理します：

- `sample.js` - 主な実装
- `README.md` - コードの説明や実行方法

## 📝 ルール

1. タイトルは具体的で検索しやすい名前をつける
2. タグは関連するキーワードを適切に設定
3. コードを含む場合は必ず説明を添える
4. 参考にした資料は必ずリンクを記載

## 🔍 検索とナビゲーション

- ディレクトリは`YYYY/YYYY-MM-DD-title`の形式で整理
- タグとカテゴリーで関連コンテンツを検索可能
- 各記事内で関連する過去の記事へリンク

## 🛠 開発環境

- Node.js v22.12.0
- yarn 4.5.3
- VSCode（推奨）

## ⚖️ ライセンス

このリポジトリは個人の学習記録用です。
