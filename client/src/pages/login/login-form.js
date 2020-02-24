import React from 'react';
import { Formik } from 'formik';
import { AccountField, PasswordField } from './fields';
import CheckboxRemember from './checkbox-remember';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';

export default function LoginForm({ onSubmit: submit }) {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ account: '', password: '', remember: false }}
      onSubmit={(values) => {
        submit(values, null, 2);
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
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  )
}


