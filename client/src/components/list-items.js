import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EmailIcon from '@material-ui/icons/Email';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  link: {
    display: 'flex',
    color: 'black'
  },
  activeLink: {
    color: 'blue',
    background: '#EEEEEE'
  }
}));

const listMap = [
  {
    to: "/",
    Icon: DashboardIcon,
    text: 'Dashboard'
  },
  {
    to: "/direct",
    Icon: EmailIcon,
    text: 'Direct'
  },
]

const ListItems = () => {
  const classes = useStyles();

  return listMap.map((listElement) => (
    <NavLink
      key={listElement.to}
      to={listElement.to}
      className={classes.link}
      exact
      activeClassName={classes.activeLink}
    >
      <ListItem button>
        <ListItemIcon>
          <listElement.Icon />
        </ListItemIcon>
        <ListItemText primary={listElement.text} />
      </ListItem>
    </NavLink>
  )
  )
}


export const mainListItems = (
  <div>
    <ListItems />
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);