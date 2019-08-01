import React, { useContext } from 'react';
import { IntlContext } from 'react-intl';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';

import getRouteWithParameters from 'helpers/route/getRouteWithParameters';
import { ROUTES } from 'pages/users/routes';
import styles from './styles';
import messages from './intl';

const Header: React.FC<WithStyles<typeof styles> & RouteComponentProps> = ({
  classes,
  history,
}) => {
  const { formatMessage } = useContext(IntlContext);

  return (
    <AppBar
      className={classes.searchBar}
      position="static"
      color="default"
      elevation={0}
    >
      <Toolbar>
        <Grid container spacing={10} alignItems="center">
          <Grid item>
            <SearchIcon className={classes.block} color="inherit" />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              placeholder={formatMessage(messages.searchPlaceholder)}
              InputProps={{
                className: classes.searchInput,
                disableUnderline: true,
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.addUser}
              onClick={() => {
                const newUserRoute = getRouteWithParameters(
                  ROUTES.USER_EDIT,
                  {},
                );
                if (newUserRoute) history.push(newUserRoute);
              }}
            >
              {formatMessage(messages.addUser)}
            </Button>
            <Tooltip title={formatMessage(messages.reload)}>
              <IconButton>
                <RefreshIcon className={classes.block} color="inherit" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(withRouter(Header));
