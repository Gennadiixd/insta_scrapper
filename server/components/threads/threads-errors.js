const igError = (ig) => {
  console.trace();
  throw new Error(`Expecting ig from getIg method but got => ${ig}`)
};
const feedNameError = (feedName) => {
  console.trace(feedName);
  throw new Error(`Check feedName! => ${feedName}`)
};
const feedItemsError = () => {
  console.trace('feedItemsError');
  throw new Error(`Could not get feed items`)
};
const directInboxError = (err) => {
  console.trace(err);
  throw new Error(`Could not get direct inbox items`)
};
// const userError = (err) => { throw new Error(`Could not get user id`) };

module.exports = {
  directInboxError,
  feedItemsError,
  feedNameError,
  // userError,
  igError,
};
