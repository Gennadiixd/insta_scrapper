import * as C from './consts';
import { fromJS } from "immutable";

const initState = fromJS({
  loading: false,
  error: false,
  initState: true,
  user: {},
});

const user = (state = initState, action) => {
  const { type, payload } = action;
  console.log(payload)
  switch (type) {
    case C.REQUEST_USER_SUCCESS:
      return state
        .setIn(['userId'], payload.userId)
    default:
      return state;
  }
}

export default user;