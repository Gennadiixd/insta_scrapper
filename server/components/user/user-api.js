const express = require('express');
const router = express.Router();
const { login, auth } = require('./user-controllers');
const { requireJwt } = require('../shared-middlewares/jwt-middleware');
const { restoreSession } = require('../shared-middlewares/restore-session-middleware');
const { requireQueryParams } = require('../shared-middlewares/require-query-params');
const { loginErrorHandler } = require('./user-errors');

router.get(
  '/login',
  requireQueryParams('account', 'password'),
  login,
  loginErrorHandler
);

router.get(
  '/auth',
  requireJwt,
  restoreSession('UserAuthService'),
  auth
);

module.exports = router;