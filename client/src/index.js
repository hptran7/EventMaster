import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddEvent from "./components/AddEvent";
import EventApi from "./components/EventApi";
import Login from "./components/Login";
import BaseLayout from "./components/BaseLayout";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./css/store/reducer";
import { setAuthenticationHeader } from "./utils/authenticate";
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const token = localStorage.getItem("jsonwebtoken");
setAuthenticationHeader(token);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <BaseLayout>
          <Switch>
            <Route component={App} path="/" exact></Route>
            <Route component={AddEvent} path="/add-event"></Route>
            <Route component={EventApi} path="/event-api"></Route>
            <Route component={Login} path="/login"></Route>
          </Switch>
        </BaseLayout>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
