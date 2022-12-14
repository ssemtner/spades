import type { Card, Player } from './types';
import { GameStep } from './types';
import { get, type Writable, writable } from 'svelte/store';
import { generateDeck } from './deck';
import { calculateScore, determineTrickWinner, isValidPlay } from './game';
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

export function setStepByTurn() {
	if (get(players)[get(turn)].computer) {
		step.set(get(players)[get(turn)].computer ? GameStep.COMPUTER_PLAY : GameStep.REMOTE_PLAY);
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
				if (get(deck).length === 0) {
					completeRound();
				} else {
					setStepByTurn();
				}
				!get(onlineGame) || sendGameState(get(gameId));
			}, 500);
		}, 1000);
	} else {
		turn.next();
		setStepByTurn();
		!get(onlineGame) || sendGameState(get(gameId));
	}
}

export function makeBid(bid: number) {
	const player = get(players).findIndex(player => player.controlled);
	if (player === -1) {
		return false;
	}

	players.setBid(player, bid);

	step.set(GameStep.WAIT_FOR_BID);

	get(onlineGame) || sendGameState((get(gameId)));
}

export function completeRound() {
	get(players).forEach((player, i) => {
		const score = calculateScore(player);

		players.increaseScore(i, score);
	});

	resetRound(Math.floor(Math.random() * 4) + 1);
}

export function resetGame() {
	resetRound(0);
	players.set(
		[0, 1, 2, 3].map((id) => ({
			id,
			tricks: 0,
			computer: !get(onlineGame) && id !== 0,
			controlled: id === get(controlled),
			bid: 0,
			score: 0
		}))
	);
}

export function resetRound(lead: number) {
	spadesPlayed.set(false);
	deck.set(generateDeck());
	pile.set([]);
	turn.reset(lead);
	step.set(GameStep.BID);
	players.set(get(players).map(player => ({ ...player, bid: 0, tricks: 0 })));
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
	},
	setBid: function(playerId: number, bid: number) {
		this.update((prev) => {
			const newPlayers = [...prev];
			newPlayers[playerId].bid = bid;
			return newPlayers;
		});
		!onlineGame || sendGameState(get(gameId));
	},
	increaseScore: function(playerId: number, score: number) {
		this.update((prev) => {
			const newPlayers = [...prev];
			newPlayers[playerId].score += score;
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

export const onlineGame = writable(true);

export const controlled = writable(0);

export const gameId = {
	...createCustomStore('')
};

export const step = writable<GameStep>(GameStep.NONE);