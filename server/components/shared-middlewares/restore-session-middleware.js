const { DirectService } = require('../direct/direct-service');
const { ThreadsDirectService } = require('../threads/threads-service');
const { ThreadsDirectBroadcastService } = require('../threads/threads-service');
const { UserAuthService } = require('../user/user-service');

const services = {
  ThreadsDirectBroadcastService,
  ThreadsDirectService,
  UserAuthService,
  DirectService
};

exports.restoreSession = (service) => async (req, res, next) => {
  const { account } = req.auth;
  await services[service]._restoreSession(account);
  next();
};