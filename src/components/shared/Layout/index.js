import React, { PureComponent, Fragment } from 'react';
import { intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import AppBar from './AppBar';
import Sidebar from './Sidebar';
import Menu from './Menu';

import messages from './intl';
import css from './styles.css';

class Layout extends PureComponent {
  state = {
    sidebarVisibility: false,
  };

  render() {
    const { children } = this.props;
    const { intl: { formatMessage } } = this.context;
    const { isMenuOpen } = this.state;

    return (
      <Fragment>
        <AppBar
          title={formatMessage(messages.appTitle)}
          isMenuOpen={isMenuOpen}
          setSidebarVisibility={() => {
            this.setState({ sidebarVisibility: !this.state.sidebarVisibility });
          }}
        />
        <main className={css.contentWithSidebar}>
          <Sidebar>
            <Menu />
          </Sidebar>
          <div className={css.content}>{children}</div>
        </main>
      </Fragment>
    );
  }
}

Layout.contextTypes = {
  intl: intlShape.isRequired,
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
