<script lang="ts">
	import ErrorAlert from '$lib/components/ErrorAlert.svelte';
	import SuccessAlert from '$lib/components/SuccessAlert.svelte';
	import { fetchWithAuth } from '$lib/services/api.service';
	import { Button, Modal } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';

	export let deleteProductModal = false;
	export let item: IProduct;

	let errStr: string;
	let successMsg: string;

	const handleDeleteBrand = async function () {
		try {
			const response = await fetchWithAuth(`/products/${item._id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' }
			});
			successMsg = 'Product Deleted Successfully!';
			deleteProductModal = false;
			// TODO invalidate data for better UX
			setTimeout(() => window.location.reload(), 1000);
		} catch (error: any) {
			if (error?.message) errStr = error.message;
			else errStr = 'faild to send request to the server! try again later';
			console.error(error);
		}
	};
</script>

{#if errStr}
	<ErrorAlert {errStr} />
{/if}
{#if successMsg}
	<SuccessAlert {successMsg} />
{/if}

<Modal bind:open={deleteProductModal} size="xs" autoclose>
	<div class="text-center">
		<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Are you sure you want to delete this product?
		</h3>
		<Button color="red" class="me-2" on:click={handleDeleteBrand}>Yes, I'm sure</Button>
		<Button color="alternative">No, cancel</Button>
	</div>
</Modal>
