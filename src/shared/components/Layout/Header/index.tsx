import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import styles from "./styles";

interface Props extends WithStyles<typeof styles> {
  onDrawerToggle: () => void;
}

const Header: React.FC<Props> = ({ classes, onDrawerToggle }) => (
  <React.Fragment>
    <AppBar color="primary" position="sticky" elevation={0}>
      <Toolbar>
        <Grid container spacing={8} alignItems="center">
          <Hidden smUp>
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={onDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Hidden>
          <Grid item xs />
          <Grid item>
            <Link
              className={classes.link}
              variant="body2"
              href="http://github.com"
            >
              {"Go to github"}
            </Link>
          </Grid>
          <Grid item>
            <Tooltip title="Alerts • No alters">
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <IconButton color="inherit" className={classes.iconButtonAvatar}>
              <Avatar src="/static/images/avatar/1.jpg" />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <AppBar
      component="div"
      className={classes.secondaryBar}
      color="primary"
      position="static"
      elevation={0}
    >
      <Toolbar>
        <Grid container alignItems="center" spacing={8}>
          <Grid item xs>
            <Typography color="inherit" variant="h5">
              {"Users managment"}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <AppBar
      component="div"
      className={classes.secondaryBar}
      color="primary"
      position="static"
      elevation={0}
    >
      <Tabs value={0} textColor="inherit">
        <Tab textColor="inherit" label="Users" />
        <Tab textColor="inherit" label="Groups" disabled />
      </Tabs>
    </AppBar>
  </React.Fragment>
);

export default withStyles(styles)(Header);
