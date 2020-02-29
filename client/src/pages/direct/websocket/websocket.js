const host = process.env.REACT_APP_API_URL;

export let send;
let onMessageCallback;
export const startWebsocketConnection = () => {
  const ws = new window.WebSocket('ws://' + 'localhost:4000' + '/chat') || {};
  ws.onopen = () => {
    console.log('opened ws connection');
  };
  ws.onclose = (e) => {
    console.log('close ws connection: ', e.code, e.reason);
  };
  ws.onmessage = (e) => {
    onMessageCallback && onMessageCallback(e.data);
  };
  send = ws.send.bind(ws)
};

export const WSOnMessage = (fn) => {
  onMessageCallback = fn;
};