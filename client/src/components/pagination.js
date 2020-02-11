import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Pagination({ onRequestNextPage}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        size="small"
        className={classes.margin}
        onClick={onRequestNextPage}
      >
        Get older messages
      </Button>
    </div>
  );
}
