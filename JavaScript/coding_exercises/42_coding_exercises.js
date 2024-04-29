// 曜日を返す関数の演習問題
// returnDayという関数を作ってください。
// この関数は一つの数字を引数として受け取ります（1から7の値）。
// そして、1から7に対応した曜日を返します（1ならMonday、2ならTuesday、etc.）もし数字が1より小さい、あるいは7より大きい場合はnullを返します。

// returnDay(1) // "Monday"
// returnDay(7) // "Sunday"
// returnDay(4) // "Thursday"
// returnDay(0) // null
// ヒント：曜日をまずは配列またはオブジェクトにすべて入れましょう。
// 関数が呼ばれたときに、与えられた数字と配列/オブジェクトの値をマッピングして、対応する曜日を返しましょう。

function returnDay(num) {
  const weeks = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  switch (num) {
    case 1: {
      return weeks[0];
      break;
    }
    case 2: {
      return weeks[1];
      break;
    }

    case 3: {
      return weeks[2];
      break;
    }

    case 4: {
      return weeks[3];
      break;
    }

    case 5: {
      return weeks[4];
      break;
    }

    case 6: {
      return weeks[5];
      break;
    }

    case 7: {
      return weeks[6];
      break;
    }
    default: {
      return null;
      break;
    }
  }
}
