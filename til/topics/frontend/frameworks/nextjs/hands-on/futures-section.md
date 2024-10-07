# Next.js 14 実装編 about ページ futures セクション

## サービス紹介ページの実装

[完成したページ](https://demo-site-autj1vr20-daiki-beppus-projects.vercel.app/)

![](https://i.gyazo.com/522e07e58c862f076563ba3b4167a31f.png)
_モバイル向けのページ_
![](https://i.gyazo.com/f428f1b1db8b4b71ebf269f358856dc1.png)
_デスクトップ向けのページ_

- components フォルダ内に futures.tsx を作成
- コンポーネントを再利用するために section.tsx と card.tsx を作成

### section.tsx

```tsx
export default function Section({
  title,
  subTitle,
  children,
}: {
  title: string;
  subTitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-20 container">
      <div className="mb-4 text-center space-y-6">
        <h2 className="font-bold text-2xl">{title}</h2>
        <p className="text-muted-foreground mb-10">{subTitle}</p>
      </div>
      {children}
    </section>
  );
}
```

### card.tsx

```tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Card() {
  return (
    <div className="border relative p-6 shadow rounded-md space-y-3">
      <div className="aspect-video bg-muted"></div>
      <h2>
        <Link href="#">
          記事タイトル
          <span className="absolute inset-0"></span>
        </Link>
      </h2>
      <p>Lorem ipsum dolor sit amet.</p>
      <Button variant={"outline"}>タグA</Button>
    </div>
  );
}
```

### futures.tsx

```tsx
import Section from "./section";
import Card from "./card";

export default function Features() {
  return (
    <Section title={"サービスの特徴"} subTitle={"すごいサービスがたくさん！"}>
      <div className="pb-20 grid lg:grid-cols-3 gap-4 items-center">
        <Card />
        <Card />
        <Card />
      </div>
    </Section>
  );
}
```

カードとセクションをコンポーネント化することでかなりスッキリしたコードに！

### 躓いたところ

Link のインポート先を間違えていてカード全体がリンクにならなかった
next/link からインポートすることで解決！
