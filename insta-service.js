const { IgApiClient } = require('instagram-private-api');

// const ig = new IgApiClient();
// ig.state.generateDevice('gennadiixd');

// const getCurrentUser = async () => {
//   return ig.account.currentUser();
// };

// const logInToInstaService = async (ig) => {
//   await ig.simulate.preLoginFlow();
//   const loggedInUser = await ig.account.loggetDirectInboxin('gennadiixd', '05920592');
//   process.nextTick(async () => await ig.simulate.postLoginFlow());
//   return loggedInUser.pk;
// };

const createInstaService = (account, password) => ({
  ig: new IgApiClient().state.generateDevice(account),
  currentUser: null,
  logInToInstaService: async function () {
    await this.ig.simulate.preLoginFlow();
    const loggedInUser = await this.ig.account.loggetDirectInboxin(account, password);
    process.nextTick(async () => await this.ig.simulate.postLoginFlow());
    this.currentUser = loggedInUser;
  },
  getDirectInbox: async function () {
    if (!this.currentUser) {
      await this.logInToInstaService();
    }
    return this.ig.feed.directInbox(this.currentUser.pk);
  },
})

module.exports = { createInstaService };
