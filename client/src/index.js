import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reducer from './store/combined-reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { watchDirectInbox, watchDirectNextPage } from './store/modules/direct/actions';
// import { watchUser } from './store/modules/user-profile/actions';
import { watchUserLogin, watchUserAuth } from './store/modules/user-auth/actions';
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({});
const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(watchUserLogin);
sagaMiddleware.run(watchUserAuth);
sagaMiddleware.run(watchDirectInbox);
sagaMiddleware.run(watchDirectNextPage);
// sagaMiddleware.run(watchUser);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);