import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDY-NprlCEOgfivN8clSgP4XtnTo0yAmgM",
    authDomain: "portfolio-d6ecc.firebaseapp.com",
    projectId: "portfolio-d6ecc",
    storageBucket: "portfolio-d6ecc.appspot.com",
    messagingSenderId: "534707937199",
    appId: "1:534707937199:web:c04204cb8cb668c1c4595a",
    measurementId: "G-XP4Q6JDL85"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, auth, db, storage, analytics };