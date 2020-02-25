import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  root: ({ isMyMessage }) => ({
    minWidth: 100,
    marginBottom: '5px',
    textAlign: isMyMessage && 'right',
    background: isMyMessage && 'linear-gradient(90deg, rgba(250,250,250,1) 0%, rgba(224,224,224,1) 100%)',
    padding: '7px',
  }),
});

export default function Message({ children, isMyMessage }) {
  const classes = useStyles({ isMyMessage });

  return (
    <ListItemText className={classes.root}>
      {children}
    </ListItemText>
  );
}