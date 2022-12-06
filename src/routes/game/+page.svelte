<script lang='ts'>
	import { crossfade } from 'svelte/transition';
	import { addTrick, clearPile, moveToPile, selectRandomCard, state } from '$lib/gameState';
	import Pile from '$lib/Pile.svelte';
	import Hand from '$lib/Hand.svelte';
	import { getHand } from '$lib/gameState.js';
	import type { Card } from '$lib/types';
	import ComputerHand from '$lib/ComputerHand.svelte';

	const [send, receive] = crossfade({
		duration: 150
	});

	let tmpPlayers = [];
	for (let i = 0; i < 4; i++) {
		tmpPlayers.push(
			{
				id: i,
				selected: false,
				tricks: 0,
				computer: false
			}
		);
	}
	state.setPlayers(tmpPlayers);

	let turn = 0;
	let controlledPlayer = 0;
	let selected = undefined;
	let handGetter: (playerId: number) => Promise<Card[]> = getHand;
	const playCard = async (cardId: number) => {
		if (cardId) {

			await moveToPile(cardId);

			if (turn === 3) {
				await addTrick(turn);
				await clearPile();
			}

			turn = (turn + 1) % 4;

			state.getPile = state.getPile;
			handGetter = getHand;

		}
	};

	const playRandom = async () => {
		const cardId = await selectRandomCard(turn);
		await playCard(cardId);
	};
</script>

<svelte:head>
	<title>Spades Game</title>
</svelte:head>

<section class='flex flex-row justify-center gap-4'>
	{#each [0, 1, 2, 3].filter(a => a !== controlledPlayer) as player}
		{#await getHand(player) then hand}
			<ComputerHand cards={hand} {send} />
		{/await}
	{/each}
</section>

<section class='flex flex-row justify-around align-middle'>
	<!--	<Scoreboard scores={state.getPlayers().map(player => player.tricks)} title='Tricks' />-->
	{#await state.getPile() then pile}
		<Pile cards={pile} {receive} />
	{/await}
	<!--	<Scoreboard scores={[0, 0, 0, 0]} title='Score' />-->
</section>

<section class='flex flex-row justify-center'>
	<button class='p-4 rounded bg-blue-400 mx-2 text-white font-bold' on:click={async () => await playCard(selected)}>
		Play Card
	</button>
	<button class='p-4 rounded bg-blue-400 mx-2 text-white font-bold' on:click={async () => await playRandom()}>
		Play Random
	</button>
</section>

<section class='flex flex-row justify-center align-middle'>
	{#await handGetter(controlledPlayer)}
		<pre class='text-orange-400'>Loading</pre>
	{:then hand}
		<Hand bind:selected={selected}
					cards={hand}
					{send} />
	{/await}

</section>

<style>
</style>
