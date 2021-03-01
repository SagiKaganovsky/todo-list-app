import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from "react-redux";
import Todo from "./features/todos/Todo";
import ToDoList from "./features/todos/TodoList";
import store from "./store";
import { ThemeProvider } from "styled-components";
import { MuiThemeProvider, StylesProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline, Container } from "@material-ui/core";
import "./styles.css";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const App = () => {

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container fixed>
            <Provider store={store}>
              <Router>
                <div className="App">
                  <Switch>
                    <Route exact path="/"
                      render={() => (
                        <>
                          <Todo />
                          <ToDoList />
                        </>
                      )}
                    />
                  </Switch>
                </div>
              </Router>
            </Provider>
          </Container>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

export default App; 