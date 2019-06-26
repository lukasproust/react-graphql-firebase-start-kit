import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import UserContext from "shared/contexts/User";

interface Props {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<Props & RouteProps> = ({
  component: Component,
  ...rest
}) => (
  <UserContext.Consumer>
    {user => (
      <Route
        {...rest}
        render={props =>
          user && user.currentUser ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )}
  </UserContext.Consumer>
);

export default PrivateRoute;
