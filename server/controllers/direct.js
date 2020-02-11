const { instaChatServise, instaFeedServise } = require('../services/insta/insta-service');


exports.getDirectThreadNextPage = (req, res, next) => {
  // const { threadId } = req.params;
  console.log(req.query)
  // instaChatServise
    // .getDirectChatNextPage(threadId)
    // .then((directChat) => res.json({ directChat }))
    // .catch((err) => console.log(err))
};

exports.getDirectInboxThreads = (req, res) => {
  instaFeedServise
    .getDirectThreadsConversations()
    .then((directInboxThreads) => res.json({ directInboxThreads }))
    .catch((err) => console.log(err))
};





exports.getDirectPending = (req, res) => {
  // const account = process.env.ACCOUNT;
  // const password = process.env.PASSWORD;
  // const instaService = createInstaService(account, password);
  // instaService.getDirectPendingPage()
  //   .then((feed) => res.json({ feed }))
  //   .catch((err) => console.log(err))
};

exports.sendDirectMessage = (req, res) => {
  // const account = process.env.ACCOUNT;
  // const password = process.env.PASSWORD;
  // const instaService = createInstaService(account, password);
  // instaService.sendDirectMessage()
  //   .then((feed) => res.json({ feed }))
  //   .catch((err) => console.log(err))
};


