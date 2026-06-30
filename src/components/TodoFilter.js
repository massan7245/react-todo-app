const TodoFilter = ({ setFilterType }) => {
  
  return (
    <>
      <button onClick={() => setFilterType("all")}>すべて</button>
      <button onClick={() => setFilterType("completed")}>完了</button>
      <button onClick={() => setFilterType("active")}>未完了</button>
    </>
  );
}

export default TodoFilter;