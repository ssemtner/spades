import type {Card, PlayerLocation, Suit} from './types';

function highestOfSuit(cards: Card[], suit: Suit): Card | undefined {
    const cardsOfSuit = cards.filter(card => card.suit === suit);

    if (cardsOfSuit.length > 0) {
        let max: Card = cardsOfSuit[0];
        for (const card of cardsOfSuit) {
            if (card.value > max.value) {
                max = card;
            }
        }

        return max;
    } else {
        return undefined;
    }
}

// Returns player location of trick winner
export function determineTrickWinner(cards: [Card, Card, Card, Card]): PlayerLocation {
    // find the highest spade played
    const highestSpade = highestOfSuit(cards, 'spade');
    if (highestSpade) {
        return highestSpade.owner;
    }

    const suitLed: Suit = cards[0].suit;
    const highestOfSuitLed = highestOfSuit(cards, suitLed);
    if (highestOfSuitLed) {
        return highestOfSuitLed.owner;
    }

    // Should never get to this
    return cards[0].owner;
}

export function isValidPlay(card: Card, hand: Card[], pile: Card[], spadesPlayed: boolean): boolean {
    // If lead
    if (pile.length === 0) {
        return spadesPlayed ? true : card.suit !== 'spade';
    }

    const suitLed = pile[0].suit;

    if (card.suit === suitLed) {
        return true;
    }

    return hand.filter(card => card.suit === suitLed).length === 0;
}