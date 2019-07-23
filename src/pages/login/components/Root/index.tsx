import React, { useState, useContext, Fragment } from "react";
import { intlShape, InjectedIntl } from "react-intl";
import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { withStyles, WithStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import UserContext from "shared/contexts/User";
import useFormInput from "shared/hooks/useFormInput";

import { ROUTES as LOGIN_ROUTES } from "pages/login/routes";

import messages from "./intl";
import styles from "./styles";

interface Props extends WithStyles<typeof styles> {
  location: { state: { from: string }; pathname: string };
  history: { push: (config: { pathname: string }) => void };
}

const Login: React.FC<Props> = (
  props,
  { intl: { formatMessage } }: { intl: InjectedIntl }
) => {
  const user = useContext(UserContext);
  const email = useFormInput("");
  const password = useFormInput("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { location, history, classes } = props;
  console.log("loading", loading, "errorMessage", errorMessage);
  const login = () => {
    if (!user.signInWithEmailAndPassword) return;

    setLoading(true);
    user
      .signInWithEmailAndPassword(email.value, password.value)
      .then(() => {
        history.push({ pathname: "/users" });
      })
      .catch((error: { message: string }) => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <Fragment>
        {user && user.currentUser && (
          <Redirect exact from={LOGIN_ROUTES.HOME} to="/users" />
        )}
        {!user ||
          (!user.currentUser && location.pathname !== LOGIN_ROUTES.HOME && (
            <Redirect
              to={{
                pathname: LOGIN_ROUTES.HOME, //  TODO add segment
                state: { from: location }
              }}
            />
          ))}
      </Fragment>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {formatMessage(messages.signIn)}
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label={formatMessage(messages.emailLabel)}
                name="email"
                autoFocus
                {...email} // value, onChange hook
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label={formatMessage(messages.passwordlHint)}
                type="password"
                id="password"
                {...password} // value, onChange hook
              />
              {/* TODO: Manage remember me function */}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={formatMessage(messages.remenberMe)}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={login}
              >
                {formatMessage(messages.signInButton)}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#forgot" variant="body2">
                    {formatMessage(messages.forgotPassword)}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#signup" variant="body2">
                    {formatMessage(messages.noAccountSignUp)}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Login.contextTypes = {
  intl: intlShape.isRequired
};

export default withStyles(styles)(Login);
