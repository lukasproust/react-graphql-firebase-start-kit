import React, { PureComponent } from "react";
import { intlShape } from "react-intl";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import AppBarMaterial from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";

import fakeAuth from "tools/fakeAuth";

import globalMessages from "config/intl";
import messages from "./intl";
import styles from "./styles";

class AppBar extends PureComponent {
  state = {
    anchorEl: undefined,
    mobileMoreAnchorEl: undefined
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleDisconnect = () => {
    const { history } = this.props;
    fakeAuth.signout(() => history.push("/"));
  };

  handleGoHome = () => {
    const { history } = this.props;
    history.push("/");
  };

  render() {
    const {
      /* sidebarVisibility, */
      setSidebarVisibility,
      classes
    } = this.props;
    const {
      intl: { formatMessage }
    } = this.context;
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    return (
      <div className={classes.root}>
        <AppBarMaterial position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              onClick={() => setSidebarVisibility}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
              onClick={this.handleGoHome}
            >
              {formatMessage(globalMessages.appName)}
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder={formatMessage(messages.search)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <Badge
                  className={classes.margin}
                  badgeContent={4}
                  color="secondary"
                >
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge
                  className={classes.margin}
                  badgeContent={17}
                  color="secondary"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton onClick={this.handleProfileMenuOpen} color="inherit">
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBarMaterial>
        {/* RIGHT MENU */}
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleClose}>
            {formatMessage(messages.profile)}
          </MenuItem>
          <MenuItem onClick={this.handleDisconnect}>
            {formatMessage(messages.logout)}
          </MenuItem>
        </Menu>
        {/* LEFT MENU */}
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}
        >
          <MenuItem>
            <IconButton color="inherit">
              <Badge
                className={classes.margin}
                badgeContent={4}
                color="secondary"
              >
                <MailIcon />
              </Badge>
            </IconButton>
            <p>{formatMessage(messages.messages)}</p>
          </MenuItem>
          <MenuItem>
            <IconButton color="inherit">
              <Badge
                className={classes.margin}
                badgeContent={11}
                color="secondary"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>{formatMessage(messages.notifications)}</p>
          </MenuItem>
          <MenuItem onClick={this.handleProfileMenuOpen}>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <p>{formatMessage(messages.profile)}</p>
          </MenuItem>
        </Menu>{" "}
      </div>
    );
  }
}

AppBar.contextTypes = {
  intl: intlShape.isRequired
};

AppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(AppBar));
