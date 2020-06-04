import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function UserAvatar({ avatarUrl }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt="User photo" src={avatarUrl} />
    </div>
  );
}
// function Avatar({ avatarUrl }) {
//   return (
//     <img
//       alt="Фото профиля"
//       src={avatarUrl}
//       style={{ 'borderRadius': '50%', 'width': '60px' }}
//     />
//   );
// }

// export default Avatar;