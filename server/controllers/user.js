const { instaUserServise } = require('../services/insta/insta-service');

exports.getUser = (req, res) => {
  instaUserServise
    .getUser()
    .then((userId) => res.json({ userId }))
    .catch((err) => console.log(err))
};