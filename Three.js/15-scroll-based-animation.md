# スクロールに応じたアニメーション

- [スクロールに応じたアニメーション](#スクロールに応じたアニメーション)
  - [背景色の変更](#背景色の変更)
  - [オブジェクトを追加](#オブジェクトを追加)

## 背景色の変更

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/07d3508901c9b2a9b4d8c37852ec4aa4.png)](https://gyazo.com/07d3508901c9b2a9b4d8c37852ec4aa4)

```js
// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true, // 透明度を有効にする
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

```CSS
html {
  background: #1e1a20;
}
```

## オブジェクトを追加

```js
// オブジェクト

const material = new THREE.MeshToonMaterial({
  color: "#ff0000",
});

const torusParams = {
  radius: 1,
  tube: 0.4,
  tubularSegments: 60,
  radialSegments: 16,
};

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(
    torusParams.radius,
    torusParams.tube,
    torusParams.tubularSegments,
    torusParams.radialSegments
  ),
  material
);

const coneParams = {
  radius: 1,
  height: 2,
  radialSegments: 32,
};

const cone = new THREE.Mesh(
  new THREE.ConeGeometry(
    coneParams.radius,
    coneParams.height,
    coneParams.radialSegments
  ),
  material
);

const torusKnotParams = {
  radius: 0.8,
  tube: 0.35,
  tubularSegments: 100,
  radialSegments: 16,
};

const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(
    torusKnotParams.radius,
    torusKnotParams.tube,
    torusKnotParams.tubularSegments,
    torusKnotParams.radialSegments
  ),
  material
);

scene.add(torus, cone, torusKnot);
```

[![Image from Gyazo](https://i.gyazo.com/a89644fc62a6544a840fdc9c05483a1e.png)](https://gyazo.com/a89644fc62a6544a840fdc9c05483a1e)

`MeshToonMaterial` は 光がないと表示されません。
なのでライトを追加します

```js
// ライト
const directionalLightParams = {
  color: "#ffffff",
  intensity: 3,
};

const directionalLight = new THREE.DirectionalLight(
  directionalLightParams.color,
  directionalLightParams.intensity
);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);
```

これで意図した表示になります！

[![Image from Gyazo](https://i.gyazo.com/34180f3ccae355d8fd8d8b4fa403e369.png)](https://gyazo.com/34180f3ccae355d8fd8d8b4fa403e369)
