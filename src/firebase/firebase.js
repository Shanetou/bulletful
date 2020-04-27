// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
// import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjPVOwKoTzPK6itmEtC7RprKc_ihP4oAg",
  authDomain: "bulletful-75d7b.firebaseapp.com",
  databaseURL: "https://bulletful-75d7b.firebaseio.com",
  projectId: "bulletful-75d7b",
  storageBucket: "bulletful-75d7b.appspot.com",
  messagingSenderId: "747734482252",
  appId: "1:747734482252:web:a480f8a51a99471689e3e9",
  measurementId: "G-6F9CDLWK2L",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
// .enablePersistence()
// .catch(function (err) {
//   if (err.code == "failed-precondition") {
//     // Multiple tabs open, persistence can only be enabled
//     // in one tab at a a time.
//     // ...
//   } else if (err.code == "unimplemented") {
//     // The current browser does not support all of the
//     // features required to enable persistence
//     // ...
//   }
// });

export { db };
