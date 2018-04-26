import React, { PureComponent } from 'react';
import { intlShape } from 'react-intl';
import { Link } from 'react-router-dom';

import messages from './messages';

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
            <Link to="/login">{'Login'}</Link>
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
