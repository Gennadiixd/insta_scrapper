import React from 'react';

function useBoolean(value) {
  const [boolean, setBoolean] = React.useState(value);

  const setTrue = () => setBoolean(true);
  const setFalse = () => setBoolean(false);
  const toggle = () => setBoolean(!boolean);

  return [boolean, setTrue, setFalse, toggle];
}

export default useBoolean;