const { createInstaService } = require('../services/insta/insta-service');

exports.getDirectChatNextPage = (req, res) => {
  console.log(req)


};

exports.getUser = (req, res) => {
  const account = process.env.ACCOUNT;
  const password = process.env.PASSWORD;
  const instaService = createInstaService(account, password);
  instaService.getUser()
    .then((userId) => res.json({ userId }))
    .catch((err) => console.log(err))
};

exports.getDirectInbox = (req, res) => {
  // const { account, password } = req.body;
  const account = process.env.ACCOUNT;
  const password = process.env.PASSWORD;
  const instaService = createInstaService(account, password);
  instaService.getDirectInbox()
    .then((directInboxFeed) => res.json({ directInboxFeed }))
    .catch((err) => console.log(err))
};

exports.getDirectPending = (req, res) => {
  const account = process.env.ACCOUNT;
  const password = process.env.PASSWORD;
  const instaService = createInstaService(account, password);
  instaService.getDirectPendingPage()
    .then((feed) => res.json({ feed }))
    .catch((err) => console.log(err))
};

exports.sendDirectMessage = (req, res) => {
  const account = process.env.ACCOUNT;
  const password = process.env.PASSWORD;
  const instaService = createInstaService(account, password);
  instaService.sendDirectMessage()
    .then((feed) => res.json({ feed }))
    .catch((err) => console.log(err))
};


