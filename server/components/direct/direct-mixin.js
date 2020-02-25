const { createConversation } = require('./direct-helpers');
const { asyncPipe } = require('../../utils/pipes');

exports.directMixin = (service) => ({
  ...service,

  _getThreadsFromFeed: async (feed) => await feed.items(),

  async _getFeed(feedName) {
    const userId = this._getUserId(this._ig);
    return await this._ig.feed[feedName](userId);
  },

  async getDirectInboxFeed() {
    return asyncPipe(
      this._getFeed.bind(this),
      this._getThreadsFromFeed,
      async (threads) => createConversation(await threads)
    )('directInbox');
  },
});