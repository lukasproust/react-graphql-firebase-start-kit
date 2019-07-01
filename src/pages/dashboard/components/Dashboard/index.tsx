import React, { Fragment } from "react";

import UserContext from "shared/contexts/User";

const Dashboard = () => (
  <UserContext.Consumer>
    {user => (
      <Fragment>
        {`User signed ${user.currentUser && user.currentUser.email}`}
      </Fragment>
    )}
  </UserContext.Consumer>
);

export default Dashboard;
