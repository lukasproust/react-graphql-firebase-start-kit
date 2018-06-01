import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { MenuItem } from '@material-ui/core/Menu';

import css from './styles.css';

const MenuItemLink = ({
  className,
  onClick,
  primaryText,
  leftIcon,
  to,
  history,
}) => {
  // css.active
  return (
    <MenuItem
      className={classnames(css.root, className)}
      onClick={() => {
        history.push(to);
        onClick();
      }}
      leftIcon={leftIcon && leftIcon}
      primaryText={primaryText}
    />
  );
};

MenuItemLink.defaultProps = {
  onClick: () => {},
};

MenuItemLink.propTypes = {
  className: PropTypes.string,
  leftIcon: PropTypes.node,
  onClick: PropTypes.func,
  primaryText: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default withRouter(MenuItemLink);
