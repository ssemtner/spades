<script lang='ts'>
    import PlayingCard from '$lib/PlayingCard.svelte';
    import type {Card} from './deck';
    import {PlayerLocation} from './deck';
    import {fade} from 'svelte/transition';

    export let cards: Card[];
    export let receive;

    const margins = [
        [PlayerLocation.NORTH, ''],
        [PlayerLocation.EAST, 'ml-32 mt-32'],
        [PlayerLocation.SOUTH, 'mt-64'],
        [PlayerLocation.WEST, '-ml-32 mt-32']
    ]

    let locations;

    $: locations = margins.map(x => ({
        card: cards.filter(card => card.owner === x[0])[0],
        margin: x[1]
    }))
</script>

<div class='grid grid-rows-1 grid-cols-1'>
    {#each locations as location}
        {#if location.card}
            <div class='col-span-full row-span-full translate-x-1/4 {location.margin} scale-75'
                 in:receive={{key: location.card.id}}
                 out:fade={{duration: 600}}>
                <PlayingCard suit={location.card.suit} value={location.card.value}/>
            </div>
        {:else}
            <div class='col-span-full row-span-full translate-x-1/4 {location.margin}' in:receive={{key: 1}}
                 out:fade={{duration: 600}}>
                <div class="w-[150px] h-[200px] m-[5px] relative"></div>
            </div>
        {/if}
    {/each}
</div>