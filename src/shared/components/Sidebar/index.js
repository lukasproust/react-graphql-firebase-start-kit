import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import css from './styles.css';

const Sidebar = ({ children, sidebarVisibility, setSidebarVisibility }) => (
  <div
    className={classnames(
      css.drawerPaper,
      !sidebarVisibility && css.drawerPaperClose,
    )}
    open={sidebarVisibility}
    onClose={setSidebarVisibility}
  >
    {children}
  </div>
);

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  sidebarVisibility: PropTypes.bool.isRequired,
  setSidebarVisibility: PropTypes.func.isRequired,
};

export default Sidebar;
