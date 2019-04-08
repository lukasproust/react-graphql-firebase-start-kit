import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

import Navigator from "./Navigator";
import Header from "./Header";
import { DRAWER_WIDTH } from "./constants";
import styles from "./styles";

const Layout = ({ children, classes }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline /> {/* it's like normalize.css */}
      <nav className={classes.drawer}>
        <Hidden smUp implementation="js">
          <Navigator
            PaperProps={{ style: { width: DRAWER_WIDTH } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        <Hidden xsDown implementation="css">
          <Navigator PaperProps={{ style: { width: DRAWER_WIDTH } }} />
        </Hidden>
      </nav>
      <div className={classes.appContent}>
        <Header onDrawerToggle={handleDrawerToggle} />
        <main className={classes.mainContent}>{children}</main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default memo(withStyles(styles)(Layout));
