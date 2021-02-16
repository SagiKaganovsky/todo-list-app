import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, IconButton } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { addTodo } from "./todosSlice";
export default (props) => {
  const [todoState, setTodoState] = useState("");
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const handleClick = (e) => {
    if (!todoState.trim()) {
      return;
    }

    dispatch(addTodo(todoState));
    setTodoState("");
  };

  return (
    <>
      <h2>Add to do</h2>
      <TextField
        label="todo"
        variant="outlined"
        type="text"
        value={todoState}
        color="secondary"
        onChange={(e) => setTodoState(e.target.value)}
      />
      <IconButton aria-label="add todo" onClick={handleClick}>
        <AddCircle  fontSize="large"/>
      </IconButton>
      <div>{error}</div>
    </>
  );
};
