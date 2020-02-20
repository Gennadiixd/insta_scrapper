const { UserLoginService } = require('./user-service');
const { UserAuthService } = require('./user-service');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
  const { account, password } = req.query;

  UserLoginService
    .login(account, password)
    .then((userId) => {
      const token = jwt.sign({ userId, account }, process.env.JWT_SECRET);
      res.cookie('t', token, { expire: new Date() + 9999 });
      res.json({ userId });
    })
    .catch(next)
};

exports.auth = (req, res, next) => {
  const { account } = req.query;
  
  return UserAuthService
    .checkSession(account)
    .then((userId) => res.json({ userId }))
    .catch(next)
};