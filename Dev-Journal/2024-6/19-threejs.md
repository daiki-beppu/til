# 2024/6/14 開発日誌

制作物
https://threejs-demo-rose.vercel.app/

## 開発環境

- Next.js (app Router)
- Tailwind CSS
- Three.js

## 目的 1: タイマーの設定

```js
// タイマーのインポート
import { Timer } from "three/addons/misc/Timer.js";
```

```js
useEffect(() => {
  if (canvasRef.current) {
    // タイマーのインスタンス化
    const timer = new Timer();

    // ループアニメーション
    const animetion = () => {
      controls.update();
      renderer.render(scene, camera);

      // タイマーの更新
      timer.update();
      const elapsedTime = timer.getElapsed();

      requestAnimationFrame(animetion);
    };
    animetion();
  }
}, []);
```

## 目的 2 : ギターの作成

モデルのギター

[![Image from Gyazo](https://i.gyazo.com/d19f0543c795075c23e7e4983e3cad08.png)](https://gyazo.com/d19f0543c795075c23e7e4983e3cad08)

### ギターグループを作成

```tsx
// ギターグループ
const guiterGroup = new THREE.Group();
scene.add(guiterGroup);
```

### ボディの作成

```tsx
// オブジェクト
const bodyParams = {
  width: 2.75,
  height: 5.5,
  depth: 0.28,
};
const body = new THREE.Mesh(
  new THREE.BoxGeometry(bodyParams.width, bodyParams.height, bodyParams.depth),
  new THREE.MeshStandardMaterial({ color: "#D7A625" })
);

body.rotation.z = -Math.PI / 4;

guiterGroup.add(body);

// デバッグ UI
const bodyFolder = gui.addFolder("ボディ");
bodyFolder.add(body.scale, "x").min(1).max(5).step(0.1).name("幅");
bodyFolder.add(body.scale, "y").min(1).max(5).step(0.1).name("高さ");
bodyFolder.add(body.scale, "z").min(1).max(5).step(0.1).name("奥行き");
bodyFolder.add(body.position, "x").min(1).max(5).step(0.1).name("x軸 移動");
bodyFolder.add(body.position, "y").min(1).max(5).step(0.1).name("y軸 移動");
bodyFolder.add(body.position, "z").min(1).max(5).step(0.1).name("z軸 移動");
```

### ネックの作成

```tsx
// ギターのネック
const neckParams = {
  width: 0.8,
  height: 6.2,
  depth: 0.15,
};

const neck = new THREE.Mesh(
  new THREE.BoxGeometry(neckParams.width, neckParams.height, neckParams.depth),
  new THREE.MeshStandardMaterial({ color: "#734e30" })
);

neck.position.x = bodyParams.width;
neck.position.y = bodyParams.height / 2;
neck.position.z = bodyParams.depth / 2;
neck.rotation.z = -Math.PI / 4;

guiterGroup.add(neck);

// デバッグ UI
const neckFolder = gui.addFolder("ネック");
neckFolder.add(neck.scale, "x").min(0.1).max(5).step(0.01).name("幅");
neckFolder.add(neck.scale, "y").min(0.1).max(5).step(0.01).name("高さ");
neckFolder.add(neck.scale, "z").min(0.1).max(5).step(0.01).name("奥行き");
neckFolder.add(neck.position, "x").min(0.1).max(5).step(0.01).name("x軸 移動");
neckFolder.add(neck.position, "y").min(0.1).max(5).step(0.01).name("y軸 移動");
neckFolder.add(neck.position, "z").min(0.1).max(5).step(0.01).name("z軸 移動");
```

### ヘッドの作成

```tsx
// ヘッド
const headParams = {
  width: 1.2,
  height: 1.3,
  depth: 0.28,
};

const head = new THREE.Mesh(
  new THREE.BoxGeometry(headParams.width, headParams.height, headParams.depth),
  new THREE.MeshStandardMaterial({ color: "black" })
);

head.position.x = (bodyParams.width + neckParams.height) / 2;
head.position.y = (bodyParams.width + neckParams.height) / 2;
head.position.z = bodyParams.depth / 2;
head.rotation.z = -Math.PI / 4;

guiterGroup.add(head);

// デバッグ UI
const headFolder = gui.addFolder("ヘッド");
headFolder.add(head.scale, "x").min(0.1).max(5).step(0.01).name("幅");
headFolder.add(head.scale, "y").min(0.1).max(5).step(0.01).name("高さ");
headFolder.add(head.scale, "z").min(0.1).max(5).step(0.01).name("奥行き");
headFolder.add(head.position, "x").min(0.1).max(5).step(0.01).name("x軸 移動");
headFolder.add(head.position, "y").min(0.1).max(5).step(0.01).name("y軸 移動");
headFolder.add(head.position, "z").min(0.1).max(5).step(0.01).name("z軸 移動");
```
