import { createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: spacing(1),
      backgroundColor: palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: spacing(1),
    },
    submit: {
      margin: spacing(3, 0, 2),
    },
    leftIcon: {
      marginRight: spacing(1),
    },
    buttonProgress: {
      color: 'white',
    },
    errorReporter: {
      display: 'block',
      textAlign: 'center',
      background: palette.error.main,
      padding: '.5rem',
      borderRadius: '.5rem',
      color: palette.primary.contrastText,
      fontWeight: 700,
      marginTop: '1rem',
    },
  });

export default styles;
