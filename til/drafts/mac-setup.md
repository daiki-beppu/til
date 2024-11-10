---
title: mac-setup
date: 2024/11/10
updated: 2024/11/10
---

# 新しい mac (Apple Silicon) のセットアップ

- [OS 設定](#os-設定)
  - [トラックパッド](#トラックパッド)
  - [Dock の整理](#dock-の整理)
  - [Finder の設定変更](#finder-の設定変更)
- [アプリケーションのインストール](#アプリケーションのインストール)
  - [インストールするアプリケーション](#インストールするアプリケーション)
    - [必須アプリ](#必須アプリ)
    - [開発系](#開発系)
    - [作曲系](#作曲系)

## OS 設定

### トラックパッド

[![Image from Gyazo](https://i.gyazo.com/c3c7c29811b6cf2d3fd491628581fcb7.png)](https://gyazo.com/c3c7c29811b6cf2d3fd491628581fcb7)

[![Image from Gyazo](https://i.gyazo.com/316f563f34b2e0a86b9d6d3273264183.png)](https://gyazo.com/316f563f34b2e0a86b9d6d3273264183)

[![Image from Gyazo](https://i.gyazo.com/25ed6325b200bc3255a9a5a698d7b454.png)](https://gyazo.com/25ed6325b200bc3255a9a5a698d7b454)

### Dock の整理

Dock は基本的に使用しないのですべて削除しておく

### Finder の設定変更

## アプリケーションのインストール

こちらのスクリプトファイルをダウンロードして実行
必須、開発系のアプリを一括でインストール可能

[install_apps.sh](https://prod-files-secure.s3.us-west-2.amazonaws.com/9a84bea9-506c-41aa-845c-40e31cd5aae9/f8687e9f-50ba-48c0-a5bc-e21394a3c87a/install_apps.sh)

```bash
# install_apps.sh の中身

#!/bin/bash

# 必須アプリケーション
echo "Installing essential applications..."
brew install --cask google-chrome
brew install --cask google-japanese-ime
brew install --cask 1password
brew install --cask raycast
brew install --cask discord
brew install --cask zoom
brew install --cask notion
brew install --cask deepl
brew install --cask applite

# 開発系アプリケーション
echo "Installing development applications..."
brew install --cask visual-studio-code
brew install --cask dropbox
brew install docker
brew install --cask gyazo

```

実行方法

```bash
# 実行権限を付与
chmod +x install_apps.sh

# 実行
./install_apps.sh
```

### インストールするアプリケーション

#### 必須アプリ

- [Google Chrome](https://www.google.com/intl/ja_jp/chrome/)
- [Google 日本語入力](https://www.google.co.jp/ime/)
- [1Password](https://1password.com/jp)
- [Raycast](https://www.raycast.com/)
- [Discord](https://discord.com/download)
- [Zoom](https://zoom.us/ja/download)
- [Notion](https://www.notion.so/ja)
- [DeepL](https://www.deepl.com/ja/app)

#### 開発系

- [Visual Studio Code](https://azure.microsoft.com/ja-jp/products/visual-studio-code)
- [Dropbox](https://www.dropbox.com/home)
- [Docker](https://www.docker.com/ja-jp/products/docker-desktop/)
- [Gyazo](https://gyazo.com/download?lang=ja)

#### 作曲系

どのアプリも Homebrew でのインストール不可

- [Logic Pro](https://apps.apple.com/jp/app/logic-pro/id634148309?mt=12)
- [XLN Online Installer](https://www.xlnaudio.com/install)
- [Native Access](https://www.native-instruments.com/jp/support/downloads/)
- [IK Product Manager](https://www.ikmultimedia.com/products/productmanager/)
- [初音ミク NT & Piapro Studio](https://sonicwire.com/mypage/license/detail/201030-5913250-02-JUUEGN_1_39841)
