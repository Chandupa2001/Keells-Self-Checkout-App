// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHzzhr4WCTXLM3IlIvkQM9TZ1i8mxau28",
  authDomain: "keells-self-checkout.firebaseapp.com",
  projectId: "keells-self-checkout",
  storageBucket: "keells-self-checkout.appspot.com",
  messagingSenderId: "370260386542",
  appId: "1:370260386542:web:ce4a783a3642d2966749ff"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase }