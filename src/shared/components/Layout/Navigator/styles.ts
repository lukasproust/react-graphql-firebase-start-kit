import { createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = ({ palette, typography, spacing }: Theme) =>
  createStyles({
    categoryHeader: {
      paddingTop: 16,
      paddingBottom: 16
    },
    categoryHeaderPrimary: {
      color: palette.common.white
    },
    item: {
      paddingTop: 4,
      paddingBottom: 4,
      color: "rgba(255, 255, 255, 0.7)"
    },
    itemCategory: {
      backgroundColor: "#232f3e",
      boxShadow: "0 -1px 0 #404854 inset",
      paddingTop: 16,
      paddingBottom: 16
    },
    firebase: {
      fontSize: 24,
      fontFamily: typography.fontFamily,
      color: palette.common.white
    },
    itemActionable: {
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.08)"
      }
    },
    itemActiveItem: {
      color: "#4fc3f7"
    },
    itemPrimary: {
      color: "inherit",
      fontSize: typography.fontSize
    },
    divider: {
      marginTop: spacing(2)
    }
  });

export default styles;
