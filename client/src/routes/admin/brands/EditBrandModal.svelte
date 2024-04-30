<script lang="ts">
	import { Label, Button, Textarea, Modal } from 'flowbite-svelte';
	import { fetchWithAuth } from '$lib/services/api.service';
	import ValidateInput from '$lib/components/ValidateInput.svelte';
	import ErrorAlert from '$lib/components/ErrorAlert.svelte';
	import SuccessAlert from '$lib/components/SuccessAlert.svelte';

	export let editBrandModal = false;
	export let item: IBrand;

	let name = item.name;
	let description = item.description;
	let imageCover: FileList;

	let errorsObj: { name?: string; description?: string } = {};
	let errStr: string;
	let successMsg: string;

	const handleSubmit = async function () {
		// 1) Reset the Errors if the form was submitted before
		if (errStr) errStr = '';
		if (errorsObj) errorsObj = {};

		// 2) Validate the required fields
		if (!name) errorsObj.name = `brand's name is required!`;
		if (name.length < 3)
			errorsObj.name = `brand's name must be at least 3 chracters`;
		if (description && description?.length > 200)
			errorsObj.description = `Too long description`;
		if (errorsObj.name || errorsObj.description) return;

		// 3) Build the formData
		const formData = new FormData();
		if (name !== item.name) formData.append('name', name);
		if (description && description !== item.description)
			formData.append('description', description);
		formData.append('imageCover', item.imageCover);
		if (imageCover && imageCover.length > 0) {
			for (let i = 0; i < imageCover.length; i++) {
				const file = imageCover[i];
				formData.append('imageCover', file);
			}
		}

		// 4) Send The Request
		try {
			// 'Content-Type': 'application/x-www-form-urlencoded',
			const response = await fetchWithAuth(`/brands/${item._id}`, {
				method: 'PATCH',
				body: formData
			});
			successMsg = 'Brand Updated Successfully!';
			editBrandModal = false;
			// TODO invalidate data for better UX
			setTimeout(() => window.location.reload(), 1000);
		} catch (error: any) {
			if (error?.data?.validation_errors)
				errorsObj = error?.data?.validation_errors;
			else if (error?.message) errStr = error.message;
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

<Modal
	title="Edit Brand"
	bind:open={editBrandModal}
	outsideclose
	class="min-w-full"
>
	<form on:submit|preventDefault={handleSubmit}>
		<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
			<!-- NAME -->
			<div class="sm:col-span-2">
				<Label for="name" class="mb-2">Brand Name</Label>
				<input
					type="text"
					name="name"
					id="name"
					class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
					placeholder="Type Brand name"
					bind:value={name}
				/>

				{#if errorsObj?.name}
					<ValidateInput inputError={errorsObj.name} />
				{/if}
			</div>

			<!-- IMAGE COVER -->
			<div class="sm:col-span-2">
				<Label>
					<p
						class="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200"
					>
						Product Image Cover
					</p>
					<input
						type="file"
						accept="image/png, image/jpeg"
						bind:files={imageCover}
						class="w-full rounded-md border dark:border-gray-500"
					/>
				</Label>
			</div>

			<!-- DESCRIPTION -->
			<div class="sm:col-span-2">
				<Label for="description" class="mb-2">Description</Label>
				<Textarea
					id="description"
					placeholder="Your description here"
					rows="4"
					bind:value={description}
				/>
				{#if errorsObj?.description}
					<ValidateInput inputError={errorsObj.description} />
				{/if}
			</div>
			<Button type="submit" class="w-32">Edit Brand</Button>
		</div>
	</form>
</Modal>
