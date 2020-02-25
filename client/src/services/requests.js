import { API } from '../config';

const postParams = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    "Content-Type": 'application/json'
  },
  withCredentials: true,
};

const getParams = {
  mode: 'cors',
  credentials: 'include'
};

export const directInboxRequest = async (token) => (
  fetch(`${API}/direct/feed-inbox`,
    {
      ...getParams,
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
);

export const directChatRequest = async (account, password) => (
  fetch(`${API}/insta/direct-chat`)
);

export const login = async (account, password) => (
  fetch(
    `${API}/user/login?account=${account}&password=${password}`,
    { ...getParams }
  )
);

export const nextPageThreadRequest = async ({ payload }) => {
  const { threadId, pageNumber } = payload;
  console.log('\x1b[36m', payload)
  return fetch(
    `${API}/direct/next-page?threadId=${threadId}&pageNumber=${pageNumber}`,
    { ...getParams }
  )
}
