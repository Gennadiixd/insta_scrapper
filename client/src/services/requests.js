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

export const directInboxRequest = async (account, password) => (
  fetch(`${API}/direct/inbox-threads`)
);

export const directChatRequest = async (account, password) => (
  fetch(`${API}/insta/direct-chat`)
);

export const userRequest = async (account, password) => (
  fetch(`${API}/user`)
);

export const nextPageThreadRequest = async ({ payload }) => {
  const { threadId, pageNumber } = payload;
  console.log('\x1b[36m', payload)
  return fetch(
    `${API}/direct/next-page?threadId=${threadId}&pageNumber=${pageNumber}`,
    { ...getParams }
  )
}
