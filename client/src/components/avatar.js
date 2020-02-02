import React from 'react';

function Avatar({ avatarUrl }) {
  return (
    <img
      alt="Фото профиля"
      src={avatarUrl}
      style={{ 'borderRadius': '50%', 'width': '60px' }}
    />
  );
}

export default Avatar;