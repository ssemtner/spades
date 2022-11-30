import { type Writable, writable } from 'svelte/store';
import { generateDeck } from './deck';
import type { Card, Player } from './types';

export const spadesPlayed = writable(false);

export const pile: Writable<Card[]> = writable([]);

export const deck = writable(generateDeck());

export const players: Writable<Player[]> = writable([]);