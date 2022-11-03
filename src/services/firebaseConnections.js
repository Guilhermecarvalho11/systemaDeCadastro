
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBTokYA7zm6Q9-2yrU9v8qnXQV-9PGnOKY",
    authDomain: "sistema-f5b0c.firebaseapp.com",
    projectId: "sistema-f5b0c",
    storageBucket: "sistema-f5b0c.appspot.com",
    messagingSenderId: "725305940429",
    appId: "1:725305940429:web:af1421e1b97e2633ab8c84",
    measurementId: "G-VMDW19C5R9"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
 
  export default firebase;
