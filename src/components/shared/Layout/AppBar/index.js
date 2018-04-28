import React, { PureComponent } from 'react';
import { intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import fakeAuth from 'tools/fakeAuth';

import messages from './intl';
import css from './styles.css';

class MyAppBar extends PureComponent {
  render() {
    const { title, isMenuOpen, onMenuClick, history } = this.props;
    const { intl: { formatMessage } } = this.context;

    return (
      <AppBar
        title={<span className={css.appBarTitle}>{title}</span>}
        onTitleClick={() => history.push('/')}
        iconElementLeft={
          <IconButton>
            {isMenuOpen ? (
              <CloseIcon onClick={onMenuClick} />
            ) : (
              <MenuIcon onClick={onMenuClick} />
            )}
          </IconButton>
        }
        iconElementRight={
          <FlatButton
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
