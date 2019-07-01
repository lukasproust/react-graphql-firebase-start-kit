import { createStyles } from "@material-ui/styles";

const styles = () =>
  createStyles({
    container: {
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      background: "rgba(0, 0, 0, 0.1)"
    },
    loader: {
      left: "50%",
      position: "absolute",
      top: "50%",
      color: "#00695c",
      marginLeft: "-2.5rem",
      marginTop: "-2.5rem"
    }
  });

export default styles;
