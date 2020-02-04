const express = require('express');
const router = express.Router();
const { getDirectInbox, getDirectPending, sendDirectMessage } = require('../controllers/feed')

router.get('/direct-inbox', getDirectInbox);
router.get('/direct-pending', getDirectPending);
router.get('/direct-send-message', sendDirectMessage);


module.exports = router;