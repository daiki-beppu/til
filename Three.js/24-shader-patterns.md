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
// fragmetn.glsl に記述

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

`mod 関数`を使用する`mod 関数`は剰余演算を行う関数
JavaScript の `%`と同じ

`mod(x, y)` は `x - y * floor(x / y)` を返す
つまり **x を y で割った余り**を返す

**今回の例の場合**
`mod(vUv.y * 10.0, 1.0)`は
0.0 から 10.0 を 1.0 で割った余りを計算して表示するので
余りが `0.0` の部分が表示されなくなる

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
0.5 以下のとき 0.0 を返す それ以外は 1.0 を返ので
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

[![Image from Gyazo](https://i.gyazo.com/e0ff9d06739c2b5381a11fcfca4779c5.png)](https://gyazo.com/e0ff9d06739c2b5381a11fcfca4779c5)

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
