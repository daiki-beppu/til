# 2024/6/11 開発日誌

制作物
https://threejs-demo-rose.vercel.app/

## 開発環境

- Next.js (app Router)
- Tailwind CSS
- Three.js

## 目的: ライトの適用

```tsx
// ライト
const ambientLightParams = {
  color: 0xffffff,
  intensity: 1,
};

const ambientLight = new THREE.AmbientLight(
  ambientLightParams.color,
  ambientLightParams.intensity
);

const directionalLightParams = {
  color: 0xebcd8f,
  intensity: 2,
};

const directionalLight = new THREE.DirectionalLight(
  directionalLightParams.color,
  directionalLightParams.intensity
);
directionalLight.position.set(0, -1, 2);

const pointLightParams = {
  color: 0xebcd8f,
  intensity: 6,
  distance: 10,
  decay: 2,
};

for (let i = 0; i < 10; i += 1) {
  const pointLight = new THREE.PointLight(
    pointLightParams.color,
    pointLightParams.intensity,
    pointLightParams.distance,
    pointLightParams.decay
  );
  const randomPosition = {
    x: (Math.random() - 0.5) * 10,
    y: (Math.random() - 0.5) * 10,
    z: (Math.random() - 0.5) * 10,
  };
  pointLight.position.x = randomPosition.x;
  pointLight.position.y = randomPosition.y;
  pointLight.position.z = randomPosition.z;

  scene.add(pointLight);
}

scene.add(ambientLight, directionalLight);

// ヘルパー
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2
);

// scene.add(directionalLightHelper);
```

ambientLight, directionalLight を追加した

directionalLightは斜めしたから照らすようにヘルパーを使って調整した

[![Image from Gyazo](https://i.gyazo.com/085749e084eed6b6a2ea62773c5ef9f2.png)](https://gyazo.com/085749e084eed6b6a2ea62773c5ef9f2)

pointLight はループで 10 個 ランダムな位置に表示させた！
