const { getFromFile } = require('../../../utils/file-sys');
const { logEvent } = require('../../../utils/loggers');

exports.userAuthMixin = (service) => ({
  ...service,

  async checkSession(account) {
    await this._restoreSession(account);
    return this._getUserId();
  }

});