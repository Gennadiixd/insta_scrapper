const { ThreadsDirectService } = require('../threads-service');

exports.getThreadDirectPage = (req, res) => {
  // if cookie restoreSession slse login
  const { account } = req.auth;
  const { threadsDirectState, threadId } = req.query;

  ThreadsDirectService
    .getThreadDirectPage(threadId, threadsDirectState, account)
    .then((threadDirectPage) => res.json({ threadDirectPage }))
    .catch((err) => res.json({ err }))
};