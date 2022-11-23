import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { Card } from './deck';
import { generateDeck } from './deck';

export const spadesPlayed = writable(false);

export const pile = writable([]);

export const deck = writable(generateDeck());