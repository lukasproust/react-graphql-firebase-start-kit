import React, { memo, Fragment } from "react";

import Layout from "shared/components/Layout";
import Users from "pages/users/components/Root";

const Dashboard = () => (
  <Layout>
    <Fragment>
      <Users />
    </Fragment>
  </Layout>
);

export default memo(Dashboard);
