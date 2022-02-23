// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDNj-tr9yDkQcyfifrWEAdrQEy4kmyvUU0",
  authDomain: "squadtask-7a434.firebaseapp.com",
  projectId: "squadtask-7a434",
  storageBucket: "squadtask-7a434.appspot.com",
  messagingSenderId: "826805772373",
  appId: "1:826805772373:web:447fd967078bc8931074dc",
  measurementId: "G-MKZ7F8Y7G1",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();

// const storage = firebase.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export { db, auth, googleProvider };
