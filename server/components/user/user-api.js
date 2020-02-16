const express = require('express');
const router = express.Router();
const { login } = require('./user-controllers');

router.get('/login', login);

module.exports = router;