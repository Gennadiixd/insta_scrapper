import * as C from './consts';
import { login, auth } from '../../../services/requests';
import { put, call, debounce } from "redux-saga/effects";

//auth flow
export const userAuthAC = (payload) => {
  return {
    type: C.USER_AUTH,
    payload
  }
};

export const userAuthSuccessAC = (payload) => {
  return {
    type: C.USER_AUTH_SUCCESS,
    payload
  }
};

export function* userAuthGenerator({ payload }) {

  try {
    const resp = yield call(() => auth(payload));
    const data = yield resp.json();
    yield put(userAuthSuccessAC(data));
  } catch (error) {
    console.log(error);
  }
};

export function* watchUserAuth() {
  yield debounce(500, C.USER_AUTH, userAuthGenerator);
};

// login flow
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