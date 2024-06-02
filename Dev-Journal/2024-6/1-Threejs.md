# 2024/6/1 開発日誌

制作物
https://threejs-demo-rose.vercel.app/

## 開発環境

- Next.js (app Router)
- Tailwind CSS
- Three.js

## 目的:ボックスをグループ化して全てに対してアニメーションをつける

### オブジェクトグループ化

```tsx
// boxGroupを作成してシーンに追加

const boxGroup = new THREE.Group();
scene.add(boxGroup);

// bocGroupにredBoxを作成
const redBox = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "#F87171" })
);
redBox.position.set(0, 0, 0);
boxGroup.add(redBox);

// bocGroupにblueBoxを作成
const blueBox = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "#60A5FA" })
);
blueBox.position.set(2, 0, 0);
boxGroup.add(blueBox);

// bocGroupにgreenBoxを作成
const greenBox = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "#4AE480" })
);
greenBox.position.set(-2, 0, 0);
boxGroup.add(greenBox);
```

### boxGroup にアニメーションを付与

```tsx
// ループアニメーション
const animetion = () => {
  requestAnimationFrame(animetion);

  //bpxGroupを回転
  boxGroup.rotation.x += 0.02;
  boxGroup.rotation.y += 0.01;

  renderer.render(scene, camera);
};
animetion();
```
