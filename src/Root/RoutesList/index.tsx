import React, { lazy, Suspense } from "react";

import { Route, Redirect, Switch } from "react-router-dom";

import Router from "shared/components/RouterCP";
import NoMatch404 from "shared/components/NoMatch404";
import PrivateRoute from "shared/components/PrivateRoute";
import Loader from "shared/components/Loader";

import { ROUTES as LOGIN_ROUTES } from "pages/login/routes";

const Users = lazy(() => import("pages/users/components/Root"));
const Login = lazy(() => import("pages/login/components/Root"));

const Routes: React.FC = () => (
  <Router>
    <Suspense fallback={<Loader />}>
      <Switch>
        {/* Redirect by default on Login component, he managed the redicrection alone if user is connected -> */}
        <Redirect exact from="/" to={LOGIN_ROUTES.HOME} />
        <Route exact path={LOGIN_ROUTES.HOME} component={Login} />
        <PrivateRoute path="/users" component={Users} />
        <Route component={NoMatch404} />
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
