import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

	apiKey: 'AIzaSyBmKEv6s0uR8MRvzZAb4plokLGwmw_Ly2Y',

	authDomain: 'spades-b0bd6.firebaseapp.com',

	projectId: 'spades-b0bd6',

	storageBucket: 'spades-b0bd6.appspot.com',

	messagingSenderId: '314365007351',

	appId: '1:314365007351:web:e9426d5b20604909938af2',

	measurementId: 'G-PE0BSK7T43'

};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);