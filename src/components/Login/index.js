import React, { PureComponent } from 'react';
import { intlShape } from 'react-intl';
import { Redirect } from 'react-router-dom';

import { Card, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import fakeAuth from 'tools/fakeAuth';

import messages from './intl';
import css from './styles.css';

class Login extends PureComponent {
  state = {
    redirectToReferrer: false,
    isLoading: false,
  };

  login = () => {
    this.setState({ isLoading: true }, () =>
      setTimeout(() => {
        fakeAuth.authenticate(() => {
          this.setState({ redirectToReferrer: true, isLoading: false });
        });
      }, 300),
    );
  };

  render() {
    const { redirectToReferrer, isLoading } = this.state;
    const { intl: { formatMessage } } = this.context;
    const { from } = this.props.location.state || {
      from: { pathname: '/dashboard' },
    };

    // redirect to previous route or to default route
    if (redirectToReferrer || fakeAuth.isAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <div className={css.background}>
        <Card className={css.card}>
          <form>
            <div className={css.form}>
              <div className={css.input}>
                <TextField
                  hintText={formatMessage(messages.emailHint)}
                  floatingLabelText={formatMessage(messages.emailLabel)}
                  floatingLabelFixed
                />
              </div>
            </div>
            <div className={css.form}>
              <div className={css.input}>
                <TextField
                  floatingLabelText={formatMessage(messages.passwordlHint)}
                  hintText="&#8226;&#8226;&#8226;&#8226;&#8226;"
                  type="password"
                  floatingLabelFixed
                />
              </div>
            </div>
            <CardActions>
              <RaisedButton
                onClick={this.login}
                label={formatMessage(messages.login)}
                icon={
                  isLoading ? <CircularProgress size={25} thickness={2} /> : ''
                }
                primary
                fullWidth
              />
            </CardActions>
          </form>
        </Card>
      </div>
    );
  }
}

Login.contextTypes = {
  intl: intlShape.isRequired,
};

export default Login;
