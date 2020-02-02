const express = require('express');
const router = express.Router();
const { getDirectInbox, getDirectPending } = require('../controllers/feed')

router.get('/direct-inbox', getDirectInbox);
router.get('/direct-pending', getDirectPending);


module.exports = router;