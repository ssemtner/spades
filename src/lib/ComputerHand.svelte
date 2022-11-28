<script lang='ts'>
	import PlayingCard from '$lib/PlayingCard.svelte';
	import { flip } from 'svelte/animate';

	export let cards;

	export let send;
</script>

<div class='grid grid-cols-1 grid-rows-1'>
	{#each cards as card, i (card.id)}
		<div
			animate:flip
			out:send={{key: card.id}}
			class='row-span-full col-span-full'
		>
			<PlayingCard suit={card.suit} value={card.value} back/>
		</div>
	{/each}
</div>