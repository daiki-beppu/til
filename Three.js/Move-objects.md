# オブジェクトの位置を変える

`mesh.position.x`
オブジェクトを x 軸に移動 x が正なら右に x が負なら左に

`mesh.position.y`
オブジェクトを y 軸に移動 y が正なら上に y が負なら下に

`mesh.position.z`
オブジェクトを z 軸に移動 z が正なら手前に z が負なら奥に

`mesh.posirion.set(x, y, z)`
set プロパティを使うことで 1 行で記述することもできる

デフォルトの値は `0`

## 表示例

`mesh.position` を指定していない場合

![mesh.position を指定していない場合](https://i.gyazo.com/09d4271087ca20fc78db983b62570b4a.jpg)

`mesh.position.x = 1` x が正の場合

![mesh.position.x = 1  xが正の場合](https://i.gyazo.com/b48522eeab29d96186f092f55126e783.png)

`mesh.position.x = -1` x が負の場合

![mesh.position.x = -1 x が負の場合](https://i.gyazo.com/ce53fd4f35442a589f92bb1c2e68d773.png)

`mesh.position.y = 1` y が正の場合

![mesh.position.y = 1 y が正の場合](https://i.gyazo.com/c022cd9d0e8ddd1a66914f2f0bb614ee.png)

`mesh.position.y = -1` y が負の場合

![mesh.position.y = -1 y が負の場合](https://i.gyazo.com/548de12fd3b09986b904bba8ab6e18f0.png)

`mesh.position.z = 1` z が正の場合

![mesh.position.z = 1` z が正の場合](https://i.gyazo.com/373fd0841cae9a3fef7777ba9ca36762.png)

`mesh.position.z = -1` z が負の場合

![mesh.position.z = -1` z が負の場合](https://i.gyazo.com/96384ae165b02f0dfb93181b72383e9e.png)

set プロパティで指定
`mesh.position.set(0.7, -0.6, 1);`

![setプロパティで指定](https://i.gyazo.com/f88c5bc942f3f0e058bf9184a7c60150.png)
