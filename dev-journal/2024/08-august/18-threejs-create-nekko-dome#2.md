---
title: 18-threejs-create-nekko-dome#2
date: 2024/08/18
updated: 2024/08/18
---

# 2024/08/18 開発日誌

制作物
https://github.com/daiki-beppu/nekko-dome

- [デバッグ UI の実装](#デバッグ-ui-の実装)
  - [カメラ](#カメラ)
  - [フロア](#フロア)
  - [ベース](#ベース)
  - [ドーム](#ドーム)

## デバッグ UI の実装

デバッグ UI を別ファイルに分けるか悩んだがまずは 1 つのファイルで記述

### カメラ

```js
import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export class Camera {
  constructor(appCore) {
    this.appCore = appCore;
    this.sizes = this.appCore.sizes;
    this.scene = this.appCore.scene;
    this.canvas = this.appCore.canvas;
    this.debug = this.appCore.debug;

    // ...

  setDebugUI() {
    if (this.debug.active) {
      this.folder = this.debug.ui.addFolder('camera');
      const debugConfig = {
        positionAxes: ['x', 'y', 'z'],
        value: { min: -30, max: 30, step: 0.01 },
      };

      const { min, max, step } = debugConfig.value;
      debugConfig.positionAxes.map((axis) => {
        this.folder
          .add(this.instance.position, axis)
          .min(min)
          .max(max)
          .step(step)
          .name(`position${axis.toLocaleUpperCase()}`);
        // .listen();
      });
    }
  }
}
```

### フロア

```js
import * as THREE from "three";
import { createFloorConfig } from "./floorConfig";

export class Floor {
  constructor(appCore) {
    this.appCore = appCore;
    this.scene = this.appCore.scene;
    this.debug = this.appCore.debug;
    this.config = createFloorConfig();

    this.setGeometry();
    this.setmaterial();
    this.setMesh();
    this.setDebugUI();
  }

  // ...

  setDebugUI() {
    if (this.debug.active) {
      this.folder = this.debug.ui.addFolder("floor");

      this.folder
        .add(this.config.mesh, "scale")
        .min(1)
        .max(10)
        .step(0.01)
        .name("scale")
        .onChange(() => {
          this.mesh.scale.setScalar(this.config.mesh.scale);
        });
    }
  }
}
```

### ベース

```js
import * as THREE from "three";
import { createBaseConfig } from "./baseConfig";

export class Base {
  constructor(appCore) {
    this.appCore = appCore;
    this.scene = this.appCore.scene;
    this.debug = this.appCore.debug;

    this.config = createBaseConfig();

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
    this.setDebugUI();
  }

  // ...
  setDebugUI() {
    if (this.debug.active) {
      this.folder = this.debug.ui.addFolder("base");

      this.folder
        .add(this.config.mesh, "scale")
        .min(1)
        .max(10)
        .step(0.01)
        .onChange(() => {
          this.mesh.scale.setScalar(this.config.mesh.scale);
        });
    }
  }
}
```

### ドーム

```js
import * as THREE from "three";
import { createDomeConfig } from "./domeConfig";

export class Dome {
  constructor(appCore) {
    this.appCore = appCore;
    this.scene = this.appCore.scene;
    this.debug = this.appCore.debug;
    this.config = createDomeConfig();

    this.setGeometry();
    this.setmaterial();
    this.setMesh();
    this.setDebugUI();
  }

  // ...

  setDebugUI() {
    if (this.debug.active) {
      this.folder = this.debug.ui.addFolder("dome");

      this.folder
        .add(this.config.mesh, "scale")
        .min(1)
        .max(10)
        .step(0.01)
        .name("scale")
        .onChange(() => {
          this.mesh.scale.setScalar(this.config.mesh.scale);
        });

      const debugConfig = {
        props: [
          "opacity",
          "transmission",
          "roughness",
          "metalness",
          "clearcoat",
          "clearcoatRoughness",
          "ior",
          "reflectivity",
        ],
        value: { min: 0, max: 3, step: 0.001 },
      };

      const { min, max, step } = debugConfig.value;
      debugConfig.props.map((prop) => {
        this.folder
          .add(this.material, prop)
          .min(min)
          .max(max)
          .step(step)
          .name(`${prop}`);
      });
    }
  }
}
```
