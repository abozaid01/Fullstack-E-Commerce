<script lang="ts">
	import { Label, Button, Textarea, Modal, Card, Input, Select, MultiSelect } from 'flowbite-svelte';
	import { PenOutline } from 'flowbite-svelte-icons';
	import { fetchWithAuth } from '$lib/services/api.service';
	import ValidateInput from '$lib/components/ValidateInput.svelte';
	import ErrorAlert from '$lib/components/ErrorAlert.svelte';
	import SuccessAlert from '$lib/components/SuccessAlert.svelte';
	import ControlButtonInput from '$lib/components/ControlButtonInput.svelte';

	export let editProductModal = false;
	export let item: IProduct;
	export let brands: IBrand[];
	export let subcategories: ISubCategory[];

	let imageCover: FileList;
	let images: FileList;
	let title = item.title;
	let price = item.price;
	let priceAfterDiscount = item.priceAfterDiscount;
	let description = item.description;
	let longDescription = item.longDescription;
	let quantity = item.quantity;
	let brand_id = item.brand_id;
	let subcategories_ids = item.subcategories_ids;
	let colors = item.colors;

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

	const arraysEqual = function (arr1: string[], arr2: string[]): boolean {
		// Step 1: Sort both arrays
		arr1.sort();
		arr2.sort();

		// Step 2: Check if the lengths are the same
		if (arr1.length !== arr2.length) {
			return false;
		}

		// Step 3: Iterate over one array and check if each element exists in the other array
		for (let i = 0; i < arr1.length; i++) {
			if (arr1[i] !== arr2[i]) {
				return false;
			}
		}

		return true;
	};

	const handleSubmit = async function () {
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
		// required
		if (title !== item.title) formData.append('title', title);
		if (price !== item.price) formData.append('price', String(price));
		if (quantity !== item.quantity) formData.append('quantity', String(quantity));
		if (description !== item.description) formData.append('description', description);
		if (longDescription !== item.longDescription) formData.append('longDescription', longDescription);

		// optoinal
		if (priceAfterDiscount && priceAfterDiscount !== item.priceAfterDiscount)
			formData.append('priceAfterDiscount', String(priceAfterDiscount));

		if (brand_id && brand_id !== item.brand_id) formData.append('brand_id', brand_id);

		if (subcategories_ids && subcategories_ids.length > 0 && !arraysEqual(subcategories_ids, item.subcategories_ids))
			for (let i = 0; i < subcategories_ids.length; i++) {
				formData.append('subcategories_ids', subcategories_ids[i]);
			}

		if (colors && colors.length > 0 && !arraysEqual(colors, item.colors))
			for (let i = 0; i < colors.length; i++) {
				formData.append('colors', colors[i]);
			}

		if (imageCover && imageCover.length > 0) {
			formData.append('imageCover', item.imageCover);
			for (let i = 0; i < imageCover.length; i++) {
				const file = imageCover[i];
				formData.append('imageCover', file);
			}
		}

		if (images && images.length > 0) {
			for (let i = 0; i < item.images.length; i++) {
				formData.append('images', item.images[i]);
			}
			for (let i = 0; i < images.length; i++) {
				const file = images[i];
				formData.append('images', file);
			}
		}

		// 4) Send The Request
		try {
			// 'Content-Type': 'application/x-www-form-urlencoded',
			const response = await fetchWithAuth(`/products/${item._id}`, {
				method: 'PATCH',
				body: formData
			});
			successMsg = 'Product Updated Successfully!';
			editProductModal = false;
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

<Modal title="Edit Product" size="lg" bind:open={editProductModal} outsideclose class="min-w-full">
	<form
		on:submit|preventDefault={handleSubmit}
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
						accept="image/png, image/jpeg"
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
					<PenOutline size="lg" />
					<span>Edit Product</span>
				</Button>
			</div>
		</Card>
	</form>
</Modal>
