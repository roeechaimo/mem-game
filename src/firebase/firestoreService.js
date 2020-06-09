import firebase from "./firbase";

const db = firebase.firestore();
const storage = firebase.storage().ref();

const COLLECTIONS = {
  images: "board_images"
};

const firstoreService = {
  storage: storage,
  bucketUrl: storage.child(COLLECTIONS.images),
  getBoardImages: () => db.collection(COLLECTIONS.images).get()
};

export default firstoreService;
