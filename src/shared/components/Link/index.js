import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

class Link extends PureComponent {
  state = {
    className: STATUS.NORMAL,
  };

  onMouseEnter = () => {
    this.setState({ className: STATUS.HOVERED });
  };

  onMouseLeave = () => {
    this.setState({ className: STATUS.NORMAL });
  };

  render() {
    const { className } = this.state;
    const { page, children, muiTheme } = this.props;

    return (
      <a
        className={styles[className]}
        style={{ color: muiTheme.palette.textColor }}
        href={page || '#'}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {children}
      </a>
    );
  }
}

Link.propTypes = {
  page: PropTypes.string,
  children: PropTypes.node,
};

export default Link;
