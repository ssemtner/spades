<script lang='ts'>
	import PlayingCard from '$lib/PlayingCard.svelte';
	import type { Card } from './types';
	import { PlayerLocation } from './types';
	import { fade } from 'svelte/transition';

	export let cards: Card[];
	export let receive;

	const margins = [
		[PlayerLocation.NORTH, ''],
		[PlayerLocation.EAST, 'ml-48 mt-40'],
		[PlayerLocation.SOUTH, 'mt-80'],
		[PlayerLocation.WEST, '-ml-48 mt-40']
	];

	let locations;

	$: {
		locations = margins.map(x => ({
			card: cards.find(card => card.owner === x[0]),
			margin: x[1],
			order: cards.findIndex(card => card.owner === x[0])
		}));
		//locations.sort((a, b) => {
		//		if (a.order < b.order) {
		//			return -1;
		//		} else if (a.order > b.order) {
		//			return 1;
		//		} else {
		//			return 0;
		//		}
		//	});
	}
</script>

<div class='grid grid-rows-1 grid-cols-1'>
	{#each locations as location, i}
		{#if location.card}
			<div class='col-span-full row-span-full translate-x-1/4 {location.margin}'
					 in:receive={{key: location.card.id}}
					 out:fade={{duration: 600, delay: 400}}>
				<PlayingCard suit={location.card.suit} value={location.card.value} />
			</div>
		{:else}
			<div class='col-span-full row-span-full translate-x-1/4 {margins[i][1]}'>
				<div class='w-[135px] h-[180px] relative'></div>
			</div>
		{/if}
	{/each}

	<!--{#each cards as card, i (card.id)}-->
	<!--	<div class='col-span-full row-span-full translate-x-1/4 {margins.find(margin => margin[0] === card.owner)[1]}'-->
	<!--			 in:receive={{key: card.id}}-->
	<!--			 out:fade={{duration: 600, delay: 400}}>-->
	<!--		<PlayingCard suit={card.suit} value={card.value} />-->
	<!--	</div>-->
	<!--{/each}-->
</div>