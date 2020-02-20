const { getFromFile } = require('../../../utils/file-sys');

exports.userAuthMixin = (service) => ({
  ...service,

  async checkSession(account) {
    await getFromFile(`session_${account}`);
    return this._getUserId();
  }

});