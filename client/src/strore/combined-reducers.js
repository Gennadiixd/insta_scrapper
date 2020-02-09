import { combineReducers } from 'redux';
import direct from './modules/direct/reducer';
import user from './modules/user/reducer';

export default combineReducers({
  direct,
  user
});