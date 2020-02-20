const { asyncPipe } = require('../../../utils/pipes');

exports.threadDirectBroadcastMixin = (service) => ({
  ...service,

  async _getDestinationId(userName) {
    const userId = await this._ig.user.getIdByUsername(userName);
    return userId.toString();
  },

  _getIgEntity(directThread) {
    return async (destinationId) => {
      return this._ig.entity[directThread]([await destinationId]);
    }
  },

  _broadcastMessage(message) {
    return async function (threadPromise) {
      const thread = await threadPromise;
      await thread.broadcastText(message);
      return true;
    }
  },

  async broadcastDirectMessage(userName, message) {
    return asyncPipe(
      this._getDestinationId.bind(this),
      this._getIgEntity('directThread'),
      this._broadcastMessage(message)
    )(userName);
  },
});