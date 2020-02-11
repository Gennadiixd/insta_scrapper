import React, { useState } from 'react';
import Message from './message';
import Pagination from './pagination';

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
          <Message
            key={message.date + message.text}
          // isMyMessage={myId == message.userId}
          >
            {message.text}
            {/* <Date>{message.date}</Date> */}
          </Message>
        ))}
    </>
  )
};