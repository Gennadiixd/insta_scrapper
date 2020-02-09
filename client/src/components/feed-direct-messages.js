import React, { useState } from 'react';
import Message from './message';
import Pagination from './pagination';

export default function FeedDirectMessages({ messages }) {

  console.log(messages)

  return (
    <>
      <Pagination

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