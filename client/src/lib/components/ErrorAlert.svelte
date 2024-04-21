<script lang="ts">
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';

	export let errStr: string;

	onMount(() => {
		toast.error(errStr, {
			style: 'border-radius: 200px; background: #333; color: #fff;'
		});
	});
</script>

<Toaster />
