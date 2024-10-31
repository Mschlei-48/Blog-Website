// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcycGKAA9HmW6OsCho21tPKro-chHv11k",
  authDomain: "blog-website-c27ae.firebaseapp.com",
  projectId: "blog-website-c27ae",
  storageBucket: "blog-website-c27ae.appspot.com",
  messagingSenderId: "484581454201",
  appId: "1:484581454201:web:33a7126b2a4797a3a47fa8",
  measurementId: "G-27T22QX73S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app)
const db=getFirestore(app)
export {auth,db}