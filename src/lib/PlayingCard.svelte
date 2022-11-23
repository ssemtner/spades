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
    svg {
        width: 169.075px;
        height: 244.64px;
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
