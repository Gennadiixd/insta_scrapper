import React, { useEffect } from 'react';
import Routes from './routes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userAuthAC } from './store/modules/user-auth/actions';
import Cookies from 'js-cookie';

function App({ userAuth }) {
  const token = Cookies.get('t');

  useEffect(() => {
    if (token) userAuth(token);
  });

  return (
    <Routes />
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    userAuth: bindActionCreators(userAuthAC, dispatch),
  }
};

export default (connect(null, mapDispatchToProps)(App));