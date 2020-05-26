import { TODOS_ACTION_TYPES } from "./todos.action";

const INITIAL_STATE = {
  todos: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TODOS_ACTION_TYPES.TODO_ADD:
      return (state = {
        ...state,
        todos: [
          ...state.todos,
          {
            title: action.value,
            completed: false,
            id: Date.now(),
          },
        ],
      });

    case TODOS_ACTION_TYPES.DONE_ACTIVE_TOGGLE:
      const doneActiveTodos = [...state.todos];
      doneActiveTodos.map((item) =>
        item.id === action.id ? (item.completed = !item.completed) : null
      );
      return (state = {
        ...state,
        todos: doneActiveTodos,
      });

    case TODOS_ACTION_TYPES.ACTION_FETCH_TO_FIREBASE:
      return (state = { ...state });

    case TODOS_ACTION_TYPES.ACTION_FETCH_FROM_FIREBASE_SUCCESS:
      return (state = {
        ...state,
        todos: action.value || [],
      });
    case TODOS_ACTION_TYPES.ACTION_DELETE_ITEM:
      const allItems = [...state.todos];

      return (state = {
        ...state,
        todos: allItems.filter((item) =>
          item.id != action.value ? true : false
        ),
      });

    default:
      return state;
  }
};
