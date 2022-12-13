<script lang='ts'>

	import { gameId, onlineGame, resetGame } from '$lib/gameState.js';
	import { formGameLobby, joinGameLobby } from '../lib/firebase';

	const createLobby = () => {
		const id = Date.now().toString().slice(4, -3);

		console.log(id)
		$gameId = id;

		formGameLobby(id);
	};
	let msg = '';
	const joinLobby = () => {
		joinGameLobby(idInput).then(result => {
			if (!result) {
				msg = 'Error joining lobby';
				return;
			}
			msg = '';

			console.log(result);
		});
	};

	let joiningGame = false;
	let slotsPromise: Promise<number[]>;

	let idInput: string;
</script>

<section class='flex flex-row justify-center'>
	<div>
		<h1 class='text-2xl text-center font-bold my-4'>Play Spades</h1>
		<a class='p-4 rounded bg-blue-400 mx-auto text-center text-white font-bold my-4 block' href='/game'
			 on:click={() => {resetGame(); $onlineGame = false;}}>Play Local Game</a>

		<br />

		<input
			bind:value={idInput}
			class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline'
			id='gameId' placeholder='Game ID' type='text'>
		<button class='p-4 rounded bg-blue-400 text-white font-bold my-4 block mx-auto' on:click={joinLobby}>
			Join Game
		</button>

		{#if joiningGame}
			{#await slotsPromise then slots}
				{#each slots as slot}
					<div>{slot}</div>
				{/each}
			{/await}
		{/if}

		<br />

		<a href='/lobby' class='p-4 text-center rounded bg-blue-400 text-white font-bold my-4 block mx-auto' on:click={createLobby}>
			Create Lobby
		</a>

		<br />

		<p>{msg}</p>
	</div>
</section>