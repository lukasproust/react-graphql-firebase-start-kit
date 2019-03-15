import React, { Fragment } from "react";

import UserContext from "shared/components/UserContext";

const Dashboard = () => (
  <UserContext.Consumer>
    {user => (
      <Fragment>
        {`content dashboard ${user.currentUser && user.currentUser.email}`}
        <button type="button" onClick={() => user.signOut()}>
          {"signout"}
        </button>
      </Fragment>
    )}
  </UserContext.Consumer>
);

export default Dashboard;
