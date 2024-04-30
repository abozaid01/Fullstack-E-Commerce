<script>
	import ProductCard from './ProductCard.svelte';
</script>

<div>
	<div class="mb-2 font-[Dosis] text-lg font-bold uppercase">new products</div>
	<div class="grid w-full grid-cols-3 gap-4 xl:gap-8 2xl:gap-4">
		{#each [1, 2, 3] as card}
			<!-- <ProductCard /> -->
		{/each}
	</div>
</div>
