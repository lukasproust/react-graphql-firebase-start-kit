import React, { PureComponent } from 'react';
import { intlShape } from 'react-intl';
import { Link } from 'react-router-dom';

import messages from './messages';
import LogoutButton from '../LogoutButton';

class Dashboard extends PureComponent {
  state = {};

  render() {
    console.log('render dashboard');
    const { intl: { formatMessage } } = this.context;

    return (
      <div>
        {formatMessage(messages.welcome)}
        <ul>
          <li>
            <Link to="/">{'Test redirection /'}</Link>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    );
  }
}

Dashboard.contextTypes = {
  intl: intlShape.isRequired,
};

export default Dashboard;
