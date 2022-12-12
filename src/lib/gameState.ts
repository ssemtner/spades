// TODO: all interface functions have to be async
// TODO: every access of the game state has to await or await in html block
// TODO: add helper functions like append to pile or update deck or something so that it's not so ugly on the main page

/** TODO
 * NEW IDEA:
 * have a function that gets all the data from firebase and a function that sends it. Takes game id as parameter
 * the gamestate will be non async just writable stores the the update function sets
 */
import type { Card, Player } from './types';
import { GameStep } from './types';
import { get, type Writable, writable } from 'svelte/store';
import { generateDeck } from './deck';
import { determineTrickWinner, isValidPlay } from './game';
import { sendGameState } from './firebase';

function createCustomStore<Type>(defaultValue: Type): Writable<Type> {
	const { subscribe, set, update } = writable<Type>(defaultValue);

	return {
		subscribe,
		set,
		update
	};
}

export function addToPile(cardId: number): boolean {
	const card = get(deck).find((card) => card.id === cardId);

	if (card === undefined) {
		return false;
	}

	if (card.suit === 'spade') {
		spadesPlayed.set(true);
	}

	deck.update((prev) => prev.filter((card) => card.id !== cardId));
	pile.update((prev) => [...prev, card]);

	return true;
}

export function chooseRandomPlay(playerId: number): number {
	const hand = deck.getHand(playerId);
	if (hand.length === 0) {
		return -1;
	}

	const options = hand.filter((card) => isValidPlay(card, hand, get(pile), get(spadesPlayed)));
	const index = Math.floor(Math.random() * options.length);

	return options[index].id;
}

function setStepByTurn() {
	if (get(players)[get(turn)].computer) {
		step.set(get(onlineGame) ? GameStep.REMOTE_PLAY : GameStep.COMPUTER_PLAY);
	} else {
		step.set(GameStep.HUMAN_PLAY);
	}
}

export function finishTurn() {
	if (get(turn) === turn.end) {
		const winner = determineTrickWinner(get(pile));
		players.addTrick(winner);
		step.set(GameStep.WAIT);
		setTimeout(() => {
			pile.set([]);
			setTimeout(() => {
				pile.set([]);
				turn.reset(winner);
				!get(onlineGame) || sendGameState(get(gameId));
				setStepByTurn();
			}, 500);
		}, 1000);
	} else {
		turn.next();
		setStepByTurn();
	}
}

export function makeBid(bid: number) {
	const player = get(players).find(player => player.controlled);
	if (player === undefined) {
		return false;
	}

	player.bid = bid;

	step.set(GameStep.WAIT_FOR_BID);
}

export function resetGame() {
	spadesPlayed.set(false);
	deck.set(generateDeck());
	pile.set([]);
	players.set(
		[0, 1, 2, 3].map((id) => ({
			id,
			tricks: 0,
			computer: !get(onlineGame) && id !== 0,
			controlled: id === 0,
			bid: false
		}))
	);
	turn.reset(0);
	step.set(GameStep.BID);
}

export const spadesPlayed = writable(false);

export const pile = {
	...createCustomStore<Card[]>([])
};

export const deck = {
	...createCustomStore<Card[]>([]),
	getHand: function(playerId: number) {
		return get(this).filter((card) => card.owner === playerId);
	}
};

export const players = {
	...createCustomStore<Player[]>([]),
	addTrick: function(playerId: number) {
		this.update((prev) => {
			const newPlayers = [...prev];
			newPlayers[playerId].tricks++;
			return newPlayers;
		});
	}
};

export const turn = {
	...createCustomStore(0),
	end: 0,
	next: function() {
		this.update((prev) => (prev + 1) % 4);
	},
	reset: function(start: number) {
		this.set(start);
		this.end = start - 1;
		if (this.end === -1) {
			this.end = 3;
		}
	}
};

export const onlineGame = writable(false);

export const gameId = {
	...createCustomStore('test')
};

export const step = writable<GameStep>(GameStep.NONE);