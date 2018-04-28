import React, { PureComponent, Fragment } from 'react';
import { intlShape } from 'react-intl';
import { Link } from 'react-router-dom';

import Layout from 'components/shared/Layout';

import messages from './messages';

class Dashboard extends PureComponent {
  state = {};

  render() {
    console.log('render dashboard');
    const { intl: { formatMessage } } = this.context;

    return (
      <Layout>
        <Fragment>
          {formatMessage(messages.welcome)}
          <ul>
            <li>
              <Link to="/">{'Test redirection /'}</Link>
            </li>
          </ul>
        </Fragment>
      </Layout>
    );
  }
}

Dashboard.contextTypes = {
  intl: intlShape.isRequired,
};

export default Dashboard;
