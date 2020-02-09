import * as C from './consts';
import { userRequest } from '../../../services/requests';
import { put, call, debounce } from "redux-saga/effects";

export const requestUserAC = () => {
  return {
    type: C.REQUEST_USER,
  }
};

export const getUserAC = (payload) => {
  return {
    type: C.REQUEST_USER_SUCCESS,
    payload,
  }
};

export function* fetchUser() {
  try {
    const resp = yield call(userRequest);
    const data = yield resp.json();
    yield put(getUserAC(data));
  } catch (error) {
    console.log(error);
  }
};

export function* watchUser() {
  yield debounce(500, C.REQUEST_USER, fetchUser);
};