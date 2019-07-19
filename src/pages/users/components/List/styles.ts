import { createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = ({ typography, spacing }: Theme) =>
  createStyles({
    root: {
      width: "100%",
      overflowX: "auto"
    },
    table: {
      minWidth: 700
    },
    paper: {
      maxWidth: 936,
      margin: "auto",
      overflow: "hidden"
    },
    searchBar: {
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
    },
    searchInput: {
      fontSize: typography.fontSize
    },
    block: {
      display: "block"
    },
    addUser: {
      marginRight: spacing(1)
    },
    contentWrapper: {
      margin: "40px 16px"
    },
    noUsersPlaceholder: {
      padding: spacing(3)
    }
  });

export default styles;
