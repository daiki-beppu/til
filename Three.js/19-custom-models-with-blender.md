# blender でオリジナルのモデルを作成

- [blender でオリジナルのモデルを作成](#blender-でオリジナルのモデルを作成)
  - [blender のダウンロード](#blender-のダウンロード)
  - [blender の使用方法](#blender-の使用方法)
    - [エリアの操作](#エリアの操作)
      - [エリアの変更](#エリアの変更)
      - [エリアサイズの変更](#エリアサイズの変更)
      - [エリアの分割](#エリアの分割)
      - [エリアの統合](#エリアの統合)
    - [ショートカットの探し方、キーマップの変更](#ショートカットの探し方キーマップの変更)
    - [視点の操作](#視点の操作)
      - [視点の回転 \<ミドルクリック\>](#視点の回転-ミドルクリック)
      - [視点を軸に回転](#視点を軸に回転)
      - [視点の移動 \<⇧ + ドラッグ\>](#視点の移動---ドラッグ)
      - [ズームイン、ズームアウト \<⇧ (shift) + ⌘ (command) + ドラッグ\>](#ズームインズームアウト--shift---command--ドラッグ)

## blender のダウンロード

blender は[公式 web サイト](https://www.blender.org/download/) からダウンロードできます。

1. ウェブサイトにアクセスします。
2. ダウンロードページに移動し、OS に対応するバージョンを選択します。
3. ダウンロードボタンをクリックしてインストーラを取得します。

## blender の使用方法

前提:
キーの説明は Mac での説明となっています。
Windows の方は ⌥ (オプション) を Alt に変更して入力してください

推奨:

- ホイール付きマウス
- テンキー (外付けでも可)

マウスのミドルクリック(ホイールのクリック)がデフォルトで操作に割り当てられているためホイール付きのマウスの使用を推奨します。

テンキーにもデフォルトでショートカットが割り当てられているため使用を推奨します。

### エリアの操作

インターフェースの様々な部分をエリアと呼びます。エリアは非常に柔軟性が高く、レイアウトも自由にカスタマイズできます。

[![Image from Gyazo](https://i.gyazo.com/77791919551352dd85aff803bfb58026.jpg)](https://gyazo.com/77791919551352dd85aff803bfb58026)

blender の主要なエリアについて紹介します。

- `3D Viewport` デフォルトのメインエリア
- `Outliner` シーングラフを表示または管理するエリア
- `Timeline` アニメーションを作成するエリア
- `Properties` アクティブオブジェクト(選択) と環境プロパティを管理するエリア

**3D Viewport**

デフォルトのメインエリア。3D モデリングやアニメーションの作成、編集を行うためのエリアです。

[![Image from Gyazo](https://i.gyazo.com/8b1ac090383db3c59c7a3967103e5534.jpg)](https://gyazo.com/8b1ac090383db3c59c7a3967103e5534)

**Outliner**

シーングラフを表示または管理するエリア。シーン内のすべてのオブジェクトをリストで表示します。

[![Image from Gyazo](https://i.gyazo.com/9f83596e142a9bfb4bebd7bfa2422df9.jpg)](https://gyazo.com/9f83596e142a9bfb4bebd7bfa2422df9)

**Timeline**

アニメーションを作成するエリア。アニメーションのフレームを管理し、編集します。

[![Image from Gyazo](https://i.gyazo.com/6fc6f929a6ebc8a70ff3a141f0b1d0a9.jpg)](https://gyazo.com/6fc6f929a6ebc8a70ff3a141f0b1d0a9)

**Properties**

アクティブオブジェクト（選択）と環境プロパティを管理するエリア。オブジェクトの詳細設定を行います。

[![Image from Gyazo](https://i.gyazo.com/e9d0a1ea3a13f59f53efd8eb4a10d43a.jpg)](https://gyazo.com/e9d0a1ea3a13f59f53efd8eb4a10d43a)

#### エリアの変更

エリアの変更を行うには以下の手順で行います。

1. エリア左上のボタンをクリック
2. 変更したいエリアをクリック

[![Image from Gyazo](https://i.gyazo.com/bb5eff13b38e39304aafcc80fd59966a.gif)](https://gyazo.com/bb5eff13b38e39304aafcc80fd59966a)

[![Image from Gyazo](https://i.gyazo.com/5c089c81805899494b2edfd0690293f3.png)](https://gyazo.com/5c089c81805899494b2edfd0690293f3)

[![Image from Gyazo](https://i.gyazo.com/a6442b96fc92e452d8933ddf970788f5.png)](https://gyazo.com/a6442b96fc92e452d8933ddf970788f5)

#### エリアサイズの変更

2 つのエリアの間にカーソルを置いてドラッグ・アンド・ドロップする。

[![Image from Gyazo](https://i.gyazo.com/15b7781fa797cdca0121d019dd660af0.gif)](https://gyazo.com/15b7781fa797cdca0121d019dd660af0)

#### エリアの分割

エリアの分割は以下の手順で行います

1. 分割するエリアのエリアの四隅のいずれかに置く
2. 分割したいエリアにドラッグ・アンド・ドロップする

[![Image from Gyazo](https://i.gyazo.com/d83bf9386d21fa4e8d6fa663e0fd7019.gif)](https://gyazo.com/d83bf9386d21fa4e8d6fa663e0fd7019)

#### エリアの統合

エリアの統合は以下の手順で行います

1. 統合するエリアのエリアの四隅のいずれかに置く
2. 統合したいエリアにドラッグ・アンド・ドロップする

[![Image from Gyazo](https://i.gyazo.com/1b47857f7d7573d42f9759f88fee8a91.gif)](https://gyazo.com/1b47857f7d7573d42f9759f88fee8a91)

### ショートカットの探し方、キーマップの変更

キーマップの変更は、`⌘ + ,`でプリファレンスを開きキーマップを選択します。
この画面でショートカットキーをを探したり、キーマップを変更することができます。

または、画面上のメニューバーから`編集` → `プリファレンス`でも同様の操作が可能です。

[![Image from Gyazo](https://i.gyazo.com/8dd0dda2a8ae477a96b3edeb85a657e4.gif)](https://gyazo.com/8dd0dda2a8ae477a96b3edeb85a657e4)

[![Image from Gyazo](https://i.gyazo.com/481d7df4033c29024c7a419c154249b9.png)](https://gyazo.com/481d7df4033c29024c7a419c154249b9)

[![Image from Gyazo](https://i.gyazo.com/a42d402dc9799dc3d444e4402086e204.png)](https://gyazo.com/a42d402dc9799dc3d444e4402086e204)

### 視点の操作

視点をあらゆる方向に移動、回転することができます。

#### 視点の回転 <ミドルクリック>

視点の回転は、`ミドルクリック(マウスホイール をクリック)`しドラッグことで行うことができます。(トラックパッドの場合は 2 本指でドラッグすることで可能です。)

デフォルトではエリアの原点を軸に回転します。

[![Image from Gyazo](https://i.gyazo.com/538a43c80ad4d745af84c61c71c74906.gif)](https://gyazo.com/538a43c80ad4d745af84c61c71c74906)

> [!NOTE]
> オブジェクトを中心に回転してるわけではない

#### 視点を軸に回転

視点を軸に回転は、`` ⇧ + `(バッククオート) `` で行うことができます。
矢印キーで視点を移動することもできます。

英字配列以外の場合は`` ` ``のキーがないのでキーマップを変更して使用してください。

[![Image from Gyazo](https://i.gyazo.com/119edc6326d6c3184747cc134b9ab250.gif)](https://gyazo.com/119edc6326d6c3184747cc134b9ab250)

#### 視点の移動 <⇧ + ドラッグ>

視点の移動は、`⇧ + ドラッグ`で行うことができます。(トラックパッドの場合は 2 本指でドラッグすることで可能です。)

[![Image from Gyazo](https://i.gyazo.com/6fc7ba56bb4b5ac89a8254ed03164e17.gif)](https://gyazo.com/6fc7ba56bb4b5ac89a8254ed03164e17)

#### ズームイン、ズームアウト <⇧ (shift) + ⌘ (command) + ドラッグ>

ズームイン、ズームアウトは`⇧ (shift) + ⌘ (command) + ドラッグ`で行うことができます。(トラックパッドの場合はピンチイン・ピンチアウトで行うことができます。)

もしくは、画面の右側にある虫眼鏡をクリックしながらドラッグでも同様の操作が可能です。

[![Image from Gyazo](https://i.gyazo.com/6ba7457e3ae416436b8e7538b2ba2aba.gif)](https://gyazo.com/6ba7457e3ae416436b8e7538b2ba2aba)

[![Image from Gyazo](https://i.gyazo.com/9ba6757a6cbcef8cb2b0ddffab9989cd.png)](https://gyazo.com/9ba6757a6cbcef8cb2b0ddffab9989cd)

