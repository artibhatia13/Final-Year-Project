// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpYPxO806jW7x4mXtL5r58CwI4gt41RfA",
  authDomain: "gemstone-ee3f0.firebaseapp.com",
  projectId: "gemstone-ee3f0",
  storageBucket: "gemstone-ee3f0.appspot.com",
  messagingSenderId: "435024490782",
  appId: "1:435024490782:web:2bdec59365cbafaaad590f",
  measurementId: "G-SB96ZLL2HW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
