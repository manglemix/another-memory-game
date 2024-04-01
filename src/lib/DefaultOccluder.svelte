<svelte:options accessors={true} />

<script lang="ts">
	let duration = Math.random() * 10 + 6;
	export let keyDown = false;
	export let done = false;
	export let pressed = false;

	export let orgWidth = 5;
	export let orgHeight = 5;
	export let pressedAudio: HTMLAudioElement | undefined = undefined;
	export let doneAudio: HTMLAudioElement | undefined = undefined;
	export let x = 0;
	export let y = 0;
	let width = orgWidth;
	let height = orgHeight;
	let classes = '';
	let side = '';
	switch (Math.floor(Math.random() * 4)) {
		case 0:
			side = 'right';
			break;
		case 1:
			side = 'up';
			break;
		case 2:
			side = 'left';
			break;
		case 3:
			side = 'bottom';
			break;
	}
	
	$: if (keyDown) {
		width = orgWidth * 0.97;
		height = orgHeight * 0.97;
	} else {
		width = orgWidth;
		height = orgHeight;
	}

	$: if (pressed || done) {
		classes = side;
		if (done) {
			classes += ' done';
		}
	} else {
		classes = '';
	}
</script>

<audio src="slide.wav" preload="auto" bind:this={pressedAudio}></audio>
<audio src="ding.wav" preload="auto" bind:this={doneAudio}></audio>

<div id="occluder">
	<div
		id="panel"
		style="animation-duration: {duration}s; --height: {height}rem; --width: {width}rem;"
		class={classes}
	>
    </div>
	<div id="inner">
		<slot />
	</div>
</div>

<style>
	#occluder {
		position: relative;
		width: 5rem;
		height: 5rem;
	}

	#panel {
		position: absolute;
		width: var(--width);
		height: var(--height);
		animation: colorChange 5s infinite alternate;
		transition:
			width 0.1s,
			height 0.1s,
			clip-path 0.2s,
			opacity 0.1s;
		clip-path: rect(0% 100% 100% 0%);
        z-index: 10;
	}

	#panel.right {
		clip-path: rect(0% 100% 100% 100%);
	}

	#panel.up {
		clip-path: rect(0% 100% 0% 0%);
	}

	#panel.left {
		clip-path: rect(0% 0% 100% 0%);
	}

	#panel.bottom {
		clip-path: rect(100% 100% 100% 0%);
	}

	#panel.done {
		opacity: 0;
	}

	@keyframes colorChange {
		0% {
			background-color: rgb(27, 27, 27);
		}
		100% {
			background-color: rgb(31, 31, 31);
		}
	}
</style>
