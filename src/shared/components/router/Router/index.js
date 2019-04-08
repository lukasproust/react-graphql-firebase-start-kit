import React, { memo } from "react";
import { Router } from "react-router-dom";

import browserHistory from "shared/helpers/route/browserHistory";

const RouterComponent = ({ children }) => (
  <Router history={browserHistory}>{children}</Router>
);

export default memo(RouterComponent);
