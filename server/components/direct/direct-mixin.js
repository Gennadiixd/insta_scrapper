const { createConversation } = require('./direct-helpers');

exports.directMixin = (service) => ({
  ...service,

  _getThreadsFromFeed: async (feed) => await feed.items(),

  async _getFeed(feedName) {
    const userId = this._getUserId(this._ig);
    return await this._ig.feed[feedName](userId);
  },

  async getDirectInboxFeed() {
    const feed = await this._getFeed('directInbox');
    const threads = await this._getThreadsFromFeed(feed);
    return createConversation(threads);
  },
});