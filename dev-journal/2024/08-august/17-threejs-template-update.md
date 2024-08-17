---
title: 17-threejs-template-update
date: 2024/08/17
updated: 2024/08/17
---

# 2024/08/17 開発日誌

制作物
https://github.com/daiki-beppu/threejs-vite-vanilla

- [ディレクトリ構造とファイル名の変更](#ディレクトリ構造とファイル名の変更)
  - [変更内容](#変更内容)
- [Enviroment クラスの追加](#enviroment-クラスの追加)
- [シェーダーファイルの追加](#シェーダーファイルの追加)

## ディレクトリ構造とファイル名の変更

```
// アップデート前のディレクトリ構造とファイル名

src
├── Experience
│   ├── Camera.js
│   ├── Experience.js
│   ├── Renderer.js
│   ├── Utils
│   │   ├── Debug.js
│   │   ├── EventEmitter.js
│   │   ├── Resources.js
│   │   ├── Sizes.js
│   │   └── Time.js
│   ├── World
│   │   └── World.js
│   └── assets.js
├── index.html
├── script.js
└── style.css
```

```
// アップデート後のディレクトリ構造とファイル名

src
├── core
│   └── AppCore.js
├── index.html
├── main.js
├── rendering
│   ├── Camera.js
│   └── Renderer.js
├── resources
│   ├── Resources.js
│   └── assets.js
├── shaders
│   ├── fragment.glsl
│   └── vertex.glsl
├── style.css
├── utils
│   ├── Debug.js
│   ├── EventEmitter.js
│   ├── Sizes.js
│   └── Time.js
└── world
    ├── World.js
    ├── environment
    │   ├── Enviroment.js
    │   └── light
    └── objects
```

### 変更内容

- `Expreience` をより汎用的な命名`AppCore`に変更
- ディレクトリ構造をより詳細に分類
- - `core`: アプリケーションの基幹ファイル
- - `rendering`: レンダリングに関するファイル
- - `resorces`: リソース管理に関するファイル
- `enviroment`フォルダ(ワールドの環境に関するファイル)を追加
- シェーダーフォルダの追加

以下のファイルを`core`に含めるか検討中

- `index.html`
- `style.css`
- `main.js`

## Enviroment クラスの追加

環境マップをあらかじめ適用しておく
ファイルを分けたのはライトを追加する際にごちゃごちゃしないようにするため

```js
// Environment.js に記述

import { EnvMap } from "./envMap/EnvMap";

export class Environment {
  constructor(appCore) {
    this.appCore = appCore;
    this.scene = this.appCore.scene;
    this.resources = this.appCore.resources;
    this.debug = this.appCore.debug;

    this.setEnvMap();
  }
  setEnvMap() {
    this.environmentMap = new EnvMap(this.scene, this.resources);
  }
}
```

```js
// EnvMap.js に記述
import * as THREE from "three";

export class EnvMap {
  constructor(scene, resources) {
    this.scene = scene;
    this.resources = resources;

    this.environmentMap = {};
    this.environmentMap.intensity = 0.4;
    this.environmentMap.texture = this.resources.items.envMap;

    this.setup();
  }
  setup() {
    this.scene.environment = this.environmentMap.texture;
    this.updateMaterialsEnvMap();
  }
  updateMaterialsEnvMap() {
    this.scene.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.material.envMapIntensity = this.environmentMap.intensity;
        child.material.needsUpdate = true;
      }
    });
  }
  setIntensity(intensity) {
    this.environmentMap.intensity = intensity;
    this.updateMaterialsEnvMap();
  }
}
```

設定部分を`envMapConfig.js`ファイルに切り出すのも検討中

## シェーダーファイルの追加

シェーダーに関するファイルをあらかじめ作成
これにより設定の変更なくシェーダーを書き進められる

```glsl
// vertex.glsl に記述

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;
}
```

```glsl
// fragment.glsl に記述

void main() {
  gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0);
}

```
