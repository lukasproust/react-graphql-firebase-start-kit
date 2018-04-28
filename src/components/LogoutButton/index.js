import React from 'react';
import { intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

import fakeAuth from 'tools/fakeAuth';

import messages from './intl';

const LogoutButton = ({ history }, { intl }) => (
  <RaisedButton
    label={intl.formatMessage(messages.logout)}
    onClick={() => fakeAuth.signout(() => history.push('/'))}
    primary
  />
);

LogoutButton.contextTypes = {
  intl: intlShape.isRequired,
};

export default withRouter(LogoutButton);
