const connections = new Set();
const jwt = require('express-jwt');

// exports.requireJwt = expressJwt({
//   secret: process.env.JWT_SECRET,
//   userProperty: "auth"
// });

// app.use(jwt({
//   secret: 'hello world !',
//   credentialsRequired: false,
//   getToken: function fromHeaderOrQuerystring(req) {
//     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//       return req.headers.authorization.split(' ')[1];
//     } else if (req.query && req.query.token) {
//       return req.query.token;
//     }
//     return null;
//   }
// }));

const wsHandler = (ws, req) => {
  connections.add(ws);
  console.log('=========================================');
  console.log('\x1b[36m', req.cookies.t);
  
  ws.on('connection', () => {
    console.log('\x1b[36m', 'connected');
  });

  ws.on('message', (message) => {
    jwt({
      secret: process.env.JWT_SECRET,
      getToken: () => req.cookies.t
    })(req, {}, (err) => console.log('\x1b[36m', err))
  });

  ws.on('close', () => {
    connections.delete(ws)
  });
};

module.exports = wsHandler;