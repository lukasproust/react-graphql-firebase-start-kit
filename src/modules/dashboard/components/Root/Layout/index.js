import React, { useState, memo, Fragment } from "react";
import PropTypes from "prop-types";

import AppBar from "shared/components/AppBar";
import Sidebar from "shared/components/Sidebar";
import Menu from "shared/components/Menu";
import routes from "../../../routes/root";

import css from "./styles.css";

const Layout = ({ children }) => {
  const [sidebarVisibility, setSidebarVisibility] = useState(false);

  return (
    <Fragment>
      <AppBar
        sidebarVisibility={sidebarVisibility}
        setSidebarVisibility={setSidebarVisibility}
      />
      <main className={css.contentWithSidebar}>
        <div className={css.content}>{children}</div>
        <Sidebar
          setSidebarVisibility={setSidebarVisibility}
          sidebarVisibility={sidebarVisibility}
        >
          <Menu items={routes} />
        </Sidebar>
      </main>
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default memo(Layout);
