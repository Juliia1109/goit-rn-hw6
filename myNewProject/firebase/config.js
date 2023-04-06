import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4dqpAQoO7xwPyX2KHAiUV_JcNpLaFKqc",
  authDomain: "rn-project-5eb07.firebaseapp.com",
  projectId: "rn-project-5eb07",
  storageBucket: "rn-project-5eb07.appspot.com",
  messagingSenderId: "482759762245",
  appId: "1:482759762245:web:684d7017ce3de956f09e2c",
  measurementId: "G-X6VXMF0Q33",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth };
export { storage };
export { db };
