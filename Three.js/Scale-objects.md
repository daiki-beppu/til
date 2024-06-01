# オブジェクトの大きさを変える

`mesh.scale.x` オブジェクトを x 軸を基準に大きさを変更 1 に対して n 倍の大きさを指定する

`mesh.scale.y` オブジェクトを y 軸を基準に大きさを変更 1 に対して n 倍の大きさを指定する

`mesh.scale.z` オブジェクトを z 軸を基準に大きさを変更 1 に対して n 倍の大きさを指定する

`mesh.scale.set(x, y, z)` set プロパティを使うことで 1 行で記述することもできる

デフォルトの値は `1`

## 表示例

`mesh.scale` を指定していない場合

![mesh.scale を指定していない場合](https://i.gyazo.com/88a4d40389e0e968af809ecb3a742e4b.png)

`mesh.scale.x = 2`の場合

![mesh.scale.x = 2の場合](https://i.gyazo.com/70e6630d0b25b4ecff6361a8c055a6e5.png)

`mesh.scale.y =0.5`の場合

![mesh.scale.y =0.5の場合](https://i.gyazo.com/2483295a0d124f6491e10ecf1e0de996.png)

`mesh.scale.z = 1.5`の場合

![mesh.scale.z = 1.5の場合](https://i.gyazo.com/adf56c9099818f2ddf1e3291d6e9e27e.png)

set プロパティで指定
`mesh.scale.set(2, 0.5, 1.5)`

![set プロパティで指定](https://i.gyazo.com/bd9f9002fddf82b30e03881834566882.png)
