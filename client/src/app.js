import React, { useEffect } from 'react';
import Routes from './routes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestUserAC } from './strore/modules/user/actions';

function App({ requestUser }) {
  useEffect(() => {
    requestUser();
  }, []);

  return (
    <Routes />
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestUser: bindActionCreators(requestUserAC, dispatch),
  }
};

export default (connect(null, mapDispatchToProps)(App));

