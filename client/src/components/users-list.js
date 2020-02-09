import React from 'react';
import UserCard from './user-card';

export default function UsersList({ users, onClick }) {
  return (
    users.map((user) => (
      <UserCard
        avatarUrl={user.profile_pic_url}
        onClick={() => onClick(user.thread_id)}
      >
        {user.full_name}
      </UserCard>
    ))
  )
}
