<script lang="ts">
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';

	export let successMsg: string;

	onMount(() => {
		toast.success(successMsg, {
			style: 'border-radius: 200px; background: #333; color: #fff;'
		});
	});
</script>

<Toaster />
