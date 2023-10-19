// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore();
const auth=getAuth();
const googleProvider = new GoogleAuthProvider();
export {auth,googleProvider};
export default db;
