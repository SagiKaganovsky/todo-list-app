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

    const response = await todosAPI.get("todos", {
      cancelToken: source.token
    });

    return response.data;
  }
);

export const addNewToDo = createAsyncThunk("todos/addNewToDo",
  async (title, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    const response = await todosAPI.post('todos', { title: title, id: uuidv4(), done: false }, {
      cancelToken: source.token
    });

    return response.data;
  }
);

export const deleteToDo = createAsyncThunk("todos/deleteToDo",
  async (id, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    const response = await todosAPI.post('todos/delete', { id: id }, {
      cancelToken: source.token
    });

    return response.data;
  }
);
export const toggleToDo = createAsyncThunk("todos/toggleToDo",
  async ({ id, done }, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    const response = await todosAPI.post('todos/toggleDone', { id: id, done: done }, {
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
    [addNewToDo.fulfilled]: (state, { payload }) => {
      state.todos.push(payload)
    },
    [addNewToDo.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [deleteToDo.fulfilled]: (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload);
    },
    [toggleToDo.fulfilled]: (state, { payload }) => {
      const todo = state.todos.find((todo) => todo.id === payload);
      if (todo) {
        todo.done = !todo.done;
      }
    },
  }
});

export const selectAllTodos = (state) => state.todos.todos;
export const selectLoading = (state) => state.todos.loading;
export const selectError = (state) => state.todos.error;
export const { addTodo, toggleTodo } = todosSlice.actions;

export default todosSlice.reducer;
