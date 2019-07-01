import firebase from "firebase/app";

import { PRIVATE_KEYS } from "config/keys";

require("firebase/auth");

firebase.initializeApp(PRIVATE_KEYS.firebase);

export default firebase;
