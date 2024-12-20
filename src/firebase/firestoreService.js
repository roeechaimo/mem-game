import { collection, getDocs } from 'firebase/firestore';
import { db, storage } from './firbase';

export const COLLECTIONS = {
  images: 'board_images',
};

const firestoreService = {
  storage,
  getBoardImages: () => getDocs(collection(db, COLLECTIONS.images)),
};

export default firestoreService;
