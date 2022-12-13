<script lang='ts'>
	export let onSelect: (selected: number) => void;
	export let waiting: boolean;

	let selected = 1;
</script>

<div class='flex flex-col justify-center bg-gray-200 rounded-xl w-[80%] overflow-x-scroll'>
	{#if !waiting}

		<div class='text-center font-bold text-2xl p-2'>
			Place Bid
		</div>
		<div class='flex flex-row w-[40rem] justify-between m-2'>
			{#each [...Array(13).keys()] as bid}
				<div>
					<input type='radio' name='option' id={bid} class='peer hidden' value={bid} bind:group={selected} />
					<label
						for={bid}
						class='block cursor-pointer select-none rounded-xl py-2 md:px-4 px-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
						{bid}
					</label>
				</div>
			{/each}
		</div>

		<button class='mx-auto my-4 px-8 py-4 bg-blue-400 text-white rounded font-bold' on:click={() => onSelect(selected)}>
			Place Bid
		</button>
	{:else}
		<div class='text-center font-bold text-2xl p-8'>
			Waiting for opponent bids...
		</div>
	{/if}
</div>