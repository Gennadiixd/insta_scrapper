import { API } from '../config';

const fetchParams = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    "Content-Type": 'application/json'
  },
};

export const directInboxRequest = async (account, password) => (
  fetch(`${API}/insta/direct-inbox`)
);

export const directChatRequest = async (account, password) => (
  fetch(`${API}/insta/direct-chat`)
);

export const userRequest = async (account, password) => (
  fetch(`${API}/insta/user`)
);