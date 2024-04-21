<script lang="ts">
	import type { PageData } from './$types';
	import Sidebar from '$lib/components/ClientSidebar/Sidebar.svelte';
	import AllProducts from './AllProducts.svelte';

	export let data: PageData;

	const categories = data.categories;
	const brands = data.brands;
</script>

<main class="container flex justify-between">
	<Sidebar {categories} {brands} />
	<AllProducts />
</main>
