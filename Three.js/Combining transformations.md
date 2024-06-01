# オブジェクトの変換を組み合わせる

Position や Scale Rotation の記述する順番を換えても出力結果は変わらない

```JavaScript

// Position
mesh.position.set(0.7, -0.6, 1);

// Scale
mesh.scale.set(2, 0.5, 1.5);

// Rotaion
mesh.rotation.reorder("YXZ");
mesh.rotation.x = Math.PI / 4;
mesh.rotation.y = Math.PI / 4;
mesh.rotation.z = Math.PI / 4;

```
![立方体をレンダリングした画像](https://i.gyazo.com/bf4d4fd8c010868481818720be86902c.png)


PositionをRotaitionのあとに移動させても

```JavaScript

// Scale
mesh.scale.set(2, 0.5, 1.5);

// Rotaion
mesh.rotation.reorder("YXZ");
mesh.rotation.x = Math.PI / 4;
mesh.rotation.y = Math.PI / 4;
mesh.rotation.z = Math.PI / 4;

// Position
mesh.position.set(0.7, -0.6, 1);

```
![出力結果は変わらない](https://i.gyazo.com/bf4d4fd8c010868481818720be86902c.png)
