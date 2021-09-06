
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

 
const firebaseConfig = {
  apiKey: "AIzaSyB6Klt6GO8jX0u249pyPSNPc9w5mGfFv5s",
  authDomain: "react-app-notes-ff066.firebaseapp.com",
  projectId: "react-app-notes-ff066",
  storageBucket: "react-app-notes-ff066.appspot.com",
  messagingSenderId: "332346419967",
  appId: "1:332346419967:web:01e00cfb816ad4891d7aca"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}