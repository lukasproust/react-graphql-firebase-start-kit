import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import styles from "./styles";

function SimpleTable({ classes, users }) {
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>{"Name"}</TableCell>
            <TableCell align="right">{"Email"}</TableCell>
            <TableCell align="right">{"Group"}</TableCell>
            <TableCell align="right">{"Creation"}</TableCell>
            <TableCell align="right">{"Updated At"}</TableCell>
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
              <TableCell align="right">{row.creation}</TableCell>
              <TableCell align="right">{row.updated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(SimpleTable);
