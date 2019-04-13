import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBrEP_LpxrOKYc37F3ToVjngHbhOPvoFbk",
  authDomain: "personal-directory.firebaseapp.com",
  databaseURL: "https://personal-directory.firebaseio.com",
  projectId: "personal-directory",
  storageBucket: "personal-directory.appspot.com",
  messagingSenderId: "29914404591"
};

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth