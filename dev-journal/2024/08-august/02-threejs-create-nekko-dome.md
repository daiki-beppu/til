---
title: 02-create-nekko-dome
date: 2024-08-03
update: 2024-08-03
---

# 開発日誌 2024/08/02

- [1. 新プロジェクト ｢ネッコドーム｣ の制作開始](#1-新プロジェクト-ネッコドーム-の制作開始)
- [2. 今日の進捗](#2-今日の進捗)
  - [2.1. 床の作成](#21-床の作成)
  - [2.2. 土台の作成](#22-土台の作成)
  - [2.3. ドームの作成](#23-ドームの作成)
  - [2.4. ライトの追加](#24-ライトの追加)
  - [2.5. リファクタリング](#25-リファクタリング)
- [3. まとめ](#3-まとめ)

## 1. 新プロジェクト ｢ネッコドーム｣ の制作開始

スノードームの猫バージョン

- 制作目的: パーティクルの練習
  - パーティクルの作成
  - パーティクルにテクスチャを適用(猫のテクスチャを適用したい)
  - パーティクルにアニメーションの適用
- 構造化されたプロジェクトでの制作
  - クラスの使用
  - モジュールの使用

## 2. 今日の進捗

- 床の作成
- 土台の作成
- ドームの作成
- リファクタリング

[![Image from Gyazo](https://i.gyazo.com/aece9e1b6d8b00d366ef48a78dfa0e6a.png)](https://gyazo.com/aece9e1b6d8b00d366ef48a78dfa0e6a)

### 2.1. 床の作成

特に躓くこともなく順調に制作
今後、テクスチャを追加予定

```js
// Floor.js

import * as THREE from "three";

const floorConfig = {
  geometry: { width: 10, height: 10 },
  material: { color: "ffffff" },
  mesh: {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: -Math.PI / 2, y: 0, z: 0 },
  },
};

export class Floor {
  constructor(experience) {
    this.experience = experience;
    this.scene = this.experience;

    this.setGeometry();
    this.setmaterial();
    this.setMesh();
  }

  setGeometry() {
    const { width, height } = floorConfig.geometry;
    this.geometry = new THREE.PlaneGeometry(width, height);
  }

  setmaterial() {
    const { color } = floorConfig.material;
    this.material = new THREE.MeshBasicMaterial({
      color: color,
    });
  }

  setMesh() {
    const { rotation, position } = floorConfig.mesh;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(position.x, position.y, position.z);
    this.mesh.rotation.set(rotation.x, rotation.y, rotation.z);
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
```

```js
// World.js

import { Floor } from "./Floor";

export class World {
  constructor(experience) {
    // ...

    this.floor = new Floor(this.scene);
  }

  // ...
}
```

### 2.2. 土台の作成

値はまだ仮の設定だがこちらも特に躓くことなく順調に制作

今後、テクスチャを追加予定

```js

import * as THREE from 'three';

const baseConfig = {
  geometry: { radiusTop: 4, radiusBottom: 5.5, height: 2, radialSegments: 32 },
  material: { color: '#222222' },
  mesh: {
    position: { x: 0, y: 1, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
};

export class Base {
  constructor(experience) {
    this.experience = experience;
    this.scene = this.experience;

    this.setGeometry();
    this.setmaterial();
    this.setMesh();
  }
  setGeometry() {
    const { radiusTop, radiusBottom, height, radialSegments } =
      baseConfig.geometry;
    this.geometry = new THREE.CylinderGeometry(
      radiusTop,
      radiusBottom,
      height,
      radialSegments,
    );
  }
  setmaterial() {
    const { color } = baseConfig.material;
    this.material = new THREE.MeshBasicMaterial({
      color: color,
    });
  }
  setMesh() {
    const { position } = baseConfig.mesh;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(position.x, position.y, position.z);
    this.scene.add(this.mesh);
  }
}
```

### 2.3. ドームの作成

ドームはまだ、制作途中
とりあえず透過させるところと、ガラスみたいな表現にするところまでは完成

ガラスの表現は claude に 聞いて見ました

[![Image from Gyazo](https://i.gyazo.com/c30b19075f0126c92dc15f366a224f85.jpg)](https://gyazo.com/c30b19075f0126c92dc15f366a224f85)

```js
import * as THREE from "three";

const domeConfig = {
  geometry: { radius: 5, widthSegment: 32, heightSegment: 16 },
  material: {
    opacity: 0.3,
    transmission: 1,
    roughness: 0,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
    ior: 1.5,
    reflectivity: 0.9,
    side: THREE.DoubleSide,
  },
  mesh: {
    position: { x: 0, y: 6, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
  },
};

export class Dome {
  constructor(experience) {
    this.experience = experience;
    this.scene = this.experience;

    this.setGeometry();
    this.setmaterial();
    this.setMesh();
  }
  setGeometry() {
    const { radius, widthSegment, heightSegment } = domeConfig.geometry;
    this.geometry = new THREE.SphereGeometry(
      radius,
      widthSegment,
      heightSegment
    );
  }
  setmaterial() {
    const {
      opacity,
      transmission,
      clearcoat,
      clearcoatRoughness,
      ior,
      reflectivity,
      side,
    } = domeConfig.material;
    this.material = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: opacity,
      transmission: transmission,
      clearcoat: clearcoat,
      clearcoatRoughness: clearcoatRoughness,
      ior: ior,
      reflectivity: reflectivity,
      side: side,
    });
  }
  setMesh() {
    const { position } = domeConfig.mesh;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(position.x, position.y, position.z);
    this.scene.add(this.mesh);
  }
}
```

### 2.4. ライトの追加

環境マップを適用するか悩んだがとりあえず、マテリアルテストとしてアンビエントライトを追加

今後、環境マップ等に変更する場合あり

```js
import * as THREE from "three";

export const ambientLightConfig = {
  color: "#ffffff",
  intensity: 10,
};

export class AmbientLight {
  constructor(experience) {
    this.experience = experience;
    this.scene = this.experience;

    this.setAmbientLight();
  }
  setAmbientLight() {
    const { color, intensity } = ambientLightConfig;
    const ambientLight = new THREE.AmbientLight(color, intensity);
    this.scene.add(ambientLight);
  }
}
```

### 2.5. リファクタリング

設定のデータ定義をオブジェクトで管理しているがそのオブジェクトをモジュールで切り出した

- `floorConfig`
- `baseConfig`
- `domeConfig`

ディレクトリ構成はこんな感じ

```shell
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
│   │   ├── Base
│   │   │   ├── Base.js
│   │   │   └── baseConfig.js
│   │   ├── Dome
│   │   │   ├── Dome.js
│   │   │   └── domeConfig.js
│   │   ├── Floor
│   │   │   ├── Floor.js
│   │   │   └── floorConfig.js
│   │   ├── Light
│   │   │   └── AmbientLight
│   │   │       ├── AmbientLight.js
│   │   │       └── ambientLightConfig.js
│   │   └── World.js
│   └── assets.js
├── index.html
├── script.js
└── style.css
```

claude にリファクタリングについて相談していたらファクトリ関数にするといいよと言われそんなに難しくなさそうだったので実装してみた

```js
// floorConfig.js
```

```js
// baseConfig.js
```

```js
// domeConfig.js
```

```js
// ambientLightConfig.js
```

ライトはテスト用なので最低限の記述しかないが練習も兼ねてファイルを分割している

> [!NOTE]
>
> **📝 MEMO**
>
> ファクトリ関数とはオブジェクトを返す関数
> ファクトリ関数にするメリデメは以下(claude から引用)
>
> **メリット**
>
> - 動的な値の生成が可能
> - インスタンスごとに異なる設定を> 持たせることが容易
> - 設定オブジェクト内で自己参照が可能
>
> **デメリット**
>
> - 使用する際に関数を呼び出す必要がある
> - わずかながら、単純なオブジェク> トよりも複雑

**躓いたところ**
ついでに土台とドームの`position.y` を `geometry.heith`の値で動的に設定しようとしたがどうしてもコードの見通しが悪くなるので保留

まあ、一度、値を決めてしまえばおそらく変更することは無いためこのままでもいいような気はしている

## 3. まとめ

ネッコドームの制作を開始して
ドームを透過させるところまで制作が進んだ
