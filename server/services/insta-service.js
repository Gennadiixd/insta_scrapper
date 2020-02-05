const { createConversation } = require('../helpers/insta-helpers');
const { generateIg } = require('./insta-session');
const { monadEither } = require('../helpers/monad-either');

const igError = (ig) => { throw new Error(`Expecting ig from getIg method but got => ${ig}`) };
const feedNameError = (feedName) => { throw new Error(`Check feedName! => ${feedName}`) };
const feedItemsError = () => { throw new Error(`Could not get feed items`) };
const directInboxError = (err) => { throw new Error(`Could not get direct inbox items`) };

const getUserId = (ig) => ig.state.cookieUserId;
const getFeedItems = (feed) => feed.items();

const createInstaService = (account, password) => ({
  getFeed: function (feedName) {
    return generateIg(account, password)
      .then(
        (ig) => (
          monadEither(ig)
            .either(
              igError,
              getUserId
            ).either(
              feedNameError,
              (userId) => ig.feed[feedName](userId)
            ).flatEither(
              feedItemsError,
              getFeedItems
            )
        )
      )
  },

  getDirectInbox: function () {
    return this.getFeed('directInbox')
      .then(
        (feedItems) => monadEither(feedItems)
          .flatEither(
            directInboxError,
            createConversation
          )
      )
  },
})

module.exports = { createInstaService };