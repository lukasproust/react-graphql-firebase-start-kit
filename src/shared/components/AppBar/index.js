import React, { useState, memo, useContext } from "react";
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

import UserContext from "shared/components/UserContext";

import globalMessages from "config/intl";
import messages from "./intl";
import styles from "./styles";

const AppBar = (
  { history, setSidebarVisibility, classes },
  { intl: { formatMessage } }
) => {
  const [anchorEl, setAnchorEl] = useState();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState();
  const user = useContext(UserContext);

  const handleProfileMenuOpen = event => setAnchorEl(event.currentTarget);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event =>
    setMobileMoreAnchorEl(event.currentTarget);

  const handleDisconnect = () => {
    if (user) {
      user.signOut().then(() => history.push("/"));
    }
  };

  const handleGoHome = () => history.push("/");

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
            onClick={handleGoHome}
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
            <IconButton onClick={handleProfileMenuOpen} color="inherit">
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton onClick={handleMobileMenuOpen} color="inherit">
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
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {}}>
          {formatMessage(messages.profile)}
        </MenuItem>
        <MenuItem onClick={handleDisconnect}>
          {formatMessage(messages.logout)}
        </MenuItem>
      </Menu>
      {/* LEFT MENU */}
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
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
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>{formatMessage(messages.profile)}</p>
        </MenuItem>
      </Menu>
    </div>
  );
};

AppBar.contextTypes = {
  intl: intlShape.isRequired
};

AppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default memo(withRouter(withStyles(styles)(AppBar)));
