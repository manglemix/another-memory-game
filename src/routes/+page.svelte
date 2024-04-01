<script lang="ts">
	import { DefaultOccluder, type Occluder, HiddenText, type Hidden, HiddenBlocks } from '$lib';

	let theme = 'default';
	let newTheme = theme;
	let rows = 4;
	let cols = 4;
	let matches = 0;
	let seed = Math.round(Math.random() * 10000);
	$: categories = (rows * cols) / 2;
	let categoryIndices: number[] = [];

	function randomizeCategoryIndices() {
		categoryIndices = [];
		for (let i = 0; i < categories; i++) {
			categoryIndices.push(i);
			categoryIndices.push(i);
		}
		categoryIndices.sort(() => Math.random() - 0.5);
	}
	$: randomizeCategoryIndices();

	let pressedCount = 0;
	let firstPressedHidden: Hidden | null = null;
	let firstPressedOccluder: Occluder | null = null;

	let occluders: Occluder[] = [];
	let hiddens: Hidden[] = [];

	function buttonPressed(x: number, y: number) {
		const currentHidden = hiddens[y * cols + x];
		const currentOccluder = occluders[y * cols + x];
		if (pressedCount >= 2 || matches >= rows * cols || currentOccluder.done) {
			return;
		}
		if (firstPressedHidden === null) {
			firstPressedHidden = currentHidden;
			firstPressedOccluder = currentOccluder;
		} else if (firstPressedHidden === currentHidden) {
			return;
		}
		currentOccluder.pressedAudio?.play();
		occluders[y * cols + x].pressed = true;
		if (++pressedCount >= 2) {
			if (currentHidden.categoryIndex === firstPressedHidden.categoryIndex) {
				matches += 2;
				setTimeout(() => {
					pressedCount = 0;
					(firstPressedHidden as Hidden).done = true;
					currentHidden.done = true;

					(firstPressedOccluder as Occluder).done = true;
					currentOccluder.done = true;

					currentOccluder.doneAudio?.play();

					firstPressedHidden = null;
					firstPressedOccluder = null;

					occluders.forEach((occluder) => {
						occluder.pressed = false;
					});

					if (matches >= rows * cols) {
						setTimeout(() => {
							seed = Math.round(Math.random() * 10000);
							randomizeCategoryIndices();
							occluders.forEach((occluder) => {
								occluder.done = false;
								currentOccluder.pressedAudio?.play();
							});
							setTimeout(() => {
								matches = 0;
								hiddens.forEach((hidden) => {
									hidden.done = false;
								});
							}, 500);
						}, 500);
					}
				}, 500);
			} else {
				setTimeout(() => {
					pressedCount = 0;
					occluders.forEach((occluder) => {
						occluder.pressed = false;
						currentOccluder.pressedAudio?.play();
						firstPressedOccluder = null;
						firstPressedHidden = null;
					});
				}, 700);
			}
		}
	}

	function keyDown(x: number, y: number) {
		occluders[y * cols + x].keyDown = true;
	}

	function keyUp(x: number, y: number) {
		occluders[y * cols + x].keyDown = false;
	}

	$: if (newTheme !== theme) {
		pressedCount = 0;
		firstPressedHidden = null;
		matches = 0;
		firstPressedOccluder = null;
		theme = newTheme;
		occluders.forEach((occluder) => {
			occluder.done = false;
			occluder.pressed = false;
		});
		hiddens.forEach((hidden) => {
			hidden.done = false;
		});
	}
</script>

<svelte:head>
	<title>Another Memory Game</title>
</svelte:head>

<header>
	<h1>Another Memory Game</h1>
</header>
<main>
	<div id="gameDiv">
		{#each Array.from({ length: rows }) as _, y}
			<div class="gameRow">
				{#each Array.from({ length: cols }) as _, x}
					<button
						on:click={() => buttonPressed(x, y)}
						on:mousedown={() => keyDown(x, y)}
						on:mouseup={() => keyUp(x, y)}
					>
					{#if theme === "blocks"}
						<DefaultOccluder bind:this={occluders[y * cols + x]} {x} {y}>
							<HiddenBlocks
								bind:seed={seed}
								bind:categories={categories}
								bind:categoryIndex={categoryIndices[y * cols + x]}
								bind:this={hiddens[y * cols + x]}
								{x} {y}
							/>
						</DefaultOccluder>
					{:else}
						<DefaultOccluder bind:this={occluders[y * cols + x]} {x} {y}>
							<HiddenText
								bind:seed={seed}
								bind:categories={categories}
								bind:categoryIndex={categoryIndices[y * cols + x]}
								bind:this={hiddens[y * cols + x]}
								{x} {y}
							/>
						</DefaultOccluder>
					{/if}
					</button>
				{/each}
			</div>
		{/each}
	</div>

	<select bind:value={newTheme}>
		<option value="default">Text</option>
		<option value="blocks">Blocks</option>
	</select>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

	:global(html) {
		font-size: min(24px, 4vw);
	}

	:global(*) {
		margin: 0;
		padding: 0;
		color: white;
		font-family: 'Poppins', sans-serif;
	}

	#gameDiv {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
	}

	.gameRow {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 0.2rem;
	}

	main,
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	:global(body) {
		background-color: rgb(17, 17, 17);
	}

	main {
		margin-top: 2rem;
	}

	header {
		margin-top: 1rem;
	}

	main > *,
	header > * {
		max-width: 50rem;
	}

	#gameDiv > .gameRow > button {
		width: 5rem;
		height: 5rem;
		background-color: rgba(0, 0, 0, 0);
		border: none;
	}

	select {
		margin-top: 2rem;
		margin-bottom: 4rem;
		color: white;
		background-color: rgb(15, 15, 15);
		font-size: 1rem;
	}
</style>
