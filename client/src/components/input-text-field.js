import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  form: {
    alignItems: 'center',
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(1),
    },
  },
  input: {
    width: '100%',
  },
  submit: {
    padding: '10px',
    maxHeight: '40px',
  }
}));

export default function InputTextField() {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={(values) => {
        console.log(values, null, 2);
      }}
    >
      {({ handleSubmit, values, isSubmitting, handleChange }) => (
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            id="message"
            name="message"
            label="message"
            multiline
            rowsMax="4"
            onChange={handleChange}
            value={values.message}
            className={classes.input}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
}