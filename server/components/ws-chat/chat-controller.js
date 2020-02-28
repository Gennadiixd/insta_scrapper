// const connections = new Set();
const connections = {};
const jwt = require('express-jwt');

const jwtParams = {
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  getToken: (req) => req.cookies.t
};

function wsHandler(ws, req) {
  // console.log('\x1b[36m', req.cookies);
  console.log('\x1b[36m', req.auth);
  
  connections[req.auth.userId] = ws;
  
  ws.on('message', (message) => {
    console.log('\x1b[36m', message);
    
    connections[req.auth.userId].send(message);
  });

  ws.on('close', (req) => {
    delete connections[req.auth.userId];
  });

  wsHandler.WSSend = (userId) => {
    if (connections[userId]) {
      return connections[userId].send.bind(connections[userId]);
    }
  };
};

module.exports = { wsHandler };