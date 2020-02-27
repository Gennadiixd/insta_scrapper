import React from 'react';
import { registerOnMessageCallback, onSendMessage } from './config';

export default function WSProvider({ children }) {
  const WSContext = React.createContext({});
  WSProvider.Context = WSContext;

  return (
    <WSContext.Provider
      value={{
        registerOnMessageCallback,
        onSendMessage
      }}
    >
      {children}
    </WSContext.Provider>
  )
};