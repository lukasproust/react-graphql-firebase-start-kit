import React from 'react';
import { intlShape, InjectedIntl } from 'react-intl';

import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';

import ListComponent from './Component';
import styles from './styles';
import users from '../../fake_data';
import messages from './intl';

const List: React.FC<WithStyles<typeof styles>> = (
  { classes },
  { intl: { formatMessage } }: { intl: InjectedIntl },
) => (
  <Paper className={classes.paper}>
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
    <div className={classes.contentWrapper}>
      {users.length > 0 ? (
        <ListComponent users={users} />
      ) : (
        <Typography
          className={classes.noUsersPlaceholder}
          color="textSecondary"
          align="center"
        >
          {formatMessage(messages.noUsers)}
        </Typography>
      )}
    </div>
  </Paper>
);

List.contextTypes = {
  intl: intlShape.isRequired,
};

export default withStyles(styles)(List);
