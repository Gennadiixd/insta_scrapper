const { monadEither } = require('../../utils/monad-either');
const { createConversation } = require('./direct-helpers');
const {
  igError,
  feedNameError,
  feedItemsError,
  directInboxError,
} = require('./direct-errors');

exports.directMixin = (service) => ({
  ...service,

  _getThreadsFromFeed: async (feed) => await feed.items(),

  async _getFeed(feedName) {
    return monadEither(this._getIg())
      .either(igError, this._getUserId)
      .flatEither(feedNameError, (userId) => this._getIg().feed[feedName](userId))
  },

  async getDirectInboxFeed(account) {
    await this._restoreSession(account);
    const feed = await this._getFeed('directInbox');
    return monadEither(feed)
      .either(feedItemsError, this._getThreadsFromFeed)
      .flatEither(directInboxError, async (threads) => createConversation(await threads));
  },
});