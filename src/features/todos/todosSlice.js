import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jsonAPI from "../../api/jsonAPI";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const fetchAllTodos = createAsyncThunk(
  "todos/fetchAllTodos",
  async (endPoint, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    const response = await jsonAPI.get(`/${endPoint}`, {
      cancelToken: source.token
    });

    return response.data;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: "idle",
    error: null
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        const { id, title, completed } = action.payload;
        state.todos.unshift({ id, title, completed });
      },
      prepare: (title) => {
        return {
          payload: { title: title, id: uuidv4(), completed: false }
        };
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo(state, action) {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  },
  extraReducers: {
    [fetchAllTodos.fulfilled]: (state, { payload }) => {
      state.todos = payload;
      state.loading = "idle";
    },
    [fetchAllTodos.pending]: (state, action) => {
      state.todos = [];
      state.loading = "loading";
      state.error = null;
    },
    [fetchAllTodos.rejected]: (state, action) => {
      state.error = action.payload;
    }
  }
});
export const selectAllTodos = (state) => state.todos.todos;
export const selectLoading = (state) => state.todos.loading;
export const selectError = (state) => state.todos.error;
export const { addTodo, deleteTodo, toggleTodo } = todosSlice.actions;

export default todosSlice.reducer;
