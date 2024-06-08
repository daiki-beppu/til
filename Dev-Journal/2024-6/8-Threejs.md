# 2024/6/8 開発日誌

制作物
https://threejs-demo-rose.vercel.app/

## 開発環境

- Next.js (app Router)
- Tailwind CSS
- Three.js

## 目的: ジオメトリの形状を変更

```tsx
// sphere オブジェクト
const sphereRadius = 1;
const sphereWidthSegments = 32;
const sphereHeightSegments = 32;

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(
    sphereRadius,
    sphereWidthSegments,
    sphereHeightSegments
  ),
  material
);
scene.add(sphere);
```

## 目的 2: マテリアルの変更

```tsx
const material = new THREE.MeshStandardMaterial();
```

## 目的 3: 環境マップの設定

```tsx
// 環境マップ
const rgbeLoader = new RGBELoader();
rgbeLoader.load("/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = environmentMap;
  scene.environment = environmentMap;
});
```

**躓いたところ**

問題:
なぜか環境マップがうまく反映されない問題に直面

[![Image from Gyazo](https://i.gyazo.com/66aa1f5adab3438ae0b853d69bd7c9bb.png)](https://gyazo.com/66aa1f5adab3438ae0b853d69bd7c9bb)

原因:
不明

対策:
テクスチャの適用をやめることで問題はなくなった
