import firebase from "./firbase";

const db = firebase.firestore();

const COLLECTIONS = {
  images: "board_images"
};

const firstoreService = {
  getBoardImages: () => db.collection(COLLECTIONS.images).get()
};

export default firstoreService;
