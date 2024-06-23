// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvxpfUdaOX5IFIAUKv7EXpDo94hB6KIVo",
  authDomain: "lisual-dashboard.firebaseapp.com",
  projectId: "lisual-dashboard",
  storageBucket: "lisual-dashboard.appspot.com",
  messagingSenderId: "985418867286",
  appId: "1:985418867286:web:113bf5c6f4365b099091f7",
  measurementId: "G-1KE0EBQ6KT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);