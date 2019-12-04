import React, { Fragment } from 'react';
import classNames from 'classnames';

import { withStyles, WithStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import { PaperProps } from '@material-ui/core/Paper/Paper';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import SettingsIcon from '@material-ui/icons/Settings';

import { Menu } from './types';
import styles from './styles';

const menu: Menu[] = [
  {
    id: 'Dashboard',
    children: [{ id: 'Countries', icon: <PermMediaOutlinedIcon /> }],
  },
  {
    id: 'Administration',
    children: [
      { id: 'App', icon: <SettingsIcon /> },
      { id: 'Users', icon: <PeopleIcon />, active: true },
    ],
  },
];

interface Props extends WithStyles<typeof styles> {
  paperProps: Partial<PaperProps>;
  variant?: 'permanent' | 'persistent' | 'temporary';
  open?: boolean;
  onClose?: () => void;
}

const Navigator: React.FC<Props> = ({
  classes,
  variant,
  open,
  onClose,
  paperProps,
}) => (
  <Drawer
    variant={variant || 'permanent'}
    open={open}
    onClose={onClose}
    PaperProps={paperProps}
  >
    <List disablePadding>
      <ListItem
        className={classNames(
          classes.firebase,
          classes.item,
          classes.itemCategory,
        )}
      >
        {'App title'}
      </ListItem>
      <ListItem className={classNames(classes.item, classes.itemCategory)}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classes.itemPrimary,
          }}
        >
          {'Project Overview'}
        </ListItemText>
      </ListItem>
      {menu.map(({ id, children }) => (
        <Fragment key={id}>
          <ListItem className={classes.categoryHeader}>
            <ListItemText
              classes={{
                primary: classes.categoryHeaderPrimary,
              }}
            >
              {id}
            </ListItemText>
          </ListItem>
          {children.map(({ id: childId, icon, active }) => (
            <ListItem
              button
              dense
              key={childId}
              className={classNames(
                classes.item,
                classes.itemActionable,
                active && classes.itemActiveItem,
              )}
            >
              <ListItemIcon>
                <>{icon}</>
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                }}
              >
                {childId}
              </ListItemText>
            </ListItem>
          ))}
          <Divider className={classes.divider} />
        </Fragment>
      ))}
    </List>
  </Drawer>
);

export default withStyles(styles)(Navigator);
