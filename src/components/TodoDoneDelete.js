const TodoDoneDelete = ({ todos, dispatch }) => {

  // 完了済みのtodoをcompletedTodosに格納
  const completedTodos = todos.filter((todo) => {
    return todo.completed
  });

  const doneDelete = () => {
    dispatch({ type: 'donedelete' })
  };
  return (
    <button 
      disabled={completedTodos.length === 0} 
      onClick={doneDelete}>
        完了済みを一括削除
    </button>
  );
}

export default TodoDoneDelete;

