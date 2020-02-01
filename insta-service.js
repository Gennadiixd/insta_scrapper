const { IgApiClient } = require('instagram-private-api');
const { pipePromises, pipe, curry } = require('./utils');

const generateIg = (account) => {
  const ig = new IgApiClient();
  ig.state.generateDevice(account);
  return ig;
};

const getUser = ((loggedInUser) => async ({ account, password, ig }) => {
  if (!loggedInUser) {
    await ig.simulate.preLoginFlow();
    loggedInUser = await ig.account.login(account, password);
    process.nextTick(async () => await ig.simulate.postLoginFlow());
  }
  return { loggedInUser, ig };
})();

const getIg = ((ig) => ({ account, password }) => async () => {
  if (!ig) ig = generateIg(account);
  return { ig, account, password };
})();

const getFeed = async ({ loggedInUser, ig }) => ig.feed.directInbox(loggedInUser.pk);

const getItems = async (feed) => {
  const items = await feed.items();
  return items.reduce((accum, item) => {

    const conversation = {
      username: item.users[0].username,
      full_name: item.users[0].full_name,
      chat: item.items.reduce((accum, item) => {
        accum.push({
          text: item.text,
          date: new Date(1580557880052723 / 1000)
        });
        return accum;
      }, []),
      thread_id: item.thread_id
    };

    accum.push(conversation);
    return accum;
  }, []);
}

const getDirectFeed = (account, password) => (pipePromises(
  getIg({ account, password }),
  getUser,
  getFeed,
))();

const createInstaService = (account, password) => ({

  getDirectFeedPage: ((feed) => async (page) => {
    if (!feed) feed = await getDirectFeed(account, password);
    return getItems(feed);
  })(),

})

module.exports = { createInstaService };