---
title: 24-shader-patterns
date: 2024-07-26
updated: 2024-07-26
---

# シェーダーパターン

- [下準備](#下準備)
  - [出力結果](#出力結果)
- [色を変更する](#色を変更する)
  - [コード例](#コード例)
  - [出力結果](#出力結果-1)
- [色を混ぜる](#色を混ぜる)
  - [コード例](#コード例-1)
  - [出力結果](#出力結果-2)
- [パターン 1](#パターン-1)
  - [コード例](#コード例-2)
- [パターン 2](#パターン-2)
  - [コード例](#コード例-3)
  - [出力結果](#出力結果-3)
- [パターン 3](#パターン-3)
  - [コード例](#コード例-4)
  - [出力結果](#出力結果-4)
- [パターン 4](#パターン-4)
  - [コード例](#コード例-5)
  - [出力結果](#出力結果-5)
- [パターン 5](#パターン-5)
  - [コード例](#コード例-6)
  - [出力結果](#出力結果-6)
- [パターン 6](#パターン-6)
  - [コード例](#コード例-7)
  - [出力結果](#出力結果-7)
- [パターン 7](#パターン-7)
  - [コード例](#コード例-8)
  - [出力結果](#出力結果-8)
- [パターン 8](#パターン-8)
  - [コード例](#コード例-9)
  - [出力結果](#出力結果-9)
- [パターン 9](#パターン-9)
  - [コード例](#コード例-10)
  - [出力結果](#出力結果-10)
- [パターン 10](#パターン-10)
  - [コード例](#コード例-11)
  - [出力結果](#出力結果-11)
- [パターン 11](#パターン-11)
  - [コード例](#コード例-12)
  - [出力結果](#出力結果-12)
- [パターン 12](#パターン-12)
  - [コード例](#コード例-13)
  - [出力結果](#出力結果-13)
- [パターン 13](#パターン-13)
  - [コード例](#コード例-14)
  - [出力結果](#出力結果-14)
- [パターン 14](#パターン-14)
  - [コード例](#コード例-15)
  - [出力結果](#出力結果-15)
- [パターン 15](#パターン-15)
  - [コード例](#コード例-16)
  - [出力結果](#出力結果-16)
- [パターン 16](#パターン-16)
  - [コード例](#コード例-17)
  - [出力結果](#出力結果-17)
- [パターン 17](#パターン-17)
  - [コード例](#コード例-18)
  - [出力結果](#出力結果-18)
- [パターン 18](#パターン-18)
  - [コード例](#コード例-19)
  - [出力結果](#出力結果-19)
- [パターン 19](#パターン-19)
  - [コード例](#コード例-20)
  - [出力結果](#出力結果-20)
- [パターン 20](#パターン-20)
  - [コード例](#コード例-21)
  - [出力結果](#出力結果-21)
- [パターン 21](#パターン-21)
  - [コード例](#コード例-22)
  - [出力結果](#出力結果-22)
- [パターン 22](#パターン-22)
  - [コード例](#コード例-23)
  - [出力結果](#出力結果-23)
- [パターン 23](#パターン-23)
  - [コード例](#コード例-24)
  - [出力結果](#出力結果-24)
- [パターン 24](#パターン-24)
  - [コード例](#コード例-25)
  - [出力結果](#出力結果-25)
- [パターン 25](#パターン-25)
  - [コード例](#コード例-26)
  - [出力結果](#出力結果-26)
- [パターン 26](#パターン-26)
  - [コード例](#コード例-27)
  - [出力結果](#出力結果-27)
- [パターン 27](#パターン-27)
  - [コード例](#コード例-28)
  - [出力結果](#出力結果-28)
- [パターン 28](#パターン-28)
  - [コード例](#コード例-29)
  - [出力結果](#出力結果-29)
- [パターン 29](#パターン-29)
  - [コード例](#コード例-30)
  - [出力結果](#出力結果-30)
- [パターン 30](#パターン-30)
  - [コード例](#コード例-31)
  - [出力結果](#出力結果-31)
- [パターン 31](#パターン-31)
  - [コード例](#コード例-32)
  - [出力結果](#出力結果-32)
- [パターン 32](#パターン-32)
  - [コード例](#コード例-33)
  - [出力結果](#出力結果-33)
- [パターン 33](#パターン-33)
  - [コード例](#コード例-34)
  - [出力結果](#出力結果-34)
- [パターン 34](#パターン-34)
  - [コード例](#コード例-35)
  - [出力結果](#出力結果-35)
- [パターン 35](#パターン-35)
  - [コード例](#コード例-36)
  - [出力結果](#出力結果-36)
- [パターン 36](#パターン-36)
  - [コード例](#コード例-37)
  - [出力結果](#出力結果-37)
- [パターン 37](#パターン-37)
  - [コード例](#コード例-38)
  - [出力結果](#出力結果-38)
- [パターン 38](#パターン-38)
  - [コード例](#コード例-39)
  - [出力結果](#出力結果-39)
- [パターン 39](#パターン-39)
  - [コード例](#コード例-40)
  - [出力結果](#出力結果-40)
- [パターン 40](#パターン-40)
  - [コード例](#コード例-41)
  - [出力結果](#出力結果-41)
- [パターン 41](#パターン-41)
  - [コード例](#コード例-42)
  - [出力結果](#出力結果-42)
- [パターン 42](#パターン-42)
  - [コード例](#コード例-43)
  - [出力結果](#出力結果-43)
- [パターン 43](#パターン-43)
  - [コード例](#コード例-44)
  - [出力結果](#出力結果-44)
- [パターン 44](#パターン-44)
  - [コード例](#コード例-45)
  - [出力結果](#出力結果-45)
- [パターン 45](#パターン-45)
  - [コード例](#コード例-46)
  - [出力結果](#出力結果-46)
- [パターン 46](#パターン-46)
  - [コード例](#コード例-47)
  - [出力結果](#出力結果-47)
- [パターン 47](#パターン-47)
  - [コード例](#コード例-48)
  - [出力結果](#出力結果-48)
- [パターン 48](#パターン-48)
  - [コード例](#コード例-49)
  - [出力結果](#出力結果-49)
- [パターン 49](#パターン-49)
  - [コード例](#コード例-50)
  - [出力結果](#出力結果-50)
- [パターン 50](#パターン-50)
  - [コード例](#コード例-51)
  - [出力結果](#出力結果-51)

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

## 色を変更する

### コード例

```glsl
void main(){
    gl_FragColor = vec4(vUv, 1.0, 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/195d3e1657c57365d1d3b2e90e153a76.png)](https://gyazo.com/195d3e1657c57365d1d3b2e90e153a76)

## 色を混ぜる

`mix 関数`を使用して色を混ぜることできます`mix 関数`は 3 つの引数が必要です

- 第 1 引数: `float`, `vec2`, `vec3`, `vec4` のいずれかで色を指定
- 第 2 引数: 第 1 引数と同じ形で色を指定
- 第 3 引数: `float` どちらの色をより多く取得するかを設定 `0.0` の場合第 1 引数に設定した色を表示、`1.0` の場合、第 2 引数に設定した色を表示する

今回は色の強度に応じて変更されるように設定

### コード例

```glsl
void main(){
    float strength = vUv.x;
    vec3 baseColor = vec3(vUv.r * 3.0, vUv.g * 1.5, 0.5);
    vec3 uvColor = vec3(vUv, 0.0);
    vec3 mixedColor = mix(baseColor, uvColor, strength);
    gl_FragColor = vec4(mixedColor, 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/b860d0140f6309a59ed38e7116f85594.png)](https://gyazo.com/b860d0140f6309a59ed38e7116f85594)

## パターン 1

### コード例

```glsl
void main(){
    gl_FragColor = vec4(vUv, 1.0, 1.0);
}
```

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
    float strength = vUv.x;
   gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/ff5ce053d1c2829d2aa84270ac9dc2bb.png)](https://gyazo.com/ff5ce053d1c2829d2aa84270ac9dc2bb)

## パターン 4

### コード例

```glsl
void main(){
    float strength = vUv.y;
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/b6964971bb824cd9b3c2f81bc7008105.png)](https://gyazo.com/b6964971bb824cd9b3c2f81bc7008105)

## パターン 5

### コード例

```glsl
void main(){
    float strength = 1.0 - vUv.y;
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/5fd869a0b0675db9ffa0bb7dd23ec68f.png)](https://gyazo.com/5fd869a0b0675db9ffa0bb7dd23ec68f)

## パターン 6

### コード例

```glsl
void main(){
    float strength = vUv.y * 10.0;
    gl_FragColor = vec4(vec3(strength), 1.0);
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
    float strength = mod(vUv.y * 10.0, 1.0);
    gl_FragColor = vec4(vec3(strength), 1.0);
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
    float strength = mod(vUv.y * 10.0, 1.0);
    strength = step(0.5, strength);
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

```glsl
    // if 文 での処理 (※パフォーマンスが悪いので避ける)
    if (strength < 0.5) {
        strength = 0.0;
    } else {
        strength = 1.0;
    }

    // 三項演算子も使える
    strength = strength < 0.5 ? 0.0 : 1.0;

    gl_FragColor = vec4(vec3(strength), 1.0);
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/b8072837ecb680940b5d9c2801736bfb.png)](https://gyazo.com/b8072837ecb680940b5d9c2801736bfb)

## パターン 9

`step 関数`の第 1 引数の値を変更することで線の太さが変わる

### コード例

```glsl
// step 関数 での処理
void main(){
    float strength = mod((vUv.y * 10.0), 1.0);
    strength = step(0.8, strength);

    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![shader pattern 9](https://i.gyazo.com/b7236f59247d8c74a87fe16f4853a50b.png)](https://gyazo.com/b7236f59247d8c74a87fe16f4853a50b)

## パターン 10

軸を変更することで線の向きが変わる

### コード例

```glsl
void main(){
    float strength = mod((vUv.x * 10.0), 1.0);
    strength = step(0.8, strength);

    gl_FragColor = vec4(vec3(strength), 1.0);
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

色をつけたとき、交差点の強度が高くなるため、意図した出力にならない

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/db844ec8d8f6d67816fa5d45f8d55db6.png)](https://gyazo.com/db844ec8d8f6d67816fa5d45f8d55db6)

これを回避するために`clamp 関数`を使用する
`clamp(x, min, max)`: x を min 以上 max 以下の範囲に制限

今回は `strength` を 0.0 から 1.0 の範囲にすることで強度を制御している

```glsl
void main() {
    float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    strength += step(0.8, mod(vUv.y * 10.0, 1.0));
    strength = clamp(strength, 0.0, 1.0);

    vec3 blackColor = vec3(0.0902, 0.0863, 0.0863);
    vec3 uvColor = vec3(vUv.r / 0.75, vUv.g / 1.35, 0.3);
    vec3 mixedColor = mix(blackColor, uvColor, strength);
    gl_FragColor = vec4(mixedColor, 1.0);
}
```

**出力結果**

[![Image from Gyazo](https://i.gyazo.com/10acb7d8458999769ebf37b9cc81ad6c.png)](https://gyazo.com/10acb7d8458999769ebf37b9cc81ad6c)

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

[![Image from Gyazo](https://i.gyazo.com/0e8ff12b34d952845e0ed9f6bc167fa9.png)](https://gyazo.com/0e8ff12b34d952845e0ed9f6bc167fa9)

## パターン 26

`length 関数`を使用してベクトルの長さを取得している

### コード例

```glsl
void main(){
    float strength = length(vUv);
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/3a158f0a28d8aad61ab154c8f11fcdc9.png)](https://gyazo.com/3a158f0a28d8aad61ab154c8f11fcdc9)

## パターン 27

`distance 関数`を使用して特定のポイント間の距離を取得している

### コード例

```glsl
void main(){
    float strength = distance(vUv, vec2(0.5)); // 0.5 は中心
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

このパターンは`length 関数`でも実装可能

```glsl
void main(){
    float strength = length(vUv - 0.5);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/aedbbb00ff4bf23b63ebf9da6a4b1168.png)](https://gyazo.com/aedbbb00ff4bf23b63ebf9da6a4b1168)

## パターン 28

パターン 27 を反転させたパターン
`1.0` から減算することで反転することができる

### コード例

```glsl
void main(){
    float strength = 1.0 - distance(vUv, vec2(0.5));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/188c91e877f89de8343b9bcd85e09e42.png)](https://gyazo.com/188c91e877f89de8343b9bcd85e09e42)

## パターン 29

パターン 27 の応用
非常に小さい値から除算することで中心に集まる
ただし、値が `0.0` になることはないのでよく見ると平面の端が見える

> [!NOTE] なぜ中心に集まるのか？
> **distance 関数の性質:**
> distance(vUv, vec2(0.5)) は、各ピクセルの UV 座標と中心点 (0.5, 0.5) との距離を計算します。
> 中心に近いほどこの距離は小さくなり、中心から遠ざかるほど大きくなります。
>
> **除算の効果:**
> strength = 0.015 / distance(...) という計算は、距離の逆数に定数を掛けています。
> 距離が小さいほど（つまり中心に近いほど）、この計算結果は大きくなります。
>
> **数値の挙動:**
> 中心点では、distance はほぼ 0 に近づきます（完全に 0 にはなりません）。
> 0 に近い値で割ると、結果は非常に大きくなります。
> 例：0.015 / 0.001 = 15
>
> **視覚効果:**
> 結果として、中心付近では strength の値が大きく（明るく）なり、
> 中心から離れるにつれて strength の値が急速に小さく（暗く）なります。
>
> **非線形性:**
> この除算によって、距離と明るさの関係が非線形になります。
> つまり、中心からの距離が 2 倍になっても、明るさは単純に 1/2 にはなりません。
>
> **0.015 の役割:**
> この定数は全体の明るさを調整します。
> 大きくすると全体が明るくなり、小さくすると暗くなります。

### コード例

```glsl
void main(){
    float strength = 0.015 / distance(vUv, vec2(0.5));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/0317560037b6d225af52f83f33a734ad.png)](https://gyazo.com/0317560037b6d225af52f83f33a734ad)

<a href="https://gyazo.com/df4ed58906749e6306fd7de3b42e37af"><img src="https://i.gyazo.com/df4ed58906749e6306fd7de3b42e37af.gif" alt="Image from Gyazo" width="990"/></a>

## パターン 30

パターン 29 の応用
UV 座標の変換を行い、両方向の変化を圧縮して値をオフセットすることで中心に移動させたパターン
この場合、上から光を押しつぶしたような効果を得られる

`vUv.x * 0.1` は 横方向の変化を `1 / 10` に圧縮
`vUv.y * 0.5` は 縦方向の変化を `1/ 2` に圧縮

> [!NOTE] オフセット値の計算
> 今回は値をテストすることでオフセット値を算出しました。
> 計算でもできるみたいなので載せておきます
>
> `(0 * 0.1 + x) + (1 * 0.1 + x) = 1`
> x + (0.1 + x) = 1
> 2x + 0.1 = 1
> 2x = 0.9
> x = 0.45

### コード例

```glsl
void main(){
    vec2 lightUv = vec2(vUv.x * 0.1 + 0.45,vUv.y * 0.5 + 0.25);
    float strength = 0.015 / distance(lightUv, vec2(0.5));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/b399568f48c95c7540978ce6c4c56e91.png)](https://gyazo.com/b399568f48c95c7540978ce6c4c56e91)

## パターン 31

パターン 30 の応用で x 方向と y 方向の光の効果を乗算したパターン

### コード例

```glsl
void main(){
    vec2 lightUvX = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);
    float lightX = 0.015 / distance(lightUvX, vec2(0.5));

    vec2 lightUvY = vec2(vUv.y * 0.1 + 0.45, vUv.x * 0.5 + 0.25);
    float lightY = 0.015 / distance(lightUvY, vec2(0.5));

    float strength = lightX * lightY;
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/1c87325c595437b95de4ed0f89534ef6.png)](https://gyazo.com/1c87325c595437b95de4ed0f89534ef6)

## パターン 32

パターン 31 の応用で `rotate 関数`を作成して中心の座標を回転させたパターン
`#define`を使用して`PI`を変更できない値(定数)として定義

> [!TIP]
>
> `#difine`での定義は`=`が必要ないので注意

### コード例

```glsl
#define PI 3.1415926535897932384626433832795
```

```glsl
vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    return vec2(
        cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}
```

```glsl
void main(){
    vec2 rotatedUv = rotate(vUv, PI / 4.0, vec2(0.5));

    vec2 lightUvX = vec2(rotatedUv.x * 0.1 + 0.45, rotatedUv.y * 0.5 + 0.25);
    float lightX = 0.015 / distance(lightUvX, vec2(0.5));

    vec2 lightUvY = vec2(rotatedUv.y * 0.1 + 0.45, rotatedUv.x * 0.5 + 0.25);
    float lightY = 0.015 / distance(lightUvY, vec2(0.5));

    float strength = lightX * lightY;
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/00a267eaeb21678c99cfecf56959bb59.png)](https://gyazo.com/00a267eaeb21678c99cfecf56959bb59)

## パターン 33

パターン 27 の応用
`step 関数`を合わせて使用し、オフセットの値で円の半径を調整できるパターン

### コード例

```glsl
void main(){
    float strength = step(0.25 ,distance(vUv, vec2(0.5)));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/32497f2b5168617cbc14f1bd4b0554c5.png)](https://gyazo.com/32497f2b5168617cbc14f1bd4b0554c5)

## パターン 34

パターン 33 の応用
`abs 関数`を使用し、絶対値を使用するパターン

### コード例

```glsl
void main(){
    float strength = abs(distance(vUv, vec2(0.5)) - 0.25);
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/e384c34249efb1ab287e23bd05be5b3e.png)](https://gyazo.com/e384c34249efb1ab287e23bd05be5b3e)

## パターン 35

パターン 33 とパターン 34 を組み合わせたパターン

### コード例

```glsl
void main(){
    float strength = step(0.01 , abs(distance(vUv, vec2(0.5)) - 0.25));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/4d960edab52ac7520121e6ddec5d652c.png)](https://gyazo.com/4d960edab52ac7520121e6ddec5d652c)

## パターン 36

パターン 35 を `1.0` から減算することで反転させたパターン

### コード例

```glsl
void main(){
    float strength = 1.0 - step(0.01 , abs(distance(vUv, vec2(0.5)) - 0.25));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/2b6a0dd81b6b390af95fa821a8943ab0.png)](https://gyazo.com/2b6a0dd81b6b390af95fa821a8943ab0)

## パターン 37

パターン 36 の応用
`sin 関数` を使用し波を作る

> [!NOTE] Memo
>
> `sin 関数`を使用したのに変化がないと感じたら強度(周波数)を上げてみる
> 今回のパターンなら `sin(sin(vUv.x * 30.0)` の `* 30.0`の部分
> 元の値が 0.0 から 1.0 の間なので変化が小さい場合がある

### コード例

```glsl
void main(){
    vec2 wavedUv = vec2(
            vUv.x,
            vUv.y + sin(vUv.x * 30.0) * 0.1
    );
    float strength = 1.0 - step(0.01 , abs(distance(wavedUv, vec2(0.5)) - 0.25));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/7915d98b5f8b4f0a059ea74ebcbda192.png)](https://gyazo.com/7915d98b5f8b4f0a059ea74ebcbda192)

## パターン 38

パターン 37 の応用
x と y の両方向に波を適用したパターン

### コード例

```glsl
void main(){
    vec2 wavedUv = vec2(
            vUv.x + sin(vUv.y * 30.0) * 0.1,
            vUv.y + sin(vUv.x * 30.0) * 0.1
    );
    float strength = 1.0 - step(0.01 , abs(distance(wavedUv, vec2(0.5)) - 0.25));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/7915d98b5f8b4f0a059ea74ebcbda192.png)](https://gyazo.com/7915d98b5f8b4f0a059ea74ebcbda192)

## パターン 39

パターン 38 の応用
周波数を上げたパターン

### コード例

```glsl
void main(){
    vec2 wavedUv = vec2(
            vUv.x + sin(vUv.y * 100.0) * 0.1,
            vUv.y + sin(vUv.x * 100.0) * 0.1
    );
    float strength = 1.0 - step(0.01 , abs(distance(wavedUv, vec2(0.5)) - 0.25));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/796550ebffe0bf5de2d3740c33f131be.png)](https://gyazo.com/796550ebffe0bf5de2d3740c33f131be)

## パターン 40

`atan 関数` を使用して 2D 座標から角度を取得

### コード例

```glsl
void main(){
    float angle = atan(vUv.x, vUv.y);
    float strength = angle;
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/45e63fb2c04994ca7d07384230e98053.png)](https://gyazo.com/45e63fb2c04994ca7d07384230e98053)

## パターン 41

パターン 40 の応用
値をオフセットして中心の周りに角度見えるパターン

### コード例

```glsl
void main(){
    float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    float strength = angle;
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/777915e45ce46e7b2258fe34ecae0293.png)](https://gyazo.com/777915e45ce46e7b2258fe34ecae0293)

## パターン 42

パターン 41 の応用
`PI * 2.0`で除算することで角度を `-0.5` から `0.5`の範囲にする
最後に `0.5`を加算して `0.0` から `1.0` の間にしている

こうすることで 角度が色の強度として直接使用することができるようになる

### コード例

```glsl
void main(){
    float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    float strength = angle ;
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/6c365b07a9e38cd5f16f244d11dd2e96.png)](https://gyazo.com/6c365b07a9e38cd5f16f244d11dd2e96)

## パターン 43

パターン 42 の応用
角度を 20 倍にしてから
`mod 関数`を使用して剰余演算を行い、再度 `0.0` から `1.0` の範囲にする
これにより 20 回 繰り返されるパターンになる

> [!NOTE] Memo

> `*= 20.0` を変更すること放射状に広がる線の数を調整

### コード例

```glsl
void main(){
    float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    angle *= 20.0;
    angle = mod(angle, 1.0);
    float strength = angle ;
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/fce75c773a4447fb96ea2e554a0e98bf.png)](https://gyazo.com/fce75c773a4447fb96ea2e554a0e98bf)

## パターン 44

パターン 43 の応用
`sin 関数`を使用して周波数を調整することでよりはっきりとしたディテールのパターンになる

### コード例

```glsl
void main(){
    float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    float strength = sin(angle * 100.0);
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/c918970f854b56c1597bec36224593ec.png)](https://gyazo.com/c918970f854b56c1597bec36224593ec)

## パターン 45

パターン 36 と パターン 44 を組み合わせたパターン

### コード例

```glsl
void main(){
    float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    float sinusoid = sin(angle * 100.0);

    float radius = 0.25 + sinusoid * 0.02;
    float strength = 1.0 - step(0.01 , abs(distance(vUv, vec2(0.5)) - radius));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/56f0ddd87b6d964847552fcebbedeab1.png)](https://gyazo.com/56f0ddd87b6d964847552fcebbedeab1)

## パターン 46

と呼ばれる自然を模したアルゴリズムを適用したパターン

> [!NOTE]
>
> のコードは [Github gist](https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83) のコードを使用しています。

### コード例

```glsl
vec2 fade(vec2 t) {return t * t*t * (t * (t * 6.0 - 15.0) + 10.0); }
vec4 permute(vec4 x) {return mod(((x * 34.0) + 1.0) * x, 289.0); }

float cnoise(vec2 P) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x, gy.x);
    vec2 g10 = vec2(gx.y, gy.y);
    vec2 g01 = vec2(gx.z, gy.z);
    vec2 g11 = vec2(gx.w, gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 *
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}
```

```glsl
void main(){
    float strength = cnoise(vUv * 10.0);
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/ff9f4c104a2e0411c4ad31ebf51e3700.png)](https://gyazo.com/ff9f4c104a2e0411c4ad31ebf51e3700)

## パターン 47

パターン 46 の応用
パーリンノイズに`step 関数`を 使用してはっきり見えるようにしたパターン

### コード例

```glsl
void main(){
    float strength = step(0.0, cnoise(vUv * 10.0));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/f58c54ecb3cd9c8825e411ccc8eb0877.png)](https://gyazo.com/f58c54ecb3cd9c8825e411ccc8eb0877)

## パターン 48

パターン 46 の応用
に`abs 関数`を使用して `1.0` から減算して反転させた稲妻のようなパターン

### コード例

```glsl
void main(){
    float strength = 1.0 - abs(cnoise(vUv * 10.0));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/13795382e9576ee3f5f0b84efd34609d.png)](https://gyazo.com/13795382e9576ee3f5f0b84efd34609d)

## パターン 49

パターン 46 の応用
に`sin 関数`を使用したサイケデリックなパターン

### コード例

```glsl
void main(){
    float strength = sin(cnoise(vUv * 10.0) * 20.0);
    gl_FragColor = vec4(vec3(strength), 1.0);
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/cf934aeeb70f15fb1956f09db251da32.png)](https://gyazo.com/cf934aeeb70f15fb1956f09db251da32)

## パターン 50

パターン 49 に `step 関数` を組み合わせたパターン
`step 関数`の第 1 引数を調整することで線の太さを調整できる

### コード例

```glsl
void main(){
    float strength = step(0.9, sin(cnoise(vUv * 10.0) * 20.0));
    gl_FragColor = vec4(vec3(strength), 1.0);
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/9c904a9deb52425136d49b4a98e612a8.png)](https://gyazo.com/9c904a9deb52425136d49b4a98e612a8)
