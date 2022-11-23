<script lang='ts'>
	import PlayingCard from '$lib/PlayingCard.svelte';
	import type { Card } from './deck';
	import { PlayerLocation } from './deck';
	import { fade } from 'svelte/transition';

	export let cards: Card[];
	export let receive;

	const margins: Map<PlayerLocation, string> = new Map([
		[PlayerLocation.NORTH, '-mt-32'],
		[PlayerLocation.EAST, 'ml-32'],
		[PlayerLocation.SOUTH, 'mt-32'],
		[PlayerLocation.WEST, '-ml-32']
	]);
</script>

<div class='relative p-16 mt-8'>
	{#each cards as card (card.id)}
		<div class='absolute {margins.get(card.owner)}' in:receive={{key: card.id}} out:fade={{duration: 600}}>
			<PlayingCard suit={card.suit} value={card.value} />
		</div>
	{/each}
</div>

<br class='my-64'>
