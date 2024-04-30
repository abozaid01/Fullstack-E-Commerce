<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	import { PenOutline, TrashBinSolid } from 'flowbite-svelte-icons';
	import EditCategoryModal from './EditCategoryModal.svelte';
	import DeleteCategoryModal from './DeleteCategoryModal.svelte';

	let editCategoryModal: boolean;
	let deleteCategoryModal: boolean;
	export let item: ICategory;
</script>

<div>
	<EditCategoryModal bind:editCategoryModal {item} />
	<DeleteCategoryModal bind:deleteCategoryModal {item} />

	<button on:click={() => (editCategoryModal = true)}>
		<Badge color="green" rounded large class="!p-1 !font-semibold">
			<PenOutline class="h-5 w-5" />
			<span class="sr-only">Edit Category</span>
		</Badge>
	</button>

	<button on:click={() => (deleteCategoryModal = true)}>
		<Badge color="red" rounded large class="!p-1 !font-semibold">
			<TrashBinSolid class="h-5 w-5" />
			<span class="sr-only">Delete Category</span>
		</Badge>
	</button>
</div>
