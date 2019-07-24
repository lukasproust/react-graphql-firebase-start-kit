import React, { memo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { intlShape, InjectedIntl } from 'react-intl';

import PrivateRoute from 'shared/components/PrivateRoute';
import Layout from 'shared/components/Layout';
import NoMatch404 from 'shared/components/NoMatch404';

import { ROUTES } from 'pages/users/routes';

import List from '../List';
import Detail from '../Detail';

import messages from './intl';

const Users: React.FC = (
  _,
  { intl: { formatMessage } }: { intl: InjectedIntl },
) => (
  <Layout pageTitle={formatMessage(messages.pageTitle)}>
    <Switch>
      <Redirect exact from={ROUTES.HOME} to={ROUTES.USER_LIST} />
      <PrivateRoute exact path={ROUTES.USER_LIST} component={List} />
      <PrivateRoute exact path={ROUTES.USER_DETAIL} component={Detail} />
      <Route component={NoMatch404} />
    </Switch>
  </Layout>
);

Users.contextTypes = {
  intl: intlShape.isRequired,
};

export default memo(Users);
