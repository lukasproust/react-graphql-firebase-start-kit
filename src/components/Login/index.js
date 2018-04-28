import React, { Component } from 'react';
import { intlShape } from 'react-intl';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import fakeAuth from 'tools/fakeAuth';

import messages from './intl';
import styles from './styles.css';

class Login extends Component {
  state = {
    redirectToReferrer: false,
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { redirectToReferrer } = this.state;
    const { intl: { formatMessage } } = this.context;
    const { from } = this.props.location.state || {
      from: { pathname: '/dashboard' },
    };

    // redirect to previous route or to default route
    if (redirectToReferrer || fakeAuth.isAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <div className={styles.background}>
        <div className={styles.container}>
          <TextField
            hintText={formatMessage(messages.emailHint)}
            floatingLabelText={formatMessage(messages.emailLabel)}
            floatingLabelFixed
          />
          <br />
          <TextField
            floatingLabelText={formatMessage(messages.passwordlHint)}
            hintText="&#8226;&#8226;&#8226;&#8226;&#8226;"
            type="password"
            floatingLabelFixed
          />
          <br />
          <br />
          <RaisedButton
            label={formatMessage(messages.login)}
            onClick={this.login}
            primary
            fullWidth
          />
        </div>
      </div>
    );
  }
}

Login.contextTypes = {
  intl: intlShape.isRequired,
};

export default Login;
