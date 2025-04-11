/* eslint-disable react/prop-types */
import Image from 'next/image';

export default function Headline(props) {
  return (
    <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="text-2xl">{props.title}</h1>
      {/* 親コンポーネントで title と設定していたので props.title となる
           foo と設定していたら props.foo となる
           jsx ではドット記法(js の構文)で呼び出すことはできない
           js の構文を使用するときは {} で囲む必要がある
           ちなみにコメントアウトも同様
        */}
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <ol className="list-inside list-decimal text-sm text-c enter sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2">
          Hello Get started by editing{' '}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            src/pages/index.js
          </code>
          .
        </li>
        <li>Save and see your changes instantly.</li>
      </ol>
    </div>
  );
}
