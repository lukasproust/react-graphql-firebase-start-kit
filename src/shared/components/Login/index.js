import React, { PureComponent } from 'react';
import { intlShape } from 'react-intl';
import { Redirect } from 'react-router-dom';

import { Card, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

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
    const { from } = this.props.location.state || {
      from: { pathname: '/dashboard' },
    };

    return (
      <UserContext.Consumer>
        {user => (
          <div className={css.background}>
            {/* Last fix here */}
            {redirectToReferrer && user.currentUser && <Redirect to={from} />}
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
                      isLoading ? (
                        <CircularProgress size={25} thickness={2} />
                      ) : (
                        ''
                      )
                    }
                    primary
                    fullWidth
                  />
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
