# M1/M3 Mac 環境での .NET Core セットアップで遭遇した"dotnet: command not found"エラーの解決

Apple Silicon 搭載の新しい Mac で.NET Core 開発を始めようとしたところ、思わぬ壁に直面しました。
「dotnet: command not found」というエラーに悩まされ、一時は途方に暮れましたが、様々な試行錯誤を経て、
ついに解決策を見出すことができました。この記事では、私が遭遇した問題とその解決プロセスを詳しく共有します。
同じ問題で悩んでいる方々の助けになれば幸いです。

- [1. はじめに](#1-はじめに)
- [2. 発生した問題](#2-発生した問題)
- [3. 解決に至った手順](#3-解決に至った手順)
- [4. 解決手順](#4-解決手順)
  - [4.1. .NET Core SDK の場所を確認](#41-net-core-sdk-の場所を確認)
  - [4.2. シンボリックリンクの作成](#42-シンボリックリンクの作成)
  - [4.3. 環境変数の設定](#43-環境変数の設定)
  - [4.4. 新しい設定の反映](#44-新しい設定の反映)
  - [4.5. 設定の確認](#45-設定の確認)
  - [4.6. トラブルシューティング](#46-トラブルシューティング)
- [5. まとめ](#5-まとめ)
- [参考リンク](#参考リンク)

## 1. はじめに

Apple Silicon 搭載の Mac（M1, M2, M3 など）で.NET Core 開発環境をセットアップする際、"dotnet: command not found"エラーに遭遇しました。
この記事では、そのエラーの解決方法と、解決までの過程を紹介します。

## 2. 発生した問題

`.NET Core SDK`をインストールしたにもかかわらず以下の症状が発生

- ターミナルで `dotnet` コマンドが認識されない
- `which dotnet` を実行すると `"dotnet not found"`と表示される
- `VSCode` で `.NET Core` 関連のエラーが表示される

## 3. 解決に至った手順

- Google で 検索
- AI(Clude) に質問

同じ症状がないか Google で検索した際にこちらの記事がヒットしました
[M3 mac 環境での dotnet: command not found .NET Core エラー解消方法](https://zenn.dev/unsoluble_sugar/articles/982e38df5ffbd9)

正直、こちらの記事を読んでもあんまりわからなかったので
この記事をまるごとコピーして AI(Clude) に聞いてみました

[![Image from Gyazo](https://i.gyazo.com/d35def87aa23551e4e29e66b3f15c8c1.png)](https://gyazo.com/d35def87aa23551e4e29e66b3f15c8c1)

## 4. 解決手順

### 4.1. .NET Core SDK の場所を確認

まず、`.NET Core SDK` が正しくインストールされているか確認します。

```bash
ls /usr/local/share/dotnet
```

このコマンドで、以下のようなディレクトリが表示されれば、SDK は正しくインストールされています

### 4.2. シンボリックリンクの作成

`dotnet` コマンドをシステム全体で認識させるために、シンボリックリンクを作成します。

```bash
sudo ln -s /usr/local/share/dotnet/dotnet /usr/local/bin/dotnet
```

### 4.3. 環境変数の設定

`.zshrc`ファイルを編集して、必要な環境変数を設定します。

```bash
nano ~/.zshrc
```

ファイルの最後に以下の行を追加します。

```bash
export DOTNET_ROOT="/usr/local/share/dotnet"
export PATH=$PATH:$DOTNET_ROOT
```

変更を保存し、エディタを終了します。
(nano の場合、Ctrl+X => Y => Enter の順に押します）

### 4.4. 新しい設定の反映

変更を反映させるために、以下のコマンドを実行します。

```bash
source ~/.zshrc
```

※ ターミナルの再起動でも大丈夫です。

### 4.5. 設定の確認

`dotnet`コマンドで正しく認識されているかを確認します。

```bash
which dotnet
```

`/usr/local/bin/dotnet`と表示されれば成功です。

さらに、インストールされている.NET のバージョンを確認します。

```bash
dotnet --version
```

### 4.6. トラブルシューティング

上記の手順を実行しても問題が解決しない場合は、.NET Core SDK を再インストールすることをお勧めします。
Homebrew を使用してインストールした場合、パスが異なる可能性があります。その場合は/opt/homebrew/share/dotnet を確認してください。

## 5. まとめ

Apple Silicon 搭載の Mac で.NET Core 開発環境をセットアップする際には、追加の設定が必要な場合があります。この記事で紹介した手順を踏むことで、多くの場合`"dotnet: command not found"`エラーを解決し、スムーズに開発を始めることができます。
開発中に他の問題が発生した場合は、公式のドキュメントを参照するか、開発者コミュニティに質問することをお勧めします。

## 参考リンク

- [M3 mac 環境での dotnet: command not found .NET Core エラー解消方法](https://zenn.dev/unsoluble_sugar/articles/982e38df5ffbd9)
