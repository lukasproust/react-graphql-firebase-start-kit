import { createStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = ({ typography, spacing }: Theme) =>
  createStyles({
    searchBar: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
      fontSize: typography.fontSize,
    },
    block: {
      display: 'block',
    },
    addUser: {
      marginRight: spacing(1),
    },
  });

export default styles;
