<script lang="ts">
	import { Helper } from 'flowbite-svelte';
	export let inputError: string;
</script>

<Helper color="red">
	<span class="font-medium">{inputError}</span>
</Helper>
