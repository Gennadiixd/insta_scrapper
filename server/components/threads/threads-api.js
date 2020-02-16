const express = require('express');
const router = express.Router();
const { getThreadDirectPage } = require('./threads-controllers/thread-direct-page-controller');
const { requireJwt } = require('../shared-middlewares/jwt-middleware');

router.get('/direct-page', requireJwt, getThreadDirectPage);

module.exports = router;