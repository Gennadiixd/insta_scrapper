import React from 'react';
import Message from './message';
import Date from './date';

export default function Feed({ feed }) {
  console.log(feed)
  return (
    <div className='col-9'>
      {feed.chat && feed.chat.map((message) => (
        <Message
          key={message.date + message.text}
          currentUserId={feed.currentUserId}
          messageUserId={message.userId}
          isYours={feed.loggedInUserId === message.userId}
        >
          <p>{message.text}</p>
          <Date>{message.date}</Date>
        </Message>
      ))}
    </div>
  )
}
