import React from 'react';

function useBoolean(value) {
  const [boolean, setBoolean] = React.useState(value);

  const setTrue = () => !boolean && setBoolean(true);
  const setFalse = () => boolean && setBoolean(false);
  const toggle = () => setBoolean(!boolean);

  return [boolean, setTrue, setFalse, toggle];
}

export default useBoolean;