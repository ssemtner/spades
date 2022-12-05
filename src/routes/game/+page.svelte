<script lang='ts'>
	import { crossfade } from 'svelte/transition';
	import { determineTrickWinner, isValidPlay } from '$lib/game';
	import { state } from '$lib/gameState';
	import Pile from '$lib/Pile.svelte';
	import Hand from '$lib/Hand.svelte';
	import ComputerHand from '$lib/ComputerHand.svelte';
	import Scoreboard from '$lib/Scoreboard.svelte';

	const [send, receive] = crossfade({
		duration: 150
	});

	for (let i = 0; i < 4; i++) {
		state.setPlayers([...state.getPlayers(), {
			id: i,
			selected: false,
			tricks: 0,
			computer: false,
			controlled: false
		}]);
	}

	let turn = 0;
	let controlledPlayer = 0;
	let selected = undefined;

	const playCard = () => {
		if (selected) {
			const cardPlayed = state.getDeck().filter(c => c.id === state.getPlayers()[turn].selected)[0];

			if (cardPlayed.suit === 'spade') {
				state.setSpadesPlayed(true);
			}

			state.setPile([...state.getPile(), cardPlayed]);
			state.setDeck(state.getDeck().filter(c => ))
			deck = deck.filter(c => c.id !== players[turn].selected);

			if (turn === 3) {
				players[determineTrickWinner(pile)].tricks++;
				setTimeout(() => {
					pile = [];
				}, 1000);
			}
			turn = (turn + 1) % 4;

			players = players;
		}
	};

	const playRandom = () => {
		const hand = deck.filter(card => card.owner === turn);
		const options = hand.filter(card => isValidPlay(card, hand, pile, spadesPlayed));
		players[turn].selected = options[Math.floor(Math.random() * options.length)].id;
		playCard();
	};
</script>

<svelte:head>
	<title>Spades Game</title>
</svelte:head>

<section class='flex flex-row justify-center gap-4'>
	{#each state.getPlayers().filter(player => player.id !== controlledPlayer) as player (player.id)}
		<ComputerHand cards={deck.filter(card => card.owner === player.id)} {send} />
	{/each}
</section>

<section class='flex flex-row justify-around align-middle'>
	<Scoreboard scores={state.getPlayers().map(player => player.tricks)} title='Tricks' />
	<Pile cards={pile} {receive} />
	<Scoreboard scores={[0, 0, 0, 0]} title='Score' />
</section>

<section class='flex flex-row justify-center'>
	<button class='p-4 rounded bg-blue-400 mx-2 text-white font-bold' on:click={playCard}>Play Card</button>
	<button class='p-4 rounded bg-blue-400 mx-2 text-white font-bold' on:click={playRandom}>Play Random</button>
</section>

<section class='flex flex-row justify-center align-middle'>
	<Hand bind:selected={selected}
				cards={deck.filter(card => card.owner === controlledPlayer)}
				{send} />
</section>

<style>
</style>
