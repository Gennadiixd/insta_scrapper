const jwt = require('express-jwt');
const cookieParser = require('cookie-parser');
const { pipeMiddleware } = require('../../utils/pipes');

const jwtParams = {
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  getToken: (req) => req.cookies.t
};

const verifyClient = ({ req }, done) => {
  const fromPipe = pipeMiddleware(cookieParser(), jwt(jwtParams))(req);
  fromPipe.then((error) => {
    if (error) done(false, 403, 'Not valid token');
    done(true);
  })
};

module.exports = { verifyClient };