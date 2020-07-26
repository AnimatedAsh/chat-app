import * as firebase from "firebase";
import "firebase/firebase-app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCu9wWbQx2Ii23BXGaE5p6nUcjLTgIwW_Q",
  authDomain: "doodleblue-contact-app.firebaseapp.com",
  databaseURL: "https://doodleblue-contact-app.firebaseio.com",
  projectId: "doodleblue-contact-app",
  storageBucket: "doodleblue-contact-app.appspot.com",
  messagingSenderId: "215586537476",
  appId: "1:215586537476:web:f39fb7c28d9b8a8bfa7551",
  measurementId: "G-LVQETT09R7",
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
