import React, { useRef, useState, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllTodos, deleteToDo, updateToDo, toggleToDo,
  fetchAllTodos, sortByDate
} from "./todosSlice";
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import CustomEdit from "../../components/CustomEdit";
import { List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton, Grid, Input } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  todoList: {
    width: "750px"
  }
}));

const ToDoList = () => {
  const [isEdit, setIsEdit] = useState();
  const classes = useStyles();
  const todos = useSelector(selectAllTodos);
  const dispatch = useDispatch();
  const todosStatus = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);

  const handleUpdate = (id, title) => {
    console.log(id, title);
    dispatch(() => updateToDo(id, title));
  };

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [todosStatus, dispatch]);

  return (
    <Grid container spacing={3} direction="column" justify="center" alignItems="flex-start">
      <Grid item>
        <IconButton variant="contained" onClick={() => dispatch(sortByDate())}>
          <ArrowDownwardIcon />
        </IconButton>
      </Grid>
      <Grid item md={12} sm={12}>
        <List>
          {todos.length > 0 &&
            todos.map((todo) => {
              return (
                <ListItem key={todo.id} style={{ textDecoration: todo.done ? "line-through" : "none" }}>
                  <ListItemIcon onClick={() => dispatch(toggleToDo({ id: todo.id, done: !todo.done }))}>
                    <Checkbox edge="start" checked={todo.done} tabIndex={-1} />
                  </ListItemIcon>
                  
                  <CustomEdit {...todo} updateTitle={handleUpdate} />
                  <ListItemIcon button>
                    <IconButton edge="end" aria-label="todo-save">
                      <SaveIcon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemIcon button>
                    <IconButton edge="end"
                      aria-label="todo-delete"
                      onClick={() => dispatch(deleteToDo(todo.id))}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemIcon>
                </ListItem>

              );
            })
          }
        </List>
      </Grid>
    </Grid >
  );
};

export default ToDoList;