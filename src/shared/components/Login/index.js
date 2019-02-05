import React, { PureComponent } from "react";
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

import messages from "./intl";
import css from "./styles.css";

class Login extends PureComponent {
  state = {
    redirectToReferrer: false,
    loading: false,
    email: "",
    password: "",
    errorMessage: undefined
  };

  login = user => {
    const { email, password } = this.state;
    const { history } = this.props;

    this.setState({ loading: true }, () => {
      user
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          console.log(response);
          localstorage.setItem("sessionId", response.idToken);
          history.push({ pathname: "/dashboard" });
        })
        .catch(error => {
          this.setState({
            errorMessage: error.message, // TODO: add my own traduction here
            loading: false
          });
        });
    });
  };

  render() {
    const {
      intl: { formatMessage }
    } = this.context;
    const {
      redirectToReferrer,
      loading,
      email,
      password,
      errorMessage
    } = this.state;
    const { location } = this.props;
    const fromRoute = (location.state && location.state.from) || {
      from: { pathname: "/dashboard" }
    };

    return (
      <UserContext.Consumer>
        {user => (
          <div className={css.background}>
            {/* Last fix here */}
            {redirectToReferrer && user.currentUser && (
              <Redirect to={fromRoute} />
            )}
            <Card className={css.card}>
              <form>
                <FormControl margin="dense" fullWidth>
                  <Grid container spacing={8} alignItems="flex-end">
                    <Grid item xs={2}>
                      <AccountCircle color="primary" />
                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        id="email"
                        label={formatMessage(messages.emailLabel)}
                        value={email}
                        onChange={e => this.setState({ email: e.target.value })}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </FormControl>
                <FormControl margin="dense" fullWidth>
                  <Grid
                    container
                    size="fullWidth"
                    spacing={8}
                    alignItems="flex-end"
                  >
                    <Grid item xs={2}>
                      <HttpsIcon color="primary" />
                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        label={formatMessage(messages.passwordlHint)}
                        value={password}
                        type="password"
                        onChange={e =>
                          this.setState({ password: e.target.value })
                        }
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
                    onClick={() => this.login(user)}
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
        )}
      </UserContext.Consumer>
    );
  }
}

Login.defaultProps = {
  location: {}
};

Login.contextTypes = {
  intl: intlShape.isRequired
};

export default Login;
