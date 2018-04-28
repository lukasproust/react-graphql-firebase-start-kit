import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';
import classnames from 'classnames';
import { setSidebarVisibility } from 'ra-core';

import Responsive from './Responsive';

class Sidebar extends PureComponent {
  render() {
    const {
      children,
      classes,
      open,
      setSidebarVisibility,
      width,
      ...rest
    } = this.props;

    return (
      <Drawer
        variant="permanent"
        open={open}
        classes={{
          paper: classnames(
            classes.drawerPaper,
            !open && classes.drawerPaperClose,
          ),
        }}
        onClose={this.toggleSidebar}
        {...rest}
      >
        {React.cloneElement(children, {
          dense: true,
        })}
      </Drawer>
    );
  }
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  sidebarVisibility: PropTypes.bool.isRequired,
};

export default Sidebar;
