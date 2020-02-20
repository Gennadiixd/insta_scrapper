import * as M from './models';
const { getIn } = require('immutable');

export const conversationsSelector = (state) => {
  const conversations = getIn(state, ['direct', 'directInbox'], M.conversations);
  return conversations;
};

export const companionsSelector = (state) => {
  const companions = getIn(state, ['direct', 'companions'], M.conversations);
  return companions;
};

export const threadsIdsSelector = (state) => {
  const companions = getIn(state, ['direct', 'threads_ids'], M.conversations);
  return companions;
};

// export const threadsSelector = (state) => {
//   const companions = getIn(state, ['direct', 'companions'], M.conversations);
//   return companions;
// };