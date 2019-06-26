import React from "react";
import withStyles, { WithStyles } from "@material-ui/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";

import List from "./List";
import styles from "./styles";
import users from "./fake_data";

const Users: React.FC<WithStyles<typeof styles>> = ({ classes }) => (
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
              placeholder="Search by email address, phone number, or user UID"
              InputProps={{
                disableUnderline: true,
                className: classes.searchInput
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.addUser}
            >
              {"Add user"}
            </Button>
            <Tooltip title="Reload">
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
        <List users={users} />
      ) : (
        <Typography
          color="textSecondary"
          align="center"
          className={classes.noUsersPlaceholder}
        >
          {"No users for this project yet"}
        </Typography>
      )}
    </div>
  </Paper>
);

export default withStyles(styles)(Users);
