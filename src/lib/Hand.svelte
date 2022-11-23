<script>
	import PlayingCard from '$lib/PlayingCard.svelte';
	import { flip } from 'svelte/animate';
	import { isValidPlay } from '$lib/game.ts';
	import { pile, spadesPlayed } from '$lib/gameState.ts';

	export let cards;

	let cardsValid;
	$: cardsValid = cards.map(card => (isValidPlay(card, cards, $pile, $spadesPlayed)));

	export let selected = undefined;

	export let send;

	const select = (card, index) => {
		if (cardsValid[index]) {
			selected = (selected === card.id ? undefined : card.id);
		}
	};
</script>

<style>
    @tailwind components;

    @layer components {
        .card {
            @apply relative inline-block -mx-[5.5%] transform transition duration-300;
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
            @apply opacity-50;
        }
    }
</style>

<div class='ml-16'>
	{#each cards as card, i (card.id)}
		<button
			animate:flip
			out:send={{key: card.id}}
			class='card'
			class:selected={selected === card.id}
			class:invalid={!cardsValid[i]}
			style='rotate: {(i - cards.length / 2) * 3}deg'
			on:click={() => {select(card, i)}}
		>
			<PlayingCard suit={card.suit} value={card.value} />
		</button>
	{/each}
</div>