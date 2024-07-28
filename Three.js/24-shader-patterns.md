---
title: 24-shader-patterns
date: 2024-07-26
update: 2024-07-26
---

# シェーダーパターン

- [シェーダーパターン](#シェーダーパターン)
  - [下準備](#下準備)
    - [出力結果](#出力結果)
  - [パターン 1](#パターン-1)
    - [コード例](#コード例)
    - [出力結果](#出力結果-1)
  - [パターン 2](#パターン-2)
    - [コード例](#コード例-1)
    - [出力結果](#出力結果-2)
  - [パターン 3](#パターン-3)
    - [コード例](#コード例-2)
    - [出力結果](#出力結果-3)
  - [パターン 4](#パターン-4)
    - [コード例](#コード例-3)
    - [出力結果](#出力結果-4)
  - [パターン 5](#パターン-5)
    - [コード例](#コード例-4)
    - [出力結果](#出力結果-5)
  - [パターン 6](#パターン-6)
    - [コード例](#コード例-5)
    - [出力結果](#出力結果-6)
  - [パターン 7](#パターン-7)
    - [コード例](#コード例-6)
    - [出力結果](#出力結果-7)
  - [パターン 8](#パターン-8)
    - [コード例](#コード例-7)
    - [出力結果](#出力結果-8)
  - [パターン 9](#パターン-9)
    - [コード例](#コード例-8)
    - [出力結果](#出力結果-9)
  - [パターン 10](#パターン-10)
    - [コード例](#コード例-9)
    - [出力結果](#出力結果-10)
  - [パターン 11](#パターン-11)
    - [コード例](#コード例-10)
    - [出力結果](#出力結果-11)
  - [パターン 12](#パターン-12)
    - [コード例](#コード例-11)
    - [出力結果](#出力結果-12)
  - [パターン 13](#パターン-13)
    - [コード例](#コード例-12)
    - [出力結果](#出力結果-13)
  - [パターン 14](#パターン-14)
    - [コード例](#コード例-13)
    - [出力結果](#出力結果-14)
  - [パターン 15](#パターン-15)
    - [コード例](#コード例-14)
    - [出力結果](#出力結果-15)
  - [パターン 16](#パターン-16)
    - [コード例](#コード例-15)
    - [出力結果](#出力結果-16)
  - [パターン 17](#パターン-17)
    - [コード例](#コード例-16)
    - [出力結果](#出力結果-17)
  - [パターン 18](#パターン-18)
    - [コード例](#コード例-17)
    - [出力結果](#出力結果-18)
  - [パターン 19](#パターン-19)
    - [コード例](#コード例-18)
    - [出力結果](#出力結果-19)
  - [パターン 20](#パターン-20)
    - [コード例](#コード例-19)
    - [出力結果](#出力結果-20)
  - [パターン 21](#パターン-21)
    - [コード例](#コード例-20)
    - [出力結果](#出力結果-21)
  - [パターン 22](#パターン-22)
    - [コード例](#コード例-21)
    - [出力結果](#出力結果-22)
  - [パターン 23](#パターン-23)
    - [コード例](#コード例-22)
    - [出力結果](#出力結果-23)
  - [パターン 24](#パターン-24)
    - [コード例](#コード例-23)
    - [出力結果](#出力結果-24)
  - [パターン 25](#パターン-25)
    - [コード例](#コード例-24)
    - [出力結果](#出力結果-25)

## 下準備

**JavaScript**

- `ShaderMaterial`を使用

```js
const material = new THREE.ShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  side: THREE.DoubleSide,
});
```

**GLSL**

- uv 座標をフラグメントシェーダーに送信

```glsl
// vertex.glsl に記述

varying vec2 vUv; // uv 座標をフラグメントシェーダーに送信

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}

```

```glsl
// fragment.glsl に記述

void main(){
    gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);
}

```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/753235fc5a000122294cc5656e7c1375.png)](https://gyazo.com/753235fc5a000122294cc5656e7c1375)

## パターン 1

### コード例

```glsl
void main(){
    gl_FragColor = vec4(vUv, 1.0, 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/c1a87c82dd27b479db32eca0e7efddd2.png)](https://gyazo.com/c1a87c82dd27b479db32eca0e7efddd2)

## パターン 2

### コード例

```glsl
void main(){
    gl_FragColor = vec4(vUv, 0.5, 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/51df8b9c0d6b89b879a693a41533b690.png)](https://gyazo.com/51df8b9c0d6b89b879a693a41533b690)

## パターン 3

### コード例

```glsl
void main(){
    float strengthX = vUv.x;
   gl_FragColor = vec4(vec3(strengthX), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/ff5ce053d1c2829d2aa84270ac9dc2bb.png)](https://gyazo.com/ff5ce053d1c2829d2aa84270ac9dc2bb)

## パターン 4

### コード例

```glsl
void main(){
    float strengthY = vUv.y;
    gl_FragColor = vec4(vec3(strengthY), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/b6964971bb824cd9b3c2f81bc7008105.png)](https://gyazo.com/b6964971bb824cd9b3c2f81bc7008105)

## パターン 5

### コード例

```glsl
void main(){
    float strengthY = 1.0 - vUv.y;
    gl_FragColor = vec4(vec3(strengthY), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/5fd869a0b0675db9ffa0bb7dd23ec68f.png)](https://gyazo.com/5fd869a0b0675db9ffa0bb7dd23ec68f)

## パターン 6

### コード例

```glsl
void main(){
    float strengthY = vUv.y * 10.0;
    gl_FragColor = vec4(vec3(strengthY), 1.0);
}
```

### 出力結果

[![pattern 6](https://i.gyazo.com/697227578f067f160b47d17e39f6f441.png)](https://gyazo.com/697227578f067f160b47d17e39f6f441)

## パターン 7

`mod 関数`を使用する`mod 関数`は剰余演算を行う関数で
JavaScript の `%`と同じです。

`mod(x, y)` は `x - y * floor(x / y)` を返します
つまり **x を y で割った余り**を返す

**今回の例の場合**
`mod(vUv.y * 10.0, 1.0)`は
0.0 から 10.0 を 1.0 で割った余りを計算して表示するので
余りが `0.0` の部分が表示されなくなります

### コード例

```glsl
void main(){
    float strengthY = mod(vUv.y * 10.0, 1.0);
    gl_FragColor = vec4(vec3(strengthY), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/e0ff9d06739c2b5381a11fcfca4779c5.png)](https://gyazo.com/e0ff9d06739c2b5381a11fcfca4779c5)

## パターン 8

`mod 関数`と`step 関数`の組み合わせ
`step 関数`は引数に応じて `0.0` か `1.0`を返す関数

**今回の例の場合**
`step(0.5, strengthY)`
0.5 以下のとき 0.0 を返す それ以外は 1.0 を返すので、
グラデーションではなくなる

> [!TIP]
>
> `if 文`でも同様の処理が可能だがパフォーマンスに悪影響なので`step 関数`の使用を推奨

### コード例

```glsl
// step 関数 での処理
void main(){
    strengthY = step(0.5, strengthY);
    gl_FragColor = vec4(vec3(strengthY), 1.0);
}
```

```glsl
    // if 文 での処理 (※パフォーマンスが悪いので避ける)
    if (strengthY < 0.5) {
        strengthY = 0.0;
    } else {
        strengthY = 1.0;
    }

    // 三項演算子も使える
    strengthY = strengthY < 0.5 ? 0.0 : 1.0;

    gl_FragColor = vec4(vec3(strengthY), 1.0);
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/b8072837ecb680940b5d9c2801736bfb.png)](https://gyazo.com/b8072837ecb680940b5d9c2801736bfb)

## パターン 9

`step 関数`の第 1 引数の値を変更することで線の太さが変わる

### コード例

```glsl
// step 関数 での処理
void main(){
    float strengthY = mod((vUv.y * 10.0), 1.0);
    strengthY = step(0.8, strengthY);

    gl_FragColor = vec4(vec3(strengthY), 1.0);
}
```

### 出力結果

[![shader pattern 9](https://i.gyazo.com/b7236f59247d8c74a87fe16f4853a50b.png)](https://gyazo.com/b7236f59247d8c74a87fe16f4853a50b)

## パターン 10

軸を変更することで線の向きが変わる

### コード例

```glsl
void main(){
    float strengthX = mod((vUv.x * 10.0), 1.0);
    strengthX = step(0.8, strengthX);

    gl_FragColor = vec4(vec3(strengthX), 1.0);
}
```

### 出力結果

[![shader pattern 10
](https://i.gyazo.com/e7a1d588682491c97ce5a50d4d479132.png)](https://gyazo.com/e7a1d588682491c97ce5a50d4d479132)

## パターン 11

両軸を組み合わせることで、格子状にすることができる

### コード例

```glsl
void main(){
    float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    strength += step(0.8, mod(vUv.y * 10.0, 1.0));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/7fd85b1e98ee2812d667d4ac73f5a7c0.png)](https://gyazo.com/7fd85b1e98ee2812d667d4ac73f5a7c0)

## パターン 12

乗算することで交差部分のみを表示することで、点状にすることができる
加算(+) から乗算(\*)に変更することで両方の条件を満たす部分が表示される

### コード例

```glsl
void main(){
    float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/8f63287d1378ffbf74cd0a6ddeda2b6c.png)](https://gyazo.com/8f63287d1378ffbf74cd0a6ddeda2b6c)

## パターン 13

x 軸の長さを調整したパターン

### コード例

```glsl
void main(){
    float strength = step(0.4, mod(vUv.x * 10.0, 1.0));
    strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/476f4d3e44e3f34d6f978922f9bf3edd.png)](https://gyazo.com/476f4d3e44e3f34d6f978922f9bf3edd)

## パターン 14

パターン 13 を 両軸で組み合わせることでより複雑な格子状にすることができる

### コード例

```glsl
void main(){
    float barX = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0, 1.0));

    float strength = barX + barY;
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/e85fe122ddfab81eb7525c6235b870ac.png)](https://gyazo.com/e85fe122ddfab81eb7525c6235b870ac)

## パターン 15

パターン 14 に 両軸のオフセットを加えることで十字にすることができる
`step 関数`の第 1 引数の半分の値でオフセットすることでちょうど真ん中で交差する

### コード例

```glsl
void main(){
    float barX = step(0.4, mod(vUv.x * 10.0 , 1.0)) * step(0.8, mod(vUv.y * 10.0 + 0.2 , 1.0));
    float barY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0)) * step(0.4, mod(vUv.y * 10.0 , 1.0));

    float strength = barX + barY;
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/6b035fc78c1ffa6bc806c6246c0265ab.png)](https://gyazo.com/6b035fc78c1ffa6bc806c6246c0265ab)

## パターン 16

`abs 関数`で絶対値を使うことで 中心(0.5)からの距離に基づいたグラデーションを作成することができる。これにより、左右対称の効果が得られます。

### コード例

```glsl
void main(){
    float strength = abs(vUv.x - 0.5);
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/ded4b697675bca4787308e2b054f5bed.png)](https://gyazo.com/ded4b697675bca4787308e2b054f5bed)

## パターン 17

`min 関数`で x 軸と y 軸の両方で中心からの距離の小さい方を選択します。

### コード例

```glsl
void main(){
    float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/f02d895c176417ae900750fc0cd96b5e.png)](https://gyazo.com/f02d895c176417ae900750fc0cd96b5e)

## パターン 18

`max 関数`で x 軸と y 軸の両方で中心からの距離の大きい方を選択します。

### コード例

```glsl
void main(){
    float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/95a81d2de5c28f531b46dc2be42ebbe9.png)](https://gyazo.com/95a81d2de5c28f531b46dc2be42ebbe9)

## パターン 19

パターン 18 に`step 関数`を組み合わせたパターン

### コード例

```glsl
void main(){
    float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/1a787cc5ad855f5e81606bc10223af77.png)](https://gyazo.com/1a787cc5ad855f5e81606bc10223af77)

## パターン 20

2 つの異なるサイズの四角形を組み合わせることで、フレーム状のパターンを作成します。外側の四角形から内側の四角形を乗算することで、枠線のみが残ります。

### コード例

```glsl
void main(){
    float outerSquare = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    float innerSquare = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    float strength = outerSquare * innerSquare;
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/bcc553ea100248cb42f0e21a673783b6.png)](https://gyazo.com/bcc553ea100248cb42f0e21a673783b6)

## パターン 21

`floor 関数`を使用して整数に丸めてから `0.0 から 1.0` の間の値を取得している

### コード例

```glsl
void main(){
    float strength = floor(vUv.x * 10.0) / 10.0;
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/453d65d03fb97e09f99c52e0494fa544.png)](https://gyazo.com/453d65d03fb97e09f99c52e0494fa544)

## パターン 22

パターン 21 を x 軸 と y 軸 での組み合わせ

### コード例

```glsl
void main(){
    float strength = floor(vUv.x * 10.0) / 10.0 * floor(vUv.y * 10.0) / 10.0;
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/3be9baf7f60130bbc8cc766a198da485.png)](https://gyazo.com/3be9baf7f60130bbc8cc766a198da485)

## パターン 23

疑似乱数値使用したパターン

> [!NOTE]
>
> `GLSL`には`random 関数`がないため擬似的なランダムな値を作成しています
> こちらの`random 関数`について詳しく知りたい場合は
> [The Book of Shaders のリンク](https://thebookofshaders.com/10/)をご覧ください

### コード例

```glsl
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

```

```glsl
void main(){
    float strength = random(vUv);
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/a6db94847e275cd8d7ccd36dcaf24607.png)](https://gyazo.com/a6db94847e275cd8d7ccd36dcaf24607)

## パターン 24

パターン 23 と パターン 24 の組み合わせ

### コード例

```glsl
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

```

```glsl
void main(){
    vec2 gridUv = vec2(
        floor(vUv.x * 10.0) / 10.0,
        floor(vUv.y * 10.0) / 10.0
    );

    float strength = random(gridUv);
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/8b00f69d257cbd2f33a1ef423ae67e81.png)](https://gyazo.com/8b00f69d257cbd2f33a1ef423ae67e81)

## パターン 25

パターン 24 に傾斜効果を加えたパターン
`vUv.y` に `vUv.x` を加えることで傾斜効果を加えることができる

### コード例

```glsl
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

```

```glsl
void main(){
    vec2 gridUv = vec2(
        floor(vUv.x * 10.0) / 10.0,
        floor((vUv.y * 10.0 + vUv.x * 5.0)) / 10.0
    );

    float strength = random(gridUv);
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/8b00f69d257cbd2f33a1ef423ae67e81.png)](https://gyazo.com/8b00f69d257cbd2f33a1ef423ae67e81)
