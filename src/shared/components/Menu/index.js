import React from "react";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

import styles from "./styles";

const Menu = ({ classes, items, history }, { intl: { formatMessage } }) => (
  <MenuList>
    {items.map(item => (
      <MenuItem key={item.id}>
        <ListItemIcon
          className={classes.icon}
          onClick={() => history.push(item.path)}
        >
          {item.icon ? <item.icon /> : <MenuIcon />}
        </ListItemIcon>
        <ListItemText
          classes={{ primary: classes.primary }}
          inset
          primary={formatMessage(item.name)}
        />
      </MenuItem>
    ))}
  </MenuList>
);

Menu.propTypes = {
  items: PropTypes.array.isRequired
};

Menu.contextTypes = {
  intl: intlShape.isRequired
};

export default withStyles(styles)(Menu);
