const host = process.env.REACT_APP_API_URL.replace(/^http/, 'ws');

let send;
let onWSMessageReceived;

export const startWebsocketConnection = () => {
  const ws = new window.WebSocket(host + '/ws/chat');

  ws.onopen = () => {
    console.log('opened ws connection');
  }
  ws.onclose = (e) => {
    console.log('close ws connection: ', e.code, e.reason);
  }
  ws.onmessage = (e) => {
    onWSMessageReceived && onWSMessageReceived(e.data);
  }
  console.log('\x1b[36m', 'send init');

  send = ws.send.bind(ws);
};

export const onSendMessage = (message) => {
  send(message);
};

export const registerOnMessageCallback = (fn) => {
  onWSMessageReceived = fn;
};