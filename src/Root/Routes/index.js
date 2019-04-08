import React, { lazy, Suspense } from "react";

import { Route, Redirect, Switch } from "react-router-dom";

import Router from "shared/components/router/Router";
import NoMatch404 from "shared/components/NoMatch404";
import PrivateRoute from "shared/components/PrivateRoute";
import Loader from "shared/components/Loader";

// const Dashboard = lazy(() => import("modules/dashboard/components/Root"));
const Users = lazy(() => import("pages/users/components/Root"));
const Login = lazy(() => import("shared/components/Login"));

const Routes = () => (
  <Router>
    <Suspense fallback={<Loader />}>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/users" component={Users} />
        {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
        <Route component={NoMatch404} />
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
