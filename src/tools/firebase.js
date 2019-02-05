import firebase from "firebase/app";
import auth from "firebase/auth"; // eslint-disable-line no-unused-vars

firebase.initializeApp(process.env.firebase);

export const firebaseAuth = firebase.auth();
