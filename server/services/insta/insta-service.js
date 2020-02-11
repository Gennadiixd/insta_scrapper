const { createConversation } = require('../../helpers/insta-helpers');
const { generateIg } = require('./insta-session');
const { monadEither } = require('../../helpers/monad-either');

const igError = (ig) => { throw new Error(`Expecting ig from getIg method but got => ${ig}`) };
const feedNameError = (feedName) => { throw new Error(`Check feedName! => ${feedName}`) };
const feedItemsError = () => { throw new Error(`Could not get feed items`) };
const directInboxError = (err) => { throw new Error(`Could not get direct inbox items`) };

const getDirectThreadById = () => {

};

const getUserId = (ig) => ig.state.cookieUserId;
// getting threads from feed
const getThreads = (ig) => async (feed) => {
  const threads = await feed.items();
  //
  // const feedState = feed.serialize();
  // console.log(feed)
  // const thread_id = first10[0].thread_id;
  // console.log(thread_id)

  // const directThread = await ig.feed.directThread({ thread_id: THREAD_ID });
  // console.log(directThread);

  // const firstPage = await directThread.items()
  // const secondPage = await directThread.items()

  // console.log(firstPage)
  // console.log(secondPage)



  // console.log(directThread);
  // await saveToFile('feed', feedState);
  // console.log(firstPage);
  // getFromFile(`feed`)


  // const secondPage = await directThread.items()
  // console.log(firstPage);
  // console.log(secondPage);

  //
  return threads;
}

const createInstaService = (account, password) => ({
  _ig: null,
  get ig() {
    return monadEither(this._ig)
      .flatEither(() => generateIg(account, password))
    // if (this._ig) return this._ig;
    // else return generateIg(account, password, withRealtime);
  },

  async _getFeed(feedName) {
    const ig = await this.ig;
    return (monadEither(ig)
      .either(igError, getUserId)
      .either(feedNameError, (userId) => ig.feed[feedName](userId))
      .flatEither(feedItemsError, getThreads(ig)));
  },

  _getThreadsFromFeed: async (feed) => await feed.items(),

  async _getDestinationId(userName) {
    const ig = await generateIg();
    const userId = await ig.user.getIdByUsername(userName);
    return userId.toString();
  },

  async getUser() {
    const ig = await this.ig;
    return (monadEither(ig))
      .flatEither(igError, getUserId)
  },

  async getDirectInbox() {
    const feedItems = await this._getFeed('directInbox');
    return monadEither(feedItems)
      .flatEither(directInboxError, createConversation);
  },

  async getDirectChat() {

  },

  async sendDirectMessage() {
    const destinationId = await this._getDestinationId('vassa_alisa');
    const thread = await this.getDirectTread(destinationId);
    await thread.broadcastText('Knock Knock, cat');
  },
})

module.exports = { createInstaService };