const { ThreadsDirectBroadcastService } = require('../threads-service');

exports.threadDirectBroadcast = (req, res, next) => {
  const { userName, message } = req.body;

  ThreadsDirectBroadcastService
    .broadcastDirectMessage(userName, message)
    .then((isSend) => res.json({ isSend }))
    .catch(next)
};