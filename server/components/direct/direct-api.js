const express = require('express');
const router = express.Router();
const { getFeedInbox } = require('./direct-controllers');
const { requireJwt } = require('../shared-middlewares/jwt-middleware');

router.get('/feed-inbox', requireJwt, getFeedInbox);

module.exports = router;