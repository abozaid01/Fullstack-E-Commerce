<script lang="ts">
	import { Label, Button, Textarea } from 'flowbite-svelte';
	import { fetchWithAuth } from '$lib/services/api.service';
	import { Section } from 'flowbite-svelte-blocks';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import ValidateInput from '$lib/components/ValidateInput.svelte';
	import ErrorAlert from '$lib/components/ErrorAlert.svelte';
	import SuccessAlert from '$lib/components/SuccessAlert.svelte';

	let name: string;
	let imageCover: FileList;
	let description: string;

	let errorsObj: any = {};
	let errStr: string;
	let successMsg: string;

	let autoFocusRef: HTMLInputElement;

	onMount(() => {
		autoFocusRef.focus();
	});

	const handleSubmit = async function () {
		// 1) Reset the Error String if the form was submitted before
		if (errStr) errStr = '';

		// 2) Validate the required fields
		if (!name) return (errorsObj.name = `brand's name is required!`);
		if (name.length < 3)
			return (errorsObj.name = `brand's name must be at least 3 chracters`);
		else errorsObj.name = '';

		// 3) Build the formData
		const formData = new FormData();
		formData.append('name', name);
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
			const response = await fetchWithAuth('/brands', {
				method: 'POST',
				body: formData
			});

			successMsg = 'Brand Created Successfully!';
			setTimeout(() => goto('/admin/all-brands'), 2000);
		} catch (error: any) {
			if (error?.data?.validation_errors)
				errorsObj = error?.data?.validation_errors;
			else if (error?.message) errStr = error.message;
			else errStr = 'faild to send request to the server! try again later';
			console.error(error);
		}
	};
</script>

<Section name="crudcreateform" sectionClass="w-full">
	{#if errStr}
		<ErrorAlert {errStr} />
	{/if}
	{#if successMsg}
		<SuccessAlert {successMsg} />
	{/if}

	<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
		Add a new Brand
	</h2>

	<form on:submit|preventDefault={handleSubmit}>
		<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
			<div class="sm:col-span-2">
				<Label for="name" class="mb-2">Brand Name</Label>
				<input
					type="text"
					name="name"
					id="name"
					class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
					placeholder="Type Brand name"
					bind:value={name}
					bind:this={autoFocusRef}
				/>

				{#if errorsObj?.name}
					<ValidateInput inputError={errorsObj.name} />
				{/if}
			</div>
			<div class="sm:col-span-2">
				<!-- IMAGE COVER -->
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
			<Button type="submit" class="w-32">Add Brand</Button>
		</div>
	</form>
</Section>
