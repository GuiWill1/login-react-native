import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD18xFU-vtjbqsA0v1itQu9SM0xxJSsc3I",
    authDomain: "login-template-14d9b.firebaseapp.com",
    databaseURL: "https://login-template-14d9b.firebaseio.com",
    projectId: "login-template-14d9b",
    storageBucket: "login-template-14d9b.appspot.com",
    messagingSenderId: "1014994564540",
    appId: "1:1014994564540:web:6312df350ecbd7a40be7b9",
    measurementId: "G-QV5B43MNEH"
}

const Firebase = firebase.initializeApp(config);

export default Firebase;
    