<script lang="ts">
	import { Label, Button, Textarea, Select, Modal } from 'flowbite-svelte';
	import { fetchWithAuth } from '$lib/services/api.service';
	import { Section } from 'flowbite-svelte-blocks';
	import ValidateInput from '$lib/components/ValidateInput.svelte';
	import ErrorAlert from '$lib/components/ErrorAlert.svelte';
	import SuccessAlert from '$lib/components/SuccessAlert.svelte';

	export let addSubategoryModal = false;
	export let categories: ICategory[];

	$: selectCategories = categories.map((el) => ({
		value: el._id,
		name: el.name
	}));

	let name: string;
	let imageCover: FileList;
	let description: string;
	let category_id: string;

	let errorsObj: { name?: string; description?: string; category_id?: string } =
		{};
	let errStr: string;
	let successMsg: string;

	const handleSubmit = async function () {
		// 1) Reset the Errors if the form was submitted before
		if (errStr) errStr = '';
		if (errorsObj) errorsObj = {};

		// 2) Validate the required fields
		if (!name) errorsObj.name = `subcategory's name is required!`;
		if (name?.length < 3)
			errorsObj.name = `subcategory's name must be at least 3 chracters`;
		if (!category_id) errorsObj.category_id = `category's name is required`;
		if (description?.length > 200)
			errorsObj.description = `Too long description`;
		if (errorsObj.name || errorsObj.description || errorsObj.category_id)
			return;

		// 3) Build the formData
		const formData = new FormData();
		formData.append('name', name);
		formData.append('category_id', category_id);
		if (description) formData.append('description', description);
		if (imageCover && imageCover.length > 0) {
			for (let i = 0; i < imageCover.length; i++) {
				const file = imageCover[i];
				formData.append('imageCover', file);
			}
		}

		// 4) Send The Request
		try {
			// 'Content-Type': 'application/x-www-form-urlencoded',
			const response = await fetchWithAuth('/subcategories', {
				method: 'POST',
				body: formData
			});
			successMsg = 'Subategory Created Successfully!';
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

<Section classSection="h-96">
	<Modal
		title="Add New Subategory"
		bind:open={addSubategoryModal}
		outsideclose
		class="min-w-full"
	>
		<form on:submit|preventDefault={handleSubmit}>
			<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
				<!-- NAME -->
				<div class="sm:col-span-2">
					<Label for="name" class="mb-2">Subategory Name</Label>
					<input
						type="text"
						name="name"
						id="name"
						class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
						placeholder="Type Subategory name"
						bind:value={name}
					/>

					{#if errorsObj?.name}
						<ValidateInput inputError={errorsObj.name} />
					{/if}
				</div>

				<!-- CATEGORY_ID -->
				<div class="sm:col-span-2">
					<Label>
						Select a Category
						<Select
							class="mt-2"
							items={selectCategories}
							bind:value={category_id}
						/>
					</Label>
					{#if errorsObj?.category_id}
						<ValidateInput inputError={errorsObj.category_id} />
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
				<Button type="submit" class="w-32">Add Subategory</Button>
			</div>
		</form>
	</Modal>
</Section>
