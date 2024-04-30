<script>
	import {
		Carousel,
		Thumbnails,
		Tabs,
		TabItem,
		RatingComment,
		Card,
		Rating
	} from 'flowbite-svelte';
	const image1 = {
		alt: 'erbology',
		src: 'https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg'
		// src: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg'
	};
	const images = [
		{
			alt: 'shoes',
			src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg'
		},
		{
			alt: 'small bag',
			src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg'
		},
		{
			alt: 'plants',
			src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg'
		},
		{
			alt: 'watch',
			src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg'
		},
		{
			alt: 'shoe',
			src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg'
		}
	];

	let comment = {
		id: '1',
		user: {
			name: 'Jese Leos',
			img: {
				src: 'data:image/jpeg;base64,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',
				alt: 'Jese Leos'
			},
			joined: 'Joined on August 2014'
		},
		total: 5,
		rating: 4.5,
		heading: '',
		address: '',
		datetime: '2022-03-25'
	};

	let index = 0;
	let forward = true; // sync animation direction between Thumbnails and Carousel
</script>

<section class="bg-white py-8 antialiased md:py-16 dark:bg-gray-900">
	<div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
		<div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
			<div class="mx-auto flex max-w-md shrink-0 flex-col gap-4 lg:max-w-lg">
				<Carousel {images} {forward} let:Indicators let:Controls bind:index>
					<Controls />
					<Indicators />
				</Carousel>
				<Thumbnails {images} {forward} bind:index />
			</div>

			<div class="mt-6 sm:mt-8 lg:mt-0">
				<h1
					class="font-[Dosis] text-xl font-extrabold text-gray-900 sm:text-2xl"
				>
					Apple iMac 24" All-In-One Computer, Apple M1, 8GB RAM, 256GB SSD, Mac
					OS, Pink
				</h1>
				<div class="mt-4 sm:flex sm:items-center sm:gap-4">
					<p
						class="font-[Dosis] text-2xl font-semibold text-gray-900 sm:text-3xl"
					>
						$1,249.99
					</p>

					<div class="mt-2 flex items-center gap-2 sm:mt-0">
						<Rating total={5} rating={4.6} size={22} />
						<p
							class="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
						>
							(4.6)
						</p>
						<a
							href="#"
							class="font-[Dosis] text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
						>
							45 Reviews
						</a>
					</div>
				</div>

				<div class="mt-6 sm:mt-8 sm:flex sm:items-center sm:gap-4">
					<a
						href="#"
						title=""
						class="hover:text-primary-700 flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
						role="button"
					>
						<svg
							class="-ms-2 me-2 h-5 w-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
							/>
						</svg>
						Add to favorites
					</a>

					<a
						href="#"
						title=""
						class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4 flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 sm:mt-0"
						role="button"
					>
						<svg
							class="-ms-2 me-2 h-5 w-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
							/>
						</svg>

						Add to cart
					</a>
				</div>

				<hr class="my-6 border-gray-200 md:my-8 dark:border-gray-800" />

				<p class="mb-6 text-gray-500 dark:text-gray-400">
					Studio quality three mic array for crystal clear calls and voice
					recordings. Six-speaker sound system for a remarkably robust and
					high-quality audio experience. Up to 256GB of ultrafast SSD storage.
				</p>

				<p class="text-gray-500 dark:text-gray-400">
					Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast Wi-Fi
					6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with Magic
					Keyboard or Magic Keyboard with Touch ID.
				</p>
			</div>
		</div>

		<Tabs style="underline">
			<TabItem open title="DESCRIPTION" defaultClass="font-[Dosis] font-bold">
				<p class="text-sm text-gray-500">
					Batteries: 1 Lithium Polymer batteries required. (included)<br />
					Is Discontinued By Manufacturer: No<br />
					Product Dimensions: 12 x 9 x 23 cm; 179 g<br />
					Date First Available: 16 August 2023<br />
					Manufacturer: Xiaomi<br />
					ASIN: B0C9LXDHY2 <br />
					Item model number: M19A
				</p>
			</TabItem>
			<TabItem title="REVIEWS (12)" defaultClass="font-[Dosis] font-bold">
				{#each [1, 2, 3] as c}
					<Card size="xl" class="my-4">
						<RatingComment {comment}>
							<p class="mb-2 font-light text-gray-500 dark:text-gray-400">
								This is my third Invicta Pro Diver. They are just fantastic
								value for money. This one arrived yesterday and the first thing
								I did was set the time, popped on an identical strap from
								another Invicta and went in the shower with it to test the
								waterproofing.... No problems.
							</p>
							<p class="mb-3 font-light text-gray-500 dark:text-gray-400">
								It is obviously not the same build quality as those very
								expensive watches. But that is like comparing a Citroën to a
								Ferrari. This watch was well under £100! An absolute bargain.
							</p>
							<a
								href="/"
								class="text-primary-600 dark:text-primary-500 mb-5 block text-sm font-medium hover:underline"
							>
								Read more
							</a>
						</RatingComment>
					</Card>
				{/each}
			</TabItem>
		</Tabs>
	</div>
</section>
