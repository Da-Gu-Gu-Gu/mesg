// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuMvI0t33RyYNMNOJ6wiuZq9wZYgRecf0",
  authDomain: "mesg-4780f.firebaseapp.com",
  projectId: "mesg-4780f",
  storageBucket: "mesg-4780f.appspot.com",
  messagingSenderId: "261562189125",
  appId: "1:261562189125:web:5f7a0b2b30df16374caa2c",
  measurementId: "G-0E88REB3DB"
};

// Initialize Firebase
const FirebaseApp =()=>{
    initializeApp(firebaseConfig);
} 

export default FirebaseApp