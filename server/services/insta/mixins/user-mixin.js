const { monadEither } = require('../../../helpers/monad-either');
const {
  userError,
} = require('../errors.js');

exports.userMixin = (service) => ({
  ...service,

  async getUser() {
    const ig = await this.getIg();
    return (monadEither(ig))
      .flatEither(userError, this._getUserId)
  },
});