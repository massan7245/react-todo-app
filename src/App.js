import { useState, useRef } from 'react';
import './App.css';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    // タスクを追加する
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = ''; // 入力後に入力欄を空にする
  };

  // Enterキーでタスクを追加する
  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddTodo();
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos]; // 配列をコピー
    const todo = newTodos.find((todo) => todo.id === id); // 対象のタスクを見つける
    todo.completed = !todo.completed; // タスクの完了状態を切り替える
    setTodos(newTodos); // 状態を更新する
  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <form onSubmit={handleSubmit}>
        <input type="text" ref={todoNameRef} />
        <button onClick={handleAddTodo}>タスクを追加</button>
      </form>
      <button onClick={handleClear}>完了したタスクの削除</button>
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
    </>
  );
}

export default App;
