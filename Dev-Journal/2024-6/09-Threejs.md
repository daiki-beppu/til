# 2024/6/8 開発日誌

制作物
https://threejs-demo-rose.vercel.app/

## 開発環境

- Next.js (app Router)
- Tailwind CSS
- Three.js

## 目的: 3D テキストを表示

```tsx
//インポートの追加
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// 3D テキスト
const fontLoader = new FontLoader();
fontLoader.load("/fonts/gentilis_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("welcome !", {
    font: font, // THREE.Fontのインスタンス
    size: 0.5, // テキストのサイズ デフォルトは 100
    depth: 0.2, // テキストを押し出す太さ デフォルトは 50
    curveSegments: 5, // カーブの分割数 デフォルトは 12
    bevelEnabled: true, // ベベルをオンにする デフォルトは false
    bevelThickness: 0.03, // ベベルの深さ デフォルトは 10
    bevelSize: 0.02, // テキストのアウトラインからのベベルの距離 デフォルトは 8
    bevelOffset: 0, // テキストのアウトラインのベベルの開始位置。デフォルトは 0
    bevelSegments: 4, // ベベルの分割数 デフォルト
  });

  const text = new THREE.Mesh(textGeometry, material);
  textGeometry.center();
  scene.add(text);
});
```

## オブジェクトのループの表示

シャボン玉みたいなのをたくさん表示させたい

```tsx
const sphereMaterial = new THREE.MeshNormalMaterial();
sphereMaterial.transparent = true;
sphereMaterial.opacity = 0.6;

// sphere オブジェクト
const sphereParamas = {
  radius: 1,
  widthSegments: 32,
  heightSegments: 32,
};

const sphereGeometry = new THREE.SphereGeometry(
  sphereParamas.radius,
  sphereParamas.widthSegments,
  sphereParamas.heightSegments
);

for (let i = 0; i < 150; i += 1) {
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  const randomPosition = {
    x: (Math.random() - 0.5) * 10,
    y: (Math.random() - 0.5) * 10,
    z: (Math.random() - 0.5) * 10,
  };
  sphere.position.x = randomPosition.x;
  sphere.position.y = randomPosition.y;
  sphere.position.z = randomPosition.z;

  const randomRotaiton = {
    x: Math.random() * Math.PI,
    y: Math.random() * Math.PI,
    z: Math.random() * Math.PI,
  };

  sphere.rotation.x = randomRotaiton.x;
  sphere.rotation.y = randomRotaiton.y;

  sphere.scale.set(0.25, 0.25, 0.25);
  scene.add(sphere);
}
```

**躓いたところ**
Next.js の問題なのか
Three.js で環境マップの設定をして
マテリアルに transmission を設定したら
環境マップがバグる

先に進めないので環境マップを削除した
