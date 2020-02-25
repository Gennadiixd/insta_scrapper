import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    width: `calc(100% - ${drawerWidth}px)`,
  },
}));

export default function PermanentDrawerRight({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <List>
          {React.Children.map(children, (child) => (
            <ListItemText>
              {child}
            </ListItemText>
          ))}
        </List>
      </main>
    </div>
  );
}