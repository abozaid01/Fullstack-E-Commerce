<script lang="ts">
	import Values from '$lib/components/Values.svelte';
	import NewProducts from '$lib/components/Products/NewProducts.svelte';
	import Bestsellrs from '$lib/components/Products/Bestsellrs.svelte';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import type { PageData } from './$types';
	import TopRated from '$lib/components/Products/TopRated.svelte';

	export let data: PageData;

	const categories = data.categories;
	const brands = data.brands;
</script>

<Values />
<div class="mt-8 flex justify-between gap-10">
	<Sidebar {categories} {brands} />
	<div class="flex flex-col gap-8">
		<NewProducts />
		<Bestsellrs />
		<TopRated />
	</div>
</div>
