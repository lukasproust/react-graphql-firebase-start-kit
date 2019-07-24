import React, { useState, memo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import Hidden from '@material-ui/core/Hidden';

import Navigator from './Navigator';
import Header from './Header';
import { DRAWER_WIDTH } from './constants';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  pageTitle: string;
}

const Layout: React.FC<Props> = ({ children, classes, pageTitle }) => {
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
            paperProps={{ style: { width: DRAWER_WIDTH } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        <Hidden xsDown implementation="css">
          <Navigator paperProps={{ style: { width: DRAWER_WIDTH } }} />
        </Hidden>
      </nav>
      <div className={classes.appContent}>
        <Header pageTitle={pageTitle} onDrawerToggle={handleDrawerToggle} />
        <main className={classes.mainContent}>{children}</main>
      </div>
    </div>
  );
};

export default memo(withStyles(styles)(Layout));
