// Todoの初期一覧
export const initialTodos = [
  {
    id: 1,
    text: '猫と遊ぶ',
    completed: false,
  },
];

export const todoReducer = (state, { type, payload }) => {
  switch (type) {
    case 'add':
      return [...state, payload];
    case 'delete':
      return state.filter((todo) => todo.id !== payload);
    case 'toggle':
      return state.map((todo) => {
        if (todo.id === payload) {
          // オブジェクトで返す
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    case 'edit':
      return state.map((todo) => {
        if (todo.id === payload.id) {
          return {
            ...todo,
            text: payload.text,
          };
        }
        return todo;
      });
    case 'donedelete':
      return state.filter((todo) => !todo.completed);
    default:
      return state;
  }
};

