const express = require('express');
const router = express.Router();
const { getThreadDirectPage } = require('./threads-controllers/thread-direct-page-controller');
const { threadDirectBroadcast } = require('./threads-controllers/thread-direct-broadcast-controller');
const { requireJwt } = require('../shared-middlewares/jwt-middleware');
const { restoreSession } = require('../shared-middlewares/restore-session-middleware');
const { runtimeErrorHandler } = require('../shared-middlewares/runtime-error-handler');

router.get('/direct-page', requireJwt, restoreSession('ThreadsDirectService'), getThreadDirectPage, runtimeErrorHandler);

router.post('/direct-broadcast', requireJwt, restoreSession('ThreadsDirectBroadcastService'), threadDirectBroadcast);

module.exports = router;