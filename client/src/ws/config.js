const host = process.env.REACT_APP_API_URL.replace(/^http/, 'ws');

let send;
let onWSMessageReceived;

export const startWebsocketConnection = (uuid) => {
  const ws = new window.WebSocket(`${host}/ws/chat?uuid=${uuid}`);

  ws.onopen = () => {
    console.log('opened ws connection');
    startWebsocketConnection.isOpen = true;
  };
  ws.onclose = (e) => {
    console.log('close ws connection: ', e.code, e.reason);
  };
  ws.onmessage = (e) => {
    onWSMessageReceived && onWSMessageReceived(e.data);
  };
  send = ws.send.bind(ws);
  return ws;
};

export const onSendMessage = (message) => {
  send(message);
};

export const registerOnMessageCallback = (fn) => {
  onWSMessageReceived = fn;
};