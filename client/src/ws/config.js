const host = process.env.REACT_APP_API_URL.replace(/^http/, 'ws');

let connection;
let onWSMessageReceived;

let timerId;
function keepAlive(ws) {
  const timeout = 30000;
  if (timerId) {
    if (ws.readyState == ws.OPEN) {
      ws.send('keep_alive');
    };
  };
  timerId = setTimeout(() => keepAlive(ws), timeout);
};

function cancelKeepAlive() {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  };
};

function cancelNextKAMessage(ws) {
  if (timerId) {
    cancelKeepAlive();
    keepAlive(ws);
  };
};

export const startWebsocketConnection = (uuid) => {
  const ws = new window.WebSocket(`${host}/ws/chat?uuid=${uuid}`);

  ws.onopen = () => {
    console.log('opened ws connection');
    keepAlive(ws);
  };
  ws.onclose = (e) => {
    console.log('close ws connection: ', e.code, e.reason);
    cancelKeepAlive();
    setTimeout(() => { startWebsocketConnection(uuid) }, 60000);
  };
  ws.onmessage = (e) => {
    onWSMessageReceived && onWSMessageReceived(e.data);
    if (e.data !== 'keep_alive') {
      cancelNextKAMessage(ws);
    };
  };
  connection = ws;
  return ws;
};

export const WSSend = (message) => {
  if (connection.readyState == connection.OPEN) {
    connection.send(message);
  };
};

export const WSOnMessage = (fn) => {
  onWSMessageReceived = fn;
};