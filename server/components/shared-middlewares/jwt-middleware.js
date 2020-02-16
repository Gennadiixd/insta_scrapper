const expressJwt = require('express-jwt');

exports.requireJwt = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});