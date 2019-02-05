import React from "react";
import { firebaseAuth } from "tools/firebase";

export default React.createContext(firebaseAuth);
// createUserWithEmailAndPassword,
// signInWithEmailAndPassword: firebase.auth().signInWithEmailAndPassword,
// signOut: firebase.auth().signOut,
// onAuthStateChanged: firebase.auth().onAuthStateChanged,
