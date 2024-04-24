<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	import { PenOutline, TrashBinSolid } from 'flowbite-svelte-icons';
	import EditBrandModal from './EditBrandModal.svelte';
	import DeleteBrandModal from './DeleteBrandModal.svelte';

	let editBrandModal: boolean;
	let deleteBrandModal: boolean;
	export let item: IBrand;
</script>

<div>
	<EditBrandModal bind:editBrandModal {item} />
	<DeleteBrandModal bind:deleteBrandModal {item} />

	<button on:click={() => (editBrandModal = true)}>
		<Badge color="green" rounded large class="!p-1 !font-semibold">
			<PenOutline class="h-5 w-5" />
			<span class="sr-only">Edit Brand</span>
		</Badge>
	</button>

	<button on:click={() => (deleteBrandModal = true)}>
		<Badge color="red" rounded large class="!p-1 !font-semibold">
			<TrashBinSolid class="h-5 w-5" />
			<span class="sr-only">Delete Brand</span>
		</Badge>
	</button>
</div>
