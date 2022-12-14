import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { get } from 'svelte/store';
import { deck, pile, players, spadesPlayed, turn } from '$lib/gameState';

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

const db = getFirestore(app);

export async function sendGameState(gameId: string) {
	console.log('sendddy');

	const docRef = doc(db, 'games', gameId);

	await setDoc(docRef, {
		spadesPlayed: get(spadesPlayed),
		pile: get(pile),
		deck: get(deck),
		players: get(players),
		turn: get(turn)
	});
}

export async function getGameState(gameId: string): Promise<boolean> {
	const docRef = doc(db, 'games', gameId);

	const result = await getDoc(docRef);

	if (!result.exists()) {
		return false;
	}

	const data = result.data();

	try {
		spadesPlayed.set(data.spadesPlayed);
		pile.set(data.pile);
		deck.set(data.deck);
		players.set(data.players);
		turn.set(data.turn);
		return true;
	} catch {
		return false;
	}

}

export async function formGameLobby(gameId: string) {
	const docRef = doc(db, 'lobbies', 'forming');

	const oldRes = await getDoc(docRef);

	if (!oldRes.exists()) {
		return false;
	}

	const oldData = oldRes.data();

	const newData = { ...oldData };
	newData[gameId] = [1, 2, 3];


	await setDoc(docRef, newData);

	return true;
}

export async function getAvailableLobbySlots(gameId: string): Promise<false | number[]> {
	const docRef = doc(db, 'lobbies', 'forming');

	const result = await getDoc(docRef);

	if (!result.exists()) {
		return false;
	}

	const data = result.data();

	try {
		return data[gameId.toString()];
	} catch {
		return false;
	}
}

export async function joinGameLobby(gameId: string): Promise<false | number> {
	const docRef = doc(db, 'lobbies', 'forming');
	const result = await getDoc(docRef);
	if (!result.exists()) {
		return false;
	}


	try {
		const data = result.data();

		if (data[gameId].length === 0) {
			return false;
		}

		const id = data[gameId].shift();

		await setDoc(docRef, data);

		return id || false;

	} catch {
		return false;
	}
}
