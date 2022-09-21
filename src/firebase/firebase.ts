import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhNRKmuZwVa_r0YXsGtaMaw2TzSsIv97E",
  authDomain: "takeoff-staff-test-task.firebaseapp.com",
  projectId: "takeoff-staff-test-task",
  storageBucket: "takeoff-staff-test-task.appspot.com",
  messagingSenderId: "946615083238",
  appId: "1:946615083238:web:73851be99a32f028361b27",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
