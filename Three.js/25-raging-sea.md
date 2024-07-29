# ｢荒れ狂う海｣の作成

- [｢荒れ狂う海｣の作成](#荒れ狂う海の作成)
  - [下準備](#下準備)
    - [出力結果](#出力結果)

## 下準備

**JavaScript**

- `ShaderMaterial`を作成
- `vertexShader` プロパティと`fragmentShader`プロパティを設定

```js
import waterVertexShader from './shaders//water/vertex.glsl';
import waterFragmetnShader from './shaders//water/fragment.glsl';

const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmetnShader,
});
```

**GLSL**

- `/src/shaders/water`フォルダを作成
- `water`フォルダ内に`vertec.glsl`ファイル と `fragment.glsl`ファイルを作成

```glsl
// vertex.glsl に記述
void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;
  vUv = uv;
}
```

```glsl
// fragment.glsl に記述
void main() {
  gl_FragColor = vec4(0.5, 0.8, 1.0, 1.0);
}
```

### 出力結果

[![Image from Gyazo](https://i.gyazo.com/367276bb52d4b6602296813daf96cac5.png)](https://gyazo.com/367276bb52d4b6602296813daf96cac5)
