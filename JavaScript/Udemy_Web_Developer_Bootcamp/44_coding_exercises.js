// * メソッドの演習問題
// squareというオブジェクトを定義して、areaとperimeterというメソッドをもたせてください。
// areaはsideという引数を一つ受け取って、sideを2乗した値を返します
// perimeterはsideを受け取って、4を乗算した値を返します

// square.area(10) //100
// square.perimeter(10) //40

const square = {
  area: function (side) {
    return side * side;
  },
  perimeter: function (side) {
    return side * 4;
  },
};
