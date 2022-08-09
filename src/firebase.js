import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCvPiCR_j7AK-6LP-x8hC3Jgyp1U7QJKmE",
  authDomain: "cci-website-a3eab.firebaseapp.com",
  projectId: "cci-website-a3eab",
  storageBucket: "cci-website-a3eab.appspot.com",
  messagingSenderId: "154893830255",
  appId: "1:154893830255:web:599654dbc78ce8315b659a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage();
// Initialize Firebase Authentication and get a reference to the service
export default app;
