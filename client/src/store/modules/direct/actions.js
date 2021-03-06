import * as C from './consts';
import { directInboxRequest, nextPageThreadRequest, directSendMessage } from '../../../services/requests';
import { put, call, debounce } from "redux-saga/effects";
import { scrollToElement } from '../../../utils/scroll';

//receive message
export const directReceiveMessageAC = (payload) => {
  const { message: { thread_id, text, user_id } } = JSON.parse(payload);
  setImmediate(() => scrollToElement('containerElement', 'lastMessage'));
  return {
    type: C.DIRECT_RECEIVE_MESSAGE,
    payload: {
      threadId: thread_id,
      message: { text, userId: user_id }
    }
  }
};

//send message
export const directSendMessageAC = (payload) => {
  return {
    type: C.DIRECT_SEND_MESSAGE,
    payload
  }
};

export const directSendMessageSuccessAC = (payload) => {
  return {
    type: C.DIRECT_SEND_MESSAGE_SUCCESS,
    payload,
  }
};

export function* directSendMessageGenerator({ payload }) {
  const { threadId, message, userId } = payload;

  try {
    const resp = yield call(() => directSendMessage(payload));
    const data = yield resp.json();
    yield put(directSendMessageSuccessAC({
      threadId: threadId,
      message: [{ text: message, userId: userId }],
    }));
    yield call(() => scrollToElement('containerElement', 'lastMessage'));
  } catch (error) {
    console.log(error);
  }
};

export function* watchDirectSendMessage() {
  yield debounce(500, C.DIRECT_SEND_MESSAGE, directSendMessageGenerator);
};

// pagination
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

export function* directPagesGenerator({ payload }) {

  try {
    const resp = yield call(() => nextPageThreadRequest(payload));
    const data = yield resp.json();
    yield put(receivedDirectNextPageAC({ ...data, threadId: payload.threadId }));
    yield call(() => scrollToElement('containerElement', 'firstMessage'));
  } catch (error) {
    console.log(error);
  }
};

export function* watchDirectNextPage() {
  yield debounce(500, C.REQUEST_DIRECT_NEXT_PAGE, directPagesGenerator);
};

// direct inbox feed
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

export function* directInboxGenerator({ payload }) {
  try {
    const resp = yield call(() => directInboxRequest(payload));
    const data = yield resp.json();
    yield put(receivedDirectInboxAC(data));
  } catch (error) {
    console.log(error);
  }
};

export function* watchDirectInbox() {
  yield debounce(500, C.REQUEST_DIRECT_INBOX, directInboxGenerator);
};