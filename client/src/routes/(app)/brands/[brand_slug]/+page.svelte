<!-- ALL Products of this Brand -->
<script lang="ts">
	import type { PageData } from './$types';
	import ProductCard from '$lib/components/Products/ProductCard.svelte';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';

	export let data: PageData;
	const products = data.products;
	const categories = data.categories;
	const brands = data.brands;
</script>

<div class="mt-8 flex justify-between gap-10">
	<Sidebar {categories} {brands} />
	<div class="flex flex-col gap-8">
		<div class="font-[Dosis] text-lg font-bold uppercase">
			{products.length} Products Found
		</div>

		<div class="grid w-full grid-cols-3 gap-4 xl:gap-8 2xl:gap-4">
			{#each products as productItem (productItem._id)}
				<ProductCard {productItem} />
			{/each}
		</div>
	</div>
</div>
