# Next.js 実装編 ダークモード対応

![](https://i.gyazo.com/c8799264455cba62c794c19686e0b6d1.png)
_こんな感じ！_

## shadcn/ui を使ったダークモード対応

ダークモード対応には shadcn/ui を利用するとめっちゃ簡単すぎてビビった

- ターミナルで`bun add next-themes`を叩く
- /components に theme-provider.tsx を作成

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

- app/layout.tsx body 内の要素を囲むように` ThemeProvider`を記述
  html タグ内に`suppressHydrationWarning`の記述を忘れないように

```tsx
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
```

- `bunx --bun shadcn-ui@latest add dropdown-menu` を叩いて
  shadcn/ui から dropdown をインストール
- /components/layout/mood-toggle.tsx を作成

```tsx
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
```

```tsx
export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

- 今回はヘッダーとフッターに切り替えボタンを実装

```tsx
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "./mood-toggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="container h-16 flex items-center border-b justify-between">
      <Button variant="ghost" asChild>
        <Link href={"/"} className="font-bold">
          LOGO
        </Link>
      </Button>
      <ul className="flex gap-8">
        {navItems.map((item) => (
          <li key={item.label}>
            <Button asChild variant="ghost">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          </li>
        ))}
      </ul>
      <ModeToggle /> // ここ！
    </header>
  );
}
```

```tsx
import { ModeToggle } from "./mood-toggle";

export default function Footer() {
  return (
    <footer className="container h-16 flex items-center justify-between border-t sticky top-full">
      <p>&copy; demo-site</p>
      <ModeToggle /> // ここ！
    </footer>
  );
}
```

詳しくは shaccn/ui の[公式ドキュメント](https://ui.shadcn.com/)を参照してください

:::
