import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';

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
    <Card className={classes.root}>
      <CardContent className={classes.message}>
        <Typography variant="body2" component="p">
          {children}
        </Typography>
      </CardContent>
    </Card>
  );
}