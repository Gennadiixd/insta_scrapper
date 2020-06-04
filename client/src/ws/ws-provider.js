import React from 'react';
import useInitWS from '../hooks/use-init-ws';

export default function WSProvider({ children, ...props }) {
  const WSContext = React.createContext({});
  WSProvider.Context = WSContext;
  const [ws, WSSend, WSOnMessage] = useInitWS();

  // React.useEffect(() => {
  //   WSOnMessage(console.log);
  // }, [WSOnMessage]);

  return (
    <WSContext.Provider
      value={{
        WSOnMessage,
        WSSend
      }}
    >
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { ...props })
      })}
    </WSContext.Provider>
  )
};