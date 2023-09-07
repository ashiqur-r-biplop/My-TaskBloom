// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClBh--LTsM8AJz2dGB9_bfB8wq2SAQFW4",
  authDomain: "my-taskbloom.firebaseapp.com",
  projectId: "my-taskbloom",
  storageBucket: "my-taskbloom.appspot.com",
  messagingSenderId: "289748553198",
  appId: "1:289748553198:web:9b643f4c8f623cdef712ff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
