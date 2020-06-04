import { API } from '../config';

const paramsMap = {
  get: {
    mode: 'cors',
    credentials: 'include'
  },
  post: {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json'
    },
    body: {

    },
    withCredentials: true,
  }
};

const getRequestParams = (type, token, body) => {
  let params = paramsMap[type];
  if (token) params.headers = { ...params.headers, Authorization: `Bearer ${token}` };
  if (body) params.body = JSON.stringify({ ...body });
  return params;
};

export const login = async (account, password) => (
  fetch(
    `${API}/user/login?account=${account}&password=${password}`,
    getRequestParams('get')
  )
);

export const auth = async (token) => (
  fetch(
    `${API}/user/auth`,
    getRequestParams('get', token)
  )
);

export const directInboxRequest = async (token) => (
  fetch(
    `${API}/direct/feed-inbox`,
    getRequestParams('get', token)
  )
);

export const nextPageThreadRequest = async (payload) => {
  const { threadId, threadsDirectState } = payload;
  return fetch(
    `${API}/threads/direct-page?threadId=${threadId}&threadsDirectState=${threadsDirectState}`,
    getRequestParams('get')
  )
};

export const directSendMessage = async (payload) => {
  const { token, userName, message } = payload;

  console.log('\x1b[36m', getRequestParams('post', token, { userName, message }));


  return fetch(
    `${API}/threads/direct-broadcast`,
    getRequestParams('post', token, { userName, message })
  )
};