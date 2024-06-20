# 2024/6/20 開発日誌

制作物
https://threejs-demo-rose.vercel.app/

## 開発環境

- Next.js (app Router)
- Tailwind CSS
- Three.js

## 目的 1 ピックアップの作成

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
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
frontPickupFolder
  .add(frontPickup.position, "y")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
frontPickupFolder
  .add(frontPickup.position, "z")
  .min(0.1)
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
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("x軸 移動");
rearPickupFolder
  .add(rearPickup.position, "y")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("y軸 移動");
rearPickupFolder
  .add(rearPickup.position, "z")
  .min(0.1)
  .max(10)
  .step(0.01)
  .name("z軸 移動");
```
