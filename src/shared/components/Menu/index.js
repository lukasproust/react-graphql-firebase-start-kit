import React from 'react';
import { intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

import MenuItemLink from './MenuItemLink';
import css from './styles.css';

const Menu = (
  { className, onMenuClick, items },
  { intl: { formatMessage } },
) => (
  <div className={classnames(css.main, className)}>
    {items.map(item => (
      <MenuItemLink
        key={item.id}
        to={item.path}
        primaryText={formatMessage(item.name)}
        leftIcon={item.icon ? <item.icon /> : <MenuIcon />} // Menu icon is default icon
        onClick={onMenuClick}
      />
    ))}
  </div>
);

Menu.propTypes = {
  className: PropTypes.string,
  onMenuClick: PropTypes.func,
  items: PropTypes.array.isRequired,
};

Menu.contextTypes = {
  intl: intlShape.isRequired,
};

Menu.defaultProps = {
  onMenuClick: () => null,
};

export default Menu;
