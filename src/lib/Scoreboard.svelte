<script lang='ts'>

	import { type Player } from './types';
	import { fly } from 'svelte/transition';

	export let players: Player[];
	export let active: number;
	export let controlled: number;
</script>

<div class='flex flex-col align-middle justify-center w-72 shadow-lg'>
	<h1 class='bg-blue-400 px-auto drop-shadow-lg rounded py-2 font-bold text-xl text-white text-center'>Scoreboard</h1>

	<table class='table-auto overflow-x-auto'>
		<thead class='text-xs text-gray-700 uppercase bg-gray-100'>
		<tr>
			<th></th>
			<th class='py-3 px-2'>Bid</th>
			<th class='py-3 px-2'>Tricks</th>
			<th class='py-3 px-2'>Score</th>
		</tr>
		</thead>
		<tbody>
		{#each players as player (player.id)}
			<tr class='p-2 last:rounded-b first-of-type:-mt-0.5 {"bg-gray-100"}'>
				<td class='px-4 text-sm uppercase'>Player {player.id + 1}{player.controlled ? " (You)" : ""}:</td>
				<td class='p-2 text-center'>
					{#key player.bid}
						<pre in:fly={{x: -20}}>{player.bid !== '' ? player.bid : 0}</pre>
					{/key}
				</td>
				<td class='p-2 text-center'>
					{#key player.tricks}
						<pre in:fly={{x: -20}}>{player.tricks}</pre>
					{/key}
				</td>
				<td class='p-2 text-center'>
					{#key player.score}
						<pre in:fly={{x: -20}}>{player.score}</pre>
					{/key}
				</td>
			</tr>
		{/each}
		</tbody>
	</table>
	<!--{/each}-->
</div>