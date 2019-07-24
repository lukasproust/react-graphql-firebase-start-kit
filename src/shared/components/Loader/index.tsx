import React, { memo } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, WithStyles } from '@material-ui/styles';

import styles from './styles';

const Loader: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
  return (
    <div className={classes.container}>
      <CircularProgress className={classes.loader} size={80} thickness={3} />
    </div>
  );
};

export default memo(withStyles(styles)(Loader));
