import React from 'react';
import classnames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import { variantIcon } from './constants';
import styles from './styles';

export interface Props extends WithStyles<typeof styles> {
  className?: string;
  message?: string;
  onClose?: () => void;
  variant: keyof typeof variantIcon;
  closable: boolean;
}

const SnackbarContentWrapper: React.FC<Props> = ({
  className,
  message,
  onClose,
  variant,
  classes,
  closable,
}) => {
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classnames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classnames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={
        closable && [
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]
      }
    />
  );
};

export default withStyles(styles)(SnackbarContentWrapper);
