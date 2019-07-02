import React from "react";
import ReactDOM from "react-dom";

import App from "./Root";

const render = (RootComponent: React.ComponentType) => {
  ReactDOM.render(<RootComponent />, document.getElementById("app"));
};

render(App);
