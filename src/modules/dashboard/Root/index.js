import React, { PureComponent, Fragment } from 'react';
import { intlShape } from 'react-intl';

class Login extends PureComponent {
  state = {
    test: false,
  };

  render() {
    const { test } = this.state;
    console.log(test);
    return <Fragment>{'test'}</Fragment>;
  }
}

Login.defaultProps = {
  location: {},
};

Login.contextTypes = {
  intl: intlShape.isRequired,
};

export default Login;
