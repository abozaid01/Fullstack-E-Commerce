<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import { PUBLIC_STATIC_BACKEND_URL } from '$env/static/public';
	import ReadMore from '$lib/components/ReadMore.svelte';
	import SubcategoryActions from './SubcategoryActions.svelte';

	export let item: ISubCategory;
	export let categories: ICategory[];
</script>

<Card
	img={item.imageCover ? `${PUBLIC_STATIC_BACKEND_URL}/SUBCATEGORIES/${item.imageCover}` : '/No_image_available.png'}
>
	<div class="mb-2 flex items-center justify-between">
		<p class="truncate text-base font-semibold text-gray-600 dark:text-gray-300">
			{item.name}
		</p>
	</div>

	<p class="mb-8 break-words text-sm text-gray-600 dark:text-gray-400">
		{#if item.description}
			<ReadMore textContent={item.description} maxWords={20} maxChars={40}></ReadMore>
		{:else}
			N/A
		{/if}
	</p>

	<div class="flex justify-end gap-2">
		<SubcategoryActions {item} {categories} />
	</div>
</Card>
