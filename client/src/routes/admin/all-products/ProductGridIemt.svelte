<script lang="ts">
	import { Card, Badge } from 'flowbite-svelte';
	import ProductActionIcons from './ProductActionIcons.svelte';

	export let item: any;
</script>

<Card img={item.imageCover}>
	<div class="mb-2 flex items-center justify-between">
		<p
			class="truncate text-base font-semibold text-gray-600 dark:text-gray-300"
		>
			{item.name}
		</p>
		<Badge
			rounded
			color={item.qty > 0 ? 'green' : 'red'}
			class="whitespace-nowrap"
		>
			<p class="break-normal">
				{item.qty > 0 ? `In Stock` : 'Out of Stock'}
			</p>
		</Badge>
	</div>

	<p class="text-primary-500 mb-3 font-semibold">
		{item.price}
	</p>

	<p class="mb-8 text-sm text-gray-600 dark:text-gray-400">
		{item.shortDescription}
	</p>

	<div class="flex justify-end gap-2">
		<ProductActionIcons />
	</div>
</Card>
