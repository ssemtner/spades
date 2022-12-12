<script lang='ts'>
	import { crossfade } from 'svelte/transition';
	import {
		addToPile,
		chooseRandomPlay,
		deck,
		finishTurn,
		gameId,
		onlineGame,
		players,
		resetGame,
		step,
		turn
	} from '$lib/gameState';
	import Hand from '$lib/Hand.svelte';
	import ComputerHand from '$lib/ComputerHand.svelte';
	import { onMount } from 'svelte';
	import { getGameState, sendGameState } from '../../lib/firebase';
	import Scoreboard from '$lib/Scoreboard.svelte';
	import { GameStep } from '../../lib/types';
	import Bid from '$lib/Bid.svelte';
	import Pile from '$lib/Pile.svelte';
	import { makeBid, pile } from '$lib/gameState.js';

	onMount(() => {
		resetGame();
		setInterval(() => {

			if ($step === GameStep.COMPUTER_PLAY) {
				const card = chooseRandomPlay($turn);
				addToPile(card);
				finishTurn();
			}
		}, 2000);
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

	const playCard = () => {
		if (selected !== false && $step === GameStep.HUMAN_PLAY) {
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

	<main class='flex flex-col justify-between'>
		<section class='flex flex-row justify-center align-middle my-8'>
			{#if $step in [GameStep.BID, GameStep.WAIT_FOR_BID]}
				<Bid onSelect={(s) => {makeBid(s)}} waiting={$step === GameStep.WAIT_FOR_BID} />
			{:else}
				<Pile cards={$pile} {receive} />
			{/if}
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

<!--{(console.log($deck), '')}-->
<!--{(console.log($pile), '')}-->
<!--{(console.log($step), '')}-->
<!--{(console.log("turn: " + $turn), '')}-->

<style>
</style>
