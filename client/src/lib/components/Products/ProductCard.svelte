<script lang="ts">
	import Star from './Star.svelte';
	import { Rating, Card } from 'flowbite-svelte';
	import { HeartOutline, CartOutline } from 'flowbite-svelte-icons';

	export let productItem: IProduct = {
		_id: '2',
		title: 'Denim Jeans',
		description: 'Classic denim jeans with a modern fit.',
		quantity: 30,
		price: 49.99,
		priceAfterDiscount: 39.99,
		colors: ['Blue'],
		imageCover:
			'data:image/jpeg;base64,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',
		images: ['jeans-blue.jpg', 'jeans-blue-side.jpg'],
		category_id: 'clothing',
		subcategories_ids: ['pants'],
		ratingsQuantity: 20,
		ratingsAverage: 4.0,

		slug: 'denim-jeans'
	};

	// let isNew = true;
	// let isSale = true;
</script>

<div class="space-y-4">
	<Card shadow={false} border={false}>
		<!-- Img -->
		<a class="img-container rounded-xl" href="/products/{productItem._id}">
			<img
				src={productItem.imageCover}
				alt={`${productItem.title} image`}
				class="rounded-xl"
			/>

			<!-- <div class="absolute top-0">
				<div class:isNew>{isNew ? 'new!' : ''}</div>
				<div class:isSale>{isNew ? 'sale!' : ''}</div>
			</div> -->

			<div class="overlay rounded-xl">
				<div
					class="absolute bottom-1/2 right-1/2 -translate-x-1/4 translate-y-1/2 cursor-pointer rounded-full border-2 p-2"
				>
					<HeartOutline size="xl" color="white" />
				</div>
				<div
					class="absolute bottom-1/2 left-1/2 translate-x-1/4 translate-y-1/2 cursor-pointer rounded-full border-2 p-2"
				>
					<CartOutline size="xl" color="white" />
				</div>
			</div>
		</a>

		<!-- Title -->
		<h4
			class="mb-2 text-center font-[Dosis] text-lg font-bold uppercase tracking-tight text-gray-900 dark:text-white"
		>
			{productItem.title}
		</h4>

		<!-- Price -->
		<p class="text-center text-lg font-semibold text-orange-500">
			<span class="mr-1">EGP</span>{productItem.price}
		</p>

		<!-- Rating -->
		<div class="flex items-center justify-center text-xl">
			<Rating
				total={5}
				rating={productItem.ratingsAverage}
				size={24}
				icon={Star}
			/>
		</div>
	</Card>
</div>

<style lang="postcss">
	.img-container {
		position: relative;
	}

	.overlay {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100%;
		width: 100%;
		opacity: 0;
		transition: 0.5s ease;
		background-color: rgba(249, 116, 22, 0.808);
	}

	.img-container:hover .overlay {
		opacity: 1;
	}

	.isNew {
		@apply rounded-full border-2 border-white bg-blue-400 p-3 font-[Dosis] text-xs font-bold uppercase text-white;
	}

	.isSale {
		@apply rounded-full border-2 border-white bg-lime-500 p-3 font-[Dosis] text-xs font-bold uppercase text-white;
	}
</style>
