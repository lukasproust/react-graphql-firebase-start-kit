import React, { memo } from "react";
import { intlShape, InjectedIntl } from "react-intl";
import { Link } from "react-router-dom";

import withStyles, { WithStyles } from "@material-ui/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";

import getRouteWithParameters from "helpers/route/getRouteWithParameters";
import { ROUTES } from "pages/users/routes";

import { User } from "../../types";
import styles from "./styles";
import messages from "./intl";

interface Props extends WithStyles<typeof styles> {
  users: User[];
}

const ListComponent: React.FC<Props> = (
  { classes, users },
  { intl: { formatMessage } }: { intl: InjectedIntl }
) => {
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>{"Name"}</TableCell>
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
          {users.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.group}</TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
              <TableCell align="right">{row.updatedAt}</TableCell>
              <TableCell align="center" padding="checkbox">
                <Link
                  to={getRouteWithParameters(ROUTES.USER_DETAIL, {
                    userId: row.id
                  })}
                >
                  <Fab size="small" color="primary" aria-label="Edit">
                    <EditIcon />
                  </Fab>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

ListComponent.contextTypes = {
  intl: intlShape.isRequired
};

export default memo(withStyles(styles)(ListComponent));
