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
		setStepByTurn,
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
		}, 2000);
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

	$: {
		if ($step === GameStep.WAIT_FOR_BID) {
			for (let player of $players.filter(player => player.computer === true)) {
				players.setBid(player.id, Math.min(Math.floor(Math.random() * 4) + 1, Math.floor(Math.random() * 4) + 1));
			}
			setStepByTurn();
		}
	}
</script>

<svelte:head>
	<title>{$onlineGame ? 'Online' : 'Local'} Spades Game</title>
</svelte:head>

{#if $onlineGame}
	<div class='text-center my-2 text-lg'>
		<span>Game Id:</span>
		<pre class='inline text-lg my-auto'>{$gameId}</pre>
	</div>
{/if}

<div class='flex lg:flex-row flex-col lg:justify-between justify-center'>

	<section class='md:w-1/4 flex md:flex-col flex-row justify-center items-center overflow-x-hidden'>
		{#each [1, 2, 3] as p }
			<div class='flex md:flex-row flex-col align-middle lg:justify-start justify-center'>
				<h1 class='my-auto text-3xl font-serif text-gray-700 text-center'>{p + 1}</h1>
				<ComputerHand cards={$deck.filter(card => card.owner === p)} {send} active={$turn === p} />
			</div>
		{/each}
	</section>

	<main class='flex flex-col justify-between'>
		<section class='flex flex-row justify-center align-middle my-8'>
			{#if $step === GameStep.BID || $step === GameStep.WAIT_FOR_BID}
				<Bid onSelect={(s) => {makeBid(s)}} waiting={$step === GameStep.WAIT_FOR_BID} />
			{:else}

				<Pile cards={$pile} {receive} />
			{/if}
		</section>

		{#if $step !== GameStep.BID && $step !== GameStep.WAIT_FOR_BID}
			<section class='flex flex-row justify-center mb-4'>
				<button class='p-4 rounded bg-blue-400 mx-2 text-white font-bold' on:click={playCard}>Play Card</button>
			</section>
		{/if}

		<section class='flex flex-row justify-center align-middle'>
			<Hand bind:selected={selected}
						cards={$deck.filter(card => card.owner === controlledPlayer)}
						disabled={!$players[$turn]?.controlled || [GameStep.BID, GameStep.WAIT_FOR_BID].indexOf($step) > -1}
						{send} />
		</section>
	</main>

	<section class='lg:w-1/4 flex lg:flex-col flex-row lg:justify-start justify-center mt-4'>
		<Scoreboard active={$turn} controlled={controlledPlayer} players={$players} />
	</section>
</div>`

<!--{(console.log($deck), '')}-->
<!--{(console.log($pile), '')}-->
{(console.log($step), '')}
<!--{(console.log("turn: " + $turn), '')}-->

<style>
</style>
