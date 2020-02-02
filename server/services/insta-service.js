const { generateIg, createConversation } = require('../helpers/instaService');

const createInstaService = (account, password) => ({
  ig: null,
  getIg: () => {
    if (!this.ig) this.ig = generateIg(account);
    return this.ig;
  },

  loggedInUser: null,
  async getLoggedInUser() {
    if (!this.loggedInUser) {
      const ig = this.getIg();
      await ig.simulate.preLoginFlow();
      this.loggedInUser = await ig.account.login(account, password);
      process.nextTick(async () => await ig.simulate.postLoginFlow());
    }
    return this.loggedInUser;
  },

  async getFeed(feedName) {
    const user = await this.getLoggedInUser();
    return this.getIg().feed[feedName](user.pk);
  },

  async getInboxItems(feed, loggedInUserId) {
    const items = await feed.items();
    return createConversation(items, loggedInUserId);
  },

  async getDirectInbox() {
    const feed = await this.getFeed('directInbox');
    const loggedInUser = await this.getLoggedInUser();
    return this.getInboxItems(feed, loggedInUser.pk);
  },

  getDirectPendingPage: ((feed) => async (page) => {
    if (!feed) feed = await getDirectPending(account, password);
    const items = await feed.feed.items();
    return items;
  })(),

})

module.exports = { createInstaService };