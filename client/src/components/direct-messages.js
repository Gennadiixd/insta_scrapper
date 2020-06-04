import React from 'react';
import Message from './message';
import List from '@material-ui/core/List';
import { Element, Events, animateScroll as scroll, scroller } from 'react-scroll';

export default function DirectMessages({
  messages,
  myId,
}) {
  return (
    <List >
      {messages.map(
        (message, i) => {
          let name = '';
          if (messages.length - 1 === i) {
            name = 'lastMessage';
          };
          if (i === 0) {
            name = 'firstMessage';
          };
          return (
            <Element
              name={name}
              key={message.text + message.userId + message.date}
            >
              <Message
                isMyMessage={myId === message.userId}
              >
                {message.text}
                {/* <Date>{message.date}</Date> */}
              </Message>
            </Element>
          )
        })}
    </List>
  );
};