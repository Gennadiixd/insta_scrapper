import React, { useState } from 'react';
import Message from './message';
import Pagination from './pagination';
import List from '@material-ui/core/List';

export default function DirectMessages({
  messages,
  onRequestNextPage,
}) {

  return (
    <>
      <Pagination
        onRequestNextPage={onRequestNextPage}
      />
      {messages.map(
        (message) => (
          <List>
            <Message
              key={message.date + message.text}
            // isMyMessage={myId == message.userId}
            >
              {message.text}
              {/* <Date>{message.date}</Date> */}
            </Message>
          </List>
        ))}
    </>
  )
};