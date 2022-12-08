import type { Card, Suit } from './types';

export function generateDeck() {
	let deck: Card[] = [];
	let id = 1;
	for (const suit of ['heart', 'diamond', 'club', 'spade'] as Suit[]) {
		for (let value = 2; value <= 14; value++) {
			deck.push({ id: id++, suit, value, owner: -1 });
		}
	}

	deck = shuffle(deck) as Card[];

	deck = deck.map((card, i) => ({
		...card,
		owner: i % 4
	}));

	return deck;
}

function shuffle(array: unknown[]): unknown[] {
	let currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex !== 0) {

		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
}