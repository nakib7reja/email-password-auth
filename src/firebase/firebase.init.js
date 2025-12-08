// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Danger-- do not share in public
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA57TGU05AW62NHb2VlBivY2L_g5TS-O2Q",
  authDomain: "email-password-auth-e41ce.firebaseapp.com",
  projectId: "email-password-auth-e41ce",
  storageBucket: "email-password-auth-e41ce.firebasestorage.app",
  messagingSenderId: "837320856616",
  appId: "1:837320856616:web:7bb85122ad65b704a4511d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);