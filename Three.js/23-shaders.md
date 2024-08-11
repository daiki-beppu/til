# シェーダー

- [シェーダーについて](#シェーダーについて)
  - [頂点シェーダー](#頂点シェーダー)
  - [フラグメントシェーダー](#フラグメントシェーダー)
  - [まとめ シェーダーについて](#まとめ-シェーダーについて)
- [独自のシェーダーを書く理由](#独自のシェーダーを書く理由)
  - [Three.js だけでは複雑なビジュアル効果や特殊な計算ができない](#threejs-だけでは複雑なビジュアル効果や特殊な計算ができない)
  - [パフォーマンス向上のため](#パフォーマンス向上のため)
- [RawShaderMaterial を使用して最初のシェーダーを作成](#rawshadermaterial-を使用して最初のシェーダーを作成)
- [Sheder を別のファイルに分ける](#sheder-を別のファイルに分ける)
  - [ファイルのインポート](#ファイルのインポート)
- [RawShaderMaterial のプロパティ](#rawshadermaterial-のプロパティ)
  - [使用可能な一般的なプロパティ](#使用可能な一般的なプロパティ)
  - [シェーダー内で実装が必要なプロパティ](#シェーダー内で実装が必要なプロパティ)
- [GLSL の基本構文](#glsl-の基本構文)
  - [ログの記録](#ログの記録)
  - [セミコロンが必須](#セミコロンが必須)
  - [変数の宣言](#変数の宣言)
  - [データ型](#データ型)
    - [float 型のコード例](#float-型のコード例)
    - [int 型のコード例](#int-型のコード例)
    - [bool 型のコード例](#bool-型のコード例)
    - [vec2 のコード例](#vec2-のコード例)
    - [vec3 のコード例](#vec3-のコード例)
    - [vec4 のコード例](#vec4-のコード例)
    - [ベクトルの成分とアクセスルール](#ベクトルの成分とアクセスルール)
  - [関数](#関数)
- [頂点シェーダーを理解する](#頂点シェーダーを理解する)
  - [main 関数](#main-関数)
  - [gl_Position](#gl_position)
  - [position 属性](#position-属性)
  - [Matrixs uniform](#matrixs-uniform)
- [フラグメントシェーダーを理解する](#フラグメントシェーダーを理解する)
  - [main 関数](#main-関数-1)
  - [Precision](#precision)
  - [gl_FragColor](#gl_fragcolor)
- [attribute 属性](#attribute-属性)
  - [コード例](#コード例)
  - [出力結果](#出力結果)
- [varying 可変データ](#varying-可変データ)
  - [コード例](#コード例-1)
  - [出力結果](#出力結果-1)
- [uniform ユニフォーム](#uniform-ユニフォーム)
  - [コード例](#コード例-2)
  - [出力結果](#出力結果-2)
- [テクスチャ](#テクスチャ)
  - [コード例](#コード例-3)
  - [出力結果](#出力結果-3)
- [テクスチャのカラーバリエーションを追加](#テクスチャのカラーバリエーションを追加)
  - [コード例](#コード例-4)
  - [出力結果](#出力結果-4)
- [ShaderMaterial](#shadermaterial)
  - [コード例](#コード例-5)
- [デバッグ](#デバッグ)
  - [値のデバッグ](#値のデバッグ)

## シェーダーについて

シェーダーは WebGL の主要コンポーネントの一つです
これは、`GLSL`という言語で記述され GPU に送信されるプログラムです。

シェーダーは以下の用途で使用される

- **頂点シェーダー: ジオメトリの各頂点を配置**
- **フラグメントシェーダー: そのジオメトリの各可視フラグメントごとに色をつける**

その他にも

- 頂点座標
- メッシュ変換
- カメラとその視野に関する情報
- 色
- テクスチャ
- ライト
- フォグ(霧)

などのパラメータをシェーダーに送信することで
GPU はシェーダーの指示に従いすべてのデータを処理し、ジオメトリをレンダリングします。

> [!TIP]
>
> 「レンダリング過程で処理される各点（フラグメント）は、必ずしも最終的な画面上の各ピクセルと 1 対 1 で対応するわけではありません。そのため、より正確な用語として「フラグメント」を使用します。」

### 頂点シェーダー

頂点シェーダーの目的は、**ジオメトリの頂点を配置**することです。
もう少し詳しく説明すると、頂点の位置、メッシュの変形（オブジェクトの動きや形の変化など）、カメラの情報（位置、回転、視野など）を送信することです。

送信された情報をもとに GPU が 3D 空間の各頂点を 2D 平面上の適切な位置に変換します。
これによりレンダリングとなる 2D 空間(canvas 要素)に頂点を投影します。

頂点シェーダーを使用する場合、そのコードはジオメトリのすべての頂点に適用されます。
すべての頂点に適用されるデータを`uniform(ユニフォーム)`と呼びます。
例えば、モデルビュー行列と呼ばれる**オブジェクトの位置や回転などを定義する行列**はシーン内のすべての頂点に対して適用されるので `uniform` として扱われます。

また、頂点の位置などの一部のデータは、各頂点の間で変化します。
各頂点の間で変化するデータを`attribute(属性)`と呼びます。
例えば、**各頂点の 3D での位置座標**は`attribute`として扱われます。

頂点シェーダーで処理されたこの情報（各頂点の位置や関連データ）は、次にフラグメントシェーダーへ渡されます。フラグメントシェーダーはこの情報を基に、各ピクセル（より正確にはフラグメント）の色を決定します。

### フラグメントシェーダー

フラグメントシェーダーの目的は、**ジオメトリの各可視フラグメントごとに色をつける**ことです。
ジオメトリの可視フラグメントとふぉとに同じフラグメントシェーダーが使用されます。

頂点シェーダーと同様に `uniform` を使用して色などのデータをフラグメントシェーダーに送信したり、
頂点シェーダーからフラグメントシェーダーにデータを送信することができます。
頂点シェーダーからフラグメントシェーダーに送信されるデータを`varying(可変データ)`と呼びます。
`varying` は頂点間で補間されるため、各フラグメントで異なる値を持つことができます。

フラグメントシェーダーで最も簡単な命令は、すべてのフラグメントを同じ色にすることです。
`color` プロパティのみを設定した`MeshBasicMaterial`と同様の効果が得られます。

他にもたくさんのデータを送信することができます、例えば、ライトの位置などです。
ライトの位置を送信することで、面の向きが光にどれだけ向いているかに応じてフラグメントに色をつける事ができます。
シーン内にライトが 1 つある場合の`MeshPhongMaterial`と同等の効果が得られます。

### まとめ シェーダーについて

- 頂点シェーダー: レンダリング上のジオメトリの頂点を配置
- フラグメントシェーダー: ジオメトリの各可視フラグメントに色をつける

シェーダーは**頂点シェーダー → フラグメントシェーダー**の順で実行される

- `attribute(属性)`: **各頂点の間で変化する**データ (頂点シェーダーのみで使用)
- `uniform(ユニフォーム)`: **各頂点の間で変化しない**データ (頂点シェーダー、フラグメントシェーダーの両方で使用)
- `varying(可変データ)`: 頂点シェーダーからフラグメントシェーダーに送信されるデータ。**頂点間で補間**される

## 独自のシェーダーを書く理由

独自のシェーダーを書く主な理由は以下の 2 つです。

- Three.js だけでは複雑なビジュアル効果や特殊な計算ができない
- パフォーマンス向上のため

### Three.js だけでは複雑なビジュアル効果や特殊な計算ができない

Three.js では一般的な 3D レンダリングの状況をカバーしていますが、複雑なビジュアル効果や特殊な計算には制限があり、完全な自由ではありません。
例えば、**複雑なテクスチャの操作や通常とは異なる光の相互作用を実現したい場合**は、独自のシェーダーを作成する必要があります。

### パフォーマンス向上のため

独自のシェーダーを作成することで、特定の用途に必要な機能と計算のみを実装することができ、不要な処理を省くことができます。
これにより、レンダリング速度を向上させたり、より複雑なシーンを滑らかに描画することができます。

シェーダーの習得には時間と労力を要しますが、一度使いこなせるようになれば、多くのプロジェクトで強力なツールとなり、表現の幅を大きく広げることができます。

## RawShaderMaterial を使用して最初のシェーダーを作成

シェーダーを作成するには特定のマテリアルを作成する必要がある。

Three.js では以下ののいずれかを使用する。

- `ShaderMaterial`: シェーダーコードに自動的に追加されるコードがある ShaderMaterial
- `RawShaderMaterial`: なにもない 生の ShaderMaterial

何が起きているのかをちゃんと理解するために`RawShaderMaterial`を使用します。

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/b5dff1526edbdd72029540693b141bee.png)](https://gyazo.com/b5dff1526edbdd72029540693b141bee)

```js
// マテリアル
const material = new THREE.RawShaderMaterial({
  vertexShader: `
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;

    attribute vec3 position;

    void main() {
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: `
    precision mediump float;

    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `,
});
```

## Sheder を別のファイルに分ける

まずは`shader`フォルダを作成`shader`フォルダ内に 2 つのファイルを作成します。

- `vertex.glsl`
- `fragment.glsl`

シンタックスハイライトを有効にするために
`Shader languages support for VS Code` のプラグインをインストールする

### ファイルのインポート

```js
import testVertexShader from "./shaders/vertex.glsl";
import testFragmentShader from "./shaders/fragment.glsl";
```

しかし、このままでは、JavaScript が`.glsl`の処理方法がわからずエラーが発生します。
`vite-plugin-glsl` をインストールすることで解決できます。

```she
bun add vite-plugin-glsl
```

`vite-plugin-glsl`のインストールが完了したら`vite.config.js`にプラグインを設定します。
`vite.config.js`内のオブジェクトに`plugins`を配列で定義して配列内で`vite-plugin-glsl`を呼び出す。

```js
import restart from "vite-plugin-restart";
import glsl from "vite-plugin-glsl";

export default {
  root: "src/", // Sources files (typically where index.html is)
  publicDir: "../static/", // Path from "root" to static assets (files that are served as they are)
  server: {
    host: true, // Open to local network and display URL
    open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env), // Open if it's not a CodeSandbox
  },
  build: {
    outDir: "../dist", // Output in the dist/ folder
    emptyOutDir: true, // Empty the folder first
    sourcemap: true, // Add sourcemap
  },
  plugins: [
    restart({ restart: ["../static/**"] }), // Restart server on static file change
    glsl(),
  ],
};
```

設定が完了したら`console.log`でテストしてみる

[![Image from Gyazo](https://i.gyazo.com/b2148b851b06866e4f075c17bcb73669.png)](https://gyazo.com/b2148b851b06866e4f075c17bcb73669)

ちゃんとファイルの中身が出力される

さきほどのシェーダーの記述をモジュールに置き換える

```js
const material = new THREE.RawShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
});
```

変わらず表示されていれば OK

## RawShaderMaterial のプロパティ

RawShaderMaterial では、
他のマテリアルと共通のプロパティと、独自に実装が必要なプロパティがあります。

### 使用可能な一般的なプロパティ

以下のプロパティは `RawShaderMaterial` でもそのまま使用できます。

- `wireframe`
- `side`
- `transparent`
- `flatShading`

### シェーダー内で実装が必要なプロパティ

以下のプロパティは、シェーダー内で独自に実装する必要があります。

- `map`や`alphaMap`などのテクスチャ関するプロパティ
- `opacity`
- `color`

などはこれらの機能をシェーダー内で記述する必要があるので機能しなくなる

## GLSL の基本構文

`GLSL` は **OpenGL Shading Language** の略です。
`C 言語`をベースに作成されているので構文も `C 言語`に近いです。

### ログの記録

`GLSL` にはコンソールがないので、値をログに記録する方法はありません。
コードがすべての頂点とフラグメントに対して実行されるため、1 つの値をログに記録する意味がないからです。

### セミコロンが必須

命令を終了する際に `;(セミコロン)`が必須です。
セミコロンがないとコンパイルエラーが発生します。

### 変数の宣言

`GLSL` は静的型付け言語です。
なので変数のデータ型を指定する必要があります。

変数の宣言はこのように記述します
`データ型 変数名(キャメルケース) = 値;`

```glsl
float fooBar = 0.0;
```

### データ型

- `float`: 浮動小数点
- `int`: 整数
- `bool`: 真偽値 (`ture` or `false`)
- `vec2`: 2 次元ベクトル
- `vec3`: 3 次元ベクトル
- `vec4`: 4 次元ベクトル

#### float 型のコード例

```glsl
// 少数の値が丸められていても常に小数点数で記述しないといけない
float a = 1.0;
float b = - 2.0; // 負の値も OK

// 数学的演算ももちろんできる
float c = a + b;
```

#### int 型のコード例

```glsl
int foo = 123;
int bar = - 1; // 負の値もOK

// 数学的演算ももちろんできる
int fooBar = foo * bar;
```

`float` と `int` で計算はできないので型変換を行う必要がある

```glsl
// これだとエラーが発生
float foo = 1.0;
int bar = 2;
float fooBar = foo * bar;

// 型変換を行うことでエラーを解消
float foo = 1.0;
int bar = 2;
float fooBar = foo * float(bar);
```

#### bool 型のコード例

```glsl
bool foo = true;
bool bar = false;
```

#### vec2 のコード例

```glsl
vec2 foo = vec2(); // 空の場合はエラーが発生するので必ず値を初期化する必要がある
```

```glsl
vec2 foo = vec2(1.0, 2.0); // x: 1.0, y: 2.0
foo *= 2.0; // vex2(2.0, 4.0);
```

```glsl
vec2 foo = vec2(0.0); // x: 0.0, y: 0.0
// vec2(x, y) 以外にも vec2(r, g) とvec2(s, t)が使用できる
foo.x = 1.0; // foo.r = 1.0; や foo.s でも可能
foo.y = 2.0; // foo.g = 1.0; や foo.t でも可能

```

#### vec3 のコード例

```glsl
vec3 foo = vec3(0.0); // x: 0.0, y:0.0 , z:0,0
vec3 bar = vec3(1.0, 2.0, 3.0);  // x: 1.0, y:2.0 , z:3,0

foo.z = 4.0; // foo.b = 4.0; や foo.p でも可能

```

vec2 から vec3 を作成

```glsl
vec2 foo = vec2(1.0, 2.0);
vec3 bar = vec3(foo, 3.0);
```

vec3 から vec2 を作成

```glsl
vec3 foo = vec3(1.0, 2.0, 3.0);
vec2 var = foo.xy // vec2(1.0. 2.0);

// プロパティを異なる順番で指定することもできる(スウィズル)
vec3 foo = vec3(1.0, 2.0, 3.0);
vec2 var = foo.yx // vec2(2.0. 1.0);
```

#### vec4 のコード例

```glsl
vec4 foo = vec4(1.0, 2.0, 3.0, 4.0);
vec4 bar = vec4(foo.zw, vec2(5.0, 6.0)); // vec4(3.0, 4.0, 5.0, 6.0)

foo.w; = 5.0 // foo.a = 5.0 や foo.q でも可能
```

#### ベクトルの成分とアクセスルール

成分名のグループ

- 位置、座標: `x, y, z, w`
- 色: `r, g, b, a`
- テクスチャ座標 `s, t, p, q`

同じグループ内であれば自由に組み合わせが可能

```glsl
vec4 foo = vec4(1.0, 2.0, 3.0, 4.0);
vec3 bar = foo.xyz;  // 正しい（同じグループ内）
vec3 hoge = foo.rgb;  // 正しい（同じグループ内）
vec2 huga = foo.st;  // 正しい（同じグループ内）
```

異なるグループ間で混ぜて使用するとエラーが発生

```glsl
vec4 v = vec4(1.0, 2.0, 3.0, 4.0);
vec4 errorCase1 = v.xgpw;  // エラー：異なるグループの混合
vec3 errorCase2 = v.rtz;  // エラー：異なるグループの混合

```

### 関数

関数はこのように記述します

`データ型 関数名() {処理を記述}`

```glsl
float fooBar() {
  float foo = 1.0;
  float bar = 2.0;

  return foo + bar;
}

```

なにも値を返さない場合は`データ型をvoid`に設定

```glsl
void fooBar() {
  float foo = 1.0;
  float bar = 2.0;
}
```

パラメータにも形を指定しないといけない

```glsl
float add(float a, float b) {
  return a + b;
}

```

## 頂点シェーダーを理解する

`GLSL` の構文はわかったので
頂点シェーダーにどのような記述が必要か理解していきます。

### main 関数

`main 関数`は自動的に呼び出されます。
`データ型をvoid`に設定しているためなにも値を返しません。

```glsl
void main() {

}
```

### gl_Position

`gl_Position` はあらかじめ設定されている変数なのでこれを割り当てる必要があります。
この変数には、画面上の頂点の位置が格納されています。

以下のコードは次のことを行っています。

- 頂点の位置を計算
- x 座標と y 座標に 0.5 を加える

```glsl
void main() {
  // 頂点の位置を計算
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

  // x 座標と y 座標に 0.5 を加える
  gl_Position.x += 0.5;
  gl_Position.y += 0.5;
}

```

平面が右上に移動しているが、Three.js のように 3D 空間で平面を動かしているのではなく、
投影された平面を 2D 空間で動かしているので注意が必要。

> [!TIP]
>
> 初心者にとっては、以下の内容を詳細を完全に理解する必要はありませんが、基本的な概念を知っておくことは有益です。
>
> gl_Position の最終的な目的は 2D 空間での頂点の位置を決めるためなのに
> なぜ`vec4`の値が必要なのかは疑問に思うかもしれない。

> これは座標が正確には 2D 空間ではンク、4 次元を必要とする`クリップ空間`と呼ばれる空間にある。

> クリップ空間とは
> 3 方向(x, y, z)すべてに -1 から +1 までの範囲を持つ空間のことです。
> 4 つ目の値(w)は遠近法の計算に使用され、クリップ空間の外にあるものは表示されません。

### position 属性

```glsl
// 頂点の位置を取得
attribute vec3 position;
```

属性は頂点間で変わる唯一の変数です。
各頂点には同じ頂点シェーダーが適用され、position 属性には特定の座標(x, y, z)が含まれる。

```glsl
gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

```

### Matrixs uniform

以下のコードには 3 行の行列があり、その値はジオメトリのすべての頂点と同じなので
`uniform`を使用して取得する

```glsl
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
```

- `modelMatrix`: メッシュに対するすべての変換(拡大縮小、回転、移動)を適用する。
- `viewMatrix`: カメラに対する相対的な変換を適用する。
- `projectionMatrix`: 最終的な座標をクリップ空間の座標に変換する。

結果は変わりませんが
position をさらに理解し、より細かく制御するためにコードを変更していきます。
これにより、`modelPosition`を調整するとモデル全体を移動できるようになります

元の平面

[![Image from Gyazo](https://i.gyazo.com/fb1d7d962b26b4fdf04a3028a3504ee1.png)](https://gyazo.com/fb1d7d962b26b4fdf04a3028a3504ee1)

```glsl
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}

```

平面を上に移動

[![Image from Gyazo](https://i.gyazo.com/ccaaaf7d02d8b21a73a4d919adff6b77.png)](https://gyazo.com/ccaaaf7d02d8b21a73a4d919adff6b77)

```glsl
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition += 1.0;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}

```

平面に波打たせる事もできる
[![Image from Gyazo](https://i.gyazo.com/8d2b8f0168cec76cec71b0f6d21f1ac7.png)](https://gyazo.com/8d2b8f0168cec76cec71b0f6d21f1ac7)

```glsl
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;

varying float vRandom;

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  vRandom = aRandom;
}
```

## フラグメントシェーダーを理解する

フラグメントシェーダーは頂点シェーダーよりも管理しやすいです。

### main 関数

```glsl
void main()
{
}
```

頂点シェーダーと同様なので説明を割愛します。

### Precision

以下のコードは浮動小数点数の精度を設定しています。

```glsl
precision mediump float;
```

設定可能な値は以下の通りです。

- `highp`: 高精度だがパフォーマンスが低下する。デバイスによっては動作しなくなる。
- `mediump`: 中精度、多くの一般的なケースで十分な精度
- `lowp`: 低精度、精度が不足するとバグは発生する可能性がある

### gl_FragColor

`gl_FragColor` は `gl_Position`と似ているが
色に関するものです。

`gl_FragColor`は`vec4(r, g, b, a)`で指定します。

値を変更すると色が変わります。

[![Image from Gyazo](https://i.gyazo.com/5e570724d37b20c067624a35c39a8ff1.png)](https://gyazo.com/5e570724d37b20c067624a35c39a8ff1)

```glsl
void main() {
  gl_FragColor = vec4(1.0, 0.5 ,0.0 ,1.0);
}
```

4 番目の値(a)を変更する場合は
Three.js の`RawShaderMaterial`の`transparent`を`true`に設定する必要があります。

```js
const material = new THREE.RawShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  transparent: true,
});
```

## attribute 属性

属性は、各頂点で変化する値です。
各頂点の座標を表す `vec3`を含む `position` という名前の属性がすでに 1 つ存在します。

各頂点にランダムな値を追加して、その値にしたがって z 軸上で頂点を移動させます。

### コード例

```js
// .js に記述
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

// ジオメトリの頂点の数を count に格納
const count = geometry.attributes.position.count;

// 各頂点にランダムな値を追加
const randoms = new Float32Array(count);

for (let i = 0; i < count; i++) {
  randoms[i] = Math.random() * 0.5 * 4;
}

// ジオメトリに属性を追加する
geometry.setAttribute(
  "aRandom", // 属性名、シェーダーで使用する名前で任意の名前を設定できる (a は属性のプレフィックスとしてつけることをおすすめ)
  new THREE.BufferAttribute(
    randoms, // データ配列
    1 // positonの場合は 3つの値(x, y, z)で構成されるため 3 でしたが今回はランダムな 1 つの値なので 1 を渡します
  )
);
```

```glsl
**uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += aRandom * 0.1;

  vec4 viewMPosition = viewMatrix * modelPosition;
  vec4 projectedPositon = projectionMatrix * viewMPosition;
  gl_Position = projectedPositon;

  vRandom = aRandom;
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/950b030749f0600bde7f89256389097e.png)](https://gyazo.com/950b030749f0600bde7f89256389097e)

## varying 可変データ

フラグメントシェーダーでも`aRandom属性`を使用して色をつけます。
しかし、フラグメントシェーダーで属性を直接使用することはできません。
なので`varying`を使用して頂点シェーダーからフラグメントシェーダーにデータを送信します。

`vertex.glsl`と`fragment.glsl`で`varying` を実行する必要があります。

### コード例

```glsl
// vertex.glslに記述
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;

// varying を追加
varying float vRandom;

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += aRandom * 0.1;

  vec4 viewMPosition = viewMatrix * modelPosition;
  vec4 projectedPositon = projectionMatrix * viewMPosition;
  gl_Position = projectedPositon;

  // 可変データを更新
  vRandom = aRandom;
}
```

```glsl
// fragment.glslに記述
precision mediump float;

varying float vRandom;

void main() {
 gl_FragColor = vec4(0.0, vRandom * 0.8, 0.0, 1.0);
}
```

ついでに平面を回転させて頂点を調整して
草むらのような見た目を作ってみた

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/f21a9fe045ed030f3b6c6364c2d79c1f.png)](https://gyazo.com/f21a9fe045ed030f3b6c6364c2d79c1f)

## uniform ユニフォーム

`uniform`は JavaScript からシェーダーにデータを送信する方法です。
同じシェーダーに異なるパラメータを使用したい場合に便利です。
また。ユーザーの体験中にパラメータを変更することも可能です。

`uniform`は頂点シェーダーフラグメントシェーダーの両方で使用できます。
データはすべての頂点シェーダーとフラグメントで同じになります。

`uniform`を追加するには`material`の`uniforms`プロパティ設定します。

### コード例

```js
// マテリアル
const material = new THREE.RawShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  uniforms: {
    // 波を制御するユニフォーム
    uFrequency: { value: new THREE.Vector2(10, 5) },

    // アニメーションを制御するユニフォーム
    uTime: { value: 0 },

    // 色を制御するユニフォーム
    uColor: { value: new THREE.Color("orange") },
  },
});

// アニメーション
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // マテリアルの更新
  material.uniforms.uTime.value = elapsedTime;

  // コントロールの更新
  controls.update();

  // レンダラー
  renderer.render(scene, camera);

  // 次のフレームを呼び出し
  window.requestAnimationFrame(tick);
};

tick();
```

プロパティ名に`u`のプレフィックスをつけることで`uniform`だとわかりやすくしている

```glsl
// vertex.js に記述
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
  modelPosition.z += sin(modelPosition.y * uFrequency.y+ uTime) * 0.1;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
}

```

```glsl
// fragment.glsl に記述
precision mediump float;

uniform vec3 uColor;

void main() {
  gl_FragColor = vec4(uColor, 1.0);

}
```

### 出力結果

<a href="https://gyazo.com/6e1f65b90ee8112eb632d11822caab29"><img src="https://i.gyazo.com/6e1f65b90ee8112eb632d11822caab29.gif" alt="Image from Gyazo" width="1000"/></a>

## テクスチャ

シェーダーでテクスチャを扱うには以下の手順で行います。

**JavaScript で行うこと**

1. テクスチャを読み込み
2. `uniforms`プロパティにテクスチャの設定を追加

**GLSL で行うこと**

1. 頂点シェーダーでジオメトリの uv 座標を取得
2. uv 座標を`varying`を使用してフラグメントシェーダーに送信
3. フラグメントシェーダーでテクスチャの色を適用

### コード例

```js
// テクスチャ
const textureLoader = new THREE.TextureLoader();
const fragTexture = textureLoader.load("./textures/ももちこアイコン.JPG"); // 任意のパスを指定

// マテリアル
const material = new THREE.RawShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  uniforms: {
    uFrequency: { value: new THREE.Vector2(10, 5) },
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("orange") },
    uTexture: { value: fragTexture },
  },
});
```

```glsl
// vertex.glsl に記述

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
attribute vec2 uv; // ジオメトリの uv座標を定義

varying vec2 vUv; // フラグメントシェーダーに送信するための可変データを定義

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
  modelPosition.z += sin(modelPosition.y * uFrequency.y+ uTime) * 0.1;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  vUv = uv; // ジオメトリの uv座標を可変データに代入
}
```

```glsl
// fragment.glsl に記述

precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture; // sampler2D はテクスチャの型

varying vec2 vUv; // 可変データを読み込み

void main() {
  vec4 textureColor = texture2D(
    uTexture, // 適用するテクスチャ
    vUv // ジオメトリの uv座標 (独自のuv座標でも可能)
    );
  gl_FragColor = textureColor;
}


```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/da846d735971e0f38e18bdcb9eb1c487.png)](https://gyazo.com/da846d735971e0f38e18bdcb9eb1c487)

## テクスチャのカラーバリエーションを追加

影があるかのように明るさを変化させます

以下の手順で行います。

**頂点シェーダーで行うこと**

1. 頂点シェーダーで高さの設定を変数に保存
2. 高さの設定フラグメントシェーダーに送信

**フラグメントシェーダー行うこと**

1. `varying` データを取得
2. textureColor の`r, g ,b` の各プロパティを変更する

### コード例

```glsl
// vertex.glsl に記述
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

// 高さの設定フラグメントシェーダーに送信
varying float vElevation;

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // 頂点シェーダーで高さの設定を変数に保存
  float elevation = sin(modelPosition.x * uFrequency.x + uTime * 0.5) * 0.1;
  elevation += sin(modelPosition.y * uFrequency.y+ uTime * 2.0) * 0.1;
  modelPosition.z += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  vUv = uv;
  vElevation = elevation;
}
```

```glsl
// fragment.glsl に記述
precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;

// 高さのデータを取得
varying float vElevation;

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);

  // r, g, b の各プロパティを変更
  textureColor.rgb *= vElevation * 2.0 + 0.7;
  gl_FragColor = textureColor;
}

```

### 出力結果

<a href="https://gyazo.com/d6e84d51e022981868c3837dbabe375a"><img src="https://i.gyazo.com/d6e84d51e022981868c3837dbabe375a.gif" alt="Image from Gyazo" width="1000"/></a>

## ShaderMaterial

ここまで、`RawShaderMaterial` を使用してきました。
`ShaderMaterial`でも動作は変わりません。
シェーダーのコードにあらかじめ用意されたユニフォーム、属性や精度などが自動的に設定されます。

`ShaderMaterial`の使用は以下の手順です。

**JavaScript で行うこと**

1. `RawShaderMaterial`を`ShaderMaterial`に書き換える

**GLSL で行うこと**

1. `vertex.glsl` で以下の設定を削除

   - `uniform mat4 projectionMatrix;`
   - `uniform mat4 viewMatrix;`
   - `uniform mat4 modelMatrix;`
   - `attribute vec3 position;`
   - `attribute vec2 uv;`

2. `fragment.glsl` で以下の設定を削除

   - `precision mediump float;`

### コード例

```js
const material = new THREE.ShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  uniforms: {
    uFrequency: { value: new THREE.Vector2(10, 5) },
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("orange") },
    uTexture: { value: fragTexture },
  },
});
```

```glsl
// vertex.glsl に記述
uniform mat4 projectionMatrix; // ShaderMaterialを使用する場合、この行は不要です
uniform mat4 viewMatrix; // ShaderMaterialを使用する場合、この行は不要です
uniform mat4 modelMatrix; // ShaderMaterialを使用する場合、この行は不要です
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position; // ShaderMaterialを使用する場合、この行は不要です
attribute vec2 uv; // ShaderMaterialを使用する場合、この行は不要です

varying vec2 vUv;
varying float vElevation;

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation = sin(modelPosition.x * uFrequency.x + uTime * 0.5) * 0.1;
  elevation += sin(modelPosition.y * uFrequency.y+ uTime * 2.0) * 0.1;
  modelPosition.z += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  vUv = uv;
  vElevation = elevation;
}


```

```glsl
// fragment.glsl に記述
precision mediump float; // ShaderMaterialを使用する場合、この行は不要です

uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);
  textureColor.rgb *= vElevation * 2.0 + 0.7;
  gl_FragColor = textureColor;
}

```

## デバッグ

Three.js はシェーダー全体をログに記録します。
`ERROR: 0:10: 'attribute' : syntax error` のようなエラーメッセージを確認しましょう。

このエラーメッセージでわかることは
10 行目の直前でエラーが発生している可能性があるということです。

```glsl
// 注意: このコードには意図的にエラーを含めています
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position // ;(セミコロン)がないためここでエラー発生
attribute vec2 uv;

varying vec2 vUv;
varying float vElevation;

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation = sin(modelPosition.x * uFrequency.x + uTime * 0.5) * 0.1;
  elevation += sin(modelPosition.y * uFrequency.y+ uTime * 2.0) * 0.1;
  modelPosition.z += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  vUv = uv;
  vElevation = elevation;
}
```

### 値のデバッグ

はじめの方で説明しましたが、値をコンソールで出力する事ができません。
なので`gl_FragmentColor`を使用して視覚的に確認します。
正確ではないですが、十分な場合もあります。

ここでは uv を例に紹介します。

```glsl
precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);
  textureColor.rgb *= vElevation * 2.0 + 0.7;
  gl_FragColor = textureColor;
  gl_FragColor = vec4(vUv, 1.0, 1.0);
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/cc822714677a2db48c3ef1cd00c7ff67.png)](https://gyazo.com/cc822714677a2db48c3ef1cd00c7ff67)
