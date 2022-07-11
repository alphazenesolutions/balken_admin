import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBJTgGAcwWGSDLYsWD_ITg1LB4x8HKWxsU",
    authDomain: "balken-dc3f2.firebaseapp.com",
    projectId: "balken-dc3f2",
    storageBucket: "balken-dc3f2.appspot.com",
    messagingSenderId: "491133084848",
    appId: "1:491133084848:web:4d8791f91b14828c460775"
};
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export { auth, firebase };