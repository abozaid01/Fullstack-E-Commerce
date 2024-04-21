<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if $page.status === 404}
	<section class="bg-white dark:bg-gray-900">
		<div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
			<div class="mx-auto max-w-screen-sm text-center">
				<h1 class="mb-4 text-9xl font-extrabold tracking-tight text-orange-400">
					{$page.status}
				</h1>
				<p
					class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white"
				>
					{$page.error?.message || `Something's missing.`}
				</p>
				<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
					Sorry, we can't find that page. You'll find lots to explore on the
					home page.
				</p>
				<a
					href="/"
					class="my-4 inline-flex rounded-lg bg-orange-500 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-orange-300"
					>Back to Homepage</a
				>
			</div>
		</div>
	</section>
{:else}
	<section class="bg-white dark:bg-gray-900">
		<div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
			<div class="mx-auto max-w-screen-sm text-center">
				<h1
					class="text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl"
				>
					{$page.status}
				</h1>
				<p
					class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white"
				>
					{$page.error?.message || 'Internal Server Error.'}
				</p>
				<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
					We are already working to solve the problem.
				</p>
			</div>
		</div>
	</section>
{/if}
