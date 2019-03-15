import React, { lazy, Fragment } from "react";

import PrivateRoute from "shared/components/PrivateRoute";

const Dashboard = lazy(() => import("modules/dashboard/components/Root"));

const PrivateRoutes = () => (
  <Fragment>
    <PrivateRoute path="/dashboard" component={Dashboard} />
  </Fragment>
);

export default PrivateRoutes;
