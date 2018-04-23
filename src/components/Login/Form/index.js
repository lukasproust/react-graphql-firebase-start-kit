import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import { intlShape } from 'react-intl';

import messages from './messages';

class Form extends PureComponent {
  state = {};

  render() {
    const { intl: { formatMessage } } = this.context;

    return (
      <div>
        <TextField
          hintText={formatMessage(messages.emailHint)}
          floatingLabelText={formatMessage(messages.emailLabel)}
          floatingLabelFixed
        />
        <br />
        <TextField
          floatingLabelText={formatMessage(messages.passwordlHint)}
          hintText="&#8226;&#8226;&#8226;&#8226;&#8226;"
          type="password"
          floatingLabelFixed
        />
      </div>
    );
  }
}

Form.contextTypes = {
  intl: intlShape.isRequired,
};

export default Form;
