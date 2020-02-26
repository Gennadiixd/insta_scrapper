import React from 'react';
import Message from './message';
import Pagination from './pagination';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import InputTextField from './input-text-field';
const useStyles = makeStyles(theme => ({
  chatContainer: {
    borderBottom: '2px solid white',
    overflowY: 'scroll',
    height: '450px',
  },
}));

let id = 0;

export default function DirectMessages({
  onRequestNextPage,
  moreAvailable,
  messages,
  myId,
}) {
  const classes = useStyles();

  return (
    <>
      <Pagination
        onRequestNextPage={onRequestNextPage}
        moreAvailable={moreAvailable}
      />
      <List className={classes.chatContainer}>
        {messages.map(
          (message) => (
            <Message
              isMyMessage={myId === message.userId}
              key={id++}
            >
              {message.text}
              {/* <Date>{message.date}</Date> */}
            </Message>
          ))}
      </List>
    </>
  )
};

