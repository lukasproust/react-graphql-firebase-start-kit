import React, { memo, Fragment } from "react";

import Layout from "shared/components/Layout";
import UsersComponent from "../Users";

const Users: React.FC = () => (
  <Layout>
    <Fragment>
      <UsersComponent />
    </Fragment>
  </Layout>
);

export default memo(Users);
