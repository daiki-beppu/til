# ライトについて

## AmbientLight

```js
// シーン全体に均等に光を当てる
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 1; // 光の強さ
scene.add(ambientLight);
```

## DirectionalLight

```js
// シーンの中心に一定の方向から光を当てる
const directionalLight = new THREE.DirectionalLight();
directionalLight.color = new THREE.Color(0xfffc);
directionalLight.intensity = 0.9; // 光の強さ
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);
```

## HemisphereLight

```js
// シーンの真上に配置された光で空からの光と地面からの光を当てる
const hemisphereLight = new THREE.HemisphereLight();
hemisphereLight.color = new THREE.Color(0xff0000);
hemisphereLight.groundColor = new THREE.Color(0x0000ff);
hemisphereLight.intensity = 0.9;
scene.add(hemisphereLight);
```

## PointLight

```js
// 特定の場所に光を当てる
const pointLight = new THREE.PointLight();
pointLight.color = new THREE.Color(0xff9000);
pointLight.intensity = 1.5;
pointLight.distance = 10; // 光の届く最大距離を設定
pointLight.decay = 2; // 光の距離に応じて暗くなる量を設定
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);
```

## RectAreaLight

```js
// 四角形の平面全体に光を当てる
// RectAreaLight はMeshStandardMaterilとMeshPhysicalMatarialでのみ動作する
const rectAreaLight = new THREE.RectAreaLight();
rectAreaLight.color = new THREE.Color(0x4e00ff);
rectAreaLight.intensity = 6;
rectAreaLight.width = 1;
rectAreaLight.height = 1;
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3()); // シーンの中心を向く
scene.add(rectAreaLight);
```

## SpotLight

```js
// スポットライトを当てる
const spotLight = new THREE.SpotLight();
spotLight.color = new THREE.Color(0x78ff00);
spotLight.intensity = 4.5;
spotLight.distance = 10;
spotLight.angle = Math.PI * 0.1; // 光が照らす角度
spotLight.penumbra = 0.25; // 光の輪郭を設定する
spotLight.decay = 1;
```
