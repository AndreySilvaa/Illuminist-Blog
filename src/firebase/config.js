import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA8fjE_CEK-EMC59syDDZm71rLVCHRVzhk",
  authDomain: "project-2-46900.firebaseapp.com",
  projectId: "project-2-46900",
  storageBucket: "project-2-46900.appspot.com",
  messagingSenderId: "157205322144",
  appId: "1:157205322144:web:51112b276bdbd2f79facc5",
  measurementId: "G-6V3YCKZ0N7"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }