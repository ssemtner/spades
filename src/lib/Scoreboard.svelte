<script lang='ts'>
	import { fade, fly } from 'svelte/transition';

	export let title: string;
	export let scores: number[];
	export let active: number;
	export let controlled: number;
</script>

<div class='flex flex-col align-middle justify-center w-48'>
	<h1 class='bg-blue-400 px-auto drop-shadow-lg rounded py-2 font-bold text-xl text-white text-center'>{title}</h1>
	{#each scores as score, player}
		<div
			class='flex flex-row justify-between p-2 last:rounded-b first-of-type:-mt-0.5 {player === active ? "bg-gray-50" : "bg-gray-200 "}'>
			<p class='mx-2 my-auto text-gray-700'>Player {player + 1}{player === controlled ? " (You)" : ""}:</p>
			<span>
				{#key score}
					<pre class='mx-2 text-lg inline-block' out:fly={{x: -20}} in:fade>{score}</pre>
				{/key}
			</span>
		</div>
	{/each}
</div>