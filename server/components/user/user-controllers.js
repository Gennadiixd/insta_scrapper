const { UserService } = require('./user-service');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  // if cookie restoreSession slse login
  const { account, password } = req.query;

  UserService
    .login(account, password)
    .then((userId) => {
      const token = jwt.sign({ userId, account }, process.env.JWT_SECRET);
      res.cookie('t', token, { expire: new Date() + 9999 });
      res.json({ userId });
    })
    .catch((err) => res.json({ err }))
};