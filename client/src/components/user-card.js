import Avatar from './avatar';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export default function UserCard({ avatarUrl, children, onClick }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={onClick}>
      <ListItem button>
        <Avatar avatarUrl={avatarUrl} />
        <ListItem variant="body2" component="p" >
          {children}
        </ListItem>
      </ListItem>
    </Card>
  );
}