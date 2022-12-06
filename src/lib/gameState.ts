// TODO: all interface functions have to be async
// TODO: every access of the game state has to await or await in html block
// TODO: add helper functions like append to pile or update deck or something so that it's not so ugly on the main page

import type { Card, Player } from './types';
import { generateDeck } from './deck';
import { isValidPlay } from './game';

interface IGameState {
	getSpadesPlayed: () => Promise<boolean>;
	setSpadesPlayed: (value: boolean) => Promise<void>;
	getPile: () => Promise<Card[]>;
	setPile: (value: Card[]) => Promise<void>;
	getDeck: () => Promise<Card[]>;
	setDeck: (value: Card[]) => Promise<void>;
	getPlayers: () => Promise<Player[]>;
	setPlayers: (value: Player[]) => Promise<void>;
	getGameId: () => Promise<string>;
	setGameId: (value: string) => Promise<void>;
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

	async getSpadesPlayed(): Promise<boolean> {
		return this._spadesPlayed;
	}

	async setSpadesPlayed(value: boolean) {
		this._spadesPlayed = value;
	}

	async getPile(): Promise<Card[]> {
		return this._pile;
	}

	async setPile(value: Card[]) {
		this._pile = value;
	}

	async getDeck(): Promise<Card[]> {
		return this._deck;
	}

	async setDeck(value: Card[]) {
		this._deck = value;
	}

	async getPlayers(): Promise<Player[]> {
		return this._players;
	}

	async setPlayers(value: Player[]) {
		this._players = value;
	}

	async getGameId(): Promise<string> {
		return this._gameId;
	}

	async setGameId(value: string) {
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

export const clearPile = async () => {
	await state.setPile([]);
};

export const moveToPile = async (cardId: number): Promise<boolean> => {
	const deck = await state.getDeck();
	const pile = await state.getPile();
	const card = deck.find(card => card.id === cardId);

	if (card === undefined) {
		return false;
	}

	if (card.suit === 'spade') {
		await state.setSpadesPlayed(true);
	}

	await state.setDeck(deck.filter(card => card.id !== cardId));
	await state.setPile([...pile, card]);

	return true;
};

export const getHand = async (playerId: number): Promise<Card[]> => {
	const deck = await state.getDeck();
	return deck.filter(card => card.owner === playerId);
};

export const addTrick = async (playerId: number): Promise<boolean> => {
	const players = await state.getPlayers();
	const index = players.findIndex(player => player.id === playerId);

	if (index === -1) {
		return false;
	}

	players[index].tricks++;

	await state.setPlayers(players);

	return true;
};

export const selectRandomCard = async (playerId: number): Promise<number> => {
	const deck = await state.getDeck();
	const pile = await state.getPile();
	const spadesPlayed = await state.getSpadesPlayed();
	const hand = deck.filter(card => card.owner === playerId);

	if (hand.length === 0) {
		return -1;
	}

	const options = hand.filter(card => isValidPlay(card, hand, pile, spadesPlayed));
	const index = Math.floor(Math.random() * options.length);

	return options[index].id;
};

export const refreshState = () => {
	state.getPile = state.getPile;
	state.getDeck = state.getDeck;
	state.getSpadesPlayed = state.getSpadesPlayed;
	state.getPlayers = state.getPlayers;
};