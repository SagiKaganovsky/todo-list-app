import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectAllTodos, deleteToDo, toggleToDo, fetchAllTodos } from "./todosSlice";
import DeleteIcon from "@material-ui/icons/Delete";
import {List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Checkbox,  IconButton} from "@material-ui/core";

const ToDoList = () => {
  const todos = useSelector(selectAllTodos);
  const dispatch = useDispatch();

  const todosStatus = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [todosStatus, dispatch]);

  return (
    <List>
      {todos.length > 0 &&
        todos.map((todo) => {
          const labelId = `checkbox-list-label-${todo.id}`;
          return (
            <ListItem
              dense
              button
              key={todo.id}
              onClick={() => dispatch(toggleToDo({ id: todo.id, done: !todo.done }))}
              style={{
                textDecoration: todo.done ? "line-through" : "none"
              }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={todo.done}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${todo.title}`} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="todo"
                  onClick={() => dispatch(deleteToDo(todo.id))}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
    </List>
  );
};

export default ToDoList;