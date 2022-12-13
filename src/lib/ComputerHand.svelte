<script lang='ts'>
	import PlayingCard from '$lib/PlayingCard.svelte';
	import { flip } from 'svelte/animate';

	export let cards;

	export let send;

	export let active: boolean;
</script>

<div class='grid grid-cols-1 grid-rows-1 scale-75 md:scale-100 -m-6 md:m-0'>
	{#each cards as card, i (card.id)}
		<div
			animate:flip
			out:send={{key: card.id}}
			class='row-span-full col-span-full m-2 {!active || "ring-8 ring-blue-400 rounded-lg"}'
		>
			<PlayingCard suit={card.suit} value={card.value} back />
		</div>
	{/each}
	{#if cards.length === 0}
		<div class='col-span-full row-span-full translate-x-1/4'>
			<div class="w-[150px] h-[200px] bg-gray-100 rounded"></div>
		</div>
	{/if}
</div>