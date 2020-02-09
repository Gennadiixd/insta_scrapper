const express = require('express');
const router = express.Router();
const { getUser, getDirectChatNextPage, getDirectInbox, getDirectPending, sendDirectMessage } = require('../controllers/insta')

router.get('/user', getUser);
router.get('/direct-inbox', getDirectInbox);
router.get('/direct-chat', getDirectChatNextPage);
router.get('/direct-pending', getDirectPending);
router.get('/direct-send-message', sendDirectMessage);


module.exports = router;