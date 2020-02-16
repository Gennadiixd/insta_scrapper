import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reducer from './strore/combined-reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { watchDirectInbox, watchDirectNextPage } from './strore/modules/direct/actions';
import { watchUser } from './strore/modules/user-profile/actions';
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({});
const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(watchDirectInbox);
sagaMiddleware.run(watchUser);
sagaMiddleware.run(watchDirectNextPage);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));