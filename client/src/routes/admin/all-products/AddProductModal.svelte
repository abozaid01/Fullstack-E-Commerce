<script lang="ts">
	import ErrorAlert from '$lib/components/ErrorAlert.svelte';
	import ValidateInput from '$lib/components/ValidateInput.svelte';
	import { fetchWithAuth } from '$lib/services/api.service';
	import {
		Modal,
		Card,
		Label,
		Textarea,
		Button,
		Select,
		Input
	} from 'flowbite-svelte';
	import { Section } from 'flowbite-svelte-blocks';
	import { PlusOutline } from 'flowbite-svelte-icons';

	export let addProductModal = false;

	let errorsObj: {
		title?: string;
		price?: string;
		description?: string;
		longDescription?: string;
		quantity?: string;
	};

	let errStr: string;

	let imageCover: FileList;
	let images: FileList;
	let title: string;
	let description: string;
	let longDescription: string;
	let price: number;
	let quantity: number;

	async function handlSubmitForm() {
		try {
			const response = await fetchWithAuth(
				'http://localhost:3000/api/v1/products',
				{
					method: 'POST',
					body: JSON.stringify({
						title,
						description,
						longDescription,
						price,
						quantity
					})
				}
			);

			if (!response.ok) {
				const res = await response.json();

				if (res?.data?.validation_errors)
					errorsObj = res.data.validation_errors;
				else errStr = res.message;

				return console.error('Error:', response.statusText);
			}

			const data = await response.json();
			console.log('Success:', data);
		} catch (error) {
			errStr = 'faild to send request to the server! try again later';
		}
	}
</script>

{#if errStr}
	<ErrorAlert {errStr} />
{/if}

<Section classSection="h-96">
	<Modal
		title="Add Product"
		size="lg"
		bind:open={addProductModal}
		autoclose
		outsideclose
		class="min-w-full"
	>
		<form
			on:submit|preventDefault={handlSubmitForm}
			class="flex w-full flex-col items-center justify-between gap-4 lg:flex-row 2xl:flex-row"
		>
			<Card size="none" class="flex flex-col gap-6">
				<div class="flex flex-col justify-between gap-4 md:flex-row md:gap-0">
					<!-- IMAGE COVER -->
					<Label defaultClass="md:w-[48%]">
						<p
							class="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200"
						>
							Product Image Cover
						</p>
						<input
							type="file"
							accept="image/png, image/jpeg"
							bind:files={imageCover}
							name="imageCover"
							class="w-full rounded-md border text-sm dark:border-gray-500"
						/>
					</Label>

					<!-- IMAGES -->
					<Label defaultClass="md:w-[48%]">
						<p
							class="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200"
						>
							Product Images
						</p>
						<input
							type="file"
							accept="image/png, image/jpeg"
							multiple
							bind:files={images}
							name="images"
							class="w-full rounded-md border text-sm dark:border-gray-500"
						/>
					</Label>
				</div>

				<!-- TITLE -->
				<Label>
					<p
						class="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200"
					>
						Product Title
					</p>
					<Input
						bind:value={title}
						class="mb-1 dark:bg-gray-800"
						placeholder="Type product name here"
					/>
					{#if errorsObj?.title}
						<ValidateInput inputError={errorsObj?.title} />
					{/if}
				</Label>

				<!-- PRICE -->
				<Label>
					<p
						class="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200"
					>
						Product Price
					</p>
					<Input
						bind:value={price}
						class="mb-1 dark:bg-gray-800"
						placeholder="Enter product price here"
					/>
					{#if errorsObj?.price}
						<ValidateInput inputError={errorsObj?.price} />
					{/if}
				</Label>

				<!-- DESCRPTION -->
				<Label>
					<p
						class="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200"
					>
						Short description
					</p>
					<Textarea
						bind:value={description}
						rows="3"
						placeholder="Enter product short description here"
					/>
					{#if errorsObj?.description}
						<ValidateInput inputError={errorsObj?.description} />
					{/if}
				</Label>

				<!-- QTY -->
				<Label>
					<p
						class="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200"
					>
						Stock Qunatity
					</p>
					<Input
						bind:value={quantity}
						class="dark:bg-gray-800"
						placeholder="Enter product stock quantity"
					/>
					{#if errorsObj?.quantity}
						<ValidateInput inputError={errorsObj?.quantity} />
					{/if}
				</Label>

				<!-- LONG DESCRIPTION -->
				<Label>
					<p
						class="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200"
					>
						Full description
					</p>
					<Textarea
						bind:value={longDescription}
						rows="5"
						placeholder="Enter product full description here"
					/>
					{#if errorsObj?.longDescription}
						<ValidateInput inputError={errorsObj?.longDescription} />
					{/if}
				</Label>
			</Card>

			<Card class="flex flex-col gap-6 lg:self-start 2xl:max-w-sm" size="none">
				<!-- SELECT CATEGORY -->
				<div>
					<Label class="mt-4">
						<p class="text-md font-semibold text-gray-800 dark:text-gray-200">
							Select Product's Category
						</p>
						<Select class="mt-1">
							<option>Electronic</option>
							<option>Fashion</option>
							<option>Cosmatics</option>
							<option>Food and Meal</option>
						</Select>
					</Label>
					<!-- SELECT Subcategory -->
					<Label class="mt-4">
						<p
							class="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200"
						>
							Select Product's Subcategory
						</p>
						<Select class="mt-1">
							<option>Electronic</option>
							<option>Fashion</option>
							<option>Cosmatics</option>
							<option>Food and Meal</option>
						</Select>
					</Label>
					<!-- SELECT BRAND -->
					<Label class="mt-4">
						<p
							class="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200"
						>
							Select Product's Brand
						</p>
						<Select class="mt-1">
							<option>Electronic</option>
							<option>Fashion</option>
							<option>Cosmatics</option>
							<option>Food and Meal</option>
						</Select>
					</Label>
				</div>

				<!-- SUBMIT BUTTON -->
				<div class="self-center">
					<Button size="md" class="flex gap-2" type="submit">
						<PlusOutline size="lg" />
						<span>Add Product</span>
					</Button>
				</div>
			</Card>
		</form>
	</Modal>
</Section>
