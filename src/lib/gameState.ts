import {writable} from 'svelte/store';
import {generateDeck} from './deck';

export const spadesPlayed = writable(false);

export const pile = writable([]);

export const deck = writable(generateDeck());