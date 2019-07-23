import { createMuiTheme, Theme } from "@material-ui/core/styles";

// Paperbase theme
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/premium-themes/paperbase/Paperbase.js

const muiBaseTheme = createMuiTheme({
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5
    }
  },
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3"
    }
  },
  shape: {
    borderRadius: 8
  }
});

const theme: Theme = {
  ...muiBaseTheme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c"
      }
    },
    MuiButton: {
      label: {
        textTransform: "none"
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none"
        }
      }
    },
    MuiTabs: {
      root: {
        marginLeft: muiBaseTheme.spacing(1)
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: muiBaseTheme.palette.common.white
      }
    },
    MuiTab: {
      root: {
        textTransform: "none",
        margin: "0 16px",
        minWidth: 0,
        padding: 0,
        [muiBaseTheme.breakpoints.up("md")]: {
          padding: 0,
          minWidth: 0
        }
      }
    },
    MuiIconButton: {
      root: {
        padding: muiBaseTheme.spacing(1)
      }
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854"
      }
    },
    MuiListItemText: {
      primary: {
        fontWeight: muiBaseTheme.typography.fontWeightMedium
      }
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20
        }
      }
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32
      }
    }
  },
  props: {
    MuiTab: {
      disableRipple: true
    }
  },
  mixins: {
    ...muiBaseTheme.mixins,
    toolbar: {
      minHeight: 48
    }
  }
};

export default theme;
