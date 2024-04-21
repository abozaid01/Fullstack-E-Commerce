<script lang="ts">
	import type { PageData } from './$types';
	import Values from '$lib/components/Values.svelte';
	import NewProducts from '$lib/components/NewProducts.svelte';
	import Bestsellrs from '$lib/components/Bestsellrs.svelte';
	import Sidebar from '$lib/components/ClientSidebar/Sidebar.svelte';

	export let data: PageData;

	const categories = data.categories;
	const brands = data.brands;
</script>

<Values />

<main class="container flex justify-between">
	<Sidebar {categories} {brands} />
	<div class="flex flex-col gap-10 py-3">
		<NewProducts />
		<Bestsellrs />
	</div>
</main>
