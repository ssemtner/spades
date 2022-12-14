import { elasticOut } from 'svelte/easing';

export function spin(node: never, { duration }: { duration: number }) {
	return {
		duration,
		css: (t: never) => {
			const eased = elasticOut(t);

			return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${Math.trunc(t * 90) % 90 + 90},
						70%,
						60%
					);`;
		}
	};
}