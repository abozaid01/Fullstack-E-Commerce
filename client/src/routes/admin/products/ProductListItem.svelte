<script lang="ts">
	import { PUBLIC_STATIC_BACKEND_URL } from '$env/static/public';
	import { TableBodyRow, TableBodyCell, Badge, Avatar, Rating } from 'flowbite-svelte';
	import ProductActionIcons from './ProductActionIcons.svelte';

	export let item: IProduct;
	export let brands: IBrand[];
	export let subcategories: ISubCategory[];
</script>

<TableBodyRow>
	<TableBodyCell>
		<div class="flex items-center text-sm">
			<Avatar
				class="mr-4"
				src={item.imageCover ? `${PUBLIC_STATIC_BACKEND_URL}/PRODUCTS/${item.imageCover}` : '/No_image_available.png'}
				alt="Product image"
			/>
			<div>
				<p class="font-semibold">{item.title}</p>
			</div>
		</div>
	</TableBodyCell>
	<TableBodyCell tdClass="px-4 py-3"
		><Badge rounded color={item.quantity > 0 ? 'green' : 'red'}>
			{item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
		</Badge></TableBodyCell
	>
	<TableBodyCell tdClass="px-4 py-3"
		><Rating total={5} rating={item.ratingsAverage ? item.ratingsAverage : 0}>
			<p slot="text" class="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">
				({item.ratingsQuantity})
			</p>
		</Rating></TableBodyCell
	>
	<TableBodyCell tdClass="px-4 py-3">{item.quantity}</TableBodyCell>

	<TableBodyCell tdClass="px-4 py-3">{item.price}</TableBodyCell>
	<TableBodyCell>
		<div class="flex gap-2">
			<ProductActionIcons {item} {brands} {subcategories} />
		</div>
	</TableBodyCell>
</TableBodyRow>
