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
    withCredentials: true,
  }
};

const getRequestParams = (type, token) => {
  let params = paramsMap[type];
  if (token) params.headers = { ...params.headers, Authorization: `Bearer ${token}` }
  return params;
}

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

export const directChatRequest = async () => (
  fetch(`${API}/insta/direct-chat`)
);

export const nextPageThreadRequest = async (payload) => {
  const { threadId, threadsDirectState } = payload;
  return fetch(
    `${API}/threads/direct-page?threadId=${threadId}&threadsDirectState=${threadsDirectState}`,
    getRequestParams('get')
  )
}
