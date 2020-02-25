import React from 'react';
import Message from './message';
import Pagination from './pagination';
import List from '@material-ui/core/List';

let id = 0;

export default function DirectMessages({
  onRequestNextPage,
  messages,
  myId
}) {

  return (
    <>
      <Pagination
        onRequestNextPage={onRequestNextPage}
      />
      {messages.map(
        (message) => (
          <List key={id++}>
            <Message
              isMyMessage={myId === message.userId}
            >
              {message.text}
              {/* <Date>{message.date}</Date> */}
            </Message>
          </List>
        ))}
    </>
  )
};