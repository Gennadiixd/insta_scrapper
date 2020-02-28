import React from 'react'
import Cookies from 'js-cookie';
import * as uuidGenerator from 'react-uuid';
import { startWebsocketConnection, onSendMessage, registerOnMessageCallback } from '../ws/config';

let timerId;
function keepAlive(ws) {
  const timeout = 20000;
  if (ws.readyState == ws.OPEN) {
    ws.send('');
  };
  timerId = setTimeout(() => keepAlive(ws), timeout);
};

function cancelKeepAlive() {
  if (timerId) {
    clearTimeout(timerId);
  }
};

export default function useInitWS() {
  const token = Cookies.get('t');
  const [WS, setWS] = React.useState(null);
  React.useEffect(() => {
    if (token && !WS) {
      const uuid = uuidGenerator();
      const ws = startWebsocketConnection(uuid);
      keepAlive(ws);
      setWS(ws);
    };
  }, [token, WS]);
  return [WS, onSendMessage, registerOnMessageCallback, cancelKeepAlive];
};