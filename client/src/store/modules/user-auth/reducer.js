import * as C from './consts';
import { fromJS } from "immutable";

const initState = fromJS({
  loading: false,
  error: false,
  initState: true,
  userId: undefined,
});

const userProfile = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case C.USER_LOGIN_SUCCESS:
      return state
        .setIn(['userId'], payload.userId)
    default:
      return state;
  }
};

export default userProfile;