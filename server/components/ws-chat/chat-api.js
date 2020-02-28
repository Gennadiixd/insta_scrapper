const express = require('express');
const router = express.Router();
const { wsHandler } = require('./chat-controller');

router.ws(
  '/chat',
  wsHandler
);

module.exports = router;