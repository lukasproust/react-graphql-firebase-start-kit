import React, { memo, useContext } from 'react';
import { IntlContext } from 'react-intl';
import { Link } from 'react-router-dom';

import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';

import getRouteWithParameters from 'helpers/route/getRouteWithParameters';
import { ROUTES } from 'pages/users/routes';
import { User } from 'pages/users/types';

import styles from './styles';
import messages from './intl';

interface Props extends WithStyles<typeof styles> {
  users: User[];
}

const ListComponent: React.FC<Props> = ({ classes, users }) => {
  const { formatMessage } = useContext(IntlContext);
  const renderEditingLink = (user: User) => {
    const userEditingLink = getRouteWithParameters(ROUTES.USER_EDIT, {
      userId: user.id,
    });

    return userEditingLink ? (
      <Link to={userEditingLink}>
        <EditIcon color={'primary'} />
      </Link>
    ) : (
      <EditIcon color={'disabled'} />
    );
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>{formatMessage(messages.name)}</TableCell>
            <TableCell align="right">{formatMessage(messages.email)}</TableCell>
            <TableCell align="right">{formatMessage(messages.group)}</TableCell>
            <TableCell align="right">
              {formatMessage(messages.createdAt)}
            </TableCell>
            <TableCell align="right">
              {formatMessage(messages.updatedAt)}
            </TableCell>
            <TableCell align="right">
              {formatMessage(messages.actions)}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.displayName}
              </TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{'-'}</TableCell>
              <TableCell align="right">{'-'}</TableCell>
              <TableCell align="right">{'-'}</TableCell>
              <TableCell align="center" padding="checkbox">
                {renderEditingLink(user)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default memo(withStyles(styles)(ListComponent));
