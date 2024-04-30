<script lang="ts">
	import { PUBLIC_STATIC_BACKEND_URL } from '$env/static/public';
	import { Card, Badge } from 'flowbite-svelte';
	import ProductActionIcons from './ProductActionIcons.svelte';

	export let item: IProduct;
	export let brands: IBrand[];
	export let subcategories: ISubCategory[];
</script>

<Card img={item.imageCover ? `${PUBLIC_STATIC_BACKEND_URL}/PRODUCTS/${item.imageCover}` : '/No_image_available.png'}>
	<div class="mb-2 flex items-center justify-between">
		<p class="truncate text-base font-semibold text-gray-600 dark:text-gray-300">
			{item.title}
		</p>
		<Badge rounded color={item.quantity > 0 ? 'green' : 'red'} class="whitespace-nowrap">
			<p class="break-normal">
				{item.quantity > 0 ? `In Stock` : 'Out of Stock'}
			</p>
		</Badge>
	</div>

	<p class="text-primary-500 mb-3 font-semibold">
		{item.price} EGP
	</p>

	<p class="mb-8 text-sm text-gray-600 dark:text-gray-400">
		{item.description}
	</p>

	<div class="flex justify-end gap-2">
		<ProductActionIcons {item} {brands} {subcategories} />
	</div>
</Card>
