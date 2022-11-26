<script lang='ts'>
	import SVGCards from './images/svg-cards.svg';

	// type Suit = string;
	// type Value = number

	export let suit;
	export let value: number;
	export let back = false;

	let valueString: string;
	switch (value) {
		case 11:
			valueString = 'jack';
			break;
		case 12:
			valueString = 'queen';
			break;
		case 13:
			valueString = 'king';
			break;
		default:
			valueString = value as string;
	}
</script>

<style>
		@tailwind components;


    svg {
        width: 169.075px;
        height: 244.64px;
    }

    .card {
        width: 200px;
        height: 400px;
				@apply bg-blue-400 relative;
    }

    .suit {
				@apply absolute top-1 right-1 text-white font-bold text-xl;
    }

    .value {
				@apply absolute top-1/2 left-1 text-2xl
    }
</style>

<svg
	xmlns='http://www.w3.org/2000/svg'
>
	<use
		href={back ? `${SVGCards}#back` :`${SVGCards}#${suit}_${valueString}`}
		y='0'
		x='0'
	/>
</svg>

<!--<div class='card'>-->
<!--	<span class='suit'>-->
<!--		{suit.toUpperCase()}-->
<!--	</span>-->
<!--	<span class='value'>-->
<!--		{valueString}-->
<!--	</span>-->
<!--</div>-->
