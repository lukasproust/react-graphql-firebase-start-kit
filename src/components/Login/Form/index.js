import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

// emailLabel
// emailHint
// passwordlHint

class Form extends PureComponent {
  state = {};

  render() {
    console.log(this);
    return (
      <div>
        <FormattedMessage {...messages.emailLabel} />
        <TextField
          /* hintText={formatMessage(messages.emailHint)} */
          /* floatingLabelText={formatMessage(messages.emailLabel)} */
          floatingLabelFixed
        />
        <br />
        <TextField
          /* floatingLabelText={formatMessage(messages.passwordlHint)} */
          hintText="&#8226;&#8226;&#8226;&#8226;&#8226;"
          type="password"
          floatingLabelFixed
        />
      </div>
    );
  }
}

export default Form;
