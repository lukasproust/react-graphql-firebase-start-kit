import React from 'react';
import TextField from 'material-ui/TextField';

const Form = () => (
  <div>
    <TextField
      hintText="Hint Text"
      floatingLabelText="Fixed Floating Label Text"
      floatingLabelFixed
    />
    <br />
    <TextField
      hintText="Password Field"
      floatingLabelText="Password"
      type="password"
    />
  </div>
);

export default Form;
