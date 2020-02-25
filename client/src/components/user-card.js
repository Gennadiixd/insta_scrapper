import Avatar from './avatar';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';

// const useStyles = makeStyles({
//   root: ({ isMyMessage }) => ({
//     minWidth: 100,
//     marginBottom: '5px',
//     background: isMyMessage && '#E1F5FE'

//   }),
//   message: {
//     padding: '10px',
//   },
// });

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  item: ({ isActive }) => ({
    background: isActive && '#EEEEEE'
  })
});

export default function UserCard({ avatarUrl, children, onClick, isActive }) {
  const classes = useStyles({ isActive });

  return (
    <ListItem button onClick={onClick} className={classes.item}>
      <Avatar avatarUrl={avatarUrl} />
      {children}
    </ListItem>
  );
}