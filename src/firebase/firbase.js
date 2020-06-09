import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBwJV47vic8HTkjZd0twK2ps1wzGzf5eHk",
  authDomain: "mem-game-a94ab.firebaseapp.com",
  databaseURL: "https://mem-game-a94ab.firebaseio.com",
  projectId: "mem-game-a94ab",
  storageBucket: "mem-game-a94ab.appspot.com",
  messagingSenderId: "905350142298",
  appId: "1:905350142298:web:5df50150408a565dc1fb63",
  measurementId: "G-ZY35ZRLBLK"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
