// shoutという関数を作成し、messageというパラメータを受け取れるようにしてください。
// この関数には英語のmessageが渡されると過程して、3回console.logで、messageを大文字に変換した内容を出力してください。

// 例えば、shout('hello world')が実行されたら以下が出力されます：
// HELLO WORLD
// HELLO WORLD
// HELLO WORLD

function shout(message) {
  for (let i = 1; i <= 3; i += 1) {
    console.log(message.toUpperCase());
  }
}
