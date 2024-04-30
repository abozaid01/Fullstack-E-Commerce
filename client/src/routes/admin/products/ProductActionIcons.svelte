<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	import { EyeSolid, PenOutline, TrashBinSolid } from 'flowbite-svelte-icons';
	import DeleteProductModal from './DeleteProductModal.svelte';
	import EditProductModal from './EditProductModal.svelte';
	import ViewProductModal from './ViewProductModal.svelte';

	export let item: IProduct;
	export let brands: IBrand[];
	export let subcategories: ISubCategory[];

	let editProductModal: boolean;
	let deleteProductModal: boolean;
	let viewProductModal: boolean;
</script>

<div>
	<ViewProductModal bind:viewProductModal {item} />
	<EditProductModal bind:editProductModal {item} {brands} {subcategories} />
	<DeleteProductModal bind:deleteProductModal {item} />

	<button on:click={() => (viewProductModal = true)}>
		<Badge color="blue" rounded large class="!p-1 !font-semibold">
			<EyeSolid class="h-5 w-5" />
			<span class="sr-only">View Product Details</span>
		</Badge>
	</button>

	<button on:click={() => (editProductModal = true)}>
		<Badge color="green" rounded large class="!p-1 !font-semibold">
			<PenOutline class="h-5 w-5" />
			<span class="sr-only">Edit Product</span>
		</Badge>
	</button>

	<button on:click={() => (deleteProductModal = true)}>
		<Badge color="red" rounded large class="!p-1 !font-semibold">
			<TrashBinSolid class="h-5 w-5" />
			<span class="sr-only">Delete Product</span>
		</Badge>
	</button>
</div>
