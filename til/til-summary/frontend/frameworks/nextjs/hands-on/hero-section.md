# Next.js 14 実装編 about ページ ヒーローセクション

## よくあるヒーローセクションを作る

[完成したページ](https://demo-site-autj1vr20-daiki-beppus-projects.vercel.app/)

![](https://i.gyazo.com/2ec5b62240571bb9238404d066646a8a.png)
_about ページ_

![](https://i.gyazo.com/3252d6d618048584494cd9a1a920f894.png)
_Home ページ_

1. demo-site/app/about/ に components フォルダを作成
1. components フォルダ内に hero.tsx を作成

```tsx
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="py-40 flex font-bold items-center">
      <div className="container">
        <h1 className="font-bold text-4xl lg:text-6xl">Hero</h1>
        <p className="text-muted-foreground mt-3 mb-6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure
          exercitationem rerum, voluptas asperiores dignissimos harum temporibus
          sint laboriosam quia hic. Eaque quos dolor ea cum dolorum consequuntur
          sed labore iusto?
        </p>

        <Button>お問い合わせ</Button>
      </div>
    </div>
  );
}
```

about と Home ページにヒーローセクションを実装
Home ページには画面いっぱいのヒーローセクションにしてみた

```tsx
export default function Home() {
  return (
    <main>
      <div className="h-dvh flex font-bold items-center">
        <div className="container">
          <h1 className="font-bold text-4xl lg:text-6xl">Hero</h1>
          <p className="text-muted-foreground mt-3 mb-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure
            exercitationem rerum, voluptas asperiores dignissimos harum
            temporibus sint laboriosam quia hic. Eaque quos dolor ea cum dolorum
            consequuntur sed labore iusto?
          </p>
        </div>
      </div>
    </main>

```

> _参考: YouTube : nino さん_ > [Next.js と Tailwind CSS で Web サイト制作 Part 1](https://www.youtube.com/watch?v=hVXxY_FlSvs&list=PLUW9JtUjtxmrdKvXyxlPMhdBZy1u4Ex5q&index=2)

:::
