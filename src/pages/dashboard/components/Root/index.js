import React, { memo, Fragment } from "react";
import { intlShape } from "react-intl";
import { Link } from "react-router-dom";

import Users from "modules/dashboard/components/Dashboard";
import Layout from "./Layout";

import messages from "./messages";

const Dashboard = (_, { intl: { formatMessage } }) => (
  <Layout>
    <Fragment>
      <Users />
    </Fragment>
  </Layout>
);

Dashboard.contextTypes = {
  intl: intlShape.isRequired
};

export default memo(Dashboard);
