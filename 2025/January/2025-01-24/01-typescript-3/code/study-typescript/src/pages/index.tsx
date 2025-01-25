// 型推論
const name = 'momochan';

// 型アノテーション
const age: number = 10;

// 型アサーション
const animal: { name: string } = {} as { name: string };

// プリミティブ型: boolean
const isCat: boolean = true; // 真偽値 (true または false) のみ

// プリミティブ型: string
const text: string = '可愛い'; // 文字列のみ

// プリミティブ型: number
const legsCount: number = 4; // 数値のみ

// プリミティブ型: null
const foo: null = null; // null のみ

// プリミティブ型: undefined
const bar: undefined = undefined; // undefined のみ

// リテラル型: boolean
const bool: true = true; // true のみ

//  リテラル型: string
const gender: 'male' | 'female' = 'male'; // male か female のみ

// リテラル型: number
const num: 1 = 1; // 1 のみ

export default function Home() {
  return (
    <div>
      {`動物:${animal} ${name}: ${age} 歳 猫ですか？ ${isCat} どんな動物ですか？ 足の数は ${legsCount}で ${text}`}
    </div>
  );
}
