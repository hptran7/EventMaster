import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Router, Switch, Route } from "react-router-dom";
import AddEvent from "./components/AddEvent";
import EventApi from "./components/EventApi";
import Login from "./components/Login";
import BaseLayout from "./components/BaseLayout";
import Invitation from "./components/Invitation";
import Notification from "./components/Notification";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./css/store/reducer";
import { setAuthenticationHeader } from "./utils/authenticate";
import EventUpdate from "./components/EventUpdate";
import history from "./utils/history";
import Register from "./components/Register";
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const token = localStorage.getItem("jsonwebtoken");
setAuthenticationHeader(token);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <BaseLayout>
          <Switch>
            <Route component={App} path="/" exact></Route>
            <Route component={AddEvent} path="/add-event"></Route>
            <Route component={EventApi} path="/event-api"></Route>
            <Route component={Login} path="/login"></Route>
            <Route component={Register} path="/register"></Route>
            <Route component={Invitation} path="/invitation-notice"></Route>
            <Route component={Notification} path="/notification"></Route>
            <Route
              component={EventUpdate}
              path="/update-event/:eventid"
            ></Route>
          </Switch>
        </BaseLayout>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
