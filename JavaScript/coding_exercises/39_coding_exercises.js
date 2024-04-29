// * lastElement演習問題
// lastElementという関数を作ってください。関数は一つの配列を引数として受け取ります。
// そして、受け取った配列の最後の要素を返してください。もし配列が空の場合は、関数はnullを返してください。

// lastElement(['a', 'b']) // b
// lastElement([3,5,7]) //7
// lastElement([1]) //1
// lastElement([]) //null

function lastElement(array) {
  let lastIndex = array.length - 1;
  if (array.length === 0) {
    return null;
  } else {
    return array[lastIndex];
  }
}
