<script lang='ts'>
	import { generateDeck } from '../lib/deck';
	import Hand from '../lib/Hand.svelte';
	import Pile from '$lib/Pile.svelte';
	import { crossfade } from 'svelte/transition';
	import { derived, writable } from 'svelte/store';
	import { determineTrickWinner } from '../lib/game';
	import { deck, pile, spadesPlayed } from '../lib/gameState';

	const [s, r] = crossfade({
		duration: 150
	});


	let players = [];
	for (let i = 0; i < 4; i++) {
		players[i] = {
			id: i,
			selected: undefined,
			tricks: 0
		};
	}

	let activePlayer = 0;

	const playCard = () => {
		if (players[activePlayer].selected) {
			const cardPlayed = $deck.filter(c => c.id === players[activePlayer].selected)[0];

			if (cardPlayed.suit === 'spade') {
				$spadesPlayed = true;
			}

			$pile = [...$pile, cardPlayed];
			$deck = $deck.filter(c => c.id !== players[activePlayer].selected);

			if (activePlayer === 3) {
				players[determineTrickWinner($pile)].tricks++;
				setTimeout(() => {
					$pile = [];
				}, 1000);
			}
			activePlayer = (activePlayer + 1) % 4;

			players = players
		}
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div>
	<Pile receive={r} cards={$pile} />
</div>
<button on:click={playCard} class='rounded bg-blue-600 px-3 py-2 w-1/4 mx-auto font-bold text-white'>Play</button>

{#each players as player (player.id)}
	<div class='my-4'>
		<h1 class='font-bold text-4xl' class:text-red-700={activePlayer === player.id}>Player {player.id}</h1>
		<h2>Tricks: {player.tricks}</h2>
		<Hand send={s} cards={$deck.filter(card => card.owner === player.id)}
					bind:selected={player.selected} />
	</div>
{/each}

<style>

</style>
