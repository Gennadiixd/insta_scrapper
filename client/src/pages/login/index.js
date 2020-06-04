import LoginPage from './login-page';
import * as S from '../../store/modules/user-auth/selectors';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userLoginAC } from '../../store/modules/user-auth/actions';


const mapDispatchToProps = (dispatch) => {
  return {
    userLoginAC: bindActionCreators(userLoginAC, dispatch),
  }
};

const mapStateToProps = (state) => {
  return {
    userId: S.userIdSelector(state),
  }
};

export default (connect(mapStateToProps, mapDispatchToProps)(LoginPage));