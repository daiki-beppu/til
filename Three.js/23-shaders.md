# シェーダー

- [シェーダー](#シェーダー)
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
    - [gl\_Position](#gl_position)
    - [position 属性](#position-属性)
    - [Matrixs uniform](#matrixs-uniform)
  - [フラグメントシェーダーを理解する](#フラグメントシェーダーを理解する)
    - [main 関数](#main-関数-1)
    - [Precision](#precision)
    - [gl\_FragColor](#gl_fragcolor)
  - [attribute 属性](#attribute-属性)
  - [varying 変化](#varying-変化)

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
import testVertexShader from './shaders/vertex.glsl';
import testFragmentShader from './shaders/fragment.glsl';
```

しかし、このままでは、JavaScript が`.glsl`の処理方法がわからずエラーが発生します。
`vite-plugin-glsl` をインストールすることで解決できます。

```she
bun add vite-plugin-glsl
```

`vite-plugin-glsl`のインストールが完了したら`vite.config.js`にプラグインを設定します。
`vite.config.js`内のオブジェクトに`plugins`を配列で定義して配列内で`vite-plugin-glsl`を呼び出す。

```js
import restart from 'vite-plugin-restart';
import glsl from 'vite-plugin-glsl';

export default {
  root: 'src/', // Sources files (typically where index.html is)
  publicDir: '../static/', // Path from "root" to static assets (files that are served as they are)
  server: {
    host: true, // Open to local network and display URL
    open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env), // Open if it's not a CodeSandbox
  },
  build: {
    outDir: '../dist', // Output in the dist/ folder
    emptyOutDir: true, // Empty the folder first
    sourcemap: true, // Add sourcemap
  },
  plugins: [
    restart({ restart: ['../static/**'] }), // Restart server on static file change
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

`gl_Position` はあらかじめ設定されている変数なのでこれを割り当てる必要です。
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

`modelMatrix`はメッシュに対するすべての変換を適用する。
メッシュの拡大縮小、回転、移動行った場合の変換は`modelMatrix`に含まれ、position に適用される。

`viewMatrix`はカメラに対する相対的な変換を適用する。

`projectionMatrix`は最終的な座標をクリップ空間の座標に変換する。

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

```
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;

varying float vRandom;

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;

  vec4 viewMPosition = viewMatrix * modelPosition;
  vec4 projectedPositon = projectionMatrix * viewMPosition;
  gl_Position = projectedPositon;

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

- `highp`: パフォーマンスが低下する。デバイスによっては動作しなくなる。
- `midump`: 通常はこちらを使用
- `lowp`: 精度が不足するとバグは発生する可能性がある

### gl_FragColor

`gl_FragColor` は `gl_Position`と似ているが
色に関するものです。

`gl_FragColor`は`vec4(r,g, b, a)`で指定します

値を変更すると色が変わります。

[![Image from Gyazo](https://i.gyazo.com/5e570724d37b20c067624a35c39a8ff1.png)](https://gyazo.com/5e570724d37b20c067624a35c39a8ff1)

```glsl
void main() {
  gl_FragColor = vec4(1.0, 0.5 ,0.0 ,1.0);
}
```

4 番目の値(a)を変更する場合は
Three.js の`RawShaderMaterial`の`transparent`を`true`に設定する必要がある

```js
const material = new THREE.RawShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  transparent: true,
});
```

## attribute 属性

属性は、各頂点で変化する値です。
各頂点の座標を表す `vec3`を含む `position` という名前の属性がすでに 1 つ存在する。

各頂点にランダムな値を追加して、その値にしたがって z 軸上で頂点を移動させる。

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
  'aRandom', // 属性名、シェーダーで使用する名前で任意の名前を設定できる (a は属性のプレフィックスとしてつけることをおすすめ)
  new THREE.BufferAttribute(
    randoms, // データ配列
    1 // positonの場合は 3つの値(x, y, z)で構成されるため 3 でしたが今回はランダムな 1 つの値なので 1 を渡します
  )
);
```

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/950b030749f0600bde7f89256389097e.png)](https://gyazo.com/950b030749f0600bde7f89256389097e)

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

## varying 変化

フラグメントにも`aRandom属性`を使用して色をつけます。
ですがフラグメントシェーダーで属性を直接使用することはできません。
なので`varying`を使用して頂点シェーダーからフラグメントシェーダーにデータを送信します。

`vertex.glsl`と`fragment.glsl`で`varying` を実行する必要があリます。

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
// fargment.glslに記述
precision mediump float;

varying float vRandom;

void main() {
 gl_FragColor = vec4(0.0, vRandom * 0.8, 0.0, 1.0);
}
```

ついでに平面を回転させて頂点を調整して
草むらのような見た目を作ってみた

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/f21a9fe045ed030f3b6c6364c2d79c1f.png)](https://gyazo.com/f21a9fe045ed030f3b6c6364c2d79c1f)

