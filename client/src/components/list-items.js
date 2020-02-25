import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import EmailIcon from '@material-ui/icons/Email';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop } from '@material-ui/core';

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

const ListItems = ({ }) => {
  const classes = useStyles();

  return listMap.map((listElement) => (
    <NavLink
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
    {/* <NavLink to="/" style={{ 'display': 'flex' }} exact>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </NavLink>

    <NavLink to="/direct" style={{ 'display': 'flex' }} exact>
      <ListItem button>
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText primary="Direct" />
      </ListItem>
    </NavLink>

    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem> */}
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