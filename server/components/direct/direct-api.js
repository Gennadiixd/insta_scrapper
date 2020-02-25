const express = require('express');
const router = express.Router();
const { getFeedInbox } = require('./direct-controllers');
const { requireJwt } = require('../shared-middlewares/jwt-middleware');
const { restoreSession } = require('../shared-middlewares/restore-session-middleware');

router.get(
  '/feed-inbox',
  requireJwt,
  restoreSession('DirectService'),
  getFeedInbox
);

module.exports = router;