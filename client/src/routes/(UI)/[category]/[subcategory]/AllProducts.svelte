<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	console.log($page.params.subcategory);

	let subcategories: any = [];

	onMount(async () => {
		const res = await fetch(
			`http://localhost:3000/api/v1/categories/${$page.params.subcategory}/subcategories`
		);
		const data = await res.json();
		subcategories = data.data.subcategories;
	});
</script>

<div>
	<div class="grid w-full grid-cols-3 gap-4 xl:gap-8 2xl:gap-4">
		{#each subcategories as subcategory}
			<ProductCard />
		{/each}
	</div>
</div>
