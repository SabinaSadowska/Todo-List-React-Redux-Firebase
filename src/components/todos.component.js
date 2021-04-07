import React, { useState, useEffect } from "react";
import "./todos.component.css";
import { connect } from "react-redux";

import {
  selectToDoList,
  selectSendToFirebase,
  selectAllState,
} from "../modules/todos/todos.selector";
import {
  ACTION_TODO_ADD,
  ACTION_DONE_ACTIVE_TOGGLE,
  ACTION_FETCH_FROM_FIREBASE,
  ACTION_DELETE_ITEM,
} from "../modules/todos/todos.action";

import TextField from "@material-ui/core/TextField";
import { Item } from "./todos.style";

import Button from "@material-ui/core/Button";

function Todos(props) {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  useEffect(() => {
    props.actionFetchFromFirebase();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const onOptionCategoryChange = (event) => {
    setCategoryValue(event.target.value);
  };

  const onClicAddItems = (event) => {
    event.preventDefault();
    if (inputValue) {
      props.actionAddItems(inputValue);
    }
    setInputValue("");
    props.sendToFirebase();
  };

  useEffect(() => {
    props.sendToFirebase();
  }, [onClicAddItems]);

  const doneActiveToggle = (item) => {
    props.actionDoneActiveToggle(item);
    props.sendToFirebase();
  };

  const deleteItem = (item) => {
    props.actionDeleteItem(item);
    props.sendToFirebase();
  };

  useEffect(() => {
    renderItems(filteredItems);
  });

  const renderItems = (list) =>
    list.map((item, index) => (
      <div className="todos_item" key={index}>
        <Item
          className="item"
          key={item.id}
          active={!item.completed}
          onClick={() => doneActiveToggle(item.id)}
        >
          {item.title}
        </Item>
        <button
          className="todos_button"
          value={item.id}
          onClick={(event) => {
            console.log(item.id);

            deleteItem(event.target.value);
          }}
        >
          x
        </button>
      </div>
    ));

  const filteredItems = props.toDoList
    .filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .filter((item) => {
      if (categoryValue === "1" || !categoryValue) {
        return item;
      } else if (categoryValue === "2") {
        return item.completed;
      } else if (categoryValue === "3") {
        return !item.completed;
      }
    });

  return (
    <div className="todos">
      <h1>To do list</h1>
      <form noValidate autoComplete="off">
        <TextField
          className="textField"
          id="standard-basic"
          placeholder="Write some task to do"
          onChange={handleInputChange}
          value={inputValue}
        ></TextField>
      </form>
      <Button variant="contained" color="primary" onClick={onClicAddItems}>
        Add
      </Button>
      <div className="search-wrapper">
        <TextField
          id="standard-basic"
          placeholder="Search by name..."
          onChange={handleSearchInputChange}
          value={searchValue}
          className="search_bar"
        ></TextField>
        <select onChange={onOptionCategoryChange} className="select_button">
          <option value="1">All</option>
          <option value="2">Done</option>
          <option value="3">To do</option>
        </select>
      </div>
      <div className={"items_wrapper"}>{renderItems(filteredItems)}</div>
      <div></div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  toDoList: selectToDoList(state),
  allState: selectAllState(state),

  sendToFirebase: selectSendToFirebase(state),
});

const mapDispatchToProps = (dispatch) => ({
  actionAddItems: (todo) => {
    dispatch(ACTION_TODO_ADD(todo));
  },
  actionDoneActiveToggle: (id) => {
    dispatch(ACTION_DONE_ACTIVE_TOGGLE(id));
  },
  actionFetchFromFirebase: () => {
    dispatch(ACTION_FETCH_FROM_FIREBASE());
  },
  actionDeleteItem: (value) => {
    dispatch(ACTION_DELETE_ITEM(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
