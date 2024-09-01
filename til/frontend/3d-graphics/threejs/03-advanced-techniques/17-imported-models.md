# 3D モデルのインポート

- [3D モデルのインポート](#3d-モデルのインポート)
  - [フォーマットについて](#フォーマットについて)
    - [GLTF について](#gltf-について)
    - [GLTF の形式について](#gltf-の形式について)
      - [glTF-default（標準形式）](#gltf-default標準形式)
      - [glTF-Binary（バイナリ形式）](#gltf-binaryバイナリ形式)
      - [glTF-Draco（圧縮形式）](#gltf-draco圧縮形式)
      - [glTF-Embedded（埋め込み形式）](#gltf-embedded埋め込み形式)
      - [選び方のポイント](#選び方のポイント)
  - [3D モデルの探し方](#3d-モデルの探し方)
  - [3D モデルを表示](#3d-モデルを表示)
    - [Draco 圧縮形式を表示](#draco-圧縮形式を表示)
      - [Draco 圧縮のメリット、デメリット](#draco-圧縮のメリットデメリット)
  - [アニメーション付きモデルのインポート](#アニメーション付きモデルのインポート)
  - [Three.js エディター](#threejs-エディター)

## フォーマットについて

- OBJ
- FBX
- STL
- PLY
- COLLADA
- 3DS
- `GLTF`

たくさんの 3D モデルのフォーマットがありますがここでは
`GLTF` に絞って解説します。

### GLTF について

GLTF は `GL Transmission Format` の略称で、Khronos Group (OpenGL、WebGL、Vulkan、Collada の開発元) によって作成されました。
AMD、Nvidia、Apple、Google、Microsoft など、多くの企業がメンバーとして参加しています。

GLTF は、3D シーンを構成する様々な要素をまとめて保存できるフォーマットです。

- ジオメトリ (オブジェクトの形状)
- マテリアル (オブジェクトの質感)
- カメラ (視点の設定)
- ライト (光源の設定)
- シーングラフ (オブジェクトの親子関係や位置関係)
- アニメーション (動きの設定)
- スケルトン (キャラクターなどの骨組み)
  さらに、以下のファイル形式もサポートしています。

- JSON (データ構造をわかりやすく記述できるテキスト形式)
- バイナリ (データを効率よく保存できる形式)
- 埋め込みテクスチャ (画像データを直接ファイル内に埋め込む形式)

GLTF は WebGL での標準フォーマットとして採用されており、多くの 3D ソフトウェア、ゲームエンジン、ライブラリが対応しています。

ただし、GLTF が常に最適な選択とは限りません。プロジェクトの要件に合わせて、必要なデータが揃っているか、ファイルサイズが適切か、読み込み速度が十分かなどを考慮して、最適なフォーマットを選択する必要があります。

### GLTF の形式について

GLTF は一つの 3D モデル形式ですが、データの保存方法によって 4 つの主要な形式があります。

#### glTF-default（標準形式）

**特徴：後からデータ編集が容易**

- `.gltf`：人間が読める JSON ファイル（カメラ、ライト、シーン情報など）
- `.bin`：コンピュータ向けバイナリファイル（3D モデルの形状データなど）
- `.png`：テクスチャ画像ファイル

#### glTF-Binary（バイナリ形式）

**特徴：読み込みが速く、設定が簡単。ただし、後からの編集は難しい**

すべてのデータが一つの`.glb` ファイルに統合

#### glTF-Draco（圧縮形式）

**特徴：非常に軽量だが、解凍に時間がかかる場合がある**

Draco 圧縮技術を使用して、ファイルサイズを大幅に縮小

#### glTF-Embedded（埋め込み形式）

**特徴：1 ファイルで完結するが、サイズが大きくなる傾向がある**

すべてのデータが一つの JSON ファイルに統合

#### 選び方のポイント

後でテクスチャやライトの調整が必要な場合：`glTF-default`
データを変更しない場合：`glTF-Binary`
ファイルサイズを極限まで小さくしたい場合：`glTF-Draco`（圧縮）を検討

どの形式を選ぶかは、プロジェクトの要件（ファイルサイズ、読み込み速度、編集のしやすさなど）に応じて決めるのが良いでしょう。

## 3D モデルの探し方

GLTF チームが公開しているモデルがあります。
単純な三角形からリアルなモデル、アニメーション、モーフィング、クリアコート マテリアルなど、さまざまなモデルも提供しています。

こちらのリポジトリで探してみてください。
https://github.com/KhronosGroup/glTF-Sample-Models

## 3D モデルを表示

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/8e48b0c2ad5b551c381a708427529159.png)](https://gyazo.com/8e48b0c2ad5b551c381a708427529159)

3D モデルのロードは以下の手順で行う

- `GLTFLoader` のインポート
- モジュールをロード
- シーンに追加

```js
// GLTFLoader のインポート
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
```

```js
// GLTF 形式の 3D モデルを読み込むためのローダーを作成
const gltfLoader = new GLTFLoader();
```

```js
// アヒルのインポート (モデルは任意のパスを指定)
gltfLoader.load("./models/Duck/glTF/Duck.gltf", (gltf) => {
  // モデルの位置を調整
  gltf.scene.position.set(2, 0, 0);

  // モデルの向きを調整
  gltf.scene.rotation.y = -Math.PI / 2;
  scene.add(gltf.scene);
});
```

```js
// フライトヘルメットをインポート (モデルのは任意のパスを指定)
gltfLoader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
  // モデルのサイズを調整
  gltf.scene.scale.setScalar(3);
  scene.add(gltf.scene);
});
```

### Draco 圧縮形式を表示

```js
// DRACOLoader のインポート
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
```

```js
// GLTF-Draco 形式の 3D モデルを読み込むためのローダーを作成
const dracoLoader = new DRACOLoader();
```

Draco デコーダーは、Draco 圧縮された 3D モデルを展開するためのツールです。JavaScript 版と WebAssembly(wasm)版があり、別スレッドで実行することもできます。
これらの機能により、モデルの読み込み速度が大幅に向上します。

Three.js には Draco デコーダーが既に含まれていますが、別ファイルとして存在するため、自分で配置する必要があります。

`/node_modules/three/examples/jsm/libs/` にある `Draco` フォルダをコピーして
`/static/` フォルダに貼り付け

```js
// Draco デコーダーのパスを設定
dracoLoader.setDecoderPath("/draco/");
```

```js
// Draco 圧縮に対応する設定
gltfLoader.setDRACOLoader(dracoLoader);
```

```js
// アヒルのインポート (Draco 圧縮 ver)
// 任意のパスを指定
gltfLoader.load("./models/Duck/glTF-Draco/Duck.gltf", (gltf) => {
  scene.add(gltf.scene.children[0]);
});
```

#### Draco 圧縮のメリット、デメリット

Draco 圧縮の使用は状況に応じて判断する必要があります。
プロジェクトの規模、モデルの数と大きさ、ユーザー体験の要求などを考慮して、最適な選択をすることが重要です。

**メリット：**

3D モデルのファイルサイズが小さくなる

**デメリット：**

- DRACOLoader クラスとデコーダーの追加読み込みが必要
- 圧縮ファイルの解凍に時間とリソースがかかる
- 体験開始時に短い停止が発生する可能性がある

Worker と WebAssembly を使用しても、この問題は完全には解消されない

使用判断のポイント：

- 小さなモデル（例：100kB の幾何学データ）の場合、Draco 圧縮は不要かもしれない
- 大量のモデル（数 MB 以上）を読み込む場合、開始時の一時停止を許容できれば、Draco 圧縮が有用

## アニメーション付きモデルのインポート

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/9937c462046c6bcce2ef6e8b348a3ab4.gif)](https://gyazo.com/9937c462046c6bcce2ef6e8b348a3ab4)

```js
// アニメーションミキサーを格納 (tick 関数で更新するため、グローバルスコープで定義)
let mixer = null;

// 3D モデルのロード
gltfLoader.load("./models/Fox/glTF/Fox.gltf", (gltf) => {
  // アニメーションミキサーをモデルのシーンに関連付け
  mixer = new THREE.AnimationMixer(gltf.scene);

  // モデルに含まれるアニメーションを設定
  const action = mixer.clipAction(gltf.animations[1]);

  // アニメーションの再生
  action.play();

  // モデルのサイズを調整
  gltf.scene.scale.setScalar(0.025);

  // シーンに追加;
  scene.add(gltf.scene);
});
```

```js
// アニメーション
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // アニメーションミキサーの更新

  if (mixer !== null) {
    // アニメーションミキサーが存在する場合、アニメーションを更新
    mixer.update(deltaTime);
  }

  // ...
};
```

## Three.js エディター

Three.js には独自のオンライン エディターがあります。
こちらからアクセスできます: https://threejs.org/editor/

3D ソフトウェアに似ていますが機能は限られています。
ただ、簡単なテストをしたりする際に便利なので知っておいて損はないと思います。
