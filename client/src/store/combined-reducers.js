import { combineReducers } from 'redux';
import direct from './modules/direct/reducer';
import userProfile from './modules/user-profile/reducer';
import userAuth from './modules/user-auth/reducer';

export default combineReducers({
  direct,
  userProfile,
  userAuth
});