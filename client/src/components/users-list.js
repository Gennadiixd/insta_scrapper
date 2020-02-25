import React from 'react';
import UserCard from './user-card';

export default function UsersList({ users, onClick, currentThreadId }) {
  return (
    users.map((user) => (
      user.thread_id ?
        (
          <UserCard
            key={user.thread_id}
            avatarUrl={user.profile_pic_url}
            onClick={() => onClick(user.thread_id)}
            isActive={currentThreadId === user.thread_id}
          >
            {user.full_name}
          </UserCard>
        )
        : null
    ))
  )
}
