import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './semantic/dist/semantic.css';
import './semantic/dist/semantic';
import routes from './routes';
import rootReducer from './reducer';
import { invalidateProjects } from './showcase/actions';
import './main.css';

const logger = createLogger();
const middleware = applyMiddleware(thunkMiddleware, logger);

let store = createStore(
  rootReducer,
  middleware
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('root')
);
