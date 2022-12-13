<script lang='ts'>

	import { gameId, players, resetGame } from '$lib/gameState.js';
	import { getAvailableLobbySlots } from '../../lib/firebase';
	import { onMount } from 'svelte';

	let slots = [0, 1, 2, 3];
	let filled: false | number[];

	onMount(() => {
		const interval = setInterval(() => getAvailableLobbySlots($gameId).then(res => filled = res), 3000);
		return () => clearInterval(interval);
	});

	const startGame = () => {
		getAvailableLobbySlots($gameId).then((result) => {
			if (!result) {
				return false;
			}
			const computer = slots.filter(s => result.findIndex(x => x === s) !== -1);
			console.log(computer);
			resetGame();
			$players = $players.map(player => ({ ...player, computer: computer.findIndex(x => x === player.id) !== -1 }));
			console.log($players);
		});
	};
</script>

<section class='flex flex-col justify-center align-middle'>
	<div class='mx-auto'>
		Game ID:
		<pre class='inline'>{$gameId}</pre>
	</div>

	{#each slots as slot}
		<div class='mx-auto'>Slot {slot + 1}
			{#if filled !== undefined}
				{#if filled.findIndex(x => x === slot) === -1 }
					(Filled)
				{/if}
			{/if}
		</div>
	{/each}

	<br />

	<a class='p-4 text-center rounded bg-blue-400 text-white font-bold my-4 block mx-auto' href='/game'
		 on:click={startGame}>Start Game</a>
</section>