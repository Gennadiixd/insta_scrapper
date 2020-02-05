const { createConversation } = require('../helpers/insta-helpers');
const { generateIg } = require('./insta-session');
const { either, asyncPipe } = require('../helpers/utils');
const { asyncMonadEither } = require('../helpers/monad-either');

const createInstaService = (account, password) => ({
  monadIg: asyncMonadEither(null),
  ig: null,
  async getIg() {
    return await this.monadIg.asyncEither(
      async () => await generateIg(account, password),
      async (ig) => ig,
      () => this.ig
    );
  },

  async getUserId() {
    const fromIg = await this.getIg()
    fromIg.asyncEither(
      async (ig) => { throw new Error('Expecting ig from getIg method but got', ig) },
      async (ig) => ig.state.cookieUserId,
      (ig) => ig.state.cookieUserId
    );
    console.log(fromIg)
    // return await asyncPipe(
    //   this.getIg,
    //   (ig) => ig.state.cookieUserId
    // )();
  },

  async getFeed(feedName) {
    console.log('GETTING IG');
    const ig = await this.getIg();
    console.log('GETTING USER ID');
    const userId = await this.getUserId();
    return ig.feed[feedName](userId);
  },

  async getInboxItems(feed) {
    const userId = await this.getUserId();
    const items = await feed.items();
    return createConversation(items, userId);
  },

  async getDirectInbox() {
    return await asyncPipe(
      this.getFeed.bind(this),
      this.getInboxItems.bind(this)
    )('directInbox');
  },

  async getDestinationId(userName) {
    return await asyncPipe(
      this.getIg,
      (ig) => ig.user.getIdByUsername(userName),
      (userId) => userId.toString()
    )();
  },

  async getDirectTread(destinationId) {
    return await asyncPipe(
      this.getIg,
      (ig) => ig.entity.directThread([destinationId]),
    )();
  },

  async sendDirectMessage() {
    const destinationId = await this.getDestinationId('vassa_alisa');
    const thread = await this.getDirectTread(destinationId);
    await thread.broadcastText('Knock Knock, cat');
  },

  getDirectPendingPage: ((feed) => async (page) => {
    if (!feed) feed = await getDirectPending(account, password);
    const items = await feed.feed.items();
    return items;
  })(),

})

module.exports = { createInstaService };