<script lang='ts'>
	import PlayingCard from '$lib/PlayingCard.svelte';
	import type { Card } from './deck';
	import { PlayerLocation } from './deck';
	import { fade } from 'svelte/transition';

	export let cards: Card[];
	export let receive;

	const margins: Map<PlayerLocation, string> = new Map([
		[PlayerLocation.NORTH, ''],
		[PlayerLocation.EAST, 'ml-32 mt-32'],
		[PlayerLocation.SOUTH, 'mt-64'],
		[PlayerLocation.WEST, '-ml-32 mt-32']
	]);
</script>

<div class='grid grid-rows-1 grid-cols-1'>
	{#each cards as card (card.id)}
		<div class='col-span-full row-span-full translate-x-1/4 {margins.get(card.owner)}' in:receive={{key: card.id}}
				 out:fade={{duration: 600}}>
			<PlayingCard suit={card.suit} value={card.value} />
		</div>
	{/each}
</div>