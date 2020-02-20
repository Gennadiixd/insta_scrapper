import * as C from './consts';
import { fromJS } from "immutable";

const initState = fromJS({
  loading: false,
  error: false,
  initState: true,
  user: {},
});

const userProfile = (state = initState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case C.REQUEST_USER_SUCCESS:
      return state
        .setIn(['userInstaId'], payload.userId)
    default:
      return state;
  }
};

export default userProfile;