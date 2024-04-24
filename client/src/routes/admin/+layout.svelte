<script>
	import '../../app.css';
	import AdminHeader from '../../lib/components/header/AdminHeader.svelte';
	import AdminSidebar from '$lib/components/Sidebar/AdminSidebar.svelte';
</script>

<AdminHeader />
<div
	class="flex w-full items-start justify-center text-lg font-medium text-gray-600 md:pt-16 xl:justify-between dark:bg-gray-900 dark:text-gray-400"
>
	<AdminSidebar />
	<slot />
</div>

<!-- <style lang="postcss">
	.body {
		@apply bg-white;
	}
	:global(.dark) .body {
		@apply bg-gray-800;
	}
</style> -->
