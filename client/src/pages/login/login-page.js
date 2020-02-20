import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Formik } from 'formik';
import { useStyles } from './styles';
import { AccountField, PasswordField } from './fields';
import CheckboxRemember from './checkbox-remember';

export default function LoginPage() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Formik
          initialValues={{ account: '', password: '', remember: false }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, values, isSubmitting, handleChange }) => (
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit}
            >
              <AccountField
                onChange={handleChange}
                value={values.account}
              />
              <PasswordField
                onChange={handleChange}
                value={values.password}
              />
              <FormControlLabel
                control={
                  <CheckboxRemember
                    onChange={handleChange}
                    value={values.remember}
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                Submit
               </Button>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
}