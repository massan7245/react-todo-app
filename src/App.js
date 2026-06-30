import { useState, useReducer, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoResult from './components/TodoResult';
import TodoFilter from './components/TodoFilter';
import TodoDoneDelete from './components/TodoDoneDelete';

import { todoReducer, initialTodos } from './todoReducer';
import { loadTodos, saveTodos } from './todoStorage';

// Todoリストを作成
const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos, loadTodos);
  const [inputVal, setInputVal] = useState(''); // 入力欄の文字
  const [filterType, setFilterType] = useState('all');
  const [editingId, setEditingId] = useState(null); // 現在どのTodoを編集中なのかを管理するstate
  // editingId: どのTodoを編集中か
  const [editingText, setEditingText] = useState(''); // 編集後の文章を管理するstate
  // editingText: 編集欄に入力されている文章

  // todosが変更されるたびにlocalStorageへ保存するuseEffect
  useEffect(() => {
    // todosをJSON形式の文字列へ変換して、決めたキー名でlocalStorageへ保存する
    saveTodos(todos);
    
  }, [todos]);

  // 完了・未完了時のTodo(フィルターをかける)
  const filteredTodos = todos.filter((todo) => {
    if (filterType === 'active') {
      return !todo.completed; // 未完了のTodoだけ残す
    } else if (filterType === 'completed') {
      return todo.completed; // 完了済みのTodoだけ残す
    } else {
      return true;
    }
  });

  // Formの追加
  const addTodo = (e) => {
    e.preventDefault();
    if (inputVal.trim() === '') return; // 空入力の場合なにもしない。
    // Todo 1件のオブジェクト
    const todo = {
      id: Date.now(),
      text: inputVal.trim(),
      completed: false,
    };
    dispatch({ type: 'add', payload: todo }); // Todoリストを更新
    setInputVal(''); // 入力欄を空白に戻す
  };

  // Todo1件を削除
  const deleteTodo = (id) => {
    dispatch({ type: 'delete', payload: id });
  };

  // トグルボタンでcompletedを反転
  const toggleTodo = (id) => {
    dispatch({ type: 'toggle', payload: id });
  };

  // Listの編集開始
  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  // Listの保存処理
  const saveEditing = () => {
    // 編集で空白での保存はreturnする
    if (editingText.trim() === '') return;

    dispatch({
      type: 'edit',
      payload: {
        id: editingId,
        text: editingText.trim(),
      },
    });

    setEditingId(null);
    setEditingText(''); // 編集後、対象がない状態へ戻す
  };

  // キャンセル関数
  const cancelEditing = () => {
    // dispatchをしないのでTodoの文章は変更されない
    // editingIdをnullにする：編集状態を終了
    // editingTextを空にする：入力途中の文章を破棄
    // todos：変更されない
    setEditingId(null);
    setEditingText('');
  };

  return (
    <>
      <TodoForm
        inputVal={inputVal}
        setInputVal={setInputVal}
        addTodo={addTodo}
      />
      <TodoFilter setFilterType={setFilterType} />
      <TodoList
        todos={filteredTodos}
        editingId={editingId}
        editingText={editingText}
        setEditingText={setEditingText}
        startEditing={startEditing}
        saveEditing={saveEditing}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
        cancelEditing={cancelEditing}
      />
      <TodoDoneDelete todos={todos} dispatch={dispatch} />
      <TodoResult todos={todos} />
    </>
  );
};

export default App;
