<script lang='ts'>
	import { crossfade } from 'svelte/transition';
	import {
		addToPile,
		chooseRandomPlay,
		deck,
		finishTurn,
		gameId,
		onlineGame,
		pile,
		players,
		resetGame,
		turn
	} from '$lib/gameState';
	import Pile from '$lib/Pile.svelte';
	import Hand from '$lib/Hand.svelte';
	import ComputerHand from '$lib/ComputerHand.svelte';
	import { onMount } from 'svelte';
	import { getGameState, sendGameState } from '../../lib/firebase';
	import Scoreboard from '$lib/Scoreboard.svelte';

	onMount(() => {
		resetGame();
	});

	if ($onlineGame) {
		setInterval(() => {
			if ($turn !== controlledPlayer) {
				getGameState($gameId);
			}
		}, 4000);
	}

	const [send, receive] = crossfade({
		duration: 150
	});

	let controlledPlayer = 0;

	let selected: number | false = false;

	$players.forEach(player => {
		if (player.id !== controlledPlayer) {
			player.computer = true;
		}
	});

	const playCard = () => {
		if (selected !== false && $turn === controlledPlayer) {
			addToPile(selected);

			!$onlineGame || sendGameState($gameId);

			finishTurn();

			selected = false;
		}
	};

	const playRandom = () => {
		selected = chooseRandomPlay($turn);
		playCard();
	};

	$: {
		if ($turn !== controlledPlayer) {
			setTimeout(() => {
				if ($turn !== controlledPlayer) {
					const card = chooseRandomPlay($turn);
					addToPile(card);
					finishTurn();
				}
			}, 1000);
		}
	}
</script>

<svelte:head>
	<title>{$onlineGame ? 'Online' : 'Local'} Spades Game</title>
</svelte:head>
<div class='flex md:flex-row flex-col md:justify-between justify-center'>

	<section class='md:w-1/4 flex md:flex-col flex-row justify-center items-center'>
		{#each [1, 2, 3] as p }
			<ComputerHand cards={$deck.filter(card => card.owner === p)} {send} active={$turn === p} />
		{/each}
	</section>

	<main class=''>
		<section class='flex flex-row justify-center align-middle my-8'>
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
	</main>

	<section class='md:w-1/4 flex md:flex-col flex-row md:justify-start justify-center mt-4'>
		<Scoreboard active={$turn} controlled={controlledPlayer} scores={$players.map(player => player.tricks)}
								title='Tricks' />
	</section>
</div>
<style>
</style>
