<script lang='ts'>
    import {crossfade} from 'svelte/transition';
    import {determineTrickWinner, isValidPlay} from '../../lib/game';
    import {deck, pile, spadesPlayed} from '../../lib/gameState';
    import Pile from '../../lib/Pile.svelte';
    import Hand from '../../lib/Hand.svelte';
    import ComputerHand from '../../lib/ComputerHand.svelte';

    const [send, receive] = crossfade({
        duration: 150
    });

    let players = [];
    for (let i = 0; i < 4; i++) {
        players[i] = {
            id: i,
            selected: undefined,
            tricks: 0
        };
    }

    let turn = 0;
    let controlledPlayer = 0;

    players.forEach(player => {
        if (player.id !== controlledPlayer) {
            player.computer = true;
        }
    })

    const playCard = () => {
        if (players[turn].selected) {
            const cardPlayed = $deck.filter(c => c.id === players[turn].selected)[0];

            if (cardPlayed.suit === 'spade') {
                $spadesPlayed = true;
            }

            $pile = [...$pile, cardPlayed];
            $deck = $deck.filter(c => c.id !== players[turn].selected);

            if (turn === 3) {
                players[determineTrickWinner($pile)].tricks++;
                setTimeout(() => {
                    $pile = [];
                }, 1000);
            }
            turn = (turn + 1) % 4;

            players = players;
        }
    };

    const playRandom = () => {
        const hand = $deck.filter(card => card.owner === turn);
        console.log(hand);
        const options = hand.filter(card => isValidPlay(card, hand, $pile, $spadesPlayed));
        console.log(options);
        players[turn].selected = options[Math.floor(Math.random() * options.length)].id;
        playCard();
    };
</script>

<svelte:head>
    <title>Spades Game</title>
</svelte:head>

<section class='flex flex-row justify-center'>
    {#each players.filter(player => player.computer) as player (player.id)}
        <ComputerHand cards={$deck.filter(card => card.owner === player.id)} {send}/>
    {/each}
</section>

<section class='flex flex-row justify-center align-middle'>
    <Pile cards={$pile} {receive}/>
</section>

<section class="flex flex-row justify-center">
    <button class='p-4 rounded bg-blue-400 mx-2 text-white font-bold' on:click={playCard}>Play Card</button>
    <button class='p-4 rounded bg-blue-400 mx-2 text-white font-bold' on:click={playRandom}>Play Random</button>
</section>

<section class='flex flex-row justify-center align-middle'>
    <Hand bind:selected={players[controlledPlayer].selected}
          cards={$deck.filter(card => card.owner === controlledPlayer)}
          {send}/>
</section>

<style>
</style>
