import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyB2eSBeyMg1X6CXjMB1CDPJqJXIKd4cr1E",
  authDomain: "vue-firebase-jedlik.firebaseapp.com",
  databaseURL: "https://vue-firebase-jedlik.firebaseio.com",
  projectId: "vue-firebase-jedlik",
  storageBucket: "vue-firebase-jedlik.appspot.com",
  messagingSenderId: "510825388165"
};

let app = firebase.initializeApp(config);
const db = app.firestore();
db.settings({ timestampsInSnapshots: true });
export default db;
