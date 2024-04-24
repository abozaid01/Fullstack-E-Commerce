<script lang="ts">
	import {
		TableBodyRow,
		TableBodyCell,
		Badge,
		Avatar,
		Rating
	} from 'flowbite-svelte';
	import ProductActionIcons from './ProductActionIcons.svelte';

	export let item: any;
</script>

<TableBodyRow>
	<TableBodyCell>
		<div class="flex items-center text-sm">
			<Avatar class="mr-4" src={item.photo} alt="Product image" />
			<div>
				<p class="font-semibold">{item.name}</p>
			</div>
		</div>
	</TableBodyCell>
	<TableBodyCell tdClass="px-4 py-3"
		><Badge rounded color={item.qty > 0 ? 'green' : 'red'}>
			{item.qty > 0 ? 'In Stock' : 'Out of Stock'}
		</Badge></TableBodyCell
	>
	<TableBodyCell tdClass="px-4 py-3"
		><Rating total={5} rating={item.rating}>
			<p
				slot="text"
				class="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400"
			>
				({item.reviews.length})
			</p>
		</Rating></TableBodyCell
	>
	<TableBodyCell tdClass="px-4 py-3">{item.qty}</TableBodyCell>

	<TableBodyCell tdClass="px-4 py-3">{item.price}</TableBodyCell>
	<TableBodyCell>
		<div class="flex gap-2">
			<ProductActionIcons />
		</div>
	</TableBodyCell>
</TableBodyRow>
