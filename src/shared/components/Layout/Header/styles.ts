import { createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    secondaryBar: {
      zIndex: 0,
    },
    menuButton: {
      marginLeft: -spacing(1),
    },
    iconButtonAvatar: {
      padding: 4,
    },
    link: {
      textDecoration: 'none',
      color: lightColor,
      '&:hover': {
        color: palette.common.white,
      },
    },
    button: {
      borderColor: lightColor,
    },
  });

export default styles;
