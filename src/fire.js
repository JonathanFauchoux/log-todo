import firebase from 'firebase'
import 'firebase/firebase-firestore'

let firebaseConfig = {
  apiKey: "AIzaSyADo9KkXpcwIICK3_mCijxL2xbET5nNHd8",
  authDomain: "loginmdpreact.firebaseapp.com",
  databaseURL: "https://loginmdpreact.firebaseio.com",
  projectId: "loginmdpreact",
  storageBucket: "loginmdpreact.appspot.com",
  messagingSenderId: "936045227255",
  appId: "1:936045227255:web:011bb06fbf454ce01ab7f2"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const db = fire.firestore()

export {db, fire}

