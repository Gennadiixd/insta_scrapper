const express = require('express');
const router = express.Router();
const { getDirectThreadNextPage, getDirectInboxThreads, getDirectPending, sendDirectMessage } = require('../controllers/direct')

router.get('/inbox-threads', getDirectInboxThreads);
router.get('/next-page', getDirectThreadNextPage);
router.get('/pending', getDirectPending);
router.get('/send-message', sendDirectMessage);


module.exports = router;