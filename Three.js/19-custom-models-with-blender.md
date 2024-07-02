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
      - [透視投影 / 平行投影の切り替え \<テンキー 5\>](#透視投影--平行投影の切り替え-テンキー-5)
      - [視点を各軸に合わせる \<x 軸: テンキー 1, y 軸: テンキー 3, z 軸: テンキー 7\>](#視点を各軸に合わせる-x-軸-テンキー-1-y-軸-テンキー-3-z-軸-テンキー-7)
      - [カメラ視点に切り替え \<テンキー0\>](#カメラ視点に切り替え-テンキー0)
      - [視点のリセット \<⇧(shift) + C\>](#視点のリセット-shift--c)
      - [フォーカスモード \<テンキー .(ドット)\>](#フォーカスモード-テンキー-ドット)
    - [オブジェクトの操作](#オブジェクトの操作)
      - [オブジェクトの選択 \<左クリック\>](#オブジェクトの選択-左クリック)

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

視点の移動は、`⇧ (shift) + ドラッグ`で行うことができます。(トラックパッドの場合は 2 本指でドラッグすることで可能です。)

[![Image from Gyazo](https://i.gyazo.com/6fc7ba56bb4b5ac89a8254ed03164e17.gif)](https://gyazo.com/6fc7ba56bb4b5ac89a8254ed03164e17)

#### ズームイン、ズームアウト <⇧ (shift) + ⌘ (command) + ドラッグ>

ズームイン、ズームアウトは`⇧ (shift) + ⌘ (command) + ドラッグ`で行うことができます。(トラックパッドの場合はピンチイン・ピンチアウトで行うことができます。)

もしくは、画面の右側にある虫眼鏡をクリックしながらドラッグでも同様の操作が可能です。

[![Image from Gyazo](https://i.gyazo.com/6ba7457e3ae416436b8e7538b2ba2aba.gif)](https://gyazo.com/6ba7457e3ae416436b8e7538b2ba2aba)

[![Image from Gyazo](https://i.gyazo.com/9ba6757a6cbcef8cb2b0ddffab9989cd.png)](https://gyazo.com/9ba6757a6cbcef8cb2b0ddffab9989cd)

#### 透視投影 / 平行投影の切り替え <テンキー 5>

透視投影 / 平行投影の切り替えは`テンキーの5`で行うことができます。
もしくは、画面の右側のエリアマークをクリックで同様の操作が可能です。

透視投影: 視点に近い物体ほど大きく、遠くのものほど小さく見える。人間の目にに近い視点、奥行き感や遠近感を再現できる
平行投影: オブジェクトのサイズが視点からの距離によって変化しない。すべての物体が実際の寸法に基づいて表示される

デフォルトは透視投影

[![Image from Gyazo](https://i.gyazo.com/25c098c06fdeffa952b2ecd301367ba5.gif)](https://gyazo.com/25c098c06fdeffa952b2ecd301367ba5)

[![Image from Gyazo](https://i.gyazo.com/4a8738c8cb43812d3a37af851ecf06f4.png)](https://gyazo.com/4a8738c8cb43812d3a37af851ecf06f4)

[![Image from Gyazo](https://i.gyazo.com/ae4b4f3ab57cc921197c179aa283f0ab.png)](https://gyazo.com/ae4b4f3ab57cc921197c179aa283f0ab)

#### 視点を各軸に合わせる <x 軸: テンキー 1, y 軸: テンキー 3, z 軸: テンキー 7>

視点を各軸に合わせるには `x 軸: テンキー 1, y 軸: テンキー 3, z 軸: テンキー 7`で行うことができます。
もしくは、画面右上の軸をクリックすることで同様の操作が可能です。

`⌘ (command) + 各軸のショートカット`で視点がマイナス軸になる

[![Image from Gyazo](https://i.gyazo.com/82d4c859441d755305895bf0c9b94dad.gif)](https://gyazo.com/82d4c859441d755305895bf0c9b94dad)

#### カメラ視点に切り替え <テンキー0>

カメラ視点に切り替えは`テンキー0`で行うことができます。
もしくは画面右上のカメラマークをクリックで同様の操作が可能です。

[![Image from Gyazo](https://i.gyazo.com/33ebe3a1c044b10e60f717a16a69d708.gif)](https://gyazo.com/33ebe3a1c044b10e60f717a16a69d708)

#### 視点のリセット <⇧(shift) + C>

カメラのリセットは`⇧(shift) + C`で行うことができます。

[![Image from Gyazo](https://i.gyazo.com/3f47286badc603b4feb6531e48fba45e.gif)](https://gyazo.com/3f47286badc603b4feb6531e48fba45e)

#### フォーカスモード <テンキー .(ドット)>

フォーカスモードは選択したオブジェクトを画面いっぱいに表示する機能です。
`テンキー .(ドット)`で行うことができます。

### オブジェクトの操作

#### オブジェクトの選択 <左クリック>

オブジェクトの選択は`左クリック`で行うことができます。
`⇧ (shift) + 左クリック`で複数選択ができます。

オブジェクトの選択は元に戻せるアクションとみなされるので `⌘ (command) + Z`で選択を戻すことができます。

すべて選択は`A` 解除は `A (2回押す)`
