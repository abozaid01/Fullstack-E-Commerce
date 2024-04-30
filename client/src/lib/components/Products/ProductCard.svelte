<script lang="ts">
	import { HeartOutline, CartOutline } from 'flowbite-svelte-icons';
	import { Rating, Card } from 'flowbite-svelte';
	import { PUBLIC_STATIC_BACKEND_URL } from '$env/static/public';
	import Star from './Star.svelte';

	export let productItem: IProduct;

	// let isNew = true;
	// let isSale = true;
</script>

<div class="space-y-4">
	<Card shadow={false} border={false}>
		<!-- Img -->
		<a class="img-container rounded-xl" href="/products/{productItem.slug}">
			<img
				src={`${PUBLIC_STATIC_BACKEND_URL}/PRODUCTS/${productItem.imageCover}`}
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
		<h4 class="mb-2 text-center font-[Dosis] text-lg font-bold uppercase tracking-tight text-gray-900 dark:text-white">
			{productItem.title}
		</h4>

		<!-- Price -->
		<p class="text-center text-lg font-semibold text-orange-500">
			<span class="mr-1">EGP</span>{productItem.price}
		</p>

		<!-- Rating -->
		<div class="flex items-center justify-center text-xl">
			<Rating total={5} rating={productItem.ratingsAverage ? productItem.ratingsAverage : 0} size={24} icon={Star} />
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
