<script lang='ts'>
	import PlayingCard from '$lib/PlayingCard.svelte';
	import { flip } from 'svelte/animate';
	import { isValidPlay } from '$lib/game.ts';
	import { pile, spadesPlayed } from '$lib/gameState.ts';
	import type { Card } from '$lib/types';

	export let cards: Card[];
	export let hidden = false;
	export let disabled = false;

	let cardsValid;
	$: cardsValid = cards.map(card => (disabled ? false : isValidPlay(card, cards, $pile, $spadesPlayed)));


	export let selected = undefined;

	export let send;

	const select = (card, index) => {
		if (cardsValid[index]) {
			selected = (selected === card.id ? undefined : card.id);
		}
	};

	let width;
</script>

<style>
    @tailwind components;

    @layer components {
        .card {
            @apply transition transition-all duration-300;
        }

        .card:not(.selected) {
            @apply scale-75;
        }

        .card:not(.selected):not(.invalid):hover {
            @apply scale-100;
        }

        .card.selected:not(.invalid) {
            @apply scale-100 ring-8 ring-green-300 rounded-lg;
        }

        .card.invalid {
            filter: brightness(80%);
        }
    }
</style>

<svelte:window bind:innerWidth={width} />

<div class='flex flex-row md:justify-center p-2 items-center lg:overflow-x-visible overflow-x-scroll'>
	{#each cards as card, i (card.id)}
		<button
			animate:flip
			out:send={{key: card.id}}
			class='card {width > 800 ? "-mx-12" : "-mx-4"}'
			class:selected={selected === card.id && !hidden}
			class:invalid={!cardsValid[i] && !hidden}
			style='rotate: {width > 800 ? (i - cards.length / 2) * 3 : 0}deg'
			on:click={() => {select(card, i)}}
		>
			<PlayingCard suit={card.suit} value={card.value} back={hidden} />
		</button>
	{/each}
</div>
