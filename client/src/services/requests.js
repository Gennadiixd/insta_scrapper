import { API } from '../config';

const fetchParams = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    "Content-Type": 'application/json'
  },
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
  return fetch(`${API}/direct/next-page?threadId=${threadId}&pageNumber=${pageNumber}`)
}
