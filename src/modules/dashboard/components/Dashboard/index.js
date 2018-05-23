import React, { Fragment } from 'react';

import UserContext from 'shared/components/UserContext';

const Dashboard = () => (
  <UserContext.Consumer>
    {user => (
      <Fragment>
        {console.log('user connected on dashboard', user, user.currentUser)}
        {'content dashboard'}
      </Fragment>
    )}
  </UserContext.Consumer>
);

export default Dashboard;
