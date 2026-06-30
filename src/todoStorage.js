

  // 初期化用の関数
export const loadTodos = (defaultTodos) => {
    const savedTodos = localStorage.getItem('todos'); // ローカルストレージからtodosの値を取得する
    if(savedTodos) { // savedTodosがあれば、JSON形式の文字列をJavaScriptの配列に戻す
      return JSON.parse(savedTodos);
    }
    return defaultTodos;
};

// 保存した文字列を初回表示時に読み込む処理
export const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};
