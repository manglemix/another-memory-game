<svelte:options accessors={true} />

<script lang="ts">
	import { Block } from '$lib';
	import { RNG } from './rng';

	const cameraPos = [4.2, -4.2, 4.0]
	export let width = 5;
	export let height = 5;
	export let categories = 8;
	export let done = false;
	export let categoryIndex = 0;
	export let seed = 0;
	export const maxCategories = 10;
	export let x = 0;
	export let y = 0;

	if (categories > maxCategories) {
		throw new Error('Too many categories');
	}

	let rng: RNG = new RNG(0);
	let blocks: number[][] = [];
	$: {
		rng = new RNG(seed);
		for (let i = 0; i < categoryIndex; i++) {
			rng.nextInt();
		}
		rng = new RNG(rng.nextInt());
		let currentPos = [0, 0, 0];
		let blocksSet: Set<number[]> = new Set([currentPos]);

		for (let i = 0; i < categoryIndex; i++) {
			while (true) {
				let newPos = [...currentPos];
				switch (Math.floor(rng.nextFloat() * 6)) {
					case 0:
						newPos[1]++;
						break;
					case 1:
						newPos[1]--;
						break;
					case 2:
						newPos[2]++;
						break;
					case 3:
						newPos[2]--;
						break;
					case 4:
						newPos[0]++;
						break;
					case 5:
						newPos[0]--;
						break;
				}
				if (Math.abs(newPos[0]) > 2 || Math.abs(newPos[1]) > 2 || Math.abs(newPos[2]) > 2) {
					continue;
				}
				currentPos = newPos;
				if (blocksSet.has(newPos)) {
					continue;
				}
				blocksSet.add(newPos);
				break;
			}
		}

		blocks = Array.from(blocksSet);
		blocks.sort((pos1, pos2) => {
			pos1 = [...pos1];
			pos2 = [...pos2];
			
			pos1[0] -= cameraPos[0];
			pos1[1] -= cameraPos[1];
			pos1[2] -= cameraPos[2];

			pos2[0] -= cameraPos[0];
			pos2[1] -= cameraPos[1];
			pos2[2] -= cameraPos[2];

			let distance1 = Math.sqrt(pos1[0] * pos1[0] + pos1[1] * pos1[1] + pos1[2] * pos1[2]);
			let distance2 = Math.sqrt(pos2[0] * pos2[0] + pos2[1] * pos2[1] + pos2[2] * pos2[2]);
			return distance2 - distance1;
		});
	}


	let classes = '';

	$: if (done) {
		classes = 'done';
	} else {
		classes = '';
	}
</script>

<div style="--width: {width}rem; --height: {height}rem;" class={classes}>
	{#each blocks as block, i}
		<Block bind:x={block[0]} bind:y={block[1]} bind:z={block[2]}></Block>
	{/each}
</div>

<style>
	div {
        width: var(--width);
        height: var(--width);
		position: relative;
		font-size: calc(min(var(--width), var(--height)) * 0.82);
		font-size: 0.2rem;
		transition: opacity 0.3s;
	}

	div.done {
		opacity: 0;
	}
</style>
