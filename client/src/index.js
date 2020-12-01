import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import AddEvent from './components/AddEvent'
import EventApi from './components/EventApi';
import BaseLayout from './components/BaseLayout';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <BaseLayout>
        <Switch>
          <Route component = {App} path="/" exact></Route>
          <Route component = {AddEvent} path="/add-event"></Route>
        <Route component = {EventApi} path="/event-api"></Route>
        </Switch>
      </BaseLayout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
