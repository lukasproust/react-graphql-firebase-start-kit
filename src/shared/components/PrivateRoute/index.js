import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import UserContext from 'shared/components/UserContext';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    {({ currentUser }) => (
      <Route
        {...rest}
        render={props => {
          console.log(currentUser);
          return currentUser ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }}
      />
    )}
  </UserContext.Consumer>
);

export default PrivateRoute;
