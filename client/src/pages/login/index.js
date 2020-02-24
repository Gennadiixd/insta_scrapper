import LoginPage from './login-page';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userLoginAC } from '../../store/modules/user-auth/actions';


const mapDispatchToProps = (dispatch) => {
  return {
    userLoginAC: bindActionCreators(userLoginAC, dispatch),
  }
};

export default (connect(null, mapDispatchToProps)(LoginPage));