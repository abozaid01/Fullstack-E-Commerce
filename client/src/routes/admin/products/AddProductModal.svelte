<script lang="ts">
	import { Modal, Card, Label, Textarea, Button, Select, Input, MultiSelect } from 'flowbite-svelte';
	import { PlusOutline, CloudArrowUpOutline } from 'flowbite-svelte-icons';
	import { fetchWithAuth } from '$lib/services/api.service';
	import ControlButtonInput from '$lib/components/ControlButtonInput.svelte';
	import ErrorAlert from '$lib/components/ErrorAlert.svelte';
	import ValidateInput from '$lib/components/ValidateInput.svelte';
	import SuccessAlert from '$lib/components/SuccessAlert.svelte';

	export let addProductModal = false;
	export let brands: IBrand[];
	export let subcategories: ISubCategory[];

	let successMsg: string;
	let errStr: string;
	let errorsObj: {
		title?: string;
		price?: string;
		priceAfterDiscount?: string;
		description?: string;
		longDescription?: string;
		quantity?: string;
		brand_id?: string;
		subcategories_ids?: string;
		colors?: string;
	} = {};

	let imageCover: FileList;
	let images: FileList;
	let title: string;
	let price: number;
	let priceAfterDiscount: number;
	let description: string;
	let longDescription: string;
	let quantity: number;
	let brand_id: string;
	let subcategories_ids: string[];
	let colors: string[];

	$: selectSubcategories = subcategories.map((el) => ({
		value: el._id,
		name: el.name
	}));

	$: selectbrands = brands.map((el) => ({
		value: el._id,
		name: el.name
	}));

	let selectColors = [
		{
			value: 'red',
			name: 'Red'
		},
		{
			value: 'blue',
			name: 'Blue'
		},
		{
			value: 'green',
			name: 'Green'
		},
		{
			value: 'yellow',
			name: 'Yellow'
		},
		{
			value: 'orange',
			name: 'Orange'
		},
		{
			value: 'purple',
			name: 'Purple'
		},
		{
			value: 'pink',
			name: 'Pink'
		},
		{
			value: 'brown',
			name: 'Brown'
		},
		{
			value: 'black',
			name: 'Black'
		},
		{
			value: 'white',
			name: 'White'
		},
		{
			value: 'cyan',
			name: 'Cyan'
		},
		{
			value: 'magenta',
			name: 'Magenta'
		},
		{
			value: 'teal',
			name: 'Teal'
		},
		{
			value: 'lavender',
			name: 'Lavender'
		},
		{
			value: 'maroon',
			name: 'Maroon'
		},
		{
			value: 'gold',
			name: 'Gold'
		},
		{
			value: 'silver',
			name: 'Silver'
		},
		{
			value: 'navy',
			name: 'Navy'
		},
		{
			value: 'turquoise',
			name: 'Turquoise'
		},
		{
			value: 'lime',
			name: 'Lime'
		}
	];

	const handleSubmitForm = async function () {
		// 1) Reset the Errors if the form was submitted before
		if (errStr) errStr = '';
		if (errorsObj) errorsObj = {};

		// 2) Validate the required fields
		if (!title) errorsObj.title = `Product's title is required!`;
		if (title?.length < 3) errorsObj.title = `Product's title must be at least 3 chracters`;

		if (isNaN(price)) errorsObj.price = `Product's price must be a number`;
		if (!price) errorsObj.price = `Product's Price is required!`;

		if (priceAfterDiscount && price && price <= priceAfterDiscount)
			errorsObj.priceAfterDiscount = `Product's price after discount must be less than the original price`;
		if (priceAfterDiscount && isNaN(priceAfterDiscount))
			errorsObj.priceAfterDiscount = `Product's price after discount must be a number`;

		if (isNaN(quantity)) errorsObj.quantity = `Product's quantity must be a number`;
		if (!quantity) errorsObj.quantity = `Product's quantity is required!`;

		if (!description) errorsObj.description = `Product's description is required!`;
		if (description?.length < 10) errorsObj.description = `Too short description`;

		if (!longDescription) errorsObj.longDescription = `Product's full description is required!`;
		if (longDescription?.length < 30) errorsObj.longDescription = `Too short full description`;

		if (errorsObj.title || errorsObj.price || errorsObj.quantity || errorsObj.description || errorsObj.longDescription)
			return;

		// 3) Build the formData
		const formData = new FormData();
		formData.append('title', title);
		formData.append('price', String(price));
		formData.append('quantity', String(quantity));
		formData.append('description', description);
		formData.append('longDescription', longDescription);

		if (priceAfterDiscount) formData.append('priceAfterDiscount', String(priceAfterDiscount));

		if (brand_id) formData.append('brand_id', brand_id);

		if (colors.length > 0)
			for (let i = 0; i < colors.length; i++) {
				formData.append('colors', colors[i]);
			}

		if (subcategories_ids.length > 0)
			for (let i = 0; i < subcategories_ids.length; i++) {
				formData.append('subcategories_ids', subcategories_ids[i]);
			}

		if (imageCover && imageCover.length > 0) {
			for (let i = 0; i < imageCover.length; i++) {
				const file = imageCover[i];
				formData.append('imageCover', file);
			}
		}

		if (images && images.length > 0) {
			for (let i = 0; i < images.length; i++) {
				const file = images[i];
				formData.append('images', file);
			}
		}

		// 4) Send The Request
		try {
			// 'Content-Type': 'application/x-www-form-urlencoded',
			const response = await fetchWithAuth('/products', {
				method: 'POST',
				body: formData
			});
			successMsg = 'Product Created Successfully!';
			// TODO invalidate data for better UX
			setTimeout(() => window.location.reload(), 1000);
		} catch (error: any) {
			if (error?.data?.validation_errors) errorsObj = error?.data?.validation_errors;
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

<Modal title="Add Product" size="lg" bind:open={addProductModal} outsideclose class="min-w-full">
	<form
		on:submit|preventDefault={handleSubmitForm}
		class="flex w-full flex-col items-center justify-between gap-4 lg:flex-row 2xl:flex-row"
	>
		<Card size="none" class="flex flex-col gap-6">
			<!-- TITLE -->
			<Label>
				<p class="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">Product Title</p>
				<Input bind:value={title} class="mb-1 dark:bg-gray-800" placeholder="Type product name here" />
				{#if errorsObj?.title}
					<ValidateInput inputError={errorsObj?.title} />
				{/if}
			</Label>

			<!-- <div class="flex flex-col justify-between gap-4 md:flex-row md:gap-0">
					
				</div> -->

			<!-- PRICE -->
			<Label>
				<p class="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">Product Price</p>
				<Input bind:value={price} class="mb-1 dark:bg-gray-800" placeholder="Enter product price here" />
				{#if errorsObj?.price}
					<ValidateInput inputError={errorsObj?.price} />
				{/if}
			</Label>

			<!-- PRICE AFTER Discount -->
			<Label>
				<p class="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">Product Price After Discount</p>
				<Input
					bind:value={priceAfterDiscount}
					class="mb-1 dark:bg-gray-800"
					placeholder="Enter product price After Discount here"
				/>
				{#if errorsObj?.priceAfterDiscount}
					<ValidateInput inputError={errorsObj?.priceAfterDiscount} />
				{/if}
			</Label>

			<!-- QTY -->
			<label for="quantity-input">
				<p class="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">Stock Qunatity</p>
				<ControlButtonInput bind:value={quantity} />
				{#if errorsObj?.quantity}
					<ValidateInput inputError={errorsObj?.quantity} />
				{/if}
			</label>

			<!-- DESCRPTION -->
			<Label>
				<p class="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">Short description</p>
				<Textarea bind:value={description} rows="3" placeholder="Enter product short description here" />
				{#if errorsObj?.description}
					<ValidateInput inputError={errorsObj?.description} />
				{/if}
			</Label>

			<!-- LONG DESCRIPTION -->
			<Label>
				<p class="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">Full description</p>
				<Textarea bind:value={longDescription} rows="5" placeholder="Enter product full description here" />
				{#if errorsObj?.longDescription}
					<ValidateInput inputError={errorsObj?.longDescription} />
				{/if}
			</Label>
		</Card>

		<Card class="flex flex-col gap-6 lg:self-start 2xl:max-w-sm" size="none">
			<div class="flex flex-col gap-6">
				<!-- IMAGE COVER -->
				<Label>
					<p class="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">Product Image Cover</p>
					<input
						type="file"
						accept="image/*"
						bind:files={imageCover}
						name="imageCover"
						class="w-full rounded-md border text-sm dark:border-gray-500"
					/>
				</Label>

				<!-- IMAGES -->
				<Label>
					<p class="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">Product Images</p>
					<input
						type="file"
						accept="image/*"
						multiple
						bind:files={images}
						name="images"
						class="w-full rounded-md border text-sm dark:border-gray-500"
					/>
				</Label>

				<!-- SELECT BRAND_ID -->
				<Label>
					Select Product's Brand
					<Select class="mt-2" items={selectbrands} bind:value={brand_id} />
					{#if errorsObj?.brand_id}
						<ValidateInput inputError={errorsObj.brand_id} />
					{/if}
				</Label>

				<!-- SELECT SUBCATEGORY_IDs -->
				<Label>
					Select a Subategory(s)
					<MultiSelect
						dropdownClass="m-0 p-0 text-sm"
						size="sm"
						class="mt-2"
						items={selectSubcategories}
						bind:value={subcategories_ids}
					/>
					{#if errorsObj?.subcategories_ids}
						<ValidateInput inputError={errorsObj.subcategories_ids} />
					{/if}
				</Label>

				<!-- SELECT COLORS -->
				<Label>
					Select Colors Available
					<MultiSelect
						dropdownClass="m-0 p-0 text-sm"
						size="sm"
						class="mt-2"
						items={selectColors}
						bind:value={colors}
					/>
					{#if errorsObj?.colors}
						<ValidateInput inputError={errorsObj.colors} />
					{/if}
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
