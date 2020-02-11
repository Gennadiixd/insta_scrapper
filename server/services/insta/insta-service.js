const { generateIg } = require('./insta-session');
const { monadEither } = require('../../helpers/monad-either');
const { userMixin } = require('./mixins/user-mixin');
const { feedMixin } = require('./mixins/feed-mixin');
const { chatMixin } = require('./mixins/chat-mixin');

const account = process.env.ACCOUNT;
const password = process.env.PASSWORD;

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

const InstaService = {
  _ig: null,
  getIg() {
    return monadEither(this._ig)
      .flatEither(async () => {
        this._ig = await generateIg(account, password);
        return this._ig;
      })
  },
  _getUserId: (ig) => ig.state.cookieUserId,
};

const instaFeedServise = feedMixin(InstaService);
const instaUserServise = userMixin(InstaService);
const instaChatServise = chatMixin(InstaService);

module.exports = { instaUserServise, instaFeedServise, instaChatServise };