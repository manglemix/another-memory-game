<script lang="ts">
    export let containerWidth = 5;
    export let width = 1.2;
    export let x = 0;
    export let y = 0;
    export let z = 0;

    $: topOffset = (y * 0.6 - 0.2 * x + 0.2 * z) * width + (containerWidth - width) / 2;
    $: leftOffset = (x * 0.5 + z * 0.5) * width + (containerWidth - width) / 2;
</script>


<div id="block" style="--width: {width}rem; --topOffset: {topOffset}rem; --leftOffset: {leftOffset}rem;">
    <div id="top" style="--width: {width}rem;"/>
    <div id="left" style="--width: {width}rem"/>
    <div id="right" style="--width: {width}rem;"/>
    <div id="topInner" style="--width: {width}rem; --offset: {width * -0.02}rem"/>
    <div id="leftInner" style="--width: {width}rem; --offset: {width * -0.02}rem"/>
    <div id="rightInner" style="--width: {width}rem; --offset: {width * 0.022}rem"/>
</div>

<style>
    #block {
        width: var(--width);
        height: var(--width);
        top: var(--topOffset);
        left: var(--leftOffset);
        position: absolute;
        /* z-index: var(--i); */
    }

    #top {
        background-color: rgb(63, 63, 63);
        width: var(--width);
        height: var(--width);
        clip-path: polygon(0% 20%, 50% 0%, 100% 20%, 50% 40%);
        position: absolute;
    }

    #topInner {
        background-color: white;
        width: var(--width);
        height: var(--width);
        transform: scale(0.9, 0.92);
        top: var(--offset);
        clip-path: polygon(0% 20%, 50% 0%, 100% 20%, 50% 40%);
        position: absolute;
    }

    #left {
        background-color: rgb(63, 63, 63);
        width: var(--width);
        height: var(--width);
        clip-path: polygon(0% 20%, 50% 40%, 50% 100%, 0% 80%);
        position: absolute;
    }

    #leftInner {
        background-color: white;
        width: var(--width);
        height: var(--width);
        transform: scale(0.9, 0.92);
        left: var(--offset);
        clip-path: polygon(0% 20%, 50% 40%, 50% 100%, 0% 80%);
        position: absolute;
    }

    #right {
        width: var(--width);
        height: var(--width);
        background-color: rgb(63, 63, 63);
        position: absolute;
        clip-path: polygon(100% 20%, 50% 40%, 50% 100%, 100% 80%);
    }

    #rightInner {
        width: var(--width);
        height: var(--width);
        background-color: white;
        position: absolute;
        transform: scale(0.9, 0.92);
        left: var(--offset);
        clip-path: polygon(100% 20%, 50% 40%, 50% 100%, 100% 80%);
    }
</style>