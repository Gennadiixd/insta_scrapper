import * as C from './consts';
import { directInboxRequest, nextPageThreadRequest } from '../../../services/requests';
import { put, call, debounce } from "redux-saga/effects";

export const requestDirectNextPageAC = (payload) => {
  return {
    type: C.REQUEST_DIRECT_NEXT_PAGE,
    payload
  }
};

export const receivedDirectNextPageAC = (payload) => {
  return {
    type: C.REQUEST_DIRECT_NEXT_PAGE_SUCCESS,
    payload,
  }
};

export function* fetchDirectNextPage(threadId) {
  try {
    const resp = yield call(() => nextPageThreadRequest(threadId));
    const data = yield resp.json();
    yield put(receivedDirectNextPageAC(data));
  } catch (error) {
    console.log(error);
  }
};

export function* watchDirectNextPage() {
  yield debounce(500, C.REQUEST_DIRECT_NEXT_PAGE, fetchDirectNextPage);
};

export const requestDirectInboxAC = (payload) => {
  return {
    type: C.REQUEST_DIRECT_INBOX,
    payload
  }
};

export const receivedDirectInboxAC = (payload) => {
  return {
    type: C.REQUEST_DIRECT_INBOX_SUCCESS,
    payload,
  }
};

export function* fetchDirectInbox({ payload }) {
  try {
    const resp = yield call(() => directInboxRequest(payload));
    const data = yield resp.json();
    yield put(receivedDirectInboxAC(data));
  } catch (error) {
    console.log(error);
  }
};

export function* watchDirectInbox() {
  yield debounce(500, C.REQUEST_DIRECT_INBOX, fetchDirectInbox);
};