import React from 'react'

const Todo = ({ todo, toggleTodo }) => {
  const handleTodoClick = () => {
    // タスクの完了状態を切り替える
    toggleTodo(todo.id);
  }

  return (
    <div>
      <label>
        <input type='checkbox' checked={todo.completed} readOnly onChange={handleTodoClick}/>
      </label>
      {todo.name}
    </div>
  )
}

export default Todo