import React from 'react';
import firebase from 'tools/firebase';

export default React.createContext(firebase.auth());
// createUserWithEmailAndPassword,
// signInWithEmailAndPassword: firebase.auth().signInWithEmailAndPassword,
// signOut: firebase.auth().signOut,
// onAuthStateChanged: firebase.auth().onAuthStateChanged,
