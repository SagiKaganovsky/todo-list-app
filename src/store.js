import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./features/todos/todosSlice";

const rootReducer = combineReducers({
  todos: todosSlice
});
const store = configureStore({
  reducer: rootReducer
});

export default store;
