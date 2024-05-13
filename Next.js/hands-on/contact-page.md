# Next.js 実装編 contact ページ

[完成したページ](https://demo-site-autj1vr20-daiki-beppus-projects.vercel.app/)

![](https://i.gyazo.com/41630bf27b561fc01e0feb6522948fa7.png)

```tsx
import { Button } from "@/components/ui/button";
import Section from "./section";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <Section title={"お問い合わせ"} subTitle={"ご気軽に連絡ください"}>
      <div className="m-12 flex items-center justify-center">
        <Button variant={"secondary"}>
          <Mail className="mr-2 h-4 w-4" /> お問い合わせはこちらから
        </Button>
      </div>
    </Section>
  );
}
```

```tsx
import Contact from "../about/components/contact";

export default function Page() {
  return <Contact />;
}
```

### 躓いたところ

CSS の知識不足でボタンを中央に寄せたくてもなかなかできなかった
div で囲み`"flex items-center justify-center"`で解決
