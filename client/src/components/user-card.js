import React from 'react';
import Avatar from './avatar';

export default function UserCard({ avatarUrl, children, onClick }) {
  return (
    <li
      className="list-group-item"
      onClick={onClick}
    >
      <Avatar avatarUrl={avatarUrl} />
      <ul style={{ 'padding': '0' }}>
        {children}
      </ul>
    </li>
  )
}
