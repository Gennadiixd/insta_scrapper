const { getIn } = require('immutable');

export const userIdSelector = (state) =>
  getIn(state, ['userAuth', 'userId']);