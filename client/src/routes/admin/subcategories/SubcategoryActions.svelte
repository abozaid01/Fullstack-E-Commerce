<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	import { PenOutline, TrashBinSolid } from 'flowbite-svelte-icons';
	import EditSubcategoryModal from './EditSubcategoryModal.svelte';
	import DeleteSubcategoryModal from './DeleteSubcategoryModal.svelte';

	export let item: ISubCategory;
	export let categories: ICategory[];

	let editSubcategoryModal: boolean;
	let deleteSubcategoryModal: boolean;
</script>

<div>
	<EditSubcategoryModal bind:editSubcategoryModal {item} {categories} />
	<DeleteSubcategoryModal bind:deleteSubcategoryModal {item} />

	<button on:click={() => (editSubcategoryModal = true)}>
		<Badge color="green" rounded large class="!p-1 !font-semibold">
			<PenOutline class="h-5 w-5" />
			<span class="sr-only">Edit Subcategory</span>
		</Badge>
	</button>

	<button on:click={() => (deleteSubcategoryModal = true)}>
		<Badge color="red" rounded large class="!p-1 !font-semibold">
			<TrashBinSolid class="h-5 w-5" />
			<span class="sr-only">Delete Subcategory</span>
		</Badge>
	</button>
</div>
