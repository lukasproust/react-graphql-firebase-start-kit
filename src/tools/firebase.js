import firebase from "firebase/app";

require("firebase/auth");

firebase.initializeApp(process.env.firebase);

export default firebase;
