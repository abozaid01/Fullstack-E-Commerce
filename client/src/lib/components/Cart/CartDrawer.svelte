<script lang="ts">
	import { Drawer, Button, CloseButton } from 'flowbite-svelte';
	import { InfoCircleSolid, ArrowRightOutline } from 'flowbite-svelte-icons';
	import { sineIn } from 'svelte/easing';

	export let hideCartDrawer: boolean;

	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
</script>

<Drawer
	transitionType="fly"
	{transitionParams}
	bind:hidden={hideCartDrawer}
	width="w-1/3"
>
	<section>
		<!-- 1) HEADING -->
		<h2 class="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl">
			MY SHOPPING CART
		</h2>

		<!-- 2) CART ITEMS -->
		<div class="flex flex-col gap-4">
			{#each [1, 2, 3] as x}
				<!-- CART ITEM -->
				<div
					class="flex flex-row-reverse items-center justify-end rounded-lg border border-gray-200 p-2 shadow-sm"
				>
					<!-- IMG -->
					<a href="#" class="shrink-0 md:order-1">
						<img
							src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-light.svg"
							alt="imac product"
							class="h-20 w-20"
						/>
					</a>

					<div class="flex flex-col gap-4 p-2">
						<!-- TITLE -->
						<div>
							<a
								href="#"
								class="text-base font-medium text-gray-900 hover:underline"
								>Tablet APPLE iPad Pro 12.9"</a
							>
						</div>

						<div class="flex items-center gap-6">
							<!-- counter -->
							<div>
								<button
									class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
								>
									<svg
										class="h-2.5 w-2.5 text-gray-900"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 18 2"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M1 1h16"
										/>
									</svg>
								</button>
								<input
									type="text"
									class="w-7 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
									placeholder=""
									value="1"
								/>
								<button
									class="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
								>
									<svg
										class="h-2.5 w-2.5 text-gray-900"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 18 18"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 1v16M1 9h16"
										/>
									</svg>
								</button>
							</div>

							<!-- price -->
							<div class="">
								<p class="text-base font-bold text-gray-900">$699</p>
							</div>
						</div>

						<!-- fav - remove -->
						<div class="flex gap-4">
							<button
								type="button"
								class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
							>
								<svg
									class="me-1.5 h-5 w-5"
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
								Move to Favorites
							</button>

							<button
								type="button"
								class="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
							>
								<svg
									class="me-1.5 h-5 w-5"
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
										d="M6 18 17.94 6M18 18 6.06 6"
									/>
								</svg>
								Remove
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- 3) ORDER SUMMARY -->
		<div class="mt-8">
			<div
				class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
			>
				<p class="text-xl font-semibold text-gray-900">Order summary</p>

				<div class="space-y-4">
					<div class="space-y-2">
						<dl class="flex items-center justify-between gap-4">
							<dt
								class="text-base font-normal text-gray-500 dark:text-gray-400"
							>
								Original price
							</dt>
							<dd class="text-base font-medium text-gray-900">$7,592.00</dd>
						</dl>

						<dl class="flex items-center justify-between gap-4">
							<dt
								class="text-base font-normal text-gray-500 dark:text-gray-400"
							>
								Savings
							</dt>
							<dd class="text-base font-medium text-green-600">-$299.00</dd>
						</dl>

						<dl class="flex items-center justify-between gap-4">
							<dt
								class="text-base font-normal text-gray-500 dark:text-gray-400"
							>
								Store Pickup
							</dt>
							<dd class="text-base font-medium text-gray-900">$99</dd>
						</dl>

						<dl class="flex items-center justify-between gap-4">
							<dt
								class="text-base font-normal text-gray-500 dark:text-gray-400"
							>
								Tax
							</dt>
							<dd class="text-base font-medium text-gray-900">$799</dd>
						</dl>
					</div>

					<dl
						class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2"
					>
						<dt class="text-base font-bold text-gray-900">Total</dt>
						<dd class="text-base font-bold text-gray-900">$8,191.00</dd>
					</dl>
				</div>

				<a
					href="#"
					class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4"
					>Proceed to Checkout</a
				>

				<div class="flex items-center justify-center gap-2">
					<span class="text-sm font-normal text-gray-500 dark:text-gray-400">
						or
					</span>
					<a
						href="#"
						title=""
						class="text-primary-700 dark:text-primary-500 inline-flex items-center gap-2 text-sm font-medium underline hover:no-underline"
					>
						Continue Shopping
						<svg
							class="h-5 w-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 12H5m14 0-4 4m4-4-4-4"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>

		<!-- 4) APPLY COUPON -->
		<div class="my-8 border border-gray-200 p-4 shadow-sm">
			<form class="space-y-4">
				<div>
					<label
						for="voucher"
						class="mb-2 block text-sm font-medium text-gray-900"
					>
						Do you have a voucher or gift card?
					</label>
					<input
						type="text"
						id="voucher"
						class="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:placeholder:text-gray-400"
						placeholder=""
						required
					/>
				</div>
				<button
					type="submit"
					class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4"
					>Apply Code</button
				>
			</form>
		</div>
	</section>
</Drawer>
