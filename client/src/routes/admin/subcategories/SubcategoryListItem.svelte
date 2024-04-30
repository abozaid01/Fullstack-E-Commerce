<script lang="ts">
	import { TableBodyRow, TableBodyCell, Avatar } from 'flowbite-svelte';
	import { PUBLIC_STATIC_BACKEND_URL } from '$env/static/public';
	import ReadMore from '$lib/components/ReadMore.svelte';
	import SubcategoryActions from './SubcategoryActions.svelte';

	export let item: ISubCategory;
	export let categories: ICategory[];
</script>

<TableBodyRow>
	<TableBodyCell>
		<div class="flex items-center text-sm">
			<Avatar
				class="mr-4"
				src={item.imageCover
					? `${PUBLIC_STATIC_BACKEND_URL}/SUBCATEGORIES/${item.imageCover}`
					: '/No_image_available.png'}
				alt="subcategory image"
			/>
			<div>
				<p class="font-semibold">{item.name}</p>
			</div>
		</div>
	</TableBodyCell>

	<TableBodyCell tdClass="px-4 py-3">
		<p class="font-semibold">
			{categories.find((el) => el._id === item.category_id)?.name}
		</p>
	</TableBodyCell>

	<TableBodyCell tdClass="px-4 py-3">
		{#if item.description}
			<p class="max-w-xs break-words">
				<ReadMore textContent={item.description} maxWords={20} maxChars={40}></ReadMore>
			</p>
		{:else}
			N/A
		{/if}
	</TableBodyCell>

	<TableBodyCell>
		<div class="flex gap-2">
			<SubcategoryActions {item} {categories} />
		</div>
	</TableBodyCell>
</TableBodyRow>
