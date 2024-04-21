<script lang="ts">
	import { onMount } from 'svelte';
	import type { ICategory } from '../../interfaces/category.interface';
	import type { IBrand } from '../../interfaces/brand.interface';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import CgSearch from 'svelte-icons-pack/cg/CgSearch';
	import FiPlus from 'svelte-icons-pack/fi/FiPlus';
	import FiMinus from 'svelte-icons-pack/fi/FiMinus';
	import DoubleRangeSlider from '../DoubleRangeSlider.svelte';

	export let categories: ICategory[] = [];
	export let brands: IBrand[] = [];

	onMount(() => {
		categories = categories.map((category) => ({
			...category,
			isExpanded: false
		}));
	});

	function toggleCategory(category: ICategory) {
		categories = categories.map((cat: ICategory) => ({
			...cat,
			isExpanded: cat._id === category._id ? !cat.isExpanded : false
		}));
	}

	let start: number;
	let end: number;
</script>

<div
	class="3xl:min-w-[23rem] hidden min-w-[19.2rem] flex-col rounded-[3rem] bg-slate-200 xl:flex 2xl:min-w-[22rem]"
>
	<!-- Search -->
	<div class="search-box">
		<input
			type="text"
			name="search"
			class="search-input"
			placeholder="search"
		/>
		<button class="search-btn">
			<Icon src={CgSearch} />
		</button>
	</div>

	<!-- Categories -->
	<div class="section">
		<div class="text">categories</div>

		<ul class="px-3">
			{#each categories as category (category._id)}
				<li class="category-item">
					<button
						on:click={() => toggleCategory(category)}
						class="flex w-full justify-between"
					>
						<p>{category.name}</p>
						<span class="flex justify-end">
							{#if category.isExpanded}
								<Icon src={FiMinus} className="text-orange-500 text-xl" />
							{:else}
								<Icon src={FiPlus} className="text-orange-500 text-xl" />
							{/if}
						</span>
					</button>

					{#if category.isExpanded}
						<ul class="subcategories-list">
							{#each category.subcategories as subcategory (subcategory._id)}
								<li class="subcategories-item">
									<a href={`/${category.name}/${category._id}`}
										>{subcategory.name}</a
									>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ul>
	</div>

	<!-- BRANDS -->
	<div class="section">
		<div class="text">brands</div>

		<ul class="mt-4 grid grid-cols-2 gap-2 px-3 text-center text-white">
			{#each brands as brand (brand._id)}
				<li class="rounded-full bg-orange-400 py-3 hover:bg-orange-500">
					<p>{brand.name}</p>
				</li>
			{/each}
		</ul>
	</div>

	<!-- PRICE -->
	<div class="section">
		<div class="text">price</div>

		<div class="mx-auto w-3/4">
			<DoubleRangeSlider bind:start bind:end />
		</div>

		<p class="price-display">
			EGP {Math.round(start * 10000).toLocaleString()}
			<span class="mx-3"> - </span>
			EGP {Math.round(end * 10000).toLocaleString()}
		</p>
	</div>

	<!-- COLORS -->
	<div class="color-box">
		<div class="text">colors</div>

		<div class="colors">
			<div class="color bg-red-300"></div>
			<div class="color bg-pink-400"></div>
			<div class="color bg-blue-400"></div>
			<div class="color bg-lime-600"></div>
			<div class="color bg-yellow-300"></div>
			<div class="color bg-orange-400"></div>
			<div class="color bg-red-700"></div>
			<div class="color relative bg-black">
				<div class="absolute left-1/2 h-11 w-6 rounded-r-full bg-white"></div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	/* REUSED */
	.section {
		@apply mb-8 border-b-2 border-white px-8 pb-8;
	}

	.text {
		@apply text-lg font-bold uppercase;
	}

	/* SEARCH */
	.search-box {
		@apply relative my-8 flex justify-center border-b-2 border-white pb-8;
	}

	.search-input {
		@apply max-w-64 rounded-full border border-slate-200 px-4 py-3 text-sm text-gray-600;
	}

	.search-btn {
		@apply absolute right-16 top-[0.66rem] rounded-full text-2xl text-orange-500;
	}

	/* CATEGORIES */
	.category-item {
		@apply my-3 cursor-pointer font-semibold;
	}

	.subcategories-list {
		@apply py-2 pl-3;
	}

	.subcategories-item {
		@apply py-1 font-medium text-gray-400 transition-all duration-200 ease-in hover:text-orange-400 active:text-orange-500;
	}

	/* BRANDS */

	/* PRICE */

	.price-display {
		@apply mt-2 text-center text-xs font-medium text-gray-400;
	}

	/* COLORS */
	.color-box {
		@apply mb-8 border-b-2 border-white px-8 pb-8;
	}

	.colors {
		@apply mt-4 grid grid-cols-4 grid-rows-2 gap-y-2;
	}

	.color {
		@apply h-11 w-11 cursor-pointer rounded-full;
	}
</style>
