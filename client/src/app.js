import React, { useEffect } from 'react';
import Routes from './routes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestUserAC } from './store/modules/user-profile/actions';

function App({ requestUser }) {
  useEffect(() => {
    // requestUser('test', 'test2');
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

