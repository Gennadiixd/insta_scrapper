import { API } from '../config';

const fetchParams = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    "Content-Type": 'application/json'
  },
}

export const getFeed = async (account, password) => (
  fetch(`${API}/insta/direct-inbox`)
)