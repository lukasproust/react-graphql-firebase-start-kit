import React, { useState, useContext, Fragment } from "react";
import { intlShape } from "react-intl";
import { Redirect } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HttpsIcon from "@material-ui/icons/Https";
import Typography from "@material-ui/core/Typography";

import localstorage from "tools/localStorage";
import UserContext from "shared/components/UserContext";
import useFormInput from "shared/hooks/useFormInput";

import messages from "./intl";
import css from "./styles.css";

const Login = ({ location, history }, { intl: { formatMessage } }) => {
  const user = useContext(UserContext);
  const email = useFormInput("");
  const password = useFormInput("");
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState();
  const [redirectToReferrer] = useState();

  const fromRoute = (location.state && location.state.from) || {
    from: { pathname: "/dashboard" }
  };

  const login = () => {
    setLoading(true);
    user
      .signInWithEmailAndPassword(email.value, password.value)
      .then(response => {
        localstorage.setItem("sessionId", response.idToken);
        history.push({ pathname: "/dashboard" });
      })
      .catch(error => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  };

  return (
    <div className={css.background}>
      <Fragment>
        {user && user.currentUser && (
          <Redirect exact from="/login" to="/dashboard" />
        )}
        {!user ||
          (!user.currentUser && location.pathname !== "/login" && (
            <Redirect
              to={{
                pathname: "/login", //  TODO add segment
                state: { from: location }
              }}
            />
          ))}
        {redirectToReferrer && user.currentUser && <Redirect to={fromRoute} />}
      </Fragment>
      <Card className={css.card}>
        <form>
          <FormControl margin="dense" fullWidth>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item xs={2}>
                <AccountCircle color="primary" />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  {...email} // value, onChange
                  id="email"
                  label={formatMessage(messages.emailLabel)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </FormControl>
          <FormControl margin="dense" fullWidth>
            <Grid container size="fullWidth" spacing={8} alignItems="flex-end">
              <Grid item xs={2}>
                <HttpsIcon color="primary" />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  {...password}
                  id="password"
                  type="password"
                  label={formatMessage(messages.passwordlHint)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </FormControl>
          {errorMessage && (
            <Typography
              classes={{ root: css.loginErrorMessage }}
              component="p"
              variant="body2"
              color="error"
              align="center"
            >
              {errorMessage}
            </Typography>
          )}
          <CardActions className={css.login}>
            <Button
              variant="contained"
              onClick={login}
              color="primary"
              fullWidth
            >
              {formatMessage(messages.login)}
              {loading ? (
                <CircularProgress
                  classes={{ root: css.loader }}
                  color="inherit"
                  size={15}
                  thickness={5}
                />
              ) : (
                ""
              )}
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

Login.defaultProps = {
  location: {}
};

Login.contextTypes = {
  intl: intlShape.isRequired
};

export default Login;
