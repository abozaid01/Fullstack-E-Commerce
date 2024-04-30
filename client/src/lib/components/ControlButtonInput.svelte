<script lang="ts">
	export let value: number = 0;

	const handlePlus = () => {
		if (typeof +value === 'number' && isFinite(value) && +value >= 0) value++;
	};

	const handleMinus = () => {
		if (typeof +value === 'number' && isFinite(value) && +value > 0) value--;
	};
</script>

<div class="relative flex max-w-[8rem] items-center">
	<!-- Minus Btn -->
	<button
		type="button"
		on:click={handleMinus}
		data-input-counter-decrement="quantity-input"
		class="h-11 rounded-s-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
	>
		<svg
			class="h-3 w-3 text-gray-900 dark:text-white"
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
		id="quantity-input"
		type="text"
		data-input-counter
		aria-describedby="helper-text-explanation"
		class="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block h-11 w-full border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
		placeholder="999"
		bind:value
	/>
	<!-- Plus Btn -->
	<button
		on:click={handlePlus}
		type="button"
		data-input-counter-increment="quantity-input"
		class="h-11 rounded-e-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
	>
		<svg
			class="h-3 w-3 text-gray-900 dark:text-white"
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
