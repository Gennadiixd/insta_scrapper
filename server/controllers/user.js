const { createInstaService } = require('../services/insta/insta-service');

exports.getUser = (req, res) => {
  const account = process.env.ACCOUNT;
  const password = process.env.PASSWORD;
  const instaService = createInstaService(account, password);
  instaService.getUser()
    .then((userId) => res.json({ userId }))
    .catch((err) => console.log(err))
};