import React, { PureComponent } from 'react';
import { intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import fakeAuth from 'tools/fakeAuth';

import messages from './intl';
import css from './styles.css';

class MyAppBar extends PureComponent {
  render() {
    const {
      title,
      sidebarVisibility,
      setSidebarVisibility,
      history,
    } = this.props;
    const {
      intl: { formatMessage },
    } = this.context;

    return (
      <AppBar
        title={<span className={css.appBarTitle}>{title}</span>}
        onTitleClick={() => history.push('/')}
        iconElementLeft={
          <IconButton>
            {sidebarVisibility ? (
              <CloseIcon onClick={setSidebarVisibility} />
            ) : (
              <MenuIcon onClick={setSidebarVisibility} />
            )}
          </IconButton>
        }
        iconElementRight={
          <Button
            label={formatMessage(messages.logout)}
            onClick={() => fakeAuth.signout(() => history.push('/'))}
          />
        }
      />
    );
  }
}

MyAppBar.contextTypes = {
  intl: intlShape.isRequired,
};

export default withRouter(MyAppBar);
