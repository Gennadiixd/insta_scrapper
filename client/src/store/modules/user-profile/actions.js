import * as C from './consts';
import { login } from '../../../services/requests';
import { put, call, debounce } from "redux-saga/effects";

export const requestUserAC = (payload) => {
  return {
    type: C.REQUEST_USER,
    payload
  }
};

export const getUserAC = (payload) => {
  return {
    type: C.REQUEST_USER_SUCCESS,
    payload,
  }
};

export function* fetchUser({ account, password }) {
  try {
    const resp = yield call(() => login(account, password));
    const data = yield resp.json();
    yield put(getUserAC(data));
  } catch (error) {
    console.log(error);
  }
};

export function* watchUser() {
  yield debounce(500, C.REQUEST_USER, fetchUser);
};