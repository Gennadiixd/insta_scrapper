import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  root: ({ isMyMessage }) => ({
    minWidth: 100,
    marginBottom: '5px',
    background: isMyMessage && '#E1F5FE'

  }),
  message: {
    padding: '10px',
  },
});

export default function Message({ children, isMyMessage }) {
  const classes = useStyles({ isMyMessage });

  return (
    <ListItemText className={classes.root}>
      {children}
    </ListItemText>
  );
}