import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  "@global": {
    html: {
      height: "100%",
      margin: 0
    },
    body: {
      height: "100%",
      margin: 0
    }
  },
  mainApp: {
    display: "flex",
    flexFlow: "column",
    height: "100vh"
  },
  background: {
    height: "100%",
    background: "url('./images/background.jpg') center top no-repeat",
    backgroundSize: "cover",
    position: "relative"
  },
  card: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "2rem",
    width: "15rem"
  },
  login: {
    padding: "8px 0",
    marginTop: "1rem"
  },
  loginErrorMessage: {
    paddingTop: "1rem"
  },
  loader: {
    marginLeft: "0.5rem"
  }
});

export default useStyles;
