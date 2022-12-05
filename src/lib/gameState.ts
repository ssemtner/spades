// TODO: all interface functions have to be async
// TODO: every access of the game state has to await or await in html block
// TODO: add helper functions like append to pile or update deck or something so that it's not so ugly on the main page

import type { Card, Player } from './types';
import { generateDeck } from './deck';
import { db } from './firebase';
import type { DocumentData, DocumentReference } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';

interface IGameState {
	getSpadesPlayed: () => boolean;
	setSpadesPlayed: (value: boolean) => void;
	getPile: () => Card[];
	setPile: (value: Card[]) => void;
	getDeck: () => Card[];
	setDeck: (value: Card[]) => void;
	getPlayers: () => Player[];
	setPlayers: (value: Player[]) => void;
	getGameId: () => string;
	setGameId: (value: string) => void;
}

class ComputerGame implements IGameState {
	private _spadesPlayed: boolean;
	private _pile: Card[];
	private _deck: Card[];
	private _players: Player[];
	private _gameId: string;

	constructor() {
		this._spadesPlayed = false;
		this._pile = [];
		this._deck = generateDeck();
		this._players = [];
		this._gameId = '';
	}

	getSpadesPlayed(): boolean {
		return this._spadesPlayed;
	}

	setSpadesPlayed(value: boolean) {
		this._spadesPlayed = value;
	}

	getPile(): Card[] {
		return this._pile;
	}

	setPile(value: Card[]) {
		this._pile = value;
	}

	getDeck(): Card[] {
		return this._deck;
	}

	setDeck(value: Card[]) {
		this._deck = value;
	}

	getPlayers(): Player[] {
		return this._players;
	}

	setPlayers(value: Player[]) {
		this._players = value;
	}

	getGameId(): string {
		return this._gameId;
	}

	setGameId(value: string) {
		this._gameId = value;
	}
}
//
// class OnlineGame implements IGameState {
// 	private _spadesPlayed = false;
// 	private _pile: Card[] = [];
// 	private _deck: Card[] = [];
// 	private _players: Player[] = [];
// 	gameId: string;
// 	private _document: DocumentReference<DocumentData>;
//
// 	constructor(gameId?: string) {
// 		if (gameId === undefined || gameId === '') {
// 			this.gameId = Math.floor(Date.now()).toString();
// 		} else {
// 			this.gameId = gameId;
// 		}
//
// 		this._document = doc(db, 'game', this.gameId);
// 	}
//
// 	function;
//
// 	getspadesPlayed(): boolean {
//
// 		setDoc(this._document, {}).then(r => {
// 			return r;
// 		});
//
// 	}
//
// 	function;
//
// 	setspadesPlayed(value: boolean) {
// 		this._spadesPlayed = value;
// 	}
//
// 	function;
//
// 	getpile(): Card[] {
// 		return this._pile;
// 	}
//
// 	function;
//
// 	setpile(value: Card[]) {
// 		this._pile = value;
// 	}
//
// 	function;
//
// 	getdeck(): Card[] {
// 		return this._deck;
// 	}
//
// 	function;
//
// 	setdeck(value: Card[]) {
// 		this._deck = value;
// 	}
//
// 	function;
//
// 	getplayers(): Player[] {
// 		return this._players;
// 	}
//
// 	function;
//
// 	setplayers(value: Player[]) {
// 		this._players = value;
// 	}
// }

export let state: IGameState = new ComputerGame();

export const resetGame = () => {
	state = new ComputerGame();
};

//
// export const spadesPlayed = writable(false);
//
// export const pile: Writable<Card[]> = writable([]);
//
// export const deck = writable(generateDeck());
//
// export const players: Writable<Player[]> = writable([]);
//
// export const gameId = writable('');
//
// const generateGameId = (): string => {
// 	return Math.floor(Date.now()).toString();
// };
//
// const setDeck = async (desk: Card[]) => {
// 	await setDoc(doc(db, 'games', get(gameId)), {
// 		deck
// 	});
// };
//
// const getDeck;
//
