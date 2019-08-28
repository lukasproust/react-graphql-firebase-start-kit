import React, { useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IntlContext } from 'react-intl';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles, WithStyles } from '@material-ui/styles';

import getActiveRoute from 'helpers/route/getActiveRoute';
import getRouteWithParameters from 'helpers/route/getRouteWithParameters';
import UserContext from 'shared/contexts/User';

import { ROUTES as LOGIN_ROUTES } from 'pages/login/routes';
import { ROUTES as USERS_ROUTES } from 'pages/users/routes';

import messages from './intl';
import styles from './styles';

interface Props extends WithStyles<typeof styles>, RouteComponentProps {
  pageTitle: string;
  onDrawerToggle: () => void;
}

const Header: React.FC<Props> = ({
  classes,
  onDrawerToggle,
  history,
  pageTitle,
  location,
  match,
}) => {
  const { formatMessage } = useContext(IntlContext);
  const user = useContext(UserContext);
  const alerts: {}[] = [];
  const activeTabLink = getActiveRoute(USERS_ROUTES, location.pathname);

  const handleTabsChange = (_e: React.ChangeEvent<{}>, route: string) => {
    const nextRoute = getRouteWithParameters(route, match.params);
    if (nextRoute) history.push(nextRoute);
  };

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={8} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  onClick={onDrawerToggle}
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
                href="https://github.com/lukasproust/react-graphql-firebase-start-kit"
              >
                {formatMessage(messages.githubLink)}
              </Link>
            </Grid>
            <Grid item>
              <Tooltip
                title={
                  alerts.length > 0
                    ? formatMessage(messages.alerts, { number: alerts.length })
                    : formatMessage(messages.noAlerts)
                }
              >
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
              <IconButton color="inherit" className={classes.iconButtonAvatar}>
                <Avatar src="https://api.adorable.io/avatars/50/lukas.proust.pngCopy to Clipboard" />
              </IconButton>
              <Tooltip
                title={formatMessage(messages.logout)}
                onClick={() => {
                  user.signOut().then(() => {
                    history.push({ pathname: LOGIN_ROUTES.HOME });
                  });
                }}
              >
                <IconButton color="inherit">
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
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
                {pageTitle}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* TODO manage this app menu bar with some params generate by the layout parent */}
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs
          value={activeTabLink}
          textColor="inherit"
          onChange={handleTabsChange}
        >
          <Tab
            textColor="inherit"
            value={USERS_ROUTES.USER_LIST}
            label={formatMessage(messages.usersTab)}
          />
          <Tab
            textColor="inherit"
            value={USERS_ROUTES.USER_EDIT}
            label={formatMessage(messages.userDetailTab)}
            disabled
          />
          <Tab textColor="inherit" value={''} label="Groups" disabled />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
};

export default withStyles(styles)(withRouter(Header));
