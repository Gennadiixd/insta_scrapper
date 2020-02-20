const { monadEither } = require('../../utils/monad-either');
const { ThreadsDirectService } = require('../threads/threads-service');
const { ThreadsDirectBroadcastService } = require('../threads/threads-service');
const { UserAuthService } = require('../user/user-service');

const services = {
  ThreadsDirectService,
  ThreadsDirectBroadcastService,
  UserAuthService
};

exports.restoreSession = (service) => async (req, res, next) => {
  monadEither(req.auth)
    .either(
      () => res.status(403).json({ error: 'Authorization error, check your account' }),
      (auth) => auth.account
    ).either(
      () => res.status(403).json({ error: 'No session found' }),
      async (account) => await services[service]._restoreSession(account)
    ).either(
      () => res.status(403).json({ error: 'restore error' }),
      async (promise) => {
        await promise;
        next();
      }
    )
};