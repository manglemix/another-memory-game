<svelte:options accessors={true} />

<script lang="ts">
	import { RNG } from './rng';

	export let width = 5;
	export let height = 5;
	export let categories = 8;
	export let done = false;
	export let categoryIndex = 0;
	export let seed = 0;
	export const maxCategories = 26;

	if (categories > maxCategories) {
		throw new Error('Too many categories');
	}

	const alphabetArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	$: rng = new RNG(seed);
	$: categoryAlphabets = alphabetArray.sort(() => rng.nextFloat() - 0.5).slice(0, categories);

	let classes = '';

	$: if (done) {
		classes = 'done';
	} else {
		classes = '';
	}
</script>

<span style="--width: {width * 0.8}rem; --height: {height * 0.8}rem;" class={classes}>
	{categoryAlphabets[categoryIndex]}
</span>

<style>
	span {
		text-align: center;
		font-size: min(var(--width), var(--height));
		transition: opacity 0.3s;
	}

	span.done {
		opacity: 0;
	}
</style>
