const express = require('express');
const router = express.Router();
const { login, auth } = require('./user-controllers');
const { requireJwt } = require('../shared-middlewares/jwt-middleware');
const { restoreSession } = require('../shared-middlewares/restore-session-middleware');

router.get('/login', login);
router.get('/auth', requireJwt, restoreSession('UserAuthService'), auth);

module.exports = router;