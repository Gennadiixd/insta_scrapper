import * as C from './consts';
import { fromJS } from "immutable";

const initState = fromJS({
  loading: false,
  error: false,
  initState: true,
  direct: {},
});

const direct = (state = initState, action) => {
  const { type, payload } = action;
  console.log(payload)
  switch (type) {
    case C.REQUEST_DIRECT_INBOX_SUCCESS:
      return state
        .setIn(['directInbox'], payload.directInboxFeed.directInbox)
        .setIn(['companions'], payload.directInboxFeed.companions)
        .setIn(['threads_ids'], payload.directInboxFeed.threads_ids)
    // .setIn(['error'], false)
    // .setIn(['initState'], false)
    // case C.GET_PICTURE_SUCCESS:
    //   return state
    //     .updateIn(['history'], arr => arr.push(fromJS(action.payload)))
    //     .setIn(['loading'], false)
    // case C.GET_PICTURE_FAIL:
    //   return state
    //     .setIn(['error'], true)
    //     .setIn(['loading'], false)
    // case C.REMOVE_HISTORY_ITEM:
    //   const { index } = action.payload;
    //   return state.deleteIn(['history', index])
    default:
      return state;
  }
}

export default direct;