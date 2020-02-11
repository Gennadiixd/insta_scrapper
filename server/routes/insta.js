const express = require('express');
const router = express.Router();
const { getDirectThreadNextPage, getDirectInbox, getDirectPending, sendDirectMessage } = require('../controllers/insta')

router.get('/direct-inbox', getDirectInbox);
router.get('/direct-next-page/:threadId', getDirectThreadNextPage);
router.get('/direct-pending', getDirectPending);
router.get('/direct-send-message', sendDirectMessage);


module.exports = router;