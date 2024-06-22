# 2024/6/21 開発日誌

制作物
https://threejs-demo-rose.vercel.app/

- [2024/6/21 開発日誌](#2024621-開発日誌)
  - [開発環境](#開発環境)
  - [目的 1 : ピックアップセレクターの追加](#目的-1--ピックアップセレクターの追加)
    - [ベースの追加](#ベースの追加)
    - [ノブの追加](#ノブの追加)
  - [目的 2 : コントロールノブの追加](#目的-2--コントロールノブの追加)
    - [フロント ボリューム](#フロント-ボリューム)
    - [フロント トーン](#フロント-トーン)
    - [リア ボリューム](#リア-ボリューム)
    - [リア トーン](#リア-トーン)
  - [目的 3 : ブリッジの追加](#目的-3--ブリッジの追加)
  - [目的 4 : テイルピースの追加](#目的-4--テイルピースの追加)

## 開発環境

- Next.js (app Router)
- Tailwind CSS
- Three.js

## 目的 1 : ピックアップセレクターの追加

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/43a635c3b7a26c02264148e374c8cd55.png)](https://gyazo.com/43a635c3b7a26c02264148e374c8cd55)

[![Image from Gyazo](https://i.gyazo.com/1525a0f2e8f11e0a00a72cc17c8aabb0.png)](https://gyazo.com/1525a0f2e8f11e0a00a72cc17c8aabb0)

### ベースの追加

```tsx
// ピックアップセレクター ベース
const pickupSelectorBaseParams = {
  radius: 0.3,
  segments: 16,
};

const pickupSelectorBaseGeometry = new THREE.CircleGeometry(
  pickupSelectorBaseParams.radius,
  pickupSelectorBaseParams.segments
);
const pickupSelectorBaseMaterial = new THREE.MeshStandardMaterial({
  color: "black",
});

const pickupSelectorBase = new THREE.Mesh(
  pickupSelectorBaseGeometry,
  pickupSelectorBaseMaterial
);

pickupSelectorBase.position.x = -bodyParams.width / 3;
pickupSelectorBase.position.y = bodyParams.height / 2 - 0.7;
pickupSelectorBase.position.z = bodyParams.depth / 2 + 0.001;

guiterGroup.add(pickupSelectorBase);

const pickupSelectorFolder = gui.addFolder("ピックアップセレクター");
pickupSelectorFolder.close();
const pickupSelectorBaseFolder =
  pickupSelectorFolder.addFolder("ピックアップセレクターベース");
pickupSelectorBaseFolder
  .add(pickupSelectorBaseParams, "radius")
  .min(0.01)
  .max(10)
  .step(0.01)
  .name("半径")
  .onChange((value: number) => {
    pickupSelectorBase.geometry.dispose();
    pickupSelectorBase.geometry = new THREE.CircleGeometry(
      value,
      pickupSelectorBaseParams.segments
    );
  });

pickupSelectorBaseFolder
  .add(pickupSelectorBase.position, "x")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
pickupSelectorBaseFolder
  .add(pickupSelectorBase.position, "y")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
pickupSelectorBaseFolder
  .add(pickupSelectorBase.position, "z")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("z軸 移動");
```

### ノブの追加

```tsx
const pickupSelectorKnobParams = {
  radiusTop: 0.06,
  radiusBottom: 0.03,
  height: 0.3,
  radialSegments: 16,
};

const pickupSelectorKnobGeometry = new THREE.CylinderGeometry(
  pickupSelectorKnobParams.radiusTop,
  pickupSelectorKnobParams.radiusBottom,
  pickupSelectorKnobParams.height,
  pickupSelectorKnobParams.radialSegments
);

const pickupSelectorKnobMatelial = new THREE.MeshStandardMaterial({
  color: "silver",
});

const pickupSelectorKnob = new THREE.Mesh(
  pickupSelectorKnobGeometry,
  pickupSelectorKnobMatelial
);

pickupSelectorKnob.position.x = pickupSelectorBase.position.x;
pickupSelectorKnob.position.y = pickupSelectorBase.position.y;
pickupSelectorKnob.position.z = pickupSelectorBase.position.z + 0.01;

pickupSelectorKnob.rotation.x = Math.PI / 2;
pickupSelectorKnob.rotation.z = Math.PI / 6;

guiterGroup.add(pickupSelectorKnob);
```

## 目的 2 : コントロールノブの追加

[![Image from Gyazo](https://i.gyazo.com/087dcaac34dd6d24c5fdadd55372fe7a.png)](https://gyazo.com/087dcaac34dd6d24c5fdadd55372fe7a)

[![Image from Gyazo](https://i.gyazo.com/36e7cebc98741e806f33cd67fae273f7.png)](https://gyazo.com/36e7cebc98741e806f33cd67fae273f7)｣

```tsx
// コントロールノブ
const controlKnobParams = {
  radiusTop: 0.15,
  radiusBottom: 0.2,
  height: 0.3,
  radialSegments: 16,
};

const controlKnobGometry = new THREE.CylinderGeometry(
  controlKnobParams.radiusTop,
  controlKnobParams.radiusBottom,
  controlKnobParams.height,
  controlKnobParams.radialSegments
);

const controlKnobMaterial = new THREE.MeshStandardMaterial({
  color: "black",
});
```

### フロント ボリューム

```tsx
// フロント ボリューム
const frontVolumeGuiterKnob = new THREE.Mesh(
  controlKnobGometry,
  controlKnobMaterial
);

frontVolumeGuiterKnob.position.x = 1.2;
frontVolumeGuiterKnob.position.y = -1.2;
frontVolumeGuiterKnob.position.z = bodyParams.depth / 2 + 0.001;

frontVolumeGuiterKnob.rotation.x = Math.PI / 2;

guiterGroup.add(frontVolumeGuiterKnob);

const controlKnobFolder = gui.addFolder("コントロールノブ");
const frontVolumeGuiterKnobFolder =
  controlKnobFolder.addFolder("フロント ボリューム");
frontVolumeGuiterKnobFolder
  .add(frontVolumeGuiterKnob.position, "x")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
frontVolumeGuiterKnobFolder
  .add(frontVolumeGuiterKnob.position, "y")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
frontVolumeGuiterKnobFolder
  .add(frontVolumeGuiterKnob.position, "z")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("z軸 移動");
```

### フロント トーン

```tsx
// フロント トーン
const frontToneGuiterKnob = new THREE.Mesh(
  controlKnobGometry,
  controlKnobMaterial
);

frontToneGuiterKnob.position.x = 1.2;
frontToneGuiterKnob.position.y = -2;
frontToneGuiterKnob.position.z = bodyParams.depth / 2 + 0.001;

frontToneGuiterKnob.rotation.x = Math.PI / 2;

guiterGroup.add(frontToneGuiterKnob);

const frontToneGuiterKnobFolder =
  controlKnobFolder.addFolder("フロント トーン");
frontToneGuiterKnobFolder
  .add(frontToneGuiterKnob.position, "x")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
frontToneGuiterKnobFolder
  .add(frontToneGuiterKnob.position, "y")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
frontToneGuiterKnobFolder
  .add(frontToneGuiterKnob.position, "z")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("z軸 移動");
```

### リア ボリューム

```tsx
// リア ボリューム
const rearVolumeGuiterKnob = new THREE.Mesh(
  controlKnobGometry,
  controlKnobMaterial
);

rearVolumeGuiterKnob.position.x = frontVolumeGuiterKnob.position.x + 0.5;
rearVolumeGuiterKnob.position.y = frontVolumeGuiterKnob.position.y + 0.4;
rearVolumeGuiterKnob.position.z = bodyParams.depth / 2 + 0.001;

rearVolumeGuiterKnob.rotation.x = Math.PI / 2;

guiterGroup.add(rearVolumeGuiterKnob);

const rearVolumeGuiterKnobFolder =
  controlKnobFolder.addFolder("リア ボリューム");
rearVolumeGuiterKnobFolder
  .add(rearVolumeGuiterKnob.position, "x")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
rearVolumeGuiterKnobFolder
  .add(rearVolumeGuiterKnob.position, "y")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
rearVolumeGuiterKnobFolder
  .add(rearVolumeGuiterKnob.position, "z")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("z軸 移動");
```

### リア トーン

```tsx
// リア トーン
const rearToneGuiterKnob = new THREE.Mesh(
  controlKnobGometry,
  controlKnobMaterial
);

rearToneGuiterKnob.position.x = frontVolumeGuiterKnob.position.x + 0.5;
rearToneGuiterKnob.position.y = frontVolumeGuiterKnob.position.y - 0.4;
rearToneGuiterKnob.position.z = bodyParams.depth / 2 + 0.001;

rearToneGuiterKnob.rotation.x = Math.PI / 2;

guiterGroup.add(rearToneGuiterKnob);

const rearToneGuiterKnobFolder = controlKnobFolder.addFolder("フロント トーン");
rearToneGuiterKnobFolder
  .add(rearToneGuiterKnob.position, "x")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
rearToneGuiterKnobFolder
  .add(rearToneGuiterKnob.position, "y")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
rearToneGuiterKnobFolder
  .add(rearToneGuiterKnob.position, "z")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("z軸 移動");
```

## 目的 3 : ブリッジの追加

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/c499d47205d7b853aa962209361a9cad.png)](https://gyazo.com/c499d47205d7b853aa962209361a9cad)

```tsx
// ブリッジ
const bridgeParams = {
  width: pickupParams.width - 0.1,
  height: 0.3,
  depth: pickupParams.depth,
};

const bridgeGeometry = new THREE.BoxGeometry(
  bridgeParams.width,
  bridgeParams.height,
  bridgeParams.depth
);

const bridgeMaterial = new THREE.MeshStandardMaterial({
  color: "silver",
});

const bridge = new THREE.Mesh(bridgeGeometry, bridgeMaterial);

bridge.position.y = -0.75;
bridge.position.z = bodyParams.depth / 2 + 0.01;

guiterGroup.add(bridge);
```

## 目的 4 : テイルピースの追加

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/16cc0651c33164150d968a651fca7658.png)](https://gyazo.com/16cc0651c33164150d968a651fca7658)

```tsx
const tailpieceParams = {
  radius: 0.1,
  length: pickupParams.width - 0.35,
  capSegments: 4,
  radialSegments: 8,
};
const tailpieceGeometry = new THREE.CapsuleGeometry(
  tailpieceParams.radius,
  tailpieceParams.length,
  tailpieceParams.capSegments,
  tailpieceParams.radialSegments
);
const tailpieceMaterial = new THREE.MeshStandardMaterial({
  color: "silver",
});
const tailpiece = new THREE.Mesh(tailpieceGeometry, tailpieceMaterial);

tailpiece.position.y = frontVolumeGuiterKnob.position.y;
tailpiece.position.z = bodyParams.depth / 2 + 0.01;

tailpiece.rotation.z = Math.PI / 2;
guiterGroup.add(tailpiece);
```
