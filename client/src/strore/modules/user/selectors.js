import * as M from './models';
const { getIn } = require('immutable');

export const conversationsSelector = (state) => {
  const conversations = getIn(state, ['direct', 'directInbox'], M.conversations);
  return conversations;
};
