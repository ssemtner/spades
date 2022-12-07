<script lang='ts'>
	import { crossfade } from 'svelte/transition';
	import { determineTrickWinner } from '$lib/game';
	import { addToPile, chooseRandomPlay, deck, pile, players, resetGame } from '$lib/gameState';
	import Pile from '$lib/Pile.svelte';
	import Hand from '$lib/Hand.svelte';
	import ComputerHand from '$lib/ComputerHand.svelte';
	import { onMount } from 'svelte';
	import { getGameState, sendGameState } from '../../lib/firebase';

	onMount(() => {
		resetGame();
	});

	setInterval(() => {
		if (turn !== controlledPlayer) {
			getGameState('test');
		}
	}, 4000);

	const testFirebase = () => {
		sendGameState('test');
	};

	const [send, receive] = crossfade({
		duration: 150
	});

	let turn = 0;
	let controlledPlayer = 0;

	let selected: number | false = false;

	$players.forEach(player => {
		if (player.id !== controlledPlayer) {
			player.computer = true;
		}
	});

	const playCard = () => {
		if (selected !== false) {
			addToPile(selected);

			if (turn === 3) {
				players.addTrick(determineTrickWinner($pile));
				setTimeout(() => {
					$pile = [];
				}, 1000);
			}
			turn = (turn + 1) % 4;
		}
	};

	const playRandom = () => {
		selected = chooseRandomPlay(turn);
		playCard();
	};
</script>

<svelte:head>
	<title>Spades Game</title>
</svelte:head>

<button class='p-4 rounded text-white bg-amber-600 mx-auto' on:click={testFirebase}>Test Firebase</button>

<section class='flex flex-row justify-center'>
	{#each [3, 2, 1] as p }
		<ComputerHand cards={$deck.filter(card => card.owner === p)} {send} />
	{/each}
</section>

<section class='flex flex-row justify-center align-middle'>
	<Pile cards={$pile} {receive} />
</section>

<section class='flex flex-row justify-center'>
	<button class='p-4 rounded bg-blue-400 mx-2 text-white font-bold' on:click={playCard}>Play Card</button>
	<button class='p-4 rounded bg-blue-400 mx-2 text-white font-bold' on:click={playRandom}>Play Random</button>
</section>

<section class='flex flex-row justify-center align-middle'>
	<Hand bind:selected={selected}
				cards={$deck.filter(card => card.owner === controlledPlayer)}
				{send} />
</section>

<style>
</style>
