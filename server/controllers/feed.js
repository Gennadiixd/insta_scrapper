const { createInstaService } = require('../services/insta-service');

exports.getDirectInbox = (req, res) => {
  // const { account, password } = req.body;
  const account = process.env.ACCOUNT;
  const password = process.env.PASSWORD;
  const instaService = createInstaService(account, password);
  instaService.getDirectInbox()
    .then((feed) => res.json({ feed }))
    .catch((err) => console.log(err))
}

exports.getDirectPending = (req, res) => {
  // const { account, password } = req.body;
  const account = process.env.ACCOUNT;
  const password = process.env.PASSWORD;
  const instaService = createInstaService(account, password);
  instaService.getDirectPendingPage()
    .then((feed) => res.json({ feed }))
    .catch((err) => console.log(err))
}

