<script lang="ts">
	import { Modal, Carousel, Thumbnails, Rating } from 'flowbite-svelte';
	import { PUBLIC_STATIC_BACKEND_URL } from '$env/static/public';

	export let viewProductModal = false;
	export let item: IProduct;

	let index = 0;

	let title = item.title;
	let description = item.description;
	let imageCover: FileList;

	const images = [
		{ src: `${PUBLIC_STATIC_BACKEND_URL}/PRODUCTS/${item.imageCover}` },
		...item.images.map((img) => ({ src: `${PUBLIC_STATIC_BACKEND_URL}/PRODUCTS/${img}` }))
	];
</script>

<Modal title="View Product" size="lg" bind:open={viewProductModal} outsideclose class="min-w-full">
	<div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
		<div class="lg:grid lg:grid-cols-2 lg:gap-4 xl:gap-6">
			<div class="mx-auto flex max-w-md shrink-0 flex-col gap-4 lg:max-w-lg">
				<Carousel {images} forward={true} let:Indicators let:Controls bind:index>
					<Controls />
					<Indicators />
				</Carousel>
				<Thumbnails {images} forward={true} bind:index />
			</div>

			<div class="mt-6 sm:mt-8 lg:mt-0">
				<h1 class="text-lg font-extrabold text-gray-900 sm:text-xl dark:text-white">
					{item.title}
				</h1>
				<div class="mt-4 sm:flex sm:items-center sm:gap-4">
					<p class="text-2xl font-semibold text-gray-900 sm:text-3xl dark:text-white">EGP {item.price}</p>

					<div class="mt-2 flex items-center gap-2 sm:mt-0">
						<Rating total={5} rating={item.ratingsAverage ? item.ratingsAverage : 0} size={22} />
						<p class="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
							({item.ratingsAverage ? item.ratingsAverage : 0})
						</p>
						<p class="text-sm font-medium leading-none text-gray-900 dark:text-white">{item.ratingsQuantity} Reviews</p>
					</div>
				</div>

				<p class="mb-6 mt-8 text-wrap text-gray-500 dark:text-gray-400">
					{item.description}
				</p>

				<p class="text-wrap text-gray-500 dark:text-gray-400">
					{item.longDescription}
				</p>
			</div>
		</div>
	</div></Modal
>
