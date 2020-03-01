import * as C from './consts';
import { fromJS } from "immutable";

const initState = fromJS({
  loading: false,
  error: false,
  initState: true,
  direct: {},
  pages: {}
});

const direct = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case C.REQUEST_DIRECT_INBOX_SUCCESS:
      return state
        .setIn(['directInbox'], payload.feed.directInbox)
        .setIn(['companions'], payload.feed.companions)
        .setIn(['threads_ids'], payload.feed.threads_ids)
    case C.REQUEST_DIRECT_NEXT_PAGE_SUCCESS:
      return state
        .updateIn(['directInbox', payload.threadId, 'chat'], arr =>
          payload.items.concat(arr))
        .mergeDeepIn(['pages', payload.threadId], { state: payload.state })
    case C.DIRECT_SEND_MESSAGE_SUCCESS:
      return state
        .updateIn(['directInbox', payload.threadId, 'chat'], arr =>
          arr.concat(payload.message))
    // .mergeDeepIn(['pages', payload.threadId], { state: payload.state })
    // .updateIn(['pages', payload.threadId, 'items'], arr => arr)

    // .setIn(['directInbox'], payload.feed.directInbox)
    // .setIn(['companions'], payload.feed.companions)
    // .setIn(['threads_ids'], payload.feed.threads_ids)
    // return state
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
};

export default direct;