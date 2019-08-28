import { createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    container: {},
    paper: {
      maxWidth: 936,
      margin: 'auto',
      overflow: 'hidden',
    },
    contentWrapper: {
      margin: '40px 16px',
    },
    formControl: {
      marginTop: spacing(1),
      marginBottom: spacing(1),
    },
    button: {
      marginTop: spacing(1),
      marginBottom: spacing(1),
    },
    leftIcon: {
      marginRight: spacing(1),
    },
    linearProgress: {
      marginTop: spacing(1),
      marginBottom: spacing(1),
    },
    wrapper: {
      display: 'inline-block',
      position: 'relative',
    },
    buttonProgress: {
      color: 'white',
    },
    actions: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    deleteButton: {
      color: palette.primary.contrastText,
      backgroundColor: palette.error.main,
      '&:hover': {
        backgroundColor: palette.error.dark,
      },
    },
  });

export default styles;
