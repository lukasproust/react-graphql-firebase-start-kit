import React from "react";
import { Route, Redirect } from "react-router-dom";

import UserContext from "shared/components/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    {user => (
      <Route
        {...rest}
        render={props => {
          return user && user.currentUser ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        }}
      />
    )}
  </UserContext.Consumer>
);

export default PrivateRoute;
