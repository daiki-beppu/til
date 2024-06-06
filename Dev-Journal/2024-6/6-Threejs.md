# 2024/6/5 開発日誌

制作物
https://threejs-demo-rose.vercel.app/

## 開発環境

- Next.js (app Router)
- Tailwind CSS
- Three.js

## 目的: テクスチャの追加

```tsx
// Textuer
const loadingManager = new THREE.LoadingManager();

loadingManager.onLoad = () => {
  console.log("lodad");
};

loadingManager.onError = (url) => {
  console.log("error");
};

const textureLoader = new THREE.TextureLoader(loadingManager);

const centerBoxTexture = textureLoader.load(
  "/QuartziteDenali002_COL_8K_METALNESS.png"
);
const leftBoxTexture = textureLoader.load(
  "/VeneerWhiteOakRandomMatched001_COL_1K_METALNESS.png"
);
leftBoxTexture.magFilter = THREE.NearestFilter;
const rightBoxTexture = textureLoader.load(
  "/VeneerWhiteOakRandomMatched001_COL_1K_METALNESS.png"
);
rightBoxTexture.minFilter = THREE.NearestFilter;
```

[![Image from Gyazo](https://i.gyazo.com/9dbeeb7c5aa7158fe319d48d6ee74c14.png)](https://gyazo.com/9dbeeb7c5aa7158fe319d48d6ee74c14)

テクスチャはこちらのサイトから無料のものをダウンロードしました

[POLIGON](https://www.poliigon.com/)

### 躓いたところ 謎のエラー

謎のエラーが発生
BOX が 3 つあってそのうち 2 つにテクスチャを適用するとバグる
だけど 3 つともにテクスチャを適用すると正常に適用される

原因は不明

```tsx
// Textuer
const loadingManager = new THREE.LoadingManager();

loadingManager.onLoad = () => {
  console.log("lodad");
};

loadingManager.onError = (url) => {
  console.log("error");
};

const textureLoader = new THREE.TextureLoader(loadingManager);

const centerBoxTexture = textureLoader.load(
  "/QuartziteDenali002_COL_8K_METALNESS.png"
);
const leftBoxTexture = textureLoader.load(
  "/VeneerWhiteOakRandomMatched001_COL_1K_METALNESS.png"
);
leftBoxTexture.magFilter = THREE.NearestFilter;
const rightBoxTexture = textureLoader.load(
  "/VeneerWhiteOakRandomMatched001_COL_1K_METALNESS.png"
);
rightBoxTexture.minFilter = THREE.NearestFilter;

// Object

const boxGroup = new THREE.Group();
scene.add(boxGroup);

const centerBox = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: centerBoxTexture })
);
centerBox.position.set(0, 0, 0);
boxGroup.add(centerBox);

const rightBox = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
rightBox.position.set(2, 0, 0);
boxGroup.add(rightBox);

const leftBox = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: leftBoxTexture })
);
leftBox.position.set(-2, 0, 0);
boxGroup.add(leftBox);
```

[![Image from Gyazo](https://i.gyazo.com/b6b2d5f1174cb72fd520d7dbbd683fb9.png)](https://gyazo.com/b6b2d5f1174cb72fd520d7dbbd683fb9)

サイズを変えてみると左の BOX と重なっていた。

[![Image from Gyazo](https://i.gyazo.com/d05b041194975f4b77d14b4249df754f.png)](https://gyazo.com/d05b041194975f4b77d14b4249df754f)

### 躓いたところ 画像のパス

画像が何度やってもうまく取得できなかった
画像のパスがおかしかったことが原因
app フォルダに画像を配置して`./ファイル名`で読んでも呼び出せない
Next.js の場合 public に画像を配置して`/ファイル名` とすることで解決
