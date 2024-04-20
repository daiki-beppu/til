# for 文について

for 文は繰り返したいときに使う

1〜10 までを繰り返し出力する

```deff_javascript

記述例

for (let i = 1; i <= 10; i++>) {
  console.log(i);
}

```

配列の要素を取り出して出力

```deff_javascript

記述例

const word = ["foo", "bar", "hoge", "huga"];

// for of を使う場合

for (const e of word) {
  console.log(e);
}

// forEach を使う場合

word.forEach((e) => {
  console.log(e);
});

```
