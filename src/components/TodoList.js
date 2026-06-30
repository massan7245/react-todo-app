const TodoList = ({
  todos,
  deleteTodo,
  toggleTodo,
  editingId,
  editingText,
  setEditingText,
  startEditing,
  saveEditing,
  cancelEditing,
}) => {


  return (
    <ul>
      {todos.map((todo) =>
        editingId === todo.id ? (
          <li key={todo.id}>
            <input
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
            />
            <button onClick={saveEditing}>保存</button>
            <button onClick={cancelEditing}>キャンセル</button>
            <button onClick={() => toggleTodo(todo.id)}>
              {todo.completed ? '未完了に戻す' : '完了にする'}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ) : (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => startEditing(todo)}>編集</button>
            <button onClick={() => toggleTodo(todo.id)}>
              {todo.completed ? '未完了に戻す' : '完了にする'}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ),
      )}
    </ul>
  );
};

export default TodoList;
