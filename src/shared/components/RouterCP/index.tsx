import React, { memo } from 'react';
import { Router } from 'react-router-dom';

import browserHistory from 'helpers/route/browserHistory';

interface Props {
  children: React.ReactNode;
}

const RouterComponent: React.FC<Props> = ({ children }) => (
  <Router history={browserHistory}>{children}</Router>
);

export default memo(RouterComponent);
