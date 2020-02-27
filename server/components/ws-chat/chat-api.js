const express = require('express');
const router = express.Router();
const wsHandler = require('./chat-controller');
const { requireJwt } = require('../shared-middlewares/jwt-middleware');

router.ws(
  '/chat',
  wsHandler
);

module.exports = router;