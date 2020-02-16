const { DirectService } = require('./direct-service');

exports.getFeedInbox = (req, res) => {
  // if cookie restoreSession slse login
  const { account } = req.auth;

  DirectService
    .getDirectInboxFeed(account)
    .then((feed) => res.json({ feed }))
    .catch((err) => res.json({ err }))
};