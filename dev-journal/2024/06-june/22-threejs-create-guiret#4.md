# 2024/6/22 開発日誌

制作物
https://threejs-demo-rose.vercel.app/

- [2024/6/22 開発日誌](#2024622-開発日誌)
  - [開発環境](#開発環境)
  - [目的 弦の追加](#目的-弦の追加)
  - [目的 2 : リファクタリング](#目的-2--リファクタリング)
    - [ボディのデバッグ UI を map で処理](#ボディのデバッグ-ui-を-map-で処理)
    - [ネックのデバッグ UI を map で処理](#ネックのデバッグ-ui-を-map-で処理)
    - [ヘッドのデバッグ UI を map で処理](#ヘッドのデバッグ-ui-を-map-で処理)
    - [ペグをループで処理](#ペグをループで処理)
    - [ピックアップをループで処理](#ピックアップをループで処理)
    - [コントロールノブ をループで処理](#コントロールノブ-をループで処理)
    - [フロント ボリューム](#フロント-ボリューム)
    - [フロント トーン](#フロント-トーン)
    - [リア ボリューム](#リア-ボリューム)
    - [リア トーン](#リア-トーン)
  - [目的 3 : 背景の作成](#目的-3--背景の作成)
    - [オブジェクトの追加](#オブジェクトの追加)
    - [テクスチャの追加](#テクスチャの追加)
  - [目的 4 : 影の投影を設定](#目的-4--影の投影を設定)
  - [目的 5 : ライトとカメラの位置を調節](#目的-5--ライトとカメラの位置を調節)


## 開発環境

- Next.js (app Router)
- Tailwind CSS
- Three.js

## 目的 弦の追加

ループで等間隔に配置

完成イメージ

[![Image from Gyazo](https://i.gyazo.com/14a74761620e02b2d3b64407d49a59ff.png)](https://gyazo.com/14a74761620e02b2d3b64407d49a59ff)

```tsx
// 弦
const guiterStringParams = {
  radius: 0.01,
  length: neckParams.height + 1.6,
  capSegments: 1,
  radialSegments: 16,
};

const guiterStringGeometry = new THREE.CapsuleGeometry(
  guiterStringParams.radius,
  guiterStringParams.length,
  guiterStringParams.capSegments,
  guiterStringParams.radialSegments
);
const guiterStringMaterial = new THREE.MeshStandardMaterial({
  color: "silver",
});

// 弦の数を設定
const numStrings = 6;

// 弦の間隔を計算
// neckParams.width - 0.1 で端からの余白を考慮
const spacing = (neckParams.width - 0.1) / (numStrings - 1);

for (let i = 0; i < numStrings; i++) {
  // 弦の生成
  const guiterString = new THREE.Mesh(
    guiterStringGeometry,
    guiterStringMaterial
  );
  // 中央を基準に等間隔で配置
  guiterString.position.x = (i - (numStrings - 1) / 2) * spacing;

  //
  guiterString.position.y = bodyParams.height / 2;
  guiterString.position.z = neckParams.depth + 0.1;
  guiterGroup.add(guiterString);
}
```

## 目的 2 : リファクタリング

### ボディのデバッグ UI を map で処理

リファクタリング後

```tsx
const bodyFolder = gui.addFolder("ボディ");
vector3Params.map((vextor3) =>
  bodyFolder
    .add(body.scale, vextor3)
    .min(0.1)
    .max(10)
    .step(0.01)
    .name(`${vextor3}軸のスケール`)
);
vector3Params.map((vextor3) =>
  bodyFolder
    .add(body.position, vextor3)
    .min(0.1)
    .max(10)
    .step(0.01)
    .name(`${vextor3}軸のポジション`)
);
```

リファクタリング前

```tsx
// デバッグ UI
const bodyFolder = gui.addFolder("ボディ");
bodyFolder.add(body.scale, "x").min(1).max(10).step(0.1).name("幅");
bodyFolder.add(body.scale, "y").min(1).max(10).step(0.1).name("高さ");
bodyFolder.add(body.scale, "z").min(1).max(10).step(0.1).name("奥行き");
bodyFolder.add(body.position, "x").min(-10).max(10).step(0.1).name("x軸 移動");
bodyFolder.add(body.position, "y").min(-10).max(10).step(0.1).name("y軸 移動");
bodyFolder.add(body.position, "z").min(-10).max(10).step(0.1).name("z軸 移動");
```

### ネックのデバッグ UI を map で処理

リファクタリング後

```tsx
vector3Params.map((vextor3) =>
  neckFolder
    .add(body.scale, vextor3)
    .min(0.1)
    .max(10)
    .step(0.01)
    .name(`${vextor3}軸のスケール`)
);
vector3Params.map((vextor3) =>
  neckFolder
    .add(body.position, vextor3)
    .min(-10)
    .max(10)
    .step(0.01)
    .name(`${vextor3}軸のポジション`)
);
```

リファクタリング前

```tsx
guiterGroup.add(neck);

const neckFolder = gui.addFolder("ネック");
neckFolder.add(neck.scale, "x").min(0.1).max(10).step(0.01).name("幅");
neckFolder.add(neck.scale, "y").min(0.1).max(10).step(0.01).name("高さ");
neckFolder.add(neck.scale, "z").min(0.1).max(10).step(0.01).name("奥行き");
neckFolder.add(neck.position, "x").min(-5).max(10).step(0.01).name("x軸 移動");
neckFolder.add(neck.position, "y").min(-5).max(10).step(0.01).name("y軸 移動");
neckFolder.add(neck.position, "z").min(-5).max(10).step(0.01).name("z軸 移動");
```

### ヘッドのデバッグ UI を map で処理

リファクタリング後

```tsx
const headFolder = gui.addFolder("ヘッド");
vector3Params.map((vextor3) =>
  headFolder
    .add(body.scale, vextor3)
    .min(0.1)
    .max(10)
    .step(0.01)
    .name(`${vextor3}軸のスケール`)
);
vector3Params.map((vextor3) =>
  headFolder
    .add(body.position, vextor3)
    .min(-10)
    .max(10)
    .step(0.01)
    .name(`${vextor3}軸のポジション`)
);
```

リファクタリング前

```tsx
const headFolder = gui.addFolder("ヘッド");
headFolder.add(head.scale, "x").min(0.1).max(10).step(0.01).name("幅");
headFolder.add(head.scale, "y").min(0.1).max(10).step(0.01).name("高さ");
headFolder.add(head.scale, "z").min(0.1).max(10).step(0.01).name("奥行き");
headFolder.add(head.position, "x").min(-5).max(10).step(0.01).name("x軸 移動");
headFolder.add(head.position, "y").min(-5).max(10).step(0.01).name("y軸 移動");
headFolder.add(head.position, "z").min(-5).max(10).step(0.01).name("z軸 移動");
```

### ペグをループで処理

リファクタリング後

```tsx
// ペグ

const pegParams = {
  radius: 0.1,
  segments: 16,
};

const pegsGeometry = new THREE.CircleGeometry(
  pegParams.radius,
  pegParams.segments
);
const pegsMaterial = new THREE.MeshStandardMaterial({ color: "silver" });

const numPegs = 6;
const spacingX = 0.4;
const spacingY = 0.4;

const pegsFolder = gui.addFolder("ペグ");
pegsFolder.close();

for (let i = 0; i < numPegs; i++) {
  const pegs = new THREE.Mesh(pegsGeometry, pegsMaterial);

  pegs.position.x = i < 3 ? spacingX : -spacingX;
  pegs.position.y = head.position.y + (i % 3) * spacingY - 0.3;
  pegs.position.z = headParams.depth + 0.01;
  guiterGroup.add(pegs);

  const pegStringFolder = pegsFolder.addFolder(`${i + 1}弦ペグ`);
  pegStringFolder
    .add(pegParams, "radius")
    .min(0.01)
    .max(10)
    .step(0.01)
    .name("半径")
    .onChange((value: number) => {
      pegs.geometry.dispose();
      pegs.geometry = new THREE.CircleGeometry(value, pegParams.segments);
    });
  pegStringFolder
    .add(pegs.position, "x")
    .min(-5)
    .max(10)
    .step(0.01)
    .name("x軸 移動");
  pegStringFolder
    .add(pegs.position, "y")
    .min(-5)
    .max(10)
    .step(0.01)
    .name("y軸 移動");
  pegStringFolder
    .add(pegs.position, "z")
    .min(-5)
    .max(10)
    .step(0.01)
    .name("z軸 移動");
}
```

リファクタリング前

```tsx
// ペグ

const pegGroup = new THREE.Group();

const pegParams = {
  radius: 0.1,
  segments: 16,
};

const peg1stString = new THREE.Mesh(
  new THREE.CircleGeometry(pegParams.radius, pegParams.segments),
  new THREE.MeshStandardMaterial({ color: "silver" })
);
peg1stString.position.x = headParams.width / 5;
peg1stString.position.y =
  (bodyParams.height + neckParams.height + headParams.height) / 2 + 0.4;
peg1stString.position.z = headParams.depth + 0.01;
pegGroup.add(peg1stString);

// 1弦のペグ
const pegFolder = gui.addFolder("ペグ");
const peg1stStringFolder = pegFolder.addFolder("1弦ペグ");
peg1stStringFolder
  .add(pegParams, "radius")
  .min(0.01)
  .max(10)
  .step(0.01)
  .name("半径")
  .onChange((value: number) => {
    // メモリからジオメトリを削除
    peg1stString.geometry.dispose();

    // 新しいジオメトリの作成
    peg1stString.geometry = new THREE.CircleGeometry(value, pegParams.segments);
  });

peg1stStringFolder
  .add(peg1stString.position, "x")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
peg1stStringFolder
  .add(peg1stString.position, "y")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
peg1stStringFolder
  .add(peg1stString.position, "z")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("z軸 移動");

// 2弦のペグ

const peg2ndString = new THREE.Mesh(
  new THREE.CircleGeometry(pegParams.radius, pegParams.segments),
  new THREE.MeshStandardMaterial({ color: "silver" })
);
peg2ndString.position.x = headParams.width / 5 + 0.075;
peg2ndString.position.y =
  (bodyParams.height + neckParams.height + headParams.height) / 2 + 0.8;
peg2ndString.position.z = headParams.depth + 0.01;

pegGroup.add(peg2ndString);

const peg2ndStringFolder = pegFolder.addFolder("2弦ペグ");
peg2ndStringFolder
  .add(pegParams, "radius")
  .min(0.01)
  .max(10)
  .step(0.01)
  .name("半径")
  .onChange((value: number) => {
    peg2ndString.geometry.dispose();
    peg2ndString.geometry = new THREE.CircleGeometry(value, pegParams.segments);
  });

peg2ndStringFolder
  .add(peg2ndString.position, "x")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
peg2ndStringFolder
  .add(peg2ndString.position, "y")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
peg2ndStringFolder
  .add(peg2ndString.position, "z")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("z軸 移動");

// 3弦のペグ
const peg3rdString = new THREE.Mesh(
  new THREE.CircleGeometry(pegParams.radius, pegParams.segments),
  new THREE.MeshStandardMaterial({ color: "silver" })
);
peg3rdString.position.x = headParams.width / 5 + 0.15;
peg3rdString.position.y =
  (bodyParams.height + neckParams.height + headParams.height) / 2 + 1.2;
peg3rdString.position.z = headParams.depth + 0.01;

pegGroup.add(peg3rdString);

const peg3rdStringFolder = pegFolder.addFolder("3弦ペグ");
peg3rdStringFolder
  .add(pegParams, "radius")
  .min(0.01)
  .max(10)
  .step(0.01)
  .name("半径")
  .onChange((value: number) => {
    peg3rdString.geometry.dispose();
    peg3rdString.geometry = new THREE.CircleGeometry(value, pegParams.segments);
  });

peg3rdStringFolder
  .add(peg3rdString.position, "x")
  .min(0.1)
  .max(6)
  .step(0.01)
  .name("x軸 移動");
peg3rdStringFolder
  .add(peg3rdString.position, "y")
  .min(0.1)
  .max(6)
  .step(0.01)
  .name("y軸 移動");
peg3rdStringFolder
  .add(peg3rdString.position, "z")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("z軸 移動");

// 4弦のペグ
const peg4thString = new THREE.Mesh(
  new THREE.CircleGeometry(pegParams.radius, pegParams.segments),
  new THREE.MeshStandardMaterial({ color: "silver" })
);
peg4thString.position.x = -headParams.width / 5;
peg4thString.position.y =
  (bodyParams.height + neckParams.height + headParams.height) / 2 + 0.4;
peg4thString.position.z = headParams.depth + 0.01;

pegGroup.add(peg4thString);

const peg4thStringFolder = pegFolder.addFolder("4弦ペグ");
peg4thStringFolder
  .add(pegParams, "radius")
  .min(0.01)
  .max(10)
  .step(0.01)
  .name("半径")
  .onChange((value: number) => {
    peg4thString.geometry.dispose();
    peg4thString.geometry = new THREE.CircleGeometry(value, pegParams.segments);
  });

peg4thStringFolder
  .add(peg4thString.position, "x")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
peg4thStringFolder
  .add(peg4thString.position, "y")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
peg4thStringFolder
  .add(peg4thString.position, "z")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("z軸 移動");

// 5弦のペグ

const peg5thString = new THREE.Mesh(
  new THREE.CircleGeometry(pegParams.radius, pegParams.segments),
  new THREE.MeshStandardMaterial({ color: "silver" })
);
peg5thString.position.x = -headParams.width / 5 - 0.075;
peg5thString.position.y =
  (bodyParams.height + neckParams.height + headParams.height) / 2 + 0.8;
peg5thString.position.z = headParams.depth + 0.01;

pegGroup.add(peg5thString);

const peg5thStringFolder = pegFolder.addFolder("5弦ペグ");
peg5thStringFolder
  .add(pegParams, "radius")
  .min(0.01)
  .max(10)
  .step(0.01)
  .name("半径")
  .onChange((value: number) => {
    peg5thString.geometry.dispose();
    peg5thString.geometry = new THREE.CircleGeometry(value, pegParams.segments);
  });

peg5thStringFolder
  .add(peg5thString.position, "x")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
peg5thStringFolder
  .add(peg5thString.position, "y")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
peg5thStringFolder
  .add(peg5thString.position, "z")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("z軸 移動");

// 6弦のペグ
const peg6thString = new THREE.Mesh(
  new THREE.CircleGeometry(pegParams.radius, pegParams.segments),
  new THREE.MeshStandardMaterial({ color: "silver" })
);
peg6thString.position.x = -headParams.width / 5 - 0.15;
peg6thString.position.y =
  (bodyParams.height + neckParams.height + headParams.height) / 2 + 1.2;
peg6thString.position.z = headParams.depth + 0.01;

pegGroup.add(peg6thString);

const peg6thStringFolder = pegFolder.addFolder("6弦ペグ");
peg6thStringFolder
  .add(pegParams, "radius")
  .min(0.01)
  .max(10)
  .step(0.01)
  .name("半径")
  .onChange((value: number) => {
    peg6thString.geometry.dispose();
    peg6thString.geometry = new THREE.CircleGeometry(value, pegParams.segments);
  });

peg6thStringFolder
  .add(peg6thString.position, "x")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
peg6thStringFolder
  .add(peg6thString.position, "y")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
peg6thStringFolder
  .add(peg6thString.position, "z")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("z軸 移動");

guiterGroup.add(pegGroup);
```

### ピックアップをループで処理

リファクタリング後

```tsx
// ピックアップの作成
const pickupParams = {
  width: 1.5,
  height: 0.7,
  depth: 0.15,
};

const pickupGeometry = new THREE.BoxGeometry(
  pickupParams.width,
  pickupParams.height,
  pickupParams.depth
);

const pickupMaterial = new THREE.MeshStandardMaterial({ color: "black" });

const pickups = [
  { name: "フロント", positionOffsetY: neck.position.y / 2 - 0.95 },
  { name: "リア", positionOffsetY: 0 },
];

const pickupFolder = gui.addFolder("ピックアップ");
pickupFolder.close();

pickups.map((pickup) => {
  const newPickup = new THREE.Mesh(pickupGeometry, pickupMaterial);
  newPickup.position.y = pickup.positionOffsetY;
  newPickup.position.z = bodyParams.depth / 2;

  guiterGroup.add(newPickup);

  const newPickupFolder = pickupFolder.addFolder(pickup.name);
  ["x", "y", "z"].map((vector3) => {
    newPickupFolder
      .add(newPickup.scale, vector3)
      .min(0.1)
      .max(10)
      .step(0.01)
      .name(`${vector3}軸のスケール`);
    newPickupFolder
      .add(newPickup.position, vector3)
      .min(-5)
      .max(10)
      .step(0.01)
      .name(`${vector3}軸の移動`);
  });
});
```

リファクタリング前

```tsx
// ピックアップの作成
const pickupParams = {
  width: 1.5,
  height: 0.7,
  depth: 0.15,
};

const pickupGeometry = new THREE.BoxGeometry(
  pickupParams.width,
  pickupParams.height,
  pickupParams.depth
);

const pickupMaterial = new THREE.MeshStandardMaterial({ color: "black" });

// フロント
const frontPickup = new THREE.Mesh(pickupGeometry, pickupMaterial);

frontPickup.position.y = neck.position.y / 2 - 0.95;
frontPickup.position.z = bodyParams.depth / 2;

guiterGroup.add(frontPickup);

const pickupFolder = gui.addFolder("ピックアップ");
pickupFolder.close();
const frontPickupFolder = pickupFolder.addFolder("フロント");
frontPickupFolder
  .add(frontPickup.scale, "x")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("幅");
frontPickupFolder
  .add(frontPickup.scale, "y")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("高さ");
frontPickupFolder
  .add(frontPickup.scale, "z")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("奥行き");
frontPickupFolder
  .add(frontPickup.position, "x")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
frontPickupFolder
  .add(frontPickup.position, "y")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
frontPickupFolder
  .add(frontPickup.position, "z")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("z軸 移動");

// リア
const rearPickup = new THREE.Mesh(pickupGeometry, pickupMaterial);

rearPickup.position.z = bodyParams.depth / 2;

guiterGroup.add(rearPickup);

const rearPickupFolder = pickupFolder.addFolder("リア");
rearPickupFolder
  .add(rearPickup.scale, "x")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("幅");
rearPickupFolder
  .add(rearPickup.scale, "y")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("高さ");
rearPickupFolder
  .add(rearPickup.scale, "z")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("奥行き");
rearPickupFolder
  .add(rearPickup.position, "x")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
rearPickupFolder
  .add(rearPickup.position, "y")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
rearPickupFolder
  .add(rearPickup.position, "z")
  .min(-5)
  .max(10)
  .step(0.01)
  .name("z軸 移動");
```

### コントロールノブ をループで処理

リファクタリング後

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

const controlKnobParts = [
  {
    name: "フロント ボリューム",
    position: { x: 1, y: -1.2, z: bodyParams.depth / 2 + 0.001 },
  },
  {
    name: "フロント トーン",
    position: { x: 1, y: -2, z: bodyParams.depth / 2 + 0.001 },
  },
  {
    name: "リア ボリューム",
    position: { x: 1.6, y: -0.8, z: bodyParams.depth / 2 + 0.001 },
  },
  {
    name: "リア トーン",
    position: { x: 1.6, y: -1.6, z: bodyParams.depth / 2 + 0.001 },
  },
];

const controlKnobFolder = gui.addFolder("コントロールノブ");
controlKnobFolder.close();

controlKnobParts.map((part) => {
  const controlKnob = new THREE.Mesh(controlKnobGometry, controlKnobMaterial);

  controlKnob.position.set(part.position.x, part.position.y, part.position.z);

  controlKnob.rotation.x = Math.PI / 2;
  guiterGroup.add(controlKnob);

  const knobFolder = controlKnobFolder.addFolder(part.name);
  ["x", "y", "z"].map((vector3) => {
    knobFolder
      .add(controlKnob.position, vector3)
      .min(-5)
      .max(10)
      .step(0.01)
      .name(`${vector3}軸 移動`);
  });
});
```

リファクタリング前

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

## 目的 3 : 背景の作成

### オブジェクトの追加

```tsx
// 背景

const backgroundParams = {
  width: 40,
  height: 40,
};

const backgroundGeometry = new THREE.PlaneGeometry(
  backgroundParams.width,
  backgroundParams.height
);

// 床
const floorMaterial = new THREE.MeshStandardMaterial({
  map: floorcolorTexture,
  aoMap: floorARMTexture,
  roughnessMap: floorARMTexture,
  metalnessMap: floorARMTexture,
  normalMap: floorNormalTexture,
});
const floor = new THREE.Mesh(backgroundGeometry, floorMaterial);

floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// 壁
const wallMaterial = new THREE.MeshStandardMaterial({
  map: wallcolorTexture,
  aoMap: wallARMTexture,
  roughnessMap: wallARMTexture,
  metalnessMap: wallARMTexture,
  normalMap: wallNormalTexture,
});

const wall = new THREE.Mesh(backgroundGeometry, wallMaterial);
wall.position.y = 12;
wall.position.z = -10;
scene.add(wall);
```

### テクスチャの追加

```tsx
// テクスチャのロードと設定
const textureLoader = new THREE.TextureLoader();
const floorcolorTexture = textureLoader.load(
  "/wood_floor_1k/wood_floor_diff_1k.webp"
);
const floorARMTexture = textureLoader.load(
  "/wood_floor_1k/wood_floor_arm_1k.webp"
);
const floorNormalTexture = textureLoader.load(
  "/wood_floor_1k/wood_floor_nor_gl_1k.webp"
);

floorcolorTexture.colorSpace = THREE.SRGBColorSpace;
floorARMTexture.repeat.set(2, 2);
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;

floorNormalTexture.repeat.set(2, 2);
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

const wallcolorTexture = textureLoader.load(
  "/wood_cabinet_worn_long_1k/wood_cabinet_worn_long_diff_1k.webp"
);
const wallARMTexture = textureLoader.load(
  "/wood_cabinet_worn_long_1k/wood_cabinet_worn_long_arm_1k.webp"
);
const wallNormalTexture = textureLoader.load(
  "/wood_cabinet_worn_long_1k/wood_cabinet_worn_long_nor_gl_1k.webp"
);

wallcolorTexture.colorSpace = THREE.SRGBColorSpace;
wallARMTexture.repeat.set(2, 2);
wallARMTexture.wrapS = THREE.RepeatWrapping;
wallARMTexture.wrapT = THREE.RepeatWrapping;

wallNormalTexture.repeat.set(2, 2);
wallNormalTexture.wrapS = THREE.RepeatWrapping;
wallNormalTexture.wrapT = THREE.RepeatWrapping;
```

## 目的 4 : 影の投影を設定

```tsx
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

directionalLight.castShadow = true;
body.castShadow = true;
neck.castShadow = true;
head.castShadow = true;

directionalLight.shadow.mapSize.width = 512;
directionalLight.shadow.mapSize.height = 512;

// 影の生成範囲を制御
directionalLight.shadow.camera.top = 6;
directionalLight.shadow.camera.right = 6;
directionalLight.shadow.camera.bottom = -6;
directionalLight.shadow.camera.left = -6;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 30;

floor.receiveShadow = true;
wall.receiveShadow = true;
body.receiveShadow = true;
head.receiveShadow = true;
```

## 目的 5 : ライトとカメラの位置を調節

```tsx
// ライトの位置を調整
directionalLight.position.set(10, 15, 15);

//カメラの位置を調整
camera.position.y = 6;
camera.position.z = 12;
```
