import * as C from './consts';
import { login } from '../../../services/requests';
import { put, call, debounce } from "redux-saga/effects";

export const userLoginAC = (payload) => {
  return {
    type: C.USER_LOGIN,
    payload,
  }
};

export const userLoginSuccessAC = (payload) => {
  return {
    type: C.USER_LOGIN_SUCCESS,
    payload,
  }
};

export function* userLoginGenerator({ payload: { account, password } }) {
  console.log(account, password);

  try {
    const resp = yield call(() => login(account, password));
    const data = yield resp.json();
    yield put(userLoginSuccessAC(data));
  } catch (error) {
    console.log(error);
  }
};

export function* watchUserLogin() {
  yield debounce(500, C.USER_LOGIN, userLoginGenerator);
};