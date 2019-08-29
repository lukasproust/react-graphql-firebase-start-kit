import React from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';

import UserContext from 'shared/contexts/User';

interface Props {
  component:
    | React.ComponentType<RouteComponentProps<any>> // eslint-disable-line @typescript-eslint/no-explicit-any
    | React.ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const PrivateRoute: React.FC<Props & RouteProps> = ({
  component: Component,
  location,
  path,
  exact,
  sensitive,
  strict,
}) => (
  <UserContext.Consumer>
    {user => (
      <Route
        location={location}
        path={path}
        exact={exact}
        sensitive={sensitive}
        strict={strict}
        render={props =>
          user && user.currentUser ? (
            <Component {...props} /> // eslint-disable-line react/jsx-props-no-spreading
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    )}
  </UserContext.Consumer>
);

export default PrivateRoute;
