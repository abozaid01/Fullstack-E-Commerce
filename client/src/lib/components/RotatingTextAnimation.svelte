<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { slide } from 'svelte/transition';

	let greetings = ['Hello', 'Bonjour', 'Konnichiwa'];
	let index = 0;
	let roller: number;

	onMount(() => {
		roller = setInterval(() => {
			if (index === greetings.length - 1) index = 0;
			else index++;
		}, 4250);
	});

	onDestroy(() => {
		clearInterval(roller);
	});
</script>

{#key index}
	<h1 transition:slide>{greetings[index]}!</h1>
{/key}
