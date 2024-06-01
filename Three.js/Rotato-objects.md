# オブジェクトを回転させる

`mesh.rotation.x` x 軸を基準に回転
`mesh.rotation.y` y 軸を基準に回転
`mesh.rotation.x` z 軸を基準に回転

`mesh.rotation.x`の場合
x 軸に棒が刺さっていてそれを軸に回転するイメージ

回転を組み合わせた場合に意図しない方向に回転する可能性がある
その理由は x 軸を回転させた場合、一緒に y 軸や z 軸も動くからです
意図した方向に回転するには`reorder`プロパティを使います
`reorder`プロパティで回転の順序を制御します
`mesh.rotation.reorder(YXZ)`と指定すると
Y → X → Z の順で回転する

## 使用例

`mesh.rotation` を指定していない場合

![`mesh.rotation` を指定していない場合](https://i.gyazo.com/21ee2bf16ba9f9252e03f07a5965225d.png)

`mesh.rotation.x = Math.PI / 4`の場合

> [!NOTE] >`Math.PI` = 180 度なので `Math.PI / 4`は 45 度となる

![`mesh.rotation.x = Math.PI / 4`の場合](https://i.gyazo.com/9a0c15a1e80531a0bb1fb86fe9bc9958.png)

`mesh.rotation.y = Math.PI / 4;` の場合

![`mesh.rotation.y = Math.PI / 4;` の場合](https://i.gyazo.com/3f7bf3265b4fb1b94070e31555741fc1.png)

`mesh.rotation.z = Math.PI / 4;`の場合

![`mesh.rotation.z = Math.PI / 4;`の場合](https://i.gyazo.com/90e6a392b7d4764197683e38bf6432eb.png)

`reorder`プロパティを指定しない場合
記述した順序 X → Y → Z の順で回転

```JavaScript

mesh.rotation.x = Math.PI / 4;
mesh.rotation.y = Math.PI / 4;
mesh.rotation.z = Math.PI / 4;

```

**X 軸を 45 度回転**
[X 軸を 45 度回転](https://i.gyazo.com/9a0c15a1e80531a0bb1fb86fe9bc9958.png)

**X 軸を 45 度回転 → Y 軸を 45 度回転**

![X 軸を 45 度回転してから Y 軸を45度回転させる](https://i.gyazo.com/3a5e21a57e8ad89c634f862a8ce2d5eb.png)

**X 軸を 45 度回転 → Y 軸を 45 度回転 → Z 軸を 45 度回転**

![`reorder`プロパティを指定するしない場合](https://i.gyazo.com/b247dfff344e7c023265e05c6fb14141.png)

`reorder`プロパティを指定する場合
`reorder("YXZ")` Y → X → Z の順で回転

**Y 軸を 45 度回転**

![Y軸を45 度回転](https://i.gyazo.com/3f7bf3265b4fb1b94070e31555741fc1.png)

**Y 軸を 45 度回転 → X 軸を 45 度回転**

![Y軸を45度回転してから X軸を45度回転](https://i.gyazo.com/fada0dbaa3ab40bcb91a4617b0f326f7.png)

**Y 軸を 45 度回転 → X 軸を 45 度回転 → Z 軸を 45 度回転**
![Y 軸を 45 度回転 → X 軸を 45 度回転 → Z 軸を 45 度回転](https://i.gyazo.com/19fc325a884a36958f32aafa5d6a9308.png)

回転の順序で出力結果が変わるため注意が必要！
