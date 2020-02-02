import React from 'react';

export default function Message({ isYours, children, currentUserId, messageUserId }) {
  const style = isYours ? { 'background': 'grey' } : {};
  return (
    <div style={style}>
      {children}
    </div>
  )
}
