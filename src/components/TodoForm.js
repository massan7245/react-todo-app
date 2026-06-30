const TodoForm = ({ inputVal, setInputVal, addTodo }) => {
  return (
    <form onSubmit={addTodo}>
      <input
        type="text"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <button>追加</button>
    </form>
  );
};

export default TodoForm;
