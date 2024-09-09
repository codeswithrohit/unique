
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBbQvm0j8XafSIZXexezTuxCtYHxqwp75o",
  authDomain: "uniquepipgas.firebaseapp.com",
  projectId: "uniquepipgas",
  storageBucket: "uniquepipgas.appspot.com",
  messagingSenderId: "1061549676083",
  appId: "1:1061549676083:web:20c7e6366555f9b0d07546"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }

