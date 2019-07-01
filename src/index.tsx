import React from "react";
import ReactDOM from "react-dom";

import intlPolyfill from "tools/polyfills/intl";
import App from "./Root";

const render = (RootComponent: React.ComponentType) => {
  ReactDOM.render(<RootComponent />, document.getElementById("app"));
};

// check/get polyfills
Promise.all([intlPolyfill()])
  // render the app
  .then(() => render(App));