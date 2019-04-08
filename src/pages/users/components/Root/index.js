import React, { memo, Fragment } from "react";
import { intlShape } from "react-intl";

import Layout from "shared/components/Layout";
import UsersComponent from "../Users";

const Users = () => (
  <Layout>
    <Fragment>
      <UsersComponent />
    </Fragment>
  </Layout>
);

Users.contextTypes = {
  intl: intlShape.isRequired
};

export default memo(Users);
