import React, { useContext, Fragment } from "react";
import { intlShape } from "react-intl";
import { Link } from "react-router-dom";
import UserContext from "shared/components/UserContext";

import DashboardComponent from "modules/dashboard/components/Dashboard";
import Layout from "./Layout";

import messages from "./messages";

const Dashboard = (_, { intl: { formatMessage } }) => {
  const user = useContext(UserContext);

  return (
    <Layout>
      <Fragment>
        {formatMessage(messages.welcome)}
        <ul>
          <li>
            <Link to="/">{"Test redirection /"}</Link>
          </li>
        </ul>
        <button
          type="button"
          onClick={() => {
            user.signOut();
          }}
        >
          {"signOut test"}
        </button>
        <DashboardComponent />
      </Fragment>
    </Layout>
  );
};

Dashboard.contextTypes = {
  intl: intlShape.isRequired
};

export default Dashboard;
