# 2024/6/4 開発日誌

制作物
https://threejs-demo-rose.vercel.app/

## 開発環境

- Next.js (app Router)
- Tailwind CSS
- Three.js

## 目的: デバック UI の追加

### lil-gui の追加

`bun add lil-gui` を叩く

```tsx
import GUI from "lil-gui";

const gui = new GUI();
```

### 調整項目の追加

```tsx
gui.add(boxGroup.position, "y").min(-3).max(3).step(0.01);
```

```js
ReferenceError: document is not defined
    at eval (./app/page.tsx:17:13)
    at (ssr)/./app/page.tsx (/Users/daikibeppu/development/threejs-demo/.next/server/app/page.js:162:1)
    at Object.__webpack_require__ [as require] (/Users/daikibeppu/development/threejs-demo/.next/server/webpack-runtime.js:33:42)
    at JSON.parse (<anonymous>)

```

検索しても解決策は見つからず、chatGPT もサーバーダウンにより使用不可のため本日はここまで。
