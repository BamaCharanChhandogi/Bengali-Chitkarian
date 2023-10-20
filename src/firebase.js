import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUiAEFmXWKRjwArg0EGiVi08GQO7WZelc",
  authDomain: "chitkara-bengali.firebaseapp.com",
  projectId: "chitkara-bengali",
  storageBucket: "chitkara-bengali.appspot.com",
  messagingSenderId: "892840815956",
  appId: "1:892840815956:web:f5aa5791f40ccde64e6cc1",
  measurementId: "G-BEYX5DFW8T"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth };
export default db;