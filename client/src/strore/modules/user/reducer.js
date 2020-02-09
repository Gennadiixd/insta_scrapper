import * as C from './consts';
import { fromJS } from "immutable";

const initState = fromJS({
  loading: false,
  error: false,
  initState: true,
  direct: {},
});

const user = (state = initState, action) => {
  const { type, payload } = action;
  console.log(payload)
  switch (type) {
    case C.REQUEST_USER_SUCCESS:
      return state
        .setIn(['directInbox'], payload.directInboxFeed.directInbox)
        .setIn(['companions'], payload.directInboxFeed.companions)
        .setIn(['threads_ids'], payload.directInboxFeed.threads_ids)
    default:
      return state;
  }
}

export default user;