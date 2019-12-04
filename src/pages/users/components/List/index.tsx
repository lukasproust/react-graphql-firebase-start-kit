import React, { useContext, memo } from 'react';
import { IntlContext } from 'react-intl';

import LinearProgress from '@material-ui/core/LinearProgress';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Snackbar from 'shared/components/material/Snackbar';
import Header from './Header';
import ListComponent from './Component';
import useUsersQuery from './queries/useUsersQuery';
import styles from './styles';
import messages from './intl';

const List: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
  const { formatMessage } = useContext(IntlContext);

  // Get Users apollo hook
  const { loading, data: { users = [] } = {}, error } = useUsersQuery();

  return (
    <Paper className={classes.paper}>
      <Header />
      <div className={classes.contentWrapper}>
        <Snackbar
          error={error}
          message={formatMessage(messages.errorFetchUsers)}
        />
        {loading && <LinearProgress />}
        {!loading && users.length > 0 && <ListComponent users={users} />}
        {!loading && users.length === 0 && (
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
};

export default memo(withStyles(styles)(List));
