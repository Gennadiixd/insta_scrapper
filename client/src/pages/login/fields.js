import React from 'react';
import TextField from '@material-ui/core/TextField';

export function AccountField({ value, onChange }) {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="account"
      label="Account"
      name="account"
      autoFocus
      onChange={onChange}
      value={value}
    />
  )
};

export function PasswordField({ value, onChange }) {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
      onChange={onChange}
      value={value}
    />
  )
};