import React from 'react';
import UserCard from './user-card';

export default function Sidebar({ items, children, onClickCard }) {
  return (
    <div className="card">
      <h4 className="card-header">{children}</h4>
      <ul className="list-group">
        {items.map((item) => (
          <UserCard
            avatarUrl={item.avatarUrl}
            key={item.userName}
            onClick={() => onClickCard(item.userName)}
          >
            <li>{item.userName}</li>
            <li>{item.fullName}</li>
          </UserCard>
        ))}
      </ul>
    </div>
  )
}
