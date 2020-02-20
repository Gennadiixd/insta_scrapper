const { IgApiClient } = require('instagram-private-api');
const { withRealtime } = require('instagram_mqtt');
const { getFromFile } = require('../utils/file-sys');

const InstaService = {
  _ig: null,

  _getIg(account) {
    if (this._ig) return this._ig;
    this._ig = withRealtime(new IgApiClient());
    this._ig.state.generateDevice(account);
    return this._ig;
  },

  async _restoreSession(account) {
    const session = await getFromFile(`session_${account}`);
    if (!session) return false;
    console.log('\x1b[36m', `session restored`);
    this._getIg(account).state.deserialize(session);
    return this._getIg();
  },

  _getUserId() {
    return this._ig.state.cookieUserId
  },
};

module.exports = InstaService;