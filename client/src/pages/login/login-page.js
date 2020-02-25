import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from './styles';
import LoginForm from './login-form';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function LoginPage({ userLoginAC }) {
  const token = Cookies.get('t');

  const classes = useStyles();
  const onSubmit = (payload) => userLoginAC(payload);
  return (
    <>
      {token && (
        <Redirect to={{ pathname: '/' }} />
      )}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <LoginForm
            onSubmit={onSubmit}
          />
        </div>
      </Container>
    </>
  );
}