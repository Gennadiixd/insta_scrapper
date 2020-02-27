// const connections = new Set();
const connections = {};
const jwt = require('express-jwt');

const jwtParams = {
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  getToken: (req) => req.cookies.t
};

const wsHandler = (ws, req) => {

  jwt(jwtParams)(req, {}, (err) => {
    if (err) return;
    connections[req.auth.userId] = ws;
  });

  ws.on('message', (message) => {
    connections[req.auth.userId].send(message);
  });

  ws.on('close', () => {
    connections.delete(ws)
  });
};

module.exports = wsHandler;