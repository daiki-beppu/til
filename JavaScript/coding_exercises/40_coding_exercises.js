// * capitalize演習問題
// capitalizeという関数を作ってください。この関数は一つのStringを引数として受け取り、そのStringの最初の文字を大文字にした値を返します。

// 以下が、実行例です：
// capitalize('eggplant') // "Eggplant"
// capitalize('hello') // "Hello"
// capitalize('squid') //"Squid"

// ヒント：
// Stringの中身を変えることはできません。なので、元のStringのインデックスが0の値を変えることはできません。新しいStringを作ってそれをreturnしましょう。
// Stringの最初の文字を参照して、Stringのメソッドで大文字化しましょう。
// Stringの2番目以降の文字をsliceで取得しましょう。
// 例として、'eggplant'であれば、'E' + 'ggplant'になるようにすると良いでしょう。

function capitalize(str) {
  let getFirstCharacter = str[0].toUpperCase();
  let afterSecondCharacter = str.slice(1);
  return `${getFirstCharacter}${afterSecondCharacter}`;
}

capitalize("squid"); //"Squid"
