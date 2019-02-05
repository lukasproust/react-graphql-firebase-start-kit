import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import AppBar from 'shared/components/AppBar';
import Sidebar from 'shared/components/Sidebar';
import Menu from 'shared/components/Menu';
import routes from '../../../routes/root';

import css from './styles.css';

class Layout extends PureComponent {
  state = {
    sidebarVisibility: false,
  };

  setSidebarVisibility = () => {
    const { sidebarVisibility } = this.state;
    this.setState({ sidebarVisibility: !sidebarVisibility });
  };

  render() {
    const { children } = this.props;
    const { sidebarVisibility } = this.state;

    return (
      <Fragment>
        <AppBar
          sidebarVisibility={sidebarVisibility}
          setSidebarVisibility={this.setSidebarVisibility}
        />
        <main className={css.contentWithSidebar}>
          <div className={css.content}>{children}</div>
          <Sidebar
            setSidebarVisibility={this.setSidebarVisibility}
            sidebarVisibility={sidebarVisibility}
          >
            <Menu items={routes} />
          </Sidebar>
        </main>
      </Fragment>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
