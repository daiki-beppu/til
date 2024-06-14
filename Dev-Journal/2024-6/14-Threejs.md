# 2024/6/14 開発日誌

制作物
https://threejs-demo-rose.vercel.app/

## 開発環境

- Next.js (app Router)
- Tailwind CSS
- Three.js

## 目的 1 : 影の追加

### 影を映す壁を追加

```tsx
const planeParams = {
  width: 10,
  height: 10,
};

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(planeParams.width, planeParams.height)
);

plane.position.set(0, 0, -2);
scene.add(plane);
```

[![Image from Gyazo](https://i.gyazo.com/33ad1e02ae72f0170189f4a7fd03ee14.png)](https://gyazo.com/33ad1e02ae72f0170189f4a7fd03ee14)

[![Image from Gyazo](https://i.gyazo.com/c9987ad7634cf6a201553374f6dc46f7.png)](https://gyazo.com/c9987ad7634cf6a201553374f6dc46f7)

### ライトを ambientLight と directionalLight の 2 つにする

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
  color: 0xffffff,
  intensity: 2,
};

const directionalLight = new THREE.DirectionalLight(
  directionalLightParams.color,
  directionalLightParams.intensity
);
directionalLight.position.set(0, -1, 2);
directionalLight.castShadow = true;

directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

// 影の生成範囲を制御
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 3;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -3;
directionalLight.shadow.camera.near = 0.7;
directionalLight.shadow.camera.far = 4;

scene.add(ambientLight, directionalLight);

// ライトヘルパー
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2
);
directionalLightHelper.visible = false;
scene.add(directionalLightHelper);

// カメラヘルパー
const directionalLighCameratHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
directionalLighCameratHelper.visible = false;
scene.add(directionalLighCameratHelper);
```

## 目的 2 : デバック UI で ヘルパーの表示切替

```tsx
const gui = new GUI({
  width: 400,
  title: "デバッグUI",
  closeFolders: true,
});

// directionalLight
const directionalLightDebugUI = gui.addFolder("directionalLight");

const helperFolder = directionalLightDebugUI.addFolder("ヘルパー");
helperFolder
  .add(directionalLighCameratHelper, "visible")
  .name("カメラヘルパー");
helperFolder.add(directionalLightHelper, "visible").name("ライトヘルパー");

// デバッグUIの表示切り替え
window.addEventListener("keydown", (event) => {
  event.key === "," ? gui.show(gui._hidden) : "";
});
```

## 目的 3 : デバック UI をデフォルトで非表示にする

```tsx
// デバッグUI
const gui = new GUI({
  width: 400,
  title: "デバッグUI",
  closeFolders: true,
});

// デフォルトで非表示
gui.hide();
```

不要な記述は削除してテキストオブジェクトと影を映すための壁を追加した
影の解像度を上げてくっきり表示されるようにした
