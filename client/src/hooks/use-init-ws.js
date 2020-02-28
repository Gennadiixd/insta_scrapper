import React from 'react'
import Cookies from 'js-cookie';
import * as uuidGenerator from 'react-uuid';
import { startWebsocketConnection } from '../ws/config';

function setUUIDToLocalStorage(uuid) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('uuid', JSON.stringify(uuid))
  }
}

function getUUIDFromLocalStorage() {
  if (typeof window == 'undefined') {
    return uuidGenerator();
  };
  const formStorage = localStorage.getItem('uuid');
  if (formStorage) {
    return JSON.parse(formStorage);
  } else {
    const uuid = uuidGenerator();
    setUUIDToLocalStorage(uuid);
    return uuid;
  };
};

export default function useInitWS() {
  const token = Cookies.get('t');
  const [WS, setWS] = React.useState(null);
  React.useEffect(() => {
    if (token && !WS) {
      const uuid = getUUIDFromLocalStorage();
      setWS(startWebsocketConnection(uuid));
    };
  }, [token, WS]);
  return [WS];
};