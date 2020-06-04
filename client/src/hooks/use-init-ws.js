import React from 'react'
import Cookies from 'js-cookie';
import * as uuidGenerator from 'react-uuid';
import { startWebsocketConnection, WSSend, WSOnMessage } from '../ws/config';

export default function useInitWS() {
  const token = Cookies.get('t');
  const [WS, setWS] = React.useState(null);
  React.useEffect(() => {
    if (token && !WS) {
      const uuid = uuidGenerator();
      const ws = startWebsocketConnection(uuid);
      setWS(ws);
    };
  }, [token, WS]);
  return [WS, WSSend, WSOnMessage];
};