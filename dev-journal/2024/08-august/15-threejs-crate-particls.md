---
title: 15-threejs-crate-particls
date: 2024/08/15
updated: 2024/08/16
---

# 2024/08/15 開発日誌

- [パーティクルの実装](#パーティクルの実装)
  - [Snow クラスの作成](#snow-クラスの作成)
  - [SnowConfig 関数の作成](#snowconfig-関数の作成)
  - [完成したもの](#完成したもの)
- [今日の進捗](#今日の進捗)

## パーティクルの実装

スノードームの雪を実装していく

### Snow クラスの作成

```js
import * as THREE from "three";
import { createDomeConfig } from "../Dome/domeConfig";
import { createSnowConfig } from "./snowConfig";

export class Snow {
  constructor(experience) {
    this.experience = experience;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.domeConfig = createDomeConfig();
    this.snowConfig = createSnowConfig();

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }
  setGeometry() {
    this.geometry = new THREE.BufferGeometry();
    const { count } = this.snowConfig.particles;
    const vertices = 3;
    const position = new Float32Array(count * vertices);

    for (let i = 0; i < count; i++) {
      const positionIndex = i * 3;
      const radius = this.domeConfig.geometry.radius * Math.random();
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      position[positionIndex] = radius * Math.sin(phi) * Math.cos(theta);
      position[positionIndex + 1] = radius * Math.sin(phi) * Math.sin(theta);
      position[positionIndex + 2] = radius * Math.cos(phi);
    }

    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(position, vertices)
    );
  }

  setMaterial() {
    const { color, opacity } = this.snowConfig.material;

    this.material = new THREE.PointsMaterial({
      size: 0.5,
      color: color,
      sizeAttenuation: true,
      vertexColors: false,
      depthTest: false,
      depthWrite: false,
      transparent: true,
      opacity: opacity,
    });
  }
  setMesh() {
    this.mesh = new THREE.Points(this.geometry, this.material);

    this.mesh.position.copy(this.domeConfig.mesh.position);
    this.scene.add(this.mesh);
  }

  update() {}
}
```

### SnowConfig 関数の作成

```js
export const createSnowConfig = () => ({
  particles: {
    count: 1000,
    minSize: 0.5,
    maxSize: 1.9,
  },
  material: {
    color: "#ffffff",
    opacity: 0.8,
  },
});
```

### 完成したもの

<a href="https://gyazo.com/bd01d8baf57865a2abf5ce72f9aa7ca9"><img src="https://i.gyazo.com/bd01d8baf57865a2abf5ce72f9aa7ca9.gif" alt="Image from Gyazo" width="1000"/></a>

[![Image from Gyazo](https://i.gyazo.com/98503b2d2322bc496a5c6c4022f102ce.png)](https://gyazo.com/98503b2d2322bc496a5c6c4022f102ce)

## 今日の進捗
