export const TODOS_ACTION_TYPES = {
  TODO_ADD: "TODO_ADD",
  DONE_ACTIVE_TOGGLE: "DONE_ACTIVE_TOGGLE",
  ACTION_FETCH_FROM_FIREBASE: "ACTION_FETCH_FROM_FIREBASE",
  ACTION_FETCH_FROM_FIREBASE_SUCCESS: "ACTION_FETCH_FROM_FIREBASE_SUCCESS",
  ACTION_DELETE_ITEM: "ACTION_DELETE_ITEM",
};

export const ACTION_TODO_ADD = (todo) => {
  return { type: TODOS_ACTION_TYPES.TODO_ADD, value: todo };
};

export const ACTION_DONE_ACTIVE_TOGGLE = (id) => {
  return { type: TODOS_ACTION_TYPES.DONE_ACTIVE_TOGGLE, id: id };
};

export const ACTION_FETCH_FROM_FIREBASE = () => {
  return (dispatch) => {
    fetch("https://todos-lista.firebaseio.com/.json")
      .then((response) => response.json())
      .then((json) => {
        dispatch(ACTION_FETCH_FROM_FIREBASE_SUCCESS(json));
      });
  };
};

export const ACTION_FETCH_FROM_FIREBASE_SUCCESS = (todos) => {
  return {
    type: TODOS_ACTION_TYPES.ACTION_FETCH_FROM_FIREBASE_SUCCESS,
    value: todos,
  };
};

export const ACTION_DELETE_ITEM = (value) => {
  return {
    type: TODOS_ACTION_TYPES.ACTION_DELETE_ITEM,
    value: value,
  };
};
