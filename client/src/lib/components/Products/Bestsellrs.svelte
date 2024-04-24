<script>
	import ProductCard from './ProductCard.svelte';
</script>

<div>
	<div class="my-4 text-lg font-bold uppercase">Best sellers</div>
	<div class="grid w-full grid-cols-3 gap-4 xl:gap-8 2xl:gap-4">
		{#each [1, 2, 3] as card}
			<ProductCard />
		{/each}
	</div>
</div>
