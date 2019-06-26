import React from "react";

import firebase from "tools/firebase";

export default React.createContext(firebase.auth());
