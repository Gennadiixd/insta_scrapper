const { createConversation } = require('../helpers/insta-helpers');
const { generateIg } = require('./insta-session');
const { either } = require('../helpers/utils');

const createInstaService = (account, password) => ({
  ig: null,
  async getIg() {
    return await either(
      async () => this.ig = await generateIg(account, password),
      async (ig) => ig,
      this.ig
    )
  },

  async getUserId() {
    const ig = await this.getIg();
    return ig.state.cookieUserId;
  },

  async getFeed(feedName) {
    const ig = await this.getIg();
    const userId = await this.getUserId();
    return ig.feed[feedName](userId);
  },

  async getInboxItems(feed) {
    const items = await feed.items();
    const userId = await this.getUserId();
    return createConversation(items, userId);
  },

  async getDirectInbox() {
    const feed = await this.getFeed('directInbox');
    return this.getInboxItems(feed);
  },

  async getDestinationId(userName) {
    const ig = await this.getIg();
    const userId = await ig.user.getIdByUsername(userName);
    return userId.toString();
  },

  async getDirectTread(destinationId) {
    const ig = await this.getIg();
    const thread = ig.entity.directThread([destinationId]);
    return thread;
  },

  async sendDirectMessage() {
    const destinationId = await this.getDestinationId('vassa_alisa');
    const thread = await this.getDirectTread(destinationId);
    await thread.broadcastText('Test');
  },

  getDirectPendingPage: ((feed) => async (page) => {
    if (!feed) feed = await getDirectPending(account, password);
    const items = await feed.feed.items();
    return items;
  })(),

})

module.exports = { createInstaService };