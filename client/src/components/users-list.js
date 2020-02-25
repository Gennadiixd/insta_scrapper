import React from 'react';
import UserCard from './user-card';
import List from '@material-ui/core/List';


export default function UsersList({ users, onClick, currentThreadId }) {
  return (
    users.map((user) => (
      <UserCard
        avatarUrl={user.profile_pic_url}
        onClick={() => onClick(user.thread_id)}
        isActive={currentThreadId === user.thread_id}
      >
        {user.full_name}
      </UserCard>
    ))
  )
}
