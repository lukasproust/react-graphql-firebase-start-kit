import React, { PureComponent } from 'react';
import { intlShape } from 'react-intl';
import { Redirect } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HttpsIcon from '@material-ui/icons/Https';
import UserContext from 'shared/components/UserContext';

import messages from './intl';
import css from './styles.css';

class Login extends PureComponent {
  state = {
    redirectToReferrer: false,
    isLoading: false,
    email: undefined,
    password: undefined,
  };

  // TODO use formik && Yup

  login = user => {
    const { email, password } = this.state;
    console.log('login here', email, password);
    user.signInWithEmailAndPassword(email, password).catch(error => {
      // Handle Errors here.
      console.log(error);
      // ...
    });
    // fakeAuth.authenticate(() => {
    //   this.setState({ redirectToReferrer: true, isLoading: false });
    // });
  };

  render() {
    const { redirectToReferrer, isLoading } = this.state;
    const {
      intl: { formatMessage },
    } = this.context;
    const fromRoute = (this.props.location &&
      this.props.location.state.from) || {
      from: { pathname: '/dashboard' },
    };

    return (
      <UserContext.Consumer>
        {user => (
          <div className={css.background}>
            {/* Last fix here */}
            {redirectToReferrer &&
              user.currentUser && <Redirect to={fromRoute} />}
            <Card className={css.card}>
              <form>
                <FormControl
                  aria-describedby="email login"
                  margin="dense"
                  fullWidth
                >
                  <Grid container spacing={8} alignItems="flex-end">
                    <Grid item xs={2}>
                      <AccountCircle />
                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        id="email"
                        label={formatMessage(messages.emailLabel)}
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </FormControl>
                <FormControl
                  aria-describedby="password login"
                  margin="dense"
                  fullWidth
                >
                  <Grid container fullWidth spacing={8} alignItems="flex-end">
                    <Grid item xs={2}>
                      <HttpsIcon />
                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        label={formatMessage(messages.passwordlHint)}
                        value={this.state.password}
                        type="password"
                        onChange={e =>
                          this.setState({ password: e.target.value })
                        }
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </FormControl>

                <CardActions>
                  <Button
                    variant="raised"
                    onClick={() => this.login(user)}
                    color="primary"
                    fullWidth
                  >
                    {formatMessage(messages.login)}
                    {isLoading ? (
                      <CircularProgress size={25} thickness={2} />
                    ) : (
                      ''
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

Login.contextTypes = {
  intl: intlShape.isRequired,
};

export default Login;
