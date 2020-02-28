import React from 'react';
import { registerOnMessageCallback, onSendMessage } from './config';
import useInitWS from '../hooks/use-init-ws';

export default function WSProvider({ children, ...props }) {
  const WSContext = React.createContext({});
  WSProvider.Context = WSContext;
  useInitWS();

  React.useEffect(() => {
    registerOnMessageCallback(console.log);
  }, [registerOnMessageCallback]);

  return (
    <WSContext.Provider
      value={{
        registerOnMessageCallback,
        onSendMessage
      }}
    >
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { ...props })
      })}
    </WSContext.Provider>
  )
};