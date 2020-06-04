import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';

export default function CheckboxRemember({ value, onChange }) {
  return (
    <Checkbox
      value={value}
      color="primary"
      onChange={onChange}
      name='remember'
      id='remember'
    />
  )
};