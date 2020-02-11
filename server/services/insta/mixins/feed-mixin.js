const { monadEither } = require('../../../helpers/monad-either');
const { createConversation } = require('../../../helpers/insta-helpers');
const {
  igError,
  feedNameError,
  feedItemsError,
  directInboxError,
} = require('../errors.js');

exports.feedMixin = (service) => ({
  ...service,

  _getThreadsFromFeed: async (feed) => await feed.items(),

  async _getFeed(feedName) {
    const ig = await this.getIg();
    return monadEither(ig)
      .either(igError, this._getUserId)
      .flatEither(feedNameError, (userId) => ig.feed[feedName](userId))
  },

  async getDirectThreadsConversations() {
    const feed = await this._getFeed('directInbox');
    return monadEither(feed)
      .either(feedItemsError, this._getThreadsFromFeed)
      .flatEither(directInboxError, async (threads) => createConversation(await threads));
  },
});