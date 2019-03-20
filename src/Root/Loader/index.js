import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

import css from "./style.css";

const Loader = () => (
  <div className={css.container}>
    <CircularProgress className={css.loader} size={80} thickness={3} />
  </div>
);

export default Loader;
