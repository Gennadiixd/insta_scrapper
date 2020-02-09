import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reducer from './strore/combined-reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { watchDirectInbox } from './strore/modules/direct/actions';
import { watchUser } from './strore/modules/user/actions';
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({});
const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(watchDirectInbox);
sagaMiddleware.run(watchUser);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));