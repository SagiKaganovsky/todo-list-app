import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todosAPI from "../../api/todosAPI";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const fetchAllTodos = createAsyncThunk(
  "todos/getAllTodos",
  async (endPoint, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    const response = await todosAPI.get(`/${endPoint}`, {
      cancelToken: source.token
    });

    return response.data;
  });

export const fetchAddToDo = createAsyncThunk("todos/addToDo",
  async ({ id, title, done }, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    const response = await todosAPI.post('todos', { id, title, done }, {
      cancelToken: source.token
    });

    return response.data;
  },
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
        const { id, title, done } = action.payload;
        state.todos.unshift({ id, title, done });
      },
      prepare: (title) => {
        return {
          payload: { title: title, id: uuidv4(), done: false }
        };
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo(state, action) {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
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
    },
    [fetchAddToDo.fulfilled]: (state, action) => {
      state.entities.push(action.payload)
    }
  }
});
export const selectAllTodos = (state) => state.todos.todos;
export const selectLoading = (state) => state.todos.loading;
export const selectError = (state) => state.todos.error;
export const { addTodo, deleteTodo, toggleTodo } = todosSlice.actions;

export default todosSlice.reducer;
