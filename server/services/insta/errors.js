const igError = (ig) => { throw new Error(`Expecting ig from getIg method but got => ${ig}`) };
const feedNameError = (feedName) => { throw new Error(`Check feedName! => ${feedName}`) };
const feedItemsError = () => { throw new Error(`Could not get feed items`) };
const directInboxError = (err) => { throw new Error(`Could not get direct inbox items`) };
const userError = (err) => { throw new Error(`Could not get user id`) };

module.exports = {
  directInboxError,
  feedItemsError,
  feedNameError,
  userError,
  igError,
};
