<script lang='ts'>
	import { crossfade } from 'svelte/transition';
	import { determineTrickWinner, isValidPlay } from '../lib/game';
	import { deck, pile, spadesPlayed } from '../lib/gameState';
	import Pile from '$lib/Pile.svelte';
	import Hand from '$lib/Hand.svelte';
	import ComputerHand from '$lib/ComputerHand.svelte';

	const [send, receive] = crossfade({
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

	let turn = 0;
	let controlledPlayer = 0;

	const playCard = () => {
		if (players[turn].selected) {
			const cardPlayed = $deck.filter(c => c.id === players[turn].selected)[0];

			if (cardPlayed.suit === 'spade') {
				$spadesPlayed = true;
			}

			$pile = [...$pile, cardPlayed];
			$deck = $deck.filter(c => c.id !== players[turn].selected);

			if (turn === 3) {
				players[determineTrickWinner($pile)].tricks++;
				setTimeout(() => {
					$pile = [];
				}, 1000);
			}
			turn = (turn + 1) % 4;

			players = players;
		}
	};

	const playRandom = () => {
		const hand = $deck.filter(card => card.owner === turn);
		console.log(hand);
		const options = hand.filter(card => isValidPlay(card, hand, $pile, $spadesPlayed));
		console.log(options);
		players[turn].selected = options[Math.floor(Math.random() * options.length)].id;
		playCard();
	};
</script>

<svelte:head>
	<title>Spades Game</title>
</svelte:head>

<!--<div>-->
<!--	<Pile cards={$pile} receive={receive} />-->
<!--</div>-->
<!--<button class='rounded bg-blue-600 px-3 py-2 w-1/4 mx-auto font-bold text-white' on:click={playCard}>Play</button>-->

<!--{#each players as player (player.id)}-->
<!--	<div class='my-4'>-->
<!--		<h1 class='font-bold text-4xl' class:text-red-700={activePlayer === player.id}>Player {player.id}</h1>-->
<!--		<h2>Tricks: {player.tricks}</h2>-->
<!--		<Hand send={send} cards={$deck.filter(card => card.owner === player.id)}-->
<!--					bind:selected={player.selected} />-->
<!--	</div>-->
<!--{/each}-->


<!--<div class='ab top-1/2'>-->
<!--	<Hand bind:selected={players[3].selected} cards={$deck.filter(card => card.owner === 3)} hidden send={send} />-->
<!--</div>-->

<section class='flex flex-row justify-center'>
	{#each players.filter(player => player.id !== controlledPlayer) as player (player.id)}
		<ComputerHand cards={$deck.filter(card => card.owner === 2)} {send} />
	{/each}
</section>

<section class='flex flex-row justify-center align-middle'>
	<Pile cards={$pile} {receive} />
</section>

<section>
	<button class='p-4 rounded bg-blue-400' on:click={playCard}>Play Card</button>
	<button class='p-4 rounded bg-blue-400' on:click={playRandom}>Play Random</button>
</section>

<section class='flex flex-row justify-center align-middle'>
	<Hand bind:selected={players[controlledPlayer].selected} cards={$deck.filter(card => card.owner === controlledPlayer)}
				{send} />
</section>

<style>
</style>
