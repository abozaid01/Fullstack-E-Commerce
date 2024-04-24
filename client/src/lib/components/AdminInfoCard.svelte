<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import type { IconType } from 'svelte-icons-pack/dist';

	export let title: string;
	export let value: string;
	export let icon: IconType;
	export let color: string = '';
</script>

<Card>
	<div class="flex w-full items-center gap-4">
		<!-- ICON -->
		<div class="relative h-12 w-12 rounded-full {color}">
			<Icon
				src={icon}
				size={30}
				color="orange-800"
				className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2"
			/>
		</div>
		<!-- TITLE -->
		<div>
			<p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
				{title}
			</p>
			<!-- VALUE -->
			<p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
				{value}
			</p>
		</div>
	</div>
</Card>

<!-- <Card>
	<CardBody className="flex items-center">
		{icon}
		<div>
			<p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
				{title}
			</p>
			<p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
				{value}
			</p>
		</div>
	</CardBody>
</Card> -->
