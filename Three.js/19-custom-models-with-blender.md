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
      - [ズームイン、ズームアウト \<マウスホイール\>](#ズームインズームアウト-マウスホイール)
      - [透視投影 / 平行投影の切り替え \<テンキー 5\>](#透視投影--平行投影の切り替え-テンキー-5)
      - [視点を各軸に合わせる \<x 軸: テンキー 1, y 軸: テンキー 3, z 軸: テンキー 7\>](#視点を各軸に合わせる-x-軸-テンキー-1-y-軸-テンキー-3-z-軸-テンキー-7)
      - [カメラ視点に切り替え \<テンキー 0\>](#カメラ視点に切り替え-テンキー-0)
      - [視点のリセット \<⇧(shift) + C\>](#視点のリセット-shift--c)
      - [フォーカスモード \<テンキー .(ドット)\>](#フォーカスモード-テンキー-ドット)
    - [オブジェクトの操作](#オブジェクトの操作)
      - [オブジェクトの選択 \<左クリック\>](#オブジェクトの選択-左クリック)
      - [いろいろな選択方法 \<全選択: A, エリア選択: B, サークル選択: C\>](#いろいろな選択方法-全選択-a-エリア選択-b-サークル選択-c)
      - [オブジェクトの作成 \<⇧ (shift) + A\>](#オブジェクトの作成--shift--a)
      - [オブジェクトの削除 ](#オブジェクトの削除-)
      - [オブジェクトの非表示 ](#オブジェクトの非表示-)
      - [オブジェクトの変換\<G: 移動, R: 回転, S: スケールの変更\>](#オブジェクトの変換g-移動-r-回転-s-スケールの変更)
    - [モードの操作](#モードの操作)
      - [モードの変更 \<^ (control) + Tab\>](#モードの変更--control--tab)
      - [編集モード \<キーボード 1: 頂点選択, キーボード 2: 辺選択, キーボード 3: 面選択\>](#編集モード-キーボード-1-頂点選択-キーボード-2-辺選択-キーボード-3-面選択)
    - [シェーディングの操作 ](#シェーディングの操作-)
    - [プロパティの操作](#プロパティの操作)
      - [オブジェクトプロパティ](#オブジェクトプロパティ)
      - [モディファイアプロパティ](#モディファイアプロパティ)
      - [マテリアルプロパティ](#マテリアルプロパティ)
    - [レンダーエンジン](#レンダーエンジン)
    - [検索 \< F3 \>](#検索--f3-)
    - [設定の保存 \<ファイル → デフォルト → スタートアップを保存\>](#設定の保存-ファイル--デフォルト--スタートアップを保存)
  - [ハンバーガーの制作](#ハンバーガーの制作)
    - [単位の決定](#単位の決定)
    - [下のバンズの作成 (立方体から作成)](#下のバンズの作成-立方体から作成)
    - [ファイルの保存](#ファイルの保存)
    - [パティ(肉)の作成 (バンズを複製して作成)](#パティ肉の作成-バンズを複製して作成)

## blender のダウンロード

blender は[公式サイト](https://www.blender.org/download/) からダウンロードできます。

1. ウェブサイトにアクセスします。
2. ダウンロードページに移動し、OS に対応するバージョンを選択します。
3. ダウンロードボタンをクリックしてインストーラを取得します。

## blender の使用方法

前提:
キーの説明は Mac での説明となっています。
Windows の方は` ⌥ (オプション) を Alt `に変更して入力してください

Blender の詳細なドキュメントについては、[Blender 公式ドキュメント](https://docs.blender.org/manual/en/latest/)をご参照ください。

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

2 つのエリアの間にカーソルを置いてドラッグ&ドロップする。

[![Image from Gyazo](https://i.gyazo.com/15b7781fa797cdca0121d019dd660af0.gif)](https://gyazo.com/15b7781fa797cdca0121d019dd660af0)

#### エリアの分割

エリアの分割は以下の手順で行います

1. 分割するエリアのエリアの四隅のいずれかに置く
2. 分割したいエリアにドラッグ&ドロップする

[![Image from Gyazo](https://i.gyazo.com/d83bf9386d21fa4e8d6fa663e0fd7019.gif)](https://gyazo.com/d83bf9386d21fa4e8d6fa663e0fd7019)

#### エリアの統合

エリアの統合は以下の手順で行います

1. 統合するエリアのエリアの四隅のいずれかに置く
2. 統合したいエリアにドラッグ&ドロップする

[![Image from Gyazo](https://i.gyazo.com/1b47857f7d7573d42f9759f88fee8a91.gif)](https://gyazo.com/1b47857f7d7573d42f9759f88fee8a91)

### ショートカットの探し方、キーマップの変更

`⌘ (command) + ,`でプリファレンスを開きキーマップを選択

または、画面上のメニューバーから`編集` → `プリファレンス`でも同様の操作が可能です。

[![Image from Gyazo](https://i.gyazo.com/8dd0dda2a8ae477a96b3edeb85a657e4.gif)](https://gyazo.com/8dd0dda2a8ae477a96b3edeb85a657e4)

[![Image from Gyazo](https://i.gyazo.com/481d7df4033c29024c7a419c154249b9.png)](https://gyazo.com/481d7df4033c29024c7a419c154249b9)

[![Image from Gyazo](https://i.gyazo.com/a42d402dc9799dc3d444e4402086e204.png)](https://gyazo.com/a42d402dc9799dc3d444e4402086e204)

### 視点の操作

視点をあらゆる方向に移動、回転することができます。

#### 視点の回転 <ミドルクリック>

`ミドルクリック(マウスホイール をクリック)`しドラッグで行うことができます。
トラックパッドの場合は 2 本指でドラッグすることで同様の操作が可能です。

デフォルトでは 3D Viewport の中心を軸に回転します。

[![Image from Gyazo](https://i.gyazo.com/538a43c80ad4d745af84c61c71c74906.gif)](https://gyazo.com/538a43c80ad4d745af84c61c71c74906)

> [!NOTE]
> オブジェクトを中心に回転してるわけではない

#### 視点を軸に回転

視点を軸に回転は、ショートカットキーを自分で設定する必要があります。

[![Image from Gyazo](https://i.gyazo.com/119edc6326d6c3184747cc134b9ab250.gif)](https://gyazo.com/119edc6326d6c3184747cc134b9ab250)

#### 視点の移動 <⇧ + ドラッグ>

`⇧ (shift) + ドラッグ`で視点の移動を行うことができます。
トラックパッドの場合は 2 本指でドラッグすることで同様の操作が可能です。

[![Image from Gyazo](https://i.gyazo.com/6fc7ba56bb4b5ac89a8254ed03164e17.gif)](https://gyazo.com/6fc7ba56bb4b5ac89a8254ed03164e17)

#### ズームイン、ズームアウト <マウスホイール>

`マウスホイール`でズームイン、ズームアウトを行うことができます。
トラックパッドの場合はピンチイン・ピンチアウトで同様の操作が可能です。

もしくは、画面の右側にある虫眼鏡をクリックしながらドラッグでも同様の操作が可能です。

[![Image from Gyazo](https://i.gyazo.com/6ba7457e3ae416436b8e7538b2ba2aba.gif)](https://gyazo.com/6ba7457e3ae416436b8e7538b2ba2aba)

[![Image from Gyazo](https://i.gyazo.com/9ba6757a6cbcef8cb2b0ddffab9989cd.png)](https://gyazo.com/9ba6757a6cbcef8cb2b0ddffab9989cd)

#### 透視投影 / 平行投影の切り替え <テンキー 5>

`テンキーの5`で透視投影 / 平行投影の切り替えができます。
もしくは、画面の右側のエリアマークをクリックで同様の操作が可能です。

透視投影: 視点に近い物体ほど大きく、遠くのものほど小さく見える。人間の目に近い視点、奥行き感や遠近感を再現できる
平行投影: オブジェクトのサイズが視点からの距離によって変化しない。すべての物体が実際の寸法に基づいて表示される

デフォルトは透視投影

[![Image from Gyazo](https://i.gyazo.com/25c098c06fdeffa952b2ecd301367ba5.gif)](https://gyazo.com/25c098c06fdeffa952b2ecd301367ba5)

[![Image from Gyazo](https://i.gyazo.com/4a8738c8cb43812d3a37af851ecf06f4.png)](https://gyazo.com/4a8738c8cb43812d3a37af851ecf06f4)

[![Image from Gyazo](https://i.gyazo.com/ae4b4f3ab57cc921197c179aa283f0ab.png)](https://gyazo.com/ae4b4f3ab57cc921197c179aa283f0ab)

#### 視点を各軸に合わせる <x 軸: テンキー 1, y 軸: テンキー 3, z 軸: テンキー 7>

`x 軸: テンキー 1, y 軸: テンキー 3, z 軸: テンキー 7`で行うことができます。
もしくは、画面右上の軸をクリックすることで同様の操作が可能です。

`⌘ (command) + 各軸のショートカット`で視点がマイナス軸になる

[![Image from Gyazo](https://i.gyazo.com/82d4c859441d755305895bf0c9b94dad.gif)](https://gyazo.com/82d4c859441d755305895bf0c9b94dad)

#### カメラ視点に切り替え <テンキー 0>

`テンキー0`でカメラ視点に切り替えを行うことができます。
もしくは画面右上のカメラマークをクリックで同様の操作が可能です。

[![Image from Gyazo](https://i.gyazo.com/33ebe3a1c044b10e60f717a16a69d708.gif)](https://gyazo.com/33ebe3a1c044b10e60f717a16a69d708)

#### 視点のリセット <⇧(shift) + C>

`⇧(shift) + C`で行うことができます。

[![Image from Gyazo](https://i.gyazo.com/3f47286badc603b4feb6531e48fba45e.gif)](https://gyazo.com/3f47286badc603b4feb6531e48fba45e)

#### フォーカスモード <テンキー .(ドット)>

`テンキー .(ドット)`で行うことができます。
フォーカスモードは選択したオブジェクトを画面いっぱいに表示する機能です。

### オブジェクトの操作

オブジェクトの選択、作成、削除などいろんなことができます。

#### オブジェクトの選択 <左クリック>

`左クリック`で行うことができます。
`⇧ (shift) + 左クリック`で複数選択、解除ができます。

複数選択した場合、薄いオレンジがアクティブなオブジェクト
アクティブなオブジェクトは他の選択されたオブジェクトとは異なり、ユーザーが特定の操作を行う際の基準となるオブジェクトです。

モディファイアの追加や変換の操作で重要な役割を果たします。

オブジェクトの選択は元に戻せるアクションとみなされるので `⌘ (command) + Z`で選択を戻すことができます。

#### いろいろな選択方法 <全選択: A, エリア選択: B, サークル選択: C>

[![Image from Gyazo](https://i.gyazo.com/4ba44fb17fa255b716271090039550e7.gif)](https://gyazo.com/4ba44fb17fa255b716271090039550e7)

**全選択**
`A`で全選択、`A (2回押す)`全選択の解除ができます

**エリア選択**

`B`でエリア選択ドラッグ&ドロップで選択範囲を決定します

**サークル選択**

`C`でサークル選択
サークル選択では`マウスホイール`で半径を変更できます。
`esc`でサークル選択解除できます。

#### オブジェクトの作成 <⇧ (shift) + A>

[![Image from Gyazo](https://i.gyazo.com/afdebc4dfd0cf4cd4fd06b7cc93b535e.gif)](https://gyazo.com/afdebc4dfd0cf4cd4fd06b7cc93b535e)

`⇧ (shift) + A`でメニューを表示して
作成したいオブジェクトを選択

オブジェクトを作成すると左下に小さなボタンが表示されます
こちらをクリックすることでオブジェクトのパラメータを操作することができます。

ほかの場所をクリックするとメニューは消えてしまいますが、`F9`で再度表示することができます。

#### オブジェクトの削除 <X>

[![Image from Gyazo](https://i.gyazo.com/4920915ab131e991e110089715d00d8a.gif)](https://gyazo.com/4920915ab131e991e110089715d00d8a)

オブジェクトを選択して`X`で削除するかの確認が表示されるので選択するとオブジェクトを削除されます。

#### オブジェクトの非表示 <H>

[![Image from Gyazo](https://i.gyazo.com/b8325426695337567d4909883ac597e9.gif)](https://gyazo.com/b8325426695337567d4909883ac597e9)

`H`で非表示`⌥ (option) + H`で隠れたオブジェクトを表示
`⇧ (shift) + H`で選択したオブジェクト以外を非表示にできます。

Outliner の目のアイコンをクリックすることでも同様の操作が可能です。

#### オブジェクトの変換<G: 移動, R: 回転, S: スケールの変更>

[![Image from Gyazo](https://i.gyazo.com/571e54d6515e2ca76073ea7709cd3ca3.gif)](https://gyazo.com/571e54d6515e2ca76073ea7709cd3ca3)

`G`で移動
`R`で回転
`S`でスケールの変更

左側のメニューから選択することで同様の操作が可能です。
メニューが出ていない場合は`T`で表示できます。

**各軸に合わせて移動**

[![Image from Gyazo](https://i.gyazo.com/671b845e5e1b1ac5a5e86a82c02f71ef.gif)](https://gyazo.com/671b845e5e1b1ac5a5e86a82c02f71ef)

X 軸: `G → X`
Y 軸: `G → Y`
Z 軸: `G → Z`

**各軸に合わせて回転**

[![Image from Gyazo](https://i.gyazo.com/f344c0faa6b1dda70f3f514a9a74b383.gif)](https://gyazo.com/f344c0faa6b1dda70f3f514a9a74b383)

X 軸: `R → X`
Y 軸: `R → Y`
Z 軸: `R → Z`

**各軸に合わせてスケールの変更**

[![Image from Gyazo](https://i.gyazo.com/f8913e15b962d87431859ed0394127f7.gif)](https://gyazo.com/f8913e15b962d87431859ed0394127f7)

X 軸: `S → X`
Y 軸: `S → Y`
Z 軸: `S → Z`

### モードの操作

blender には様々なモードが用意されています。

- オブジェクトモード: オブジェクトの選択、移動、回転、スケールの変更を行います。
- 編集モード: メッシュオブジェクトの頂点、辺、面の編集を行います
- ウェイトペイント: ウェイトをペイントして頂点グループに割り当てます。
- 頂点ペイント: メッシュの頂点に色をペイントします。
- テクスチャペイント: メッシュの表面に直接テクスチャをペイントします。
- スカルプトモード: メッシュを粘土のように彫刻します。

#### モードの変更 <^ (control) + Tab>

[![Image from Gyazo](https://i.gyazo.com/0b80f0bd0a35dd562d0799e08fa4bba2.gif)](https://gyazo.com/0b80f0bd0a35dd562d0799e08fa4bba2)

`^ (control) + Tab`でメニューを表示して選択

`Tab`でオブジェクトモードと編集モードの切り替えを行うことができます。

#### 編集モード <キーボード 1: 頂点選択, キーボード 2: 辺選択, キーボード 3: 面選択>

`キーボード1` 頂点選択
`キーボード2` 辺選択
`キーボード3` 面選択

もしくは画面左上のアイコンをクリック

[![Image from Gyazo](https://i.gyazo.com/26502a8caeb68bb2f42f435360f337ba.png)](https://gyazo.com/26502a8caeb68bb2f42f435360f337ba)

### シェーディングの操作 <Z>

[![Image from Gyazo](https://i.gyazo.com/033939c6e2a21b77d98a805ca9a1185a.gif)](https://gyazo.com/033939c6e2a21b77d98a805ca9a1185a)

`Z`でメニューを表示して選択

- ソリッド: すべてのオブジェクトに同じマテリアルを使用する (デフォルト)
- マテリアルプレビュー: マテリアルとテクスチャのプレビューを表示
- ワイヤーフレーム: ワイヤーフレームで表示
- レンダー: 低品質のレンダリングで表示、最もリアルだがパフォーマンスも最も悪い

[![Image from Gyazo](https://i.gyazo.com/ca36be24da81323649d4ff926e89ce36.png)](https://gyazo.com/ca36be24da81323649d4ff926e89ce36)

[![Image from Gyazo](https://i.gyazo.com/7b606bd7a6da9ab3591a62bd6a6a3779.png)](https://gyazo.com/7b606bd7a6da9ab3591a62bd6a6a3779)

[![Image from Gyazo](https://i.gyazo.com/28f53891e0e3d85d2b13c2f59ad2caf4.png)](https://gyazo.com/28f53891e0e3d85d2b13c2f59ad2caf4)

[![Image from Gyazo](https://i.gyazo.com/2fb23baa31e40534dcfd44ebbd36dcf6.png)](https://gyazo.com/2fb23baa31e40534dcfd44ebbd36dcf6)

### プロパティの操作

[![Image from Gyazo](https://i.gyazo.com/77791919551352dd85aff803bfb58026.jpg)](https://gyazo.com/77791919551352dd85aff803bfb58026)

[![Image from Gyazo](https://i.gyazo.com/e9d0a1ea3a13f59f53efd8eb4a10d43a.jpg)](https://gyazo.com/e9d0a1ea3a13f59f53efd8eb4a10d43a)

Properties でたくさんのプロパティを編集できます

**共通プロパティ**

- ツール: 使用中のツールの設定を変更
- レンダー: レンダリングの設定、画像やアニメーションの品質、解像度など
- 出力: レンダリング結果の出力先やフォーマットを設定
- ビューレイヤー: レイヤー別にレンダリングを設定
- シーン: シーン全体の管理、単位や重力、フレームレートなど
- ワールド: シーンの環境設定を変更、背景色や環境テクスチャ、ライティングなど
- コレクション: オブジェクトのコレクションを管理。コレクションは、オブジェクトをグループ化して整理するための機能

**個別プロパティ (オブジェクトの種類によって異なる)**

- オブジェクト: 選択したオブジェクトの変換、表示、グループ設定
- モディファイア: オブジェクトにモディファイアを追加して、非破壊的な編集を行う
- パーティクル: パーティクルシステムの設定を行います。髪、炎、煙などのエフェクトを作成
- 物理演算: オブジェクトの物理シミュレーションの設定を行います。布、液体、剛体など
- コンストレイント: オブジェクトの動きを他のオブジェクトや特定のルールに制限します。
- データ: オブジェクトのデータブロックに関する設定を行います。メッシュ、カーブ、テキストなどの詳細を設定
- マテリアル: オブジェクトの表面に適用するマテリアル（質感）を設定
- テクスチャ: マテリアルに適用するテクスチャの設定

#### オブジェクトプロパティ

[![Image from Gyazo](https://i.gyazo.com/6c003d1655fbc8500ad0a95fe133a48a.png)](https://gyazo.com/6c003d1655fbc8500ad0a95fe133a48a)

オブジェクトの値を正確に変更することができる

#### モディファイアプロパティ

[![Image from Gyazo](https://i.gyazo.com/54a48d9088da9bf7dc176a103f314846.png)](https://gyazo.com/54a48d9088da9bf7dc176a103f314846)

オブジェクトにモディファイアを追加して、非破壊的な編集を行う
細分化、曲げ、拡大、縮小など

#### マテリアルプロパティ

[![Image from Gyazo](https://i.gyazo.com/733fcacac9fbaa201dcb27c3fec060e5.png)](https://gyazo.com/733fcacac9fbaa201dcb27c3fec060e5)

デフォルトでは Material という名前のマテリアルにアクセスできる
削除していない場合、デフォルトのキューブに適用されるはず。

`-`ボタンでマテリアルを削除
`+`ボタンでマテリアル組み合わせることができる

通常はメッシュごと 1 つのマテリアルのみを使用する。

メッシュにマテリアルがない場合は、既存のものを選択、もしくは、`新規`ボタンで新しいマテリアルを作成することができる

[![Image from Gyazo](https://i.gyazo.com/ffb80abc87c1f05019fff4666999bd1c.png)](https://gyazo.com/ffb80abc87c1f05019fff4666999bd1c)

1 つのマテリアルに対して異なるタイプのサーフェスを使用できる。
デフォルトは`プリンシプルBSDF`で Three.js の `MeshStandardMaterial`と同様に PBR を使用します。
`プリンシプルBSDF`で Three.js にエクスポートするとよく似た結果が得られる

### レンダーエンジン

レンダーエンジンには 3 つの種類があります。

- `EEVEE`: リアルタイムレンダーエンジン。Three.js と同様に GPU を使用し、高性能ですが、リアリズム、光の反射、屈折などの制限がある。デフォルトで設定されている
- `Workbench`: あまり使用されなくなったレンダーエンジン。パフォーマンスは優れているがあまりリアルな結果は得られない。
- `Cycles`: レイトレーシングエンジン。とてもリアルで光の反射、深い反射、深い屈折、その他多くの機能を処理します。パフォーマンス面で非常に遅く、シーンをレンダリングするのに何時間、はたまた数日かかるかもしれません。

`F12`でレンダリングのプレビュー確認することができる

### 検索 < F3 >

[![Image from Gyazo](https://i.gyazo.com/fffdcf401d1ebeeb79e1a87943cc6cc8.png)](https://gyazo.com/fffdcf401d1ebeeb79e1a87943cc6cc8)

`F3`で検索パネルを開く
ここでボタンやショートカットを探すことができる

### 設定の保存 <ファイル → デフォルト → スタートアップを保存>

[![Image from Gyazo](https://i.gyazo.com/b83f2b0b07b3cd43662f79318e561d9e.gif)](https://gyazo.com/b83f2b0b07b3cd43662f79318e561d9e)

`ファイル → デフォルト → スタートアップを保存`で現在の設定が blender を開いたときのデフォルトの設定になります。

## ハンバーガーの制作

### 単位の決定

Three.js と同様にスケールの単位をあらかじめ設定しておきましょう
デフォルトでは 1 の単位は `1m` です。

今回は Three.js に合わせるために 単位を一意のものとして扱います
シーンプロパティから `単位系 なし` に設定します

[![Image from Gyazo](https://i.gyazo.com/261f78768b07da463442b407f33496df.png)](https://gyazo.com/261f78768b07da463442b407f33496df)

メートル、センチメートル、キロメートルなどの特定の単位に縛られずに自由に解釈できるようになります。

### 下のバンズの作成 (立方体から作成)

`⇧ (shift) + P` で立方体を選択
メニューからサイズを 10 に変更(単位は cm)

[![Image from Gyazo](https://i.gyazo.com/9e34e7f63704527ac80d6caf1beb5058.png)](https://gyazo.com/9e34e7f63704527ac80d6caf1beb5058)

Properties からモディファイアー(レンチのアイコン)を選択 → モディファイアーを追加 → 生成 → サブディビジョンサーフェスを選択

[![Image from Gyazo](https://i.gyazo.com/5bf78228800058ccff890234e8231a3d.png)](https://gyazo.com/5bf78228800058ccff890234e8231a3d)

[![Image from Gyazo](https://i.gyazo.com/5cf1cb810caf26ffb68a13176c7ca768.png)](https://gyazo.com/5cf1cb810caf26ffb68a13176c7ca768)

ビューポートのレベル数を `4`に変更 → オブジェクトを選択して右クリック → スムーズシェードを選択

[![Image from Gyazo](https://i.gyazo.com/3c7385f9dd1499d65043cb9809e5120a.png)](https://gyazo.com/3c7385f9dd1499d65043cb9809e5120a)

[![Image from Gyazo](https://i.gyazo.com/df18542bb0dc2887d0ca84d8b1ce1e51.png)](https://gyazo.com/df18542bb0dc2887d0ca84d8b1ce1e51)

[![Image from Gyazo](https://i.gyazo.com/944050155d1095493f24a737b46598b0.gif)](https://gyazo.com/944050155d1095493f24a737b46598b0)

`Tab`を押して編集モードに変更 → `3`で面選択 → 下の面を選択して `G → Z`で調節 → 上の面を選択して `G → Z`で調節

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/3d52a134231bffb31fb445c819c3bd8f.png)](https://gyazo.com/3d52a134231bffb31fb445c819c3bd8f)

`⌘ (command) + R`でループカット(オブジェクトの隅に 4 つの頂点を追加) → バンズの形を調整(新しい辺を追加したら辺を上部に移動) → 再度ループカット → バンズ形を調整(新しい辺を追加したら辺を下部に移動)

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/2da5205eaed2550bc1d59595645d23e0.png)](https://gyazo.com/2da5205eaed2550bc1d59595645d23e0)

### ファイルの保存

`⌘ (command) + S`でファイルの保存
もしくは、画面上のメニューバーから`ファイル → 保存`で同様の操作が可能です。

(※こちらの操作は初回の保存のみです)
ファイルの保存先とファイルの名前を設定 → 名前をつけて保存をクリック

[![Image from Gyazo](https://i.gyazo.com/3dd777fd61835b87ab564919f25d3e47.png)](https://gyazo.com/3dd777fd61835b87ab564919f25d3e47)

### パティ(肉)の作成 (バンズを複製して作成)

