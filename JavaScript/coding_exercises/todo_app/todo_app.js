let input = prompt("コマンドを入力してください(new, list, delete, quit)");

const todos = ["水やり", "掃除"];

while (input !== "quit" && input !== "q") {
  if (input === "list" || input === "l") {
    console.log("*******************");
    for (let i = 0; i < todos.length; i += 1) {
      console.log(`${i}: ${todos[i]}`);
    }
    console.log("*******************");
  } else if (input === "new" || input === "n") {
    let inputTodo = prompt("todoを入力してください");
    console.log(`${inputTodo}を追加しました`);
    todos.push(inputTodo);
  } else if (input === "delete" || input === "d") {
    let inputIndex = parseInt(
      prompt("削除したいTodoのインデックスを入力してください")
    );

    if (!Number.isNaN(inputIndex)) {
      const deleteTodo = todos.splice(inputIndex, 1);
      console.log(`${deleteTodo[0]}を削除しました`);
    } else {
      console.log("無効な値が入力されました");
    }
  }
  input = prompt("コマンドを入力してください(new, list, delete, quit)");
}

console.log("quitが入力されたためアプリケーションを終了しました");
