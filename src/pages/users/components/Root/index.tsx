import React, { memo, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { IntlContext } from 'react-intl';

import PrivateRoute from 'shared/components/PrivateRoute';
import Layout from 'shared/components/Layout';
import NoMatch404 from 'shared/components/NoMatch404';

import { ROUTES } from 'pages/users/routes';

import List from '../List';
import Edition from '../Edition';

import messages from './intl';

const Users: React.FC = () => {
  const { formatMessage } = useContext(IntlContext);
  return (
    <Layout pageTitle={formatMessage(messages.pageTitle)}>
      <Switch>
        <Redirect exact from={ROUTES.HOME} to={ROUTES.USER_LIST} />
        <PrivateRoute exact path={ROUTES.USER_LIST} component={List} />
        <PrivateRoute exact path={ROUTES.USER_EDIT} component={Edition} />
        <Route component={NoMatch404} />
      </Switch>
    </Layout>
  );
};

export default memo(Users);
