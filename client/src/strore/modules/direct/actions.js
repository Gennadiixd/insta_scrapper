import * as C from './consts';
import { directInboxRequest, userRequest } from '../../../services/requests';
import { put, call, debounce } from "redux-saga/effects";

export const requestDirectInboxAC = () => {
  return {
    type: C.REQUEST_DIRECT_INBOX,
  }
};

export const getDirectInboxAC = (payload) => {
  return {
    type: C.REQUEST_DIRECT_INBOX_SUCCESS,
    payload,
  }
};

export function* fetchDirectInbox() {
  try {
    const resp = yield call(directInboxRequest);
    const data = yield resp.json();
    yield put(getDirectInboxAC(data));
  } catch (error) {
    console.log(error);
  }
};

export function* watchDirectInbox() {
  yield debounce(500, C.REQUEST_DIRECT_INBOX, fetchDirectInbox);
};