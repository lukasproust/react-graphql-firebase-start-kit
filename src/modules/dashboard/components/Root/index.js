import React, { memo, Fragment } from "react";
import { intlShape } from "react-intl";
import { Link } from "react-router-dom";

import DashboardComponent from "modules/dashboard/components/Dashboard";
import Layout from "./Layout";

import messages from "./messages";

const Dashboard = (_, { intl: { formatMessage } }) => (
  <Layout>
    <Fragment>
      {formatMessage(messages.welcome)}
      <ul>
        <li>
          <Link to="/">{"Test redirection to /"}</Link>
        </li>
      </ul>
      <DashboardComponent />
    </Fragment>
  </Layout>
);

Dashboard.contextTypes = {
  intl: intlShape.isRequired
};

export default memo(Dashboard);
