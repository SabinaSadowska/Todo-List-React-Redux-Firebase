const selectTodos = (state) => state.todos.todos;

export const selectToDoList = (state) => selectTodos(state).map((item) => item);

export const selectAllState = (state) => selectTodos(state);

export const selectSendToFirebase = (state) => {
  return () => {
    fetch("https://todos-lista.firebaseio.com/.json", {
      method: "PUT",
      body: JSON.stringify(selectTodos(state)),
    });
  };
};
