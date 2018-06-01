import React, { PureComponent } from 'react';
import { intlShape } from 'react-intl';
import { Redirect } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserContext from 'shared/components/UserContext';

import messages from './intl';
import css from './styles.css';

class Login extends PureComponent {
  state = {
    redirectToReferrer: false,
    isLoading: false,
  };

  // TODO use formik && Yup

  login = () => {
    console.log('login here');
    // setTimeout(() => {
    //   fakeAuth.authenticate(() => {
    //     this.setState({ redirectToReferrer: true, isLoading: false });
    //   });
    // }, 300),
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
                <div className={css.form}>
                  <div className={css.input}>
                    <TextField
                      fullWidth
                      label={formatMessage(messages.emailLabel)}
                    />
                  </div>
                </div>
                <div className={css.form}>
                  <div className={css.input}>
                    <TextField
                      fullWidth
                      label={formatMessage(messages.passwordlHint)}
                      type="password"
                    />
                  </div>
                </div>
                <CardActions>
                  <Button
                    variant="raised"
                    onClick={this.login}
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
