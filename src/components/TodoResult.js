
const TodoResult = ({ todos }) => {

  return (
    <>
      <p>全て:{todos.length}件</p>
      <p>完了:{todos.filter((todo) => todo.completed).length}件</p>
      <p>未完了:{todos.filter((todo) => !todo.completed).length}件</p>
    </>
  );
}

export default TodoResult;