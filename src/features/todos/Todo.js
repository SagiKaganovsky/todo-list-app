import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, IconButton } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { addNewToDo } from "./todosSlice";

const ToDo = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (!title.trim()) {
      return;
    }

    dispatch(addNewToDo(title));
    setTitle("");
  };

  return (
    <>
      <h2>Add to do</h2>
      <TextField
        label="todo"
        variant="outlined"
        type="text"
        value={title}
        color="secondary"
        onChange={(e) => setTitle(e.target.value)}
      />
      <IconButton aria-label="add todo" onClick={handleClick}>
        <AddCircle fontSize="large" />
      </IconButton>
      <div>{error}</div>
    </>
  );
};
export default ToDo;