// 型推論
const name = 'momochan';

// 型アノテーション
const age: number = 10;

const animal: { name: string } = {} as { name: string };

export default function Home() {
  return <div>{`動物:${animal} ${name}: ${age} 歳`}</div>;
}
